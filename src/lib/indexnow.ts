/**
 * IndexNow: değişen adresleri Bing, Yandex, Seznam, Naver gibi motorlara
 * anında bildirir (bir motora gönderilen liste hepsiyle paylaşılır). Bing
 * dizini ChatGPT Search ve Copilot yanıtlarının da kaynağıdır.
 *
 * Anahtar gizli değildir: motorlar `/<KEY>.txt` dosyasını okuyarak adreslerin
 * gerçekten bu siteden gönderildiğini doğrular (public/ altında durur).
 */
export const INDEXNOW_KEY = "a2123ba619441202e12faa89c363434a";

type Entry = { url: string; lastModified?: string | Date };

/** Son `withinMs` içinde değişmiş, bu siteye ait adresler. */
export function recentlyChanged(
  entries: Entry[],
  siteUrl: string,
  now: number,
  withinMs: number
): string[] {
  const out = new Set<string>();
  for (const e of entries) {
    if (!e.url.startsWith(siteUrl) || !e.lastModified) continue;
    const t = new Date(e.lastModified).getTime();
    if (Number.isFinite(t) && t <= now && now - t <= withinMs) out.add(e.url);
  }
  return [...out];
}

/** En fazla 10.000 adres tek istekte gider; dönen HTTP kodu 200/202 ise kabul. */
export async function submitIndexNow(siteUrl: string, urls: string[]) {
  if (urls.length === 0) return { status: 0, count: 0 };
  const host = new URL(siteUrl).host;
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${siteUrl}/${INDEXNOW_KEY}.txt`,
      urlList: urls.slice(0, 10_000),
    }),
    signal: AbortSignal.timeout(15_000),
  });
  return { status: res.status, count: urls.length };
}
