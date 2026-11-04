/** /harita — bildirim formundaki yöntemler. Kimlikler DB'de saklanır, değiştirme. */
export const SCAM_KINDS = [
  { id: "savci-polis", label: "Sahte savcı / polis araması", short: "Sahte savcı / polis" },
  { id: "banka", label: "Sahte banka araması / SMS", short: "Banka araması / SMS" },
  { id: "kargo", label: "Kargo / gümrük SMS'i", short: "Kargo / gümrük SMS'i" },
  { id: "ilan-kapora", label: "İkinci el ilan / kapora", short: "İlan / kapora" },
  { id: "yatirim", label: "Yatırım / kripto vaadi", short: "Yatırım / kripto" },
  { id: "numara-degisti", label: "\"Numaram değişti\" mesajı", short: "\"Numaram değişti\"" },
  { id: "hesap-ele-gecirme", label: "Sosyal medya hesabı çalma", short: "Hesap çalma" },
  { id: "sahte-site", label: "Sahte site / kampanya", short: "Sahte site / kampanya" },
  { id: "borc-ceza", label: "Sahte borç / ceza SMS'i (HGS, icra)", short: "Sahte borç / ceza SMS'i" },
  { id: "diger", label: "Diğer", short: "Diğer" },
] as const;

export type ScamKindId = (typeof SCAM_KINDS)[number]["id"];
export const SCAM_KIND_IDS = SCAM_KINDS.map((k) => k.id) as [ScamKindId, ...ScamKindId[]];
