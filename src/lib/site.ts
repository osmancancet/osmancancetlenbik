/**
 * Kanonik adres. Sıralama önemli:
 *  1. NEXT_PUBLIC_SITE_URL — üretimde açıkça ayarlanması gereken değer.
 *  2. Vercel'in ürettiği üretim alan adı — env unutulursa canonical'ın
 *     localhost'a düşmesini engelleyen emniyet kemeri.
 *  3. Yerel geliştirme.
 *
 * Değer panoya yapıştırılırken araya kaçan boşluk/satır sonu temizleniyor:
 * `metadataBase` bunu kendi normalize ediyor ama sitemap ve robots.txt ham
 * dize birleştirmesi yaptığı için tek bir "\n" bile `<loc>` ve `Sitemap:`
 * satırlarını bozuyor.
 */
function normalize(url: string | undefined): string | undefined {
  if (!url) return undefined;
  const clean = url.trim().replace(/\/+$/, "");
  return clean || undefined;
}

const fromEnv = normalize(process.env.NEXT_PUBLIC_SITE_URL);
const fromVercel = normalize(
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.trim()}`
    : undefined
);

export const siteUrl = fromEnv || fromVercel || "http://localhost:3000";

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
