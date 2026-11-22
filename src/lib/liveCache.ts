/**
 * Canlı ders için kısa ömürlü bellek önbelleği.
 *
 * Yarışma sürerken sınıftaki herkes aynı oturumu saniyede bir soruyor. Oturum
 * satırı, soru listesi ve açılmış sonucun dağılımı herkes için aynı; bunları
 * her öğrenci için veritabanından yeniden okumak 35 kişilik sınıfta saniyede
 * yüzlerce sorgu demekti ve yanıtlar gecikiyordu. Aynı anahtar için süren bir
 * sorgu varsa ona katılınıyor, süresi dolmamış sonuç yeniden kullanılıyor.
 *
 * Önbellek sunucu örneği başına; birkaç yüz milisaniyelik bayatlık canlı
 * akışta fark edilmiyor (öğrenci ekranı zaten saniyede bir yenileniyor).
 */

type Entry = { at: number; value: Promise<unknown> };

const store = new Map<string, Entry>();
const MAX_KEYS = 500;

export function cached<T>(
  key: string,
  ttlMs: number,
  load: () => Promise<T>
): Promise<T> {
  const now = Date.now();
  const hit = store.get(key);
  if (hit && now - hit.at < ttlMs) return hit.value as Promise<T>;

  if (store.size > MAX_KEYS) {
    for (const [k, v] of store) {
      if (now - v.at > 60_000) store.delete(k);
    }
  }

  const value = load();
  store.set(key, { at: now, value });
  // Hata önbellekte kalmasın: sıradaki istek yeniden denesin.
  value.catch(() => {
    if (store.get(key)?.value === value) store.delete(key);
  });
  return value;
}

/** Durum değiştiren işlemlerden sonra bayat kopyayı düşürür. */
export function invalidate(prefix: string) {
  for (const k of store.keys()) {
    if (k.startsWith(prefix)) store.delete(k);
  }
}
