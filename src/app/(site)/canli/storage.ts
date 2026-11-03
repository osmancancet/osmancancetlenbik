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

export const readKey = (code: string) =>
  safe(() => localStorage.getItem(keyFor(code)), null);

export const writeKey = (code: string, key: string) =>
  safe(() => localStorage.setItem(keyFor(code), key), undefined);

export const readNickname = () => safe(() => localStorage.getItem(NICK), null);

export const writeNickname = (nick: string) =>
  safe(() => localStorage.setItem(NICK, nick), undefined);
