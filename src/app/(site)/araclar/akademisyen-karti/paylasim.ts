import type { YazarAdayi } from "@/lib/openalex";

/**
 * Kart paylaşımında ortak kullanılan bağlantılar ve gönderi metni.
 * Hem araç sayfası hem de /[id] paylaşım sayfası aynı metni üretsin diye
 * ayrı dosyada.
 */

export function kartGorselYolu(id: string, boyut: "dikey" | "og" = "dikey") {
  return `/api/akademisyen-karti?id=${encodeURIComponent(id)}${
    boyut === "og" ? "&boyut=og" : ""
  }`;
}

export function paylasimYolu(id: string) {
  return `/araclar/akademisyen-karti/${encodeURIComponent(id)}`;
}

export function linkedinPaylasUrl(mutlakUrl: string) {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    mutlakUrl
  )}`;
}

export function gonderiMetni(
  y: Pick<YazarAdayi, "yayin" | "atif" | "hIndeks">,
  mutlakUrl: string
) {
  const sayi = (n: number) => n.toLocaleString("tr-TR");
  return [
    "Akademik profilimin özeti tek kartta:",
    "",
    `• ${sayi(y.yayin)} yayın`,
    `• ${sayi(y.atif)} atıf`,
    `• h-indeks ${sayi(y.hIndeks)}`,
    "",
    "Kart OpenAlex verisinden otomatik üretiliyor; kendi kartınızı 30 saniyede oluşturabilirsiniz:",
    mutlakUrl,
    "",
    "#akademi #araştırma #yükseköğretim #bilim",
  ].join("\n");
}
