/** /harita — bildirim formundaki yöntemler. Kimlikler DB'de saklanır, değiştirme. */
export const SCAM_KINDS = [
  { id: "savci-polis", label: "Sahte savcı / polis araması" },
  { id: "banka", label: "Sahte banka araması / SMS" },
  { id: "kargo", label: "Kargo / gümrük SMS'i" },
  { id: "ilan-kapora", label: "İkinci el ilan / kapora" },
  { id: "yatirim", label: "Yatırım / kripto vaadi" },
  { id: "numara-degisti", label: "\"Numaram değişti\" mesajı" },
  { id: "hesap-ele-gecirme", label: "Sosyal medya hesabı çalma" },
  { id: "sahte-site", label: "Sahte site / kampanya" },
  { id: "borc-ceza", label: "Sahte borç / ceza SMS'i (HGS, icra)" },
  { id: "diger", label: "Diğer" },
] as const;

export type ScamKindId = (typeof SCAM_KINDS)[number]["id"];
export const SCAM_KIND_IDS = SCAM_KINDS.map((k) => k.id) as [ScamKindId, ...ScamKindId[]];
