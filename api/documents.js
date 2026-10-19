import { db } from './_db.js';
import { ensureDocs } from './_documents.js';
export default async function handler(req,res) {
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Cache-Control','no-store');
  if(req.method !== 'GET') return res.status(405).json({error:'Method not allowed'});
  try {
    const sql=db(); await ensureDocs(sql);
    const rows=await sql`SELECT id,title,description,category,filename,url,download_url,mime_type,size_bytes::text AS size_bytes,created_at FROM vogon_documents ORDER BY created_at DESC LIMIT 400`;
    return res.status(200).json({rows});
  } catch(err) { console.error('[documents:list]',err); return res.status(503).json({error:'Documents temporarily unavailable.'}); }
}
