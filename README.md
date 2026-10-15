# VOGON — vogon.in

Official website for VOGON: defence technology, aerospace and autonomous systems.

## Stack
React 19 · Vite 7 · Tailwind CSS v4 · GSAP + ScrollTrigger · React Router (hash routing) · Vercel serverless function for forms.

## Develop
```bash
npm install
npm run dev
npm run build   # outputs dist/index.html (single file) + dist/images
```

## Structure
- `src/content/site.ts`: all copy, technologies, capabilities, research and careers data. Ready to swap for a CMS.
  Values left as `null` or `[]` (contact email, socials, team, milestones, roles) stay hidden until real, verified data is added.
- `src/lib/motion.tsx`: GSAP setup, `ReducedMotionProvider`, media-query hooks.
- `src/components/motion.tsx`: `MaskedTextReveal`, `Reveal`, `RevealImage`, `ParallaxMedia`, `DrawRule`, `Magnetic`, `ScrollProgress`.
- `src/sections/*`: homepage sections (hero, pinned story, capability index, …).
- `src/pages/*`: all routes.
- `api/contact.js`: form delivery (server-side validation, honeypot, timing check, rate limit, Resend email).

## Environment
Copy `.env.example` and set the following in Vercel:
`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (a verified sender on vogon.in), and optionally `ALLOWED_ORIGIN`.
If these are missing, the forms show an honest "service not configured" error. They never show a fake success message.

## Deploy (Vercel)
1. Import the repo. Framework preset: Vite. Output directory: `dist`.
2. Add the environment variables above.
3. Add the domain `vogon.in` under Project → Domains.

## Before launch
- Replace the sample research projects (`placeholder: true`) with verified content.
- Have counsel review `/privacy` and `/terms`.
- Imagery in `public/images` is AI-generated concept artwork and is labelled as conceptual on the site.
