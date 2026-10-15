import { db } from '../_db.js';
import { configured, authenticated, checkPassword, createSession, clearSession, csrfSafe, noCache } from '../_auth.js';
export default async function handler(req, res) {
  noCache(res);
  if (!configured()) return res.status(503).json({error: 'Admin environment is not configured.'});
  if (req.method === 'GET') return res.status(200).json({ authenticated: authenticated(req) });
  if (!csrfSafe(req)) return res.status(403).json({error:'Invalid request origin.'});
  if (req.method === 'DELETE') { clearSession(res); return res.status(200).json({ok:true}); }
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed.'});
  const password = String(req.body?.password ?? '');
  if (!password || password.length > 256) return res.status(400).json({error:'Invalid password.'});
  try {
    const sql=db();
    const key = String(req.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim().slice(0,128);
    await sql`DELETE FROM admin_login_attempts WHERE attempted_at < NOW() - INTERVAL '1 hour'`;
    const [count] = await sql`SELECT COUNT(*)::int AS n FROM admin_login_attempts WHERE ip = ${key} AND attempted_at > NOW() - INTERVAL '15 minutes'`;
    if (count.n >= 8) return res.status(429).json({error:'Too many attempts. Wait 15 minutes.'});
    if (!checkPassword(password, req.body?.email)) {
      await sql`INSERT INTO admin_login_attempts (ip) VALUES (${key})`;
      return res.status(401).json({error:'Invalid credentials.'});
    }
    await sql`DELETE FROM admin_login_attempts WHERE ip=${key}`;
    createSession(res);
    return res.status(200).json({ok:true});
  } catch(err) {console.error('[admin/login]',err);return res.status(503).json({error:'Login temporarily unavailable.'});}
}
