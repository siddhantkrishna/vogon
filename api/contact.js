import { db } from './_db.js';
/**
 * VOGON — form delivery endpoint (Vercel Serverless Function).
 *
 * POST /api/contact  { kind: "contact" | "careers", ...fields, website_url, elapsedMs }
 *
 * Required environment variables (see .env.example):
 *   RESEND_API_KEY      – Resend API key
 *   CONTACT_TO_EMAIL    – inbox that receives submissions
 *   CONTACT_FROM_EMAIL  – verified sender, e.g. "VOGON <noreply@vogon.in>"
 * Optional:
 *   ALLOWED_ORIGIN      – defaults to https://vogon.in
 *
 * Nothing is persisted by this function; submissions are forwarded by email only.
 */

const SCHEMAS = {
  contact: {
    name: { required: true, min: 2, max: 120 },
    email: { required: true, max: 200, email: true },
    organization: { max: 160 },
    inquiryType: {
      required: true,
      max: 60,
      oneOf: ["General inquiry", "Research collaboration", "Partnership", "Media", "Careers", "Other"],
    },
    message: { required: true, min: 20, max: 4000 },
  },
  careers: {
    name: { required: true, min: 2, max: 120 },
    email: { required: true, max: 200, email: true },
    discipline: {
      required: true,
      max: 60,
      oneOf: ["Software", "AI / ML", "Embedded & electronics", "Robotics & controls", "Aerospace & mechanical", "Operations", "Other"],
    },
    profileUrl: { max: 300, url: true },
    message: { required: true, min: 40, max: 4000 },
  },
};

// Best-effort in-memory rate limit (per warm instance)
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function validate(schema, body) {
  const errors = {};
  const clean = {};
  for (const [key, rule] of Object.entries(schema)) {
    const v = typeof body[key] === "string" ? body[key].trim() : "";
    if (rule.required && !v) errors[key] = "This field is required.";
    else if (v && rule.min && v.length < rule.min) errors[key] = `Must be at least ${rule.min} characters.`;
    else if (v && v.length > rule.max) errors[key] = `Must be under ${rule.max} characters.`;
    else if (v && rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) errors[key] = "Enter a valid email address.";
    else if (v && rule.url && !/^https?:\/\/\S+\.\S+/.test(v)) errors[key] = "Enter a valid URL.";
    else if (v && rule.oneOf && !rule.oneOf.includes(v)) errors[key] = "Invalid selection.";
    clean[key] = v;
  }
  return { errors, clean };
}

export default async function handler(req, res) {
  const origin = process.env.ALLOWED_ORIGIN || "https://vogon.in";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed." });

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: "Invalid request body." });
    }
  }
  body = body || {};

  // Spam protection: honeypot + minimum human fill time
  if (body.website_url || Number(body.elapsedMs) < 2500) {
    return res.status(400).json({ ok: false, error: "Submission rejected by spam protection. Please try again." });
  }

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return res.status(429).json({ ok: false, error: "Too many submissions. Please wait a few minutes." });

  const schema = SCHEMAS[body.kind];
  if (!schema) return res.status(400).json({ ok: false, error: "Unknown form type." });

  const { errors, clean } = validate(schema, body);
  if (Object.keys(errors).length) return res.status(422).json({ ok: false, error: "Please correct the highlighted fields.", errors });

  try {
    const sql = db();
    await sql`INSERT INTO vogon_submissions(kind,name,email,organization,inquiry_type,discipline,profile_url,message)
      VALUES (${body.kind},${clean.name},${clean.email},${clean.organization || ''},${clean.inquiryType || ''},${clean.discipline || ''},${clean.profileUrl || ''},${clean.message})`;
  } catch (err) {
    console.error('[contact] Database persistence failed', err);
    return res.status(503).json({ok:false,error:'Could not save your submission. Please retry.'});
  }
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (RESEND_API_KEY && CONTACT_TO_EMAIL && CONTACT_FROM_EMAIL) {
    const subject = body.kind === 'careers' ? 'Career inquiry' : 'Contact inquiry';
    const rows = Object.entries(clean).map(([k,v]) => `${k}: ${v}`).join('\n');
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method:'POST', headers:{Authorization:`Bearer ${RESEND_API_KEY}`,'Content-Type':'application/json'},
        body:JSON.stringify({from:CONTACT_FROM_EMAIL,to:[CONTACT_TO_EMAIL],reply_to:clean.email,subject:`[VOGON] ${subject}: ${clean.name}`,text:rows})
      });
      if (!r.ok) console.error('[contact] Email notification failed',r.status);
    } catch(err) { console.error('[contact] Email notification error',err); }
  }
  return res.status(200).json({ok:true});
}
