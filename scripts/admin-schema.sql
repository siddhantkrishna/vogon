CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS vogon_submissions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 kind text NOT NULL CHECK (kind IN ('contact', 'careers')),
 name text NOT NULL,
 email text NOT NULL,
 organization text NOT NULL DEFAULT '',
 inquiry_type text NOT NULL DEFAULT '',
 discipline text NOT NULL DEFAULT '',
 profile_url text NOT NULL DEFAULT '',
 message text NOT NULL,
 status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','in_progress','responded','closed')),
 created_at timestamptz NOT NULL DEFAULT NOW(),
 updated_at timestamptz NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS vogon_submissions_created_at_idx ON vogon_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS vogon_submissions_status_idx ON vogon_submissions (status);
CREATE TABLE IF NOT EXISTS admin_login_attempts (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 ip text NOT NULL,
 attempted_at timestamptz NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS admin_login_attempts_ip_date_idx ON admin_login_attempts (ip, attempted_at DESC);
