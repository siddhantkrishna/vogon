import fs from 'node:fs';
import { neon } from '@neondatabase/serverless';
if(!process.env.DATABASE_URL) throw Error('DATABASE_URL missing. Add it to .env.local first.');
const sql=neon(process.env.DATABASE_URL);
const statements=fs.readFileSync('scripts/admin-schema.sql','utf8').split(';').map(s=>s.trim()).filter(Boolean);
for(const statement of statements) await sql.query(statement);
console.log('Neon schema ready: vogon_submissions, admin_login_attempts.');
