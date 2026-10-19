import { head, del } from '@vercel/blob';
import { db } from '../_db.js';
import { authenticated, csrfSafe, noCache } from '../_auth.js';
import { ACCEPTED, MAX_BYTES, cleanText, ensureDocs, validPath } from '../_documents.js';
const validId=id=>typeof id==='string' && /^[0-9a-f-]{36}$/i.test(id);
export default async function handler(req,res) {
  noCache(res);
  if(!authenticated(req)) return res.status(401).json({error:'Unauthorized.'});
  if(req.method!=='GET' && !csrfSafe(req)) return res.status(403).json({error:'Invalid request origin.'});
  try {
    const sql=db(); await ensureDocs(sql);
    if(req.method==='GET') {
      const rows=await sql`SELECT id,title,description,category,filename,url,download_url,mime_type,size_bytes::text AS size_bytes,created_at FROM vogon_documents ORDER BY created_at DESC LIMIT 400`;
      return res.status(200).json({rows});
    }
    if(req.method==='POST') {
      const title=cleanText(req.body?.title,120),description=cleanText(req.body?.description,500),category=cleanText(req.body?.category,48).toUpperCase()||'GENERAL';
      const url=req.body?.url;
      if(!title || typeof url!=='string' || !url.startsWith('https://') || category.length>48) return res.status(400).json({error:'Invalid document metadata.'});
      // Confirm that this blob exists in this project's connected storage; never trust a URL supplied by the browser.
      const blob=await head(url);
      if(!validPath(blob.pathname) || !blob.url || blob.size>MAX_BYTES) return res.status(400).json({error:'Invalid storage object.'});
      const ext=blob.pathname.split('.').pop().toLowerCase();
      if(!ACCEPTED.has(ext)) return res.status(400).json({error:'Unsupported document type.'});
      const filename=blob.pathname.split('/').pop();
      const mime=blob.contentType || 'application/octet-stream';
      const download=blob.downloadUrl || blob.url;
      const rows=await sql`INSERT INTO vogon_documents (title,description,category,filename,url,download_url,mime_type,size_bytes)
         VALUES (${title},${description},${category},${filename},${blob.url},${download},${mime},${blob.size||0})
         ON CONFLICT (url) DO UPDATE SET title=EXCLUDED.title, description=EXCLUDED.description,category=EXCLUDED.category
         RETURNING id`;
      return res.status(201).json({ok:true,id:rows[0].id});
    }
    if(req.method==='PATCH') {
      const id=req.body?.id;
      const title=cleanText(req.body?.title,120),description=cleanText(req.body?.description,500),category=cleanText(req.body?.category,48).toUpperCase()||'GENERAL';
      if(!validId(id) || !title) return res.status(400).json({error:'Invalid details.'});
      const rows=await sql`UPDATE vogon_documents SET title=${title},description=${description},category=${category} WHERE id=${id}::uuid RETURNING id`;
      return rows.length?res.status(200).json({ok:true}):res.status(404).json({error:'Not found.'});
    }
    if(req.method==='DELETE') {
      const id=req.body?.id;
      if(!validId(id)) return res.status(400).json({error:'Invalid ID.'});
      const rows=await sql`SELECT url FROM vogon_documents WHERE id=${id}::uuid LIMIT 1`;
      if(!rows.length) return res.status(404).json({error:'Not found.'});
      await del(rows[0].url);
      await sql`DELETE FROM vogon_documents WHERE id=${id}::uuid`;
      return res.status(200).json({ok:true});
    }
    return res.status(405).json({error:'Method not allowed.'});
  } catch(err) { console.error('[admin/documents]',err); return res.status(503).json({error:'Document operation failed. Verify Neon and Blob configuration.'}); }
}
