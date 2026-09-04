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
      "Claude'un akademik işte nereye girdiği, neyin gerçekten ücretsiz olduğu, yayıncıların yapay zekâ beyan kuralları ve veri gizliliği. Her iddianın kaynağı slaytta yazılı.",
  },
];

export function getPublicTalk(slug: string): PublicTalk | undefined {
  return publicTalks.find((t) => t.slug === slug);
}
