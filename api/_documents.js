export const ACCEPTED = new Set([
  'pdf','doc','docx','xls','xlsx','ppt','pptx','txt','md','csv','rtf',
  'odt','ods','odp','jpg','jpeg','png','webp','gif','mp4','webm','mp3','wav','zip'
]);
export const MAX_BYTES = 50 * 1024 * 1024;
export const CONTENT_TYPES = [
  'application/pdf', 'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain', 'text/markdown', 'text/csv', 'application/rtf',
  'application/vnd.oasis.opendocument.text',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.oasis.opendocument.presentation',
  'image/jpeg', 'image/png', 'image/webp','image/gif',
  'video/mp4','video/webm','audio/mpeg','audio/wav',
  'application/zip','application/x-zip-compressed',
  'application/octet-stream'
];
export function validPath(path) {
  if(typeof path !== 'string' || !/^vogon-documents\/[A-Za-z0-9][A-Za-z0-9._-]{0,119}$/.test(path)) return false;
  return ACCEPTED.has(path.split('.').pop().toLowerCase());
}
export function cleanText(value, max=140) {
  return typeof value === 'string' ? value.trim().slice(0,max) : '';
}
let ready=false;
export async function ensureDocs(sql) {
  if(ready) return;
  await sql`CREATE TABLE IF NOT EXISTS vogon_documents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text NOT NULL DEFAULT '',
    category text NOT NULL DEFAULT 'GENERAL',
    filename text NOT NULL,
    url text NOT NULL UNIQUE,
    download_url text NOT NULL,
    mime_type text NOT NULL,
    size_bytes bigint NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT NOW()
  )`;
  ready=true;
}
