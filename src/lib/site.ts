/**
 * Kanonik adres. Sıralama önemli:
 *  1. NEXT_PUBLIC_SITE_URL — üretimde açıkça ayarlanması gereken değer.
 *  2. Vercel'in ürettiği üretim alan adı — env unutulursa canonical'ın
 *     localhost'a düşmesini engelleyen emniyet kemeri.
 *  3. Yerel geliştirme.
 */
const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const siteUrl = (
  fromEnv ||
  fromVercel ||
  "http://localhost:3000"
).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
