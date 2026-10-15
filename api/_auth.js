import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const NAME = 'vogon_admin';
const maxAge = 60 * 60 * 12;
const secret = () => process.env.ADMIN_SESSION_SECRET;

function signature(payload) { return createHmac('sha256', secret()).update(payload).digest('base64url'); }
function eq(a, b) { const x = Buffer.from(a || ''); const y = Buffer.from(b || ''); return x.length === y.length && timingSafeEqual(x, y); }
export function configured() { return Boolean(process.env.ADMIN_PASSWORD && secret() && process.env.DATABASE_URL); }
export function checkPassword(value, email) {
  const expectedEmail = process.env.ADMIN_EMAIL || 's@charvikon.com';
  return (
    typeof email === 'string' &&
    email.trim().toLowerCase() === expectedEmail.toLowerCase() &&
    eq(value, process.env.ADMIN_PASSWORD)
  );
}
export function csrfSafe(req) {
  const target = process.env.ALLOWED_ORIGIN || 'https://vogon.in';
  const origin = req.headers.origin;
  if (!origin) return false;
  try { return new URL(origin).host === new URL(target).host || (process.env.VERCEL_ENV !== 'production' && new URL(origin).hostname === 'localhost'); }
  catch { return false; }
}
export function createSession(res) {
  const payload = `${Date.now() + maxAge * 1000}.${randomBytes(12).toString('hex')}`;
  const secure = process.env.VERCEL_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${NAME}=${payload}.${signature(payload)}; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=${maxAge}${secure}`);
}
export function clearSession(res) { res.setHeader('Set-Cookie', `${NAME}=; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=0; Secure`); }
export function authenticated(req) {
  if (!secret()) return false;
  const cookies = String(req.headers.cookie || '').split(';').map(x => x.trim());
  const raw = cookies.find(x => x.startsWith(`${NAME}=`))?.slice(NAME.length + 1);
  if (!raw) return false;
  const point = raw.lastIndexOf('.');
  if (point === -1) return false;
  const payload = raw.slice(0, point);
  const provided = raw.slice(point + 1);
  const expiry = Number(payload.split('.')[0]);
  return Number.isFinite(expiry) && expiry > Date.now() && eq(provided, signature(payload));
}
export function noCache(res) { res.setHeader('Cache-Control', 'no-store'); res.setHeader('X-Content-Type-Options', 'nosniff'); }
