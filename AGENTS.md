<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — portofolio2

Portofolio pribadi Natanael Rudy Hadinata. Bahasa publik: **formal English**.

## Stack
- Next.js 15 + Tailwind CSS, deploy Vercel (portofolio2-steel.vercel.app)
- GitHub: naelrudd/portofolio

## Aturan desain (WAJIB)
- Palet: #0A3323 / #839958 / #F7F4D5 / #D3968C / #105666 — jangan diubah tanpa instruksi
- Kualitas visual = prioritas; public-facing content wajib formal English
- Tools existing: Markdown, Calculator, Color Picker, Text Counter, Password Generator

## Aturan file
- `CV` files gitignored — JANGAN commit
- Contact form: POST `/api/contact` (Vercel function, Gmail SMTP via env `GMAIL_USER` + `GMAIL_APP_PASSWORD`). Fallback Gmail compose + mailto kalau gagal. FormSubmit sudah mati (522), jangan dipakai lagi

## Verifikasi
- `npm run build` harus pass sebelum lapor selesai

## Domain and canonical origin
`src/lib/site.ts` is the only place the origin is written. Set `NEXT_PUBLIC_SITE_URL`
(Vercel env + `.env.local`) to switch domains — canonical tags, OG URLs, JSON-LD,
`sitemap.xml` and `robots.txt` are generated from it at build time (`src/app/sitemap.ts`,
`src/app/robots.ts`). Never hardcode the origin in components again.
