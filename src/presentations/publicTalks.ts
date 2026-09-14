/**
 * Paylaşıma açık sunumların künyesi.
 *
 * Bu dosya BİLEREK `registry.ts`'ten ayrı duruyor: registry, sunum
 * bileşenlerini `next/dynamic` ile `ssr: false` olarak yüklüyor ve bu,
 * sunucu bileşenlerinden erişilemiyor. Sitemap ve sayfa metadata'sı gibi
 * sunucu tarafı kodun ihtiyacı olan tek şey künye — o da burada, hiçbir
 * bileşen importu olmadan.
 */

export type PublicTalk = {
  slug: string;
  title: string;
  description: string;
};

export const publicTalks: PublicTalk[] = [
  {
    slug: "akademisyenler-icin-yapay-zeka",
    title: "Akademisyenler için Yapay Zekâ",
    description:
      "54 slayt: Claude'un akademik işte nereye girdiği, neyin gerçekten ücretsiz olduğu, istem yazma teknikleri, yayıncıların yapay zekâ beyan kuralları, veri gizliliği ve akademisyenler için yazılmış ücretsiz araçlar. Her iddianın kaynağı slaytta yazılı.",
  },
];

export function getPublicTalk(slug: string): PublicTalk | undefined {
  return publicTalks.find((t) => t.slug === slug);
}

/**
 * Listelenmeyen sunumlar: kapalı bir eğitim için hazırlanmış, bağlantıyı
 * yalnızca katılımcıların bildiği sunumlar.
 *
 * Sitemap'te, ana sayfada ve arama motorunda yer almıyorlar (`robots:
 * noindex`). Adres tahmin edilemesin diye `path`, kayıt slug'ından farklı
 * ve rastgele ekli. Sunumu herkese açmak istediğinizde girdiyi
 * `publicTalks`'a taşımanız yeterli.
 */
export type UnlistedTalk = {
  /** Adresteki yol: /sunumlar/<path> */
  path: string;
  /** registry.ts'teki kayıt slug'ı */
  slug: string;
  title: string;
};

export const unlistedTalks: UnlistedTalk[] = [
  {
    path: "makale-bildiri-yz-97528e90",
    slug: "lisansustu-makale-bildiri-yapay-zeka",
    title: "Makale ve Bildiri Yazarken Yapay Zekâ",
  },
];

export function getUnlistedTalk(path: string): UnlistedTalk | undefined {
  return unlistedTalks.find((t) => t.path === path);
}
