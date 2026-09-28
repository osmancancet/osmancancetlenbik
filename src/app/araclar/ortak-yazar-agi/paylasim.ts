import type { AgVerisi } from "@/lib/openalex";

export { linkedinPaylasUrl } from "../akademisyen-karti/paylasim";

/** Ağ paylaşımında ortak kullanılan bağlantılar ve gönderi metinleri. */

export function agGorselYolu(id: string, boyut: "dikey" | "og" = "dikey") {
  return `/api/ortak-yazar-agi?id=${encodeURIComponent(id)}${
    boyut === "og" ? "&boyut=og" : ""
  }`;
}

export function agPaylasimYolu(id: string) {
  return `/araclar/ortak-yazar-agi/${encodeURIComponent(id)}`;
}

/** Gönderide teşekkür edilen (etiketlenmesi önerilen) kişi sayısı. */
export const ETIKET_SAYISI = 5;

/**
 * Gönderi metninde bağlantı yok: LinkedIn dış bağlantılı gönderilerin
 * erişimini kısıyor, bağlantı ilk yoruma gidiyor (bkz. `ilkYorumMetni`).
 */
export function gonderiMetni(v: AgVerisi) {
  const sayi = (n: number) => n.toLocaleString("tr-TR");
  const enSik = v.ortakYazarlar[0];
  if (!enSik) {
    return [
      "Akademik iş birliği ağımı çıkardım: şimdilik yayınlarımın hepsi tek yazarlı.",
      "",
      "Ortak çalışmaya açığım; ilgi alanlarımız kesişiyorsa yazalım.",
      "",
      "Kendi ağınızı çıkarmak isterseniz bağlantı ilk yorumda.",
      "",
      "#akademi #araştırma #işbirliği #bilim",
    ].join("\n");
  }
  const yer = [
    `${sayi(v.kurumSayisi)} kurum`,
    v.ulkeSayisi > 1 ? `${sayi(v.ulkeSayisi)} ülke` : null,
  ]
    .filter(Boolean)
    .join(", ");
  const adlar = v.ortakYazarlar.slice(0, ETIKET_SAYISI).map((o) => o.ad);
  return [
    "Akademik iş birliği ağımı tek görselde çıkardım:",
    "",
    `• ${sayi(v.ortakYazarSayisi)} ortak yazar`,
    v.kurumSayisi > 0 ? `• ${yer}` : null,
    `• En sık birlikte yazdığım isim: ${enSik.ad} (${sayi(enSik.sayi)} ortak yayın)`,
    "",
    `Bilim tek başına yapılmıyor. Bu yolda birlikte yazdığım herkese teşekkürler: ${adlar.join(", ")}`,
    "",
    "Kendi ağınızı çıkarmak isterseniz bağlantı ilk yorumda.",
    "",
    "#akademi #araştırma #işbirliği #bilim",
  ]
    .filter((s): s is string => s !== null)
    .join("\n");
}

export function ilkYorumMetni(aracUrl: string) {
  return `Kendi ortak yazar ağınızı 30 saniyede çıkarın (ücretsiz, üyelik yok, OpenAlex verisi): ${aracUrl}`;
}
