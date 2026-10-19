import { handleUpload } from '@vercel/blob/client';
import { authenticated, csrfSafe, noCache } from '../_auth.js';
import { CONTENT_TYPES, MAX_BYTES, validPath } from '../_documents.js';
export default async function handler(req,res) {
  noCache(res);
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed.'});
  if(!process.env.BLOB_READ_WRITE_TOKEN) return res.status(503).json({error:'Connect a PUBLIC Vercel Blob store to this project first.'});
  if(req.body?.type === 'blob.generate-client-token' && (!authenticated(req) || !csrfSafe(req)))
    return res.status(403).json({error:'Admin authorization required.'});
  try {
    const result=await handleUpload({
      body:req.body,request:req,
      onBeforeGenerateToken:async(pathname)=>{
        if(!authenticated(req) || !csrfSafe(req)) throw new Error('Admin authorization required.');
        if(!validPath(pathname)) throw new Error('Unsupported file type or filename.');
        return {allowedContentTypes: CONTENT_TYPES,maximumSizeInBytes:MAX_BYTES,addRandomSuffix:true};
      },
      // The admin explicitly finalizes uploads after Vercel Blob confirms transfer.
      onUploadCompleted:async()=>{}
    });
    return res.status(200).json(result);
  } catch(err){ console.error('[documents:token]',err);return res.status(400).json({error:'Could not authorize upload.'}); }
}
