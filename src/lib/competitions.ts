/**
 * Yarışma takımı başvuruları — form seçenekleri ve ayarlar.
 * Public form ve admin paneli aynı listeleri buradan okur; bir seçenek
 * eklemek/çıkarmak için yalnız bu dosyayı düzenlemek yeterli.
 */

/** Başvuruların kapanacağı an. `null` → başvurular açık. */
export const APPLICATION_DEADLINE: Date | null = null;

/** Kişisel verilerin en geç silineceği tarih (aydınlatma metninde görünür). */
export const DATA_RETENTION_UNTIL = "30 Eylül 2027";

/** Aydınlatma metni değişirse sürümü artırın; her başvuru hangi sürümü onayladığını saklar. */
export const CONSENT_VERSION = "2026-10";

export const COMPETITIONS = [
  {
    id: "DATATHON",
    label: "Datathon",
    desc: "Gerçek veri setleriyle analiz ve modelleme",
  },
  {
    id: "GAMEJAM",
    label: "Game Jam",
    desc: "Kısa sürede fikirden oynanabilir oyuna",
  },
  {
    id: "TEKNOFEST",
    label: "TEKNOFEST",
    desc: "Teknoloji yarışmalarında takım olarak yer almak",
  },
  {
    id: "HACKATHON",
    label: "Hackathon",
    desc: "Problemi tanımla, çözümü geliştir, sun",
  },
] as const;

export const SKILLS = [
  { id: "FRONTEND", label: "Web / Frontend" },
  { id: "BACKEND", label: "Backend / API" },
  { id: "MOBILE", label: "Mobil uygulama" },
  { id: "DATA", label: "Veri analizi" },
  { id: "ML", label: "Makine öğrenmesi / Yapay zekâ" },
  { id: "GAME", label: "Oyun geliştirme (Unity, Godot…)" },
  { id: "DESIGN", label: "UI/UX ve grafik tasarım" },
  { id: "SECURITY", label: "Siber güvenlik" },
  { id: "HARDWARE", label: "Donanım / IoT / Robotik" },
  { id: "PRESENTATION", label: "Sunum, rapor ve fikir geliştirme" },
] as const;

export const CLASS_YEARS = [
  "Hazırlık",
  "1. sınıf",
  "2. sınıf",
  "3. sınıf",
  "4. sınıf",
  "Yüksek lisans / Doktora",
  "Mezun",
] as const;

export const TEAM_STATUSES = [
  { id: "LOOKING", label: "Takım arıyorum" },
  { id: "HAS_TEAM", label: "Hazır bir takımım var" },
  { id: "INDIVIDUAL", label: "Henüz karar vermedim" },
] as const;

export const APPLICATION_STATUSES = [
  { id: "NEW", label: "Yeni", tone: "accent" },
  { id: "CONTACTED", label: "Görüşüldü", tone: "info" },
  { id: "ACCEPTED", label: "Takıma alındı", tone: "ok" },
  { id: "WAITING", label: "Beklemede", tone: "muted" },
  { id: "REJECTED", label: "Uygun değil", tone: "bad" },
] as const;

export type CompetitionId = (typeof COMPETITIONS)[number]["id"];
export type SkillId = (typeof SKILLS)[number]["id"];
export type TeamStatusId = (typeof TEAM_STATUSES)[number]["id"];
export type ApplicationStatusId = (typeof APPLICATION_STATUSES)[number]["id"];

export const COMPETITION_IDS = COMPETITIONS.map((c) => c.id) as [
  CompetitionId,
  ...CompetitionId[],
];
export const SKILL_IDS = SKILLS.map((s) => s.id) as [SkillId, ...SkillId[]];
export const TEAM_STATUS_IDS = TEAM_STATUSES.map((t) => t.id) as [
  TeamStatusId,
  ...TeamStatusId[],
];
export const APPLICATION_STATUS_IDS = APPLICATION_STATUSES.map((s) => s.id) as [
  ApplicationStatusId,
  ...ApplicationStatusId[],
];

export function labelOf(
  list: ReadonlyArray<{ id: string; label: string }>,
  id: string
): string {
  return list.find((x) => x.id === id)?.label ?? id;
}

export function applicationsOpen(now = new Date()): boolean {
  return !APPLICATION_DEADLINE || now < APPLICATION_DEADLINE;
}
