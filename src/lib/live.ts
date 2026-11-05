import { randomInt } from "node:crypto";

/**
 * Canlı ders — ortak tipler ve saf yardımcılar.
 *
 * Tasarım kararı: öğrenci tarafında hesap yok. Katılımcı tarayıcısında
 * rastgele bir anahtar tutar; oturum boyunca kimliği odur. Böylece derse
 * girmek için tek gereken tahtadaki kod oluyor.
 */

export const ACTIVITY_TYPES = [
  "POLL",
  "QUIZ",
  "WORDCLOUD",
  "SCALE",
  "QA",
] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export const ACTIVITY_LABELS: Record<ActivityType, string> = {
  POLL: "Oylama",
  QUIZ: "Yarışma",
  WORDCLOUD: "Kelime bulutu",
  SCALE: "Ölçek",
  QA: "Soru–cevap",
};

export const ACTIVITY_HINTS: Record<ActivityType, string> = {
  POLL: "Şıklardan birini seçtirir, sonucu çubuk grafikte gösterir. Doğru cevabı yoktur.",
  QUIZ: "Doğru cevabı olan soru. Hızlı doğru yanıt daha çok puan alır, sıralama tabloya işlenir.",
  WORDCLOUD: "Herkes kısa bir kelime yazar, tekrar edenler büyür.",
  SCALE: "1–5 arası katılım ölçeği. Ortalama ve dağılım gösterilir.",
  QA: "Serbest soru toplama. Öğrenciler yazar, siz tahtada okursunuz.",
};

/** Etkinlik durumları. Eğitmen konsolu bunları sırayla ilerletir. */
export type ActivityState = "IDLE" | "OPEN" | "LOCKED" | "REVEALED";
export type SessionStatus = "LOBBY" | "LIVE" | "ENDED";

export type ActivityOption = {
  id: string;
  label: string;
  /** Yalnız QUIZ için anlamlı. Öğrenciye sonuç açılana kadar gönderilmez. */
  correct?: boolean;
};

/**
 * Karışması kolay karakterler (0/O, 1/I/L) dışarıda bırakıldı: kod tahtadan
 * okunup telefona elle giriliyor, bir harf yanlış okunursa öğrenci giremiyor.
 */
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function generateCode(length = 6): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
  }
  return out;
}

export function normalizeCode(input: string): string {
  return input.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

/** SCALE etkinliklerinin sabit şıkları. */
export const SCALE_OPTIONS: ActivityOption[] = [
  { id: "1", label: "1 · Hiç" },
  { id: "2", label: "2" },
  { id: "3", label: "3 · Kısmen" },
  { id: "4", label: "4" },
  { id: "5", label: "5 · Tamamen" },
];

/**
 * Yarışma puanı — Kahoot'taki gibi: doğru cevap 500–1000 arası puan alır.
 * Soru açılır açılmaz verilen doğru cevap 1000'e yakın, son saniyede
 * verilen 500 alır: puan = 1000 × (1 − (geçen süre / süre) / 2).
 * Yanlış ya da boş cevap 0. Süresiz soruda doğru cevap 1000.
 */
export function scoreFor(args: {
  correct: boolean;
  elapsedMs: number | null;
  seconds: number;
}): number {
  if (!args.correct) return 0;
  if (!args.seconds || args.elapsedMs == null) return 1000;
  const ratio = Math.min(1, Math.max(0, args.elapsedMs / (args.seconds * 1000)));
  return Math.round(1000 * (1 - ratio / 2));
}

/** Kelime bulutu için yanıtları normalleştirip sayar. */
export function tallyWords(
  texts: string[]
): Array<{ word: string; count: number }> {
  const counts = new Map<string, { display: string; count: number }>();
  for (const raw of texts) {
    const word = raw.trim().replace(/\s+/g, " ").slice(0, 24);
    if (!word) continue;
    const key = word.toLocaleLowerCase("tr");
    const hit = counts.get(key);
    if (hit) hit.count += 1;
    else counts.set(key, { display: word, count: 1 });
  }
  return [...counts.values()]
    .map((v) => ({ word: v.display, count: v.count }))
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word, "tr"));
}

export function isActivityType(v: unknown): v is ActivityType {
  return (
    typeof v === "string" && (ACTIVITY_TYPES as readonly string[]).includes(v)
  );
}
