import { readFileSync, existsSync } from 'node:fs';
import { spawn } from 'node:child_process';

const envFile = '.env.local';

if (!existsSync(envFile)) {
  console.error('Missing .env.local');
  process.exit(1);
}

const vars = {};

for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
  const trimmed = line.trim();

  if (!trimmed || trimmed.startsWith('#')) continue;

  const index = trimmed.indexOf('=');
  if (index < 1) continue;

  const key = trimmed.slice(0, index).trim();
  let value = trimmed.slice(index + 1).trim();

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  vars[key] = value;
}

const required = [
  'DATABASE_URL',
  'ADMIN_PASSWORD',
  'ADMIN_SESSION_SECRET',
  'ADMIN_EMAIL'
];

const missing = required.filter(key => !vars[key]);

if (missing.length) {
  console.error('Missing environment variables:', missing.join(', '));
  process.exit(1);
}

console.log('VOGON admin environment loaded.');
console.log('Admin: http://localhost:3000/admin');

const child = spawn(
  'npx',
  ['vercel', 'dev'],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      ...vars
    }
  }
);

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal));
}

child.on('exit', code => {
  process.exit(code ?? 0);
});
