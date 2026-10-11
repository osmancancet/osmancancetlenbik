/**
 * Etkinlik Radarı — hackathon, datathon, game jam, CTF ve benzeri yarışmalar.
 *
 * Liste `src/data/etkinlikler.json` dosyasından okunur. Dosya her sabah
 * otomatik tarama tarafından güncellenir; elle düzenlemek de serbest.
 * Süresi geçen etkinlikler dosyadan silinmeden sayfada kendiliğinden gizlenir.
 *
 * Bu modül veri dosyasını içe aktarmaz; istemci bileşeni de buradan
 * okuduğu için liste tarayıcı paketine girmesin. Veriyi sayfa okur.
 */

export const EVENT_TYPES = [
  "Hackathon",
  "Datathon",
  "Game Jam",
  "CTF",
  "İdeathon",
  "Kodlama Yarışması",
  "YZ Yarışması",
  "Diğer",
] as const;

export const AUDIENCES = ["Öğrenci", "Mezun", "Akademisyen"] as const;

export type EventType = (typeof EVENT_TYPES)[number];
export type Audience = (typeof AUDIENCES)[number];

export type RadarEvent = {
  id: string;
  name: string;
  type: EventType | string;
  audience: string[];
  organizer?: string;
  location?: string;
  online?: boolean | null;
  prize?: string;
  url?: string;
  /** Son başvuru tarihi, YYYY-AA-GG. Bilinmiyorsa boş. */
  deadline?: string;
  /** Serbest metin, örn. "14-16 Kasım 2026". */
  eventDate?: string;
  summary?: string;
  /** Listeye ilk girdiği gün, YYYY-AA-GG. */
  firstSeen?: string;
};

export type RadarFile = { updatedAt: string | null; events: RadarEvent[] };

/** Son başvuru tarihi olmayan bir etkinlik listede en fazla bu kadar gün kalır. */
const UNDATED_TTL_DAYS = 90;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** İstanbul saatine göre bugünün tarihi, YYYY-AA-GG. */
export function istanbulToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function dayNumber(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d) / 86_400_000;
}

/** Son başvuruya kalan gün; tarih yoksa null, geçtiyse negatif. */
export function daysUntil(iso: string | undefined, today: string): number | null {
  if (!iso || !ISO_DATE.test(iso)) return null;
  return dayNumber(iso) - dayNumber(today);
}

export function formatDate(iso: string | undefined): string {
  if (!iso || !ISO_DATE.test(iso)) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export type ListedEvent = RadarEvent & { daysLeft: number | null; isNew: boolean };

/**
 * Başvurusu açık etkinlikler, son başvuru tarihi en yakın olan önce.
 * Tarihi bilinmeyenler sona, kendi içinde en yeni eklenen önce.
 */
export function openEvents(
  events: RadarEvent[],
  now = new Date()
): ListedEvent[] {
  const today = istanbulToday(now);
  return events
    .map((e) => {
      const daysLeft = daysUntil(e.deadline, today);
      const age = daysUntil(e.firstSeen, today);
      return {
        ...e,
        daysLeft,
        isNew: age !== null && age >= -7,
      };
    })
    .filter((e) => {
      if (e.daysLeft !== null) return e.daysLeft >= 0;
      const age = daysUntil(e.firstSeen, today);
      return age === null || age >= -UNDATED_TTL_DAYS;
    })
    .sort((a, b) => {
      const ka = a.daysLeft ?? Number.POSITIVE_INFINITY;
      const kb = b.daysLeft ?? Number.POSITIVE_INFINITY;
      if (ka !== kb) return ka - kb;
      return (b.firstSeen ?? "").localeCompare(a.firstSeen ?? "");
    });
}
