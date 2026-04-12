# osmancancetlenbik.com

Osman Can Çetlenbik'in kişisel web sitesi — akademisyen portföyü, blog, ders sayfaları, konferans sunumları ve admin paneli.

Manisa Celal Bayar Üniversitesi · Teknik Bilimler MYO · Büyük Veri Analistliği Programı

## Stack

- **Next.js 16** (App Router · Turbopack)
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **Framer Motion** + custom Canvas animations (Matrix rain)
- **Prisma + Postgres** (Neon hosted)
- **react-pdf/renderer** — server-side CV PDF generation
- **shiki + rehype-pretty-code** — markdown syntax highlight
- **cmdk + fuse.js** — `⌘K` command palette
- **resend** — contact form mail
- **jose** — JWT cookie auth (admin)

## Özellikler

- Siber güvenlik temalı koyu tema (matrix rain + neon green accent)
- Çok sayfalı public yapı: Hakkımda, Dersler + haftalık plan + sunumlar, Yazılarım (blog), Yayınlar, Konferanslarım + sunumlar, Basında, Projeler, CV, Duyurular, İletişim
- Tam admin paneli (login + CRUD: yazılar, dersler, haftalık planlar, konferanslar, basın, duyurular)
- İki modlu sunum sistemi:
  - Markdown SlideDeck (`---` ile bölünür)
  - React component registry (`src/presentations/<slug>`) — tam interaktif sunumlar
- SEO: dynamic sitemap, robots, OG image (`next/og`), JSON-LD (Person/Article/Course/Event)
- Markdown blog yazıları — kod highlight, kopyala butonu, ToC, reading time
- Dynamic CV PDF (Türkçe karakter destekli)
- Site içi arama (`⌘K` / `Ctrl+K`)

## Geliştirme

```bash
git clone https://github.com/osmancancet/osmancancetlenbik.git
cd osmancancetlenbik
npm install
cp .env.example .env
# .env'i düzenle (DATABASE_URL, ADMIN_PASSWORD, JWT_SECRET)
npx prisma db push
npm run dev
```

Site `http://localhost:3000` üzerinde açılır. Admin paneli: `/admin/login`

## Deploy

Vercel'e otomatik deploy. Environment variables (Vercel dashboard'unda set edilir):

- `DATABASE_URL` — Postgres connection string (Neon / Supabase / Vercel Postgres)
- `JWT_SECRET` — uzun rastgele string (32+ karakter)
- `ADMIN_PASSWORD` — admin paneli şifresi
- `NEXT_PUBLIC_SITE_URL` — `https://www.osmancancetlenbik.com`
- `RESEND_API_KEY` — contact form için (https://resend.com)
- `CONTACT_TO_EMAIL` — iletişim formu mail hedefi

## Lisans

Tüm hakları saklıdır © Osman Can Çetlenbik
