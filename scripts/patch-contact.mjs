import fs from 'node:fs';
const p='api/contact.js';let s=fs.readFileSync(p,'utf8');
if(s.includes("from './_db.js'"))process.exit(0);
s="import { db } from './_db.js';\n"+s;
const start=s.indexOf('  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;');
if(start<0)throw Error('Unexpected api/contact.js format. Aborted.');
const pre=s.slice(0,start);
const lines = [
'  try {',
'    const sql = db();',
'    await sql`INSERT INTO vogon_submissions(kind,name,email,organization,inquiry_type,discipline,profile_url,message)',
"      VALUES (${body.kind},${clean.name},${clean.email},${clean.organization || ''},${clean.inquiryType || ''},${clean.discipline || ''},${clean.profileUrl || ''},${clean.message})`;",
'  } catch (err) {',
"    console.error('[contact] Database persistence failed', err);",
"    return res.status(503).json({ok:false,error:'Could not save your submission. Please retry.'});",
'  }',
'  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;',
'  if (RESEND_API_KEY && CONTACT_TO_EMAIL && CONTACT_FROM_EMAIL) {',
"    const subject = body.kind === 'careers' ? 'Career inquiry' : 'Contact inquiry';",
"    const rows = Object.entries(clean).map(([k,v]) => `${k}: ${v}`).join('\\n');",
'    try {',
"      const r = await fetch('https://api.resend.com/emails', {",
"        method:'POST', headers:{Authorization:`Bearer ${RESEND_API_KEY}`,'Content-Type':'application/json'},",
'        body:JSON.stringify({from:CONTACT_FROM_EMAIL,to:[CONTACT_TO_EMAIL],reply_to:clean.email,subject:`[VOGON] ${subject}: ${clean.name}`,text:rows})',
'      });',
"      if (!r.ok) console.error('[contact] Email notification failed',r.status);",
"    } catch(err) { console.error('[contact] Email notification error',err); }",
'  }',
'  return res.status(200).json({ok:true});',
'}',
];
fs.writeFileSync(p,pre+lines.join('\n')+'\n');
console.log('Contact and careers submissions now persist to Neon.');
