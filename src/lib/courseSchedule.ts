/**
 * Ders programı metnini ("Çarşamba · 09:55–12:30 · Derslik 7") takvime
 * yerleştirilebilir parçalara ayırır. Saf fonksiyonlar; tarayıcıda da çalışır.
 */

export const DAY_NAMES = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
] as const;

export type ParsedSchedule = {
  /** 1 = Pazartesi … 7 = Pazar */
  day: number;
  dayName: string;
  start: string;
  end: string;
  /** Gece yarısından itibaren dakika */
  startMin: number;
  endMin: number;
  room: string | null;
};

const fold = (s: string) =>
  s
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .trim();

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(/[:.]/).map(Number);
  return h * 60 + m;
};

const pad = (hhmm: string) => {
  const [h, m] = hhmm.split(/[:.]/);
  return `${h.padStart(2, "0")}:${m}`;
};

export function parseSchedule(text: string | null | undefined): ParsedSchedule | null {
  if (!text) return null;
  const parts = text.split("·").map((p) => p.trim()).filter(Boolean);
  if (parts.length < 2) return null;

  const dayIdx = DAY_NAMES.findIndex((d) => fold(d) === fold(parts[0]));
  if (dayIdx < 0) return null;

  const m = parts[1].match(/^(\d{1,2}[:.]\d{2})\s*[–—-]\s*(\d{1,2}[:.]\d{2})$/);
  if (!m) return null;
  const startMin = toMin(m[1]);
  const endMin = toMin(m[2]);
  if (!(endMin > startMin)) return null;

  return {
    day: dayIdx + 1,
    dayName: DAY_NAMES[dayIdx],
    start: pad(m[1]),
    end: pad(m[2]),
    startMin,
    endMin,
    room: parts.slice(2).join(" · ") || null,
  };
}

/**
 * Dönem sıralama anahtarı: "2026-2027 Güz" < "2026-2027 Bahar" < "2027-2028 Güz".
 * Tanınmayan biçim en sona düşer.
 */
export function semesterRank(semester: string | null | undefined): number {
  const m = semester?.match(/(\d{4})\s*[-–]\s*\d{4}\s+(\S+)/);
  if (!m) return -1;
  const term = fold(m[2]);
  const offset = term.startsWith("guz") ? 0 : term.startsWith("bahar") ? 1 : 2;
  return Number(m[1]) * 3 + offset;
}

/** Türkiye saatine göre bugünün gün numarası (1 = Pazartesi). */
export function todayIstanbul(now: Date = new Date()): number {
  const name = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "Europe/Istanbul",
  }).format(now);
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(name) + 1;
}
