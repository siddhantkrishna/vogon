import { db } from '../_db.js';
import { authenticated, csrfSafe, noCache } from '../_auth.js';
const allowed = new Set(['new','in_progress','responded','closed']);
export default async function handler(req, res) {
  noCache(res);
  if (!authenticated(req)) return res.status(401).json({error:'Unauthorized.'});
  try {
    const sql=db();
    if(req.method === 'GET') {
      const rows=await sql`SELECT id,kind,name,email,organization,inquiry_type,discipline,profile_url,message,status,created_at,updated_at FROM vogon_submissions ORDER BY created_at DESC LIMIT 1000`;
      return res.status(200).json({rows});
    }
    if(req.method === 'PATCH') {
      if(!csrfSafe(req)) return res.status(403).json({error:'Invalid request origin.'});
      const {id,status} = req.body || {};
      if(typeof id !== 'string' || !/^[0-9a-f-]{36}$/i.test(id) || !allowed.has(status)) return res.status(400).json({error:'Invalid update.'});
      const rows=await sql`UPDATE vogon_submissions SET status=${status}, updated_at=NOW() WHERE id=${id}::uuid RETURNING id,status`;
      return rows.length ? res.status(200).json({ok:true}) : res.status(404).json({error:'Not found.'});
    }
    return res.status(405).json({error:'Method not allowed.'});
  } catch(err) {console.error('[admin/records]',err);return res.status(503).json({error:'Database temporarily unavailable.'});}
}
