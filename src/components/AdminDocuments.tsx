import { useEffect, useState, type FormEvent } from 'react';
import { upload } from '@vercel/blob/client';

type Doc = {id:string;title:string;description:string;category:string;filename:string;url:string;mime_type:string;size_bytes:string;created_at:string};
const safeTypes = new Set('pdf doc docx xls xlsx ppt pptx txt md csv rtf odt ods odp jpg jpeg png webp gif mp4 webm mp3 wav zip'.split(' '));
const MAX=50*1024*1024;

export default function AdminDocuments(){
  const [rows,setRows]=useState<Doc[]>([]);
  const [file,setFile]=useState<File|null>(null);
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [category,setCategory]=useState('RESEARCH');
  const [progress,setProgress]=useState<number|null>(null);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState('');
  const [notice,setNotice]=useState('');
  const field='w-full border border-white/25 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white';
  const load=async()=>{const r=await fetch('/api/admin/documents',{credentials:'same-origin',cache:'no-store'});const d=await r.json();if(!r.ok)throw Error(d.error||'Could not load documents');setRows(d.rows||[])};
  useEffect(()=>{void load().catch(e=>setError(String(e.message||e)))},[]);
  const publish=async(event:FormEvent)=>{
    event.preventDefault();setError('');setNotice('');
    if(!file)return setError('Select a file.');
    const ext=file.name.split('.').pop()?.toLowerCase()||'';
    if(!safeTypes.has(ext))return setError('This format is not accepted. Use a standard document, image, media or ZIP file.');
    if(file.size>MAX)return setError('Maximum file size is 50 MB.');
    if(!title.trim())return setError('Document title is required.');
    setSaving(true);setProgress(0);
    try {
      const filename=file.name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g,'-').replace(/^-+/,'').slice(-105);
      const blob=await upload('vogon-documents/'+filename,file,{
        access:'public',handleUploadUrl:'/api/admin/document-upload',
        onUploadProgress:e=>setProgress(Math.round(e.percentage))
      });
      const response=await fetch('/api/admin/documents',{
        method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({url:blob.url,title:title.trim(),description:description.trim(),category:category.trim()})
      });
      const data=await response.json();
      if(!response.ok)throw Error(data.error||'Upload completed but document could not be published.');
      setNotice('Document published. It is now visible on the public documentation page.');
      setFile(null);setTitle('');setDescription('');setProgress(null);
      const input=document.getElementById('vogon-doc-file') as HTMLInputElement|null;
      if(input)input.value='';
      await load();
    }catch(e){setError(e instanceof Error?e.message:'Upload failed')}finally{setSaving(false)}
  };
  const remove=async(doc:Doc)=>{
    if(!window.confirm('Permanently delete "'+doc.title+'" from VOGON documentation?'))return;
    setError('');
    try{
      const r=await fetch('/api/admin/documents',{method:'DELETE',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:doc.id})});
      const d=await r.json();if(!r.ok)throw Error(d.error||'Delete failed');await load();
    }catch(e){setError(e instanceof Error?e.message:'Delete failed')}
  };
  return <section id="vogon-admin-documents" className="mt-20 border-t border-white/20 pt-12" aria-labelledby="doc-admin-title">
    <p className="font-mono text-[10px] tracking-[.16em] text-white/50">CONTENT MANAGEMENT / DOCUMENTATION</p>
    <div className="mb-9 mt-3 flex flex-wrap items-end justify-between gap-4"><h2 id="doc-admin-title" className="text-4xl font-medium tracking-tight md:text-6xl">Documentation.</h2><a className="border-b border-white/50 pb-2 text-xs uppercase tracking-widest" href="/doccumentation" target="_blank" rel="noreferrer">View public index ↗</a></div>
    <form onSubmit={publish} className="grid gap-5 border border-white/20 p-5 md:grid-cols-2 md:p-8">
      <label className="space-y-2 text-xs uppercase tracking-wider">Document title<input required maxLength={120} className={field} value={title} onChange={e=>setTitle(e.target.value)} placeholder="VORTEX — Overview"/></label>
      <label className="space-y-2 text-xs uppercase tracking-wider">Category<input maxLength={48} className={field} value={category} onChange={e=>setCategory(e.target.value)} placeholder="RESEARCH"/></label>
      <label className="space-y-2 text-xs uppercase tracking-wider md:col-span-2">Summary<textarea rows={3} maxLength={500} className={field} value={description} onChange={e=>setDescription(e.target.value)} placeholder="Public summary of this document"/></label>
      <label className="space-y-2 text-xs uppercase tracking-wider md:col-span-2">File (up to 50 MB)
        <input id="vogon-doc-file" type="file" required className={field} accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.md,.csv,.rtf,.odt,.ods,.odp,.jpg,.jpeg,.png,.webp,.gif,.mp4,.webm,.mp3,.wav,.zip" onChange={e=>{const f=e.target.files?.[0]||null;setFile(f);if(f&&!title)setTitle(f.name.replace(/\.[^.]+$/,''))}} />
      </label>
      <div className="flex flex-wrap items-center gap-5 md:col-span-2"><button type="submit" disabled={saving} className="border border-white px-6 py-3 text-xs uppercase tracking-widest disabled:opacity-40">{saving?'Uploading…':'Publish document ↗'}</button>{progress!==null&&<span className="font-mono text-xs text-white/70">UPLOAD {progress}%</span>}</div>
    </form>
    {error&&<p role="alert" className="mt-4 border border-red-500/40 p-4 text-sm text-red-300">{error}</p>}
    {notice&&<p role="status" className="mt-4 border border-white/20 p-4 text-sm text-white">{notice}</p>}
    <div className="mt-12 border-t border-white/20">{rows.length===0?<p className="py-10 text-white/50">No published documents yet.</p>:rows.map((doc,index)=><div key={doc.id} className="flex flex-wrap items-center gap-4 border-b border-white/15 py-5"><span className="w-10 font-mono text-xs text-white/50">{String(index+1).padStart(2,'0')}</span><div className="min-w-[180px] flex-1"><p className="text-lg font-medium">{doc.title}</p><p className="mt-1 text-xs text-white/50">{doc.category} / {doc.filename}</p></div><a className="text-xs uppercase underline underline-offset-4" href={doc.url} target="_blank" rel="noreferrer">Open</a><button className="border border-red-400/35 px-3 py-2 text-xs text-red-300" onClick={()=>void remove(doc)}>Delete</button></div>)}</div>
  </section>;
}
