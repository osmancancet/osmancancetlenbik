/**
 * Katılımcı kimliği tarayıcıda durur — derse girmek için hesap açtırmıyoruz.
 * Kod başına ayrı anahtar: aynı öğrenci iki farklı derse ayrı katılımcı
 * olarak girsin, biri diğerinin puanını devralmasın.
 */
const keyFor = (code: string) => `occ_live_key_${code}`;
const NICK = "occ_live_nick";

function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    // Gizli sekmede veya çerezler kapalıyken localStorage erişimi patlar.
    return fallback;
  }
}

/**
 * localStorage kapalıysa (gizli sekme, uygulama içi tarayıcı, kısıtlı okul
 * tableti) anahtar kaydedilemiyor, öğrenci katıldıktan sonra "henüz
 * katılmadınız" ekranına düşüyordu. Sırayla deneniyor: localStorage →
 * sessionStorage → çerez → sayfa belleği.
 */
const memory = new Map<string, string>();

function readCookie(name: string): string | null {
  const hit = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${name}=`));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : null;
}

export const readKey = (code: string): string | null => {
  const k = keyFor(code);
  return (
    safe(() => localStorage.getItem(k), null) ??
    safe(() => sessionStorage.getItem(k), null) ??
    safe(() => readCookie(k), null) ??
    memory.get(k) ??
    null
  );
};

export const writeKey = (code: string, key: string) => {
  const k = keyFor(code);
  memory.set(k, key);
  safe(() => localStorage.setItem(k, key), undefined);
  safe(() => sessionStorage.setItem(k, key), undefined);
  safe(() => {
    document.cookie = `${k}=${encodeURIComponent(key)}; path=/canli; max-age=43200; samesite=lax`;
  }, undefined);
};

export const readNickname = () => safe(() => localStorage.getItem(NICK), null);

export const writeNickname = (nick: string) =>
  safe(() => localStorage.setItem(NICK, nick), undefined);
