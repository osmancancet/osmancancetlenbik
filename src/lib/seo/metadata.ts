import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { languageAlternates, ogLocale, type Locale } from "@/lib/i18n";

/** Arapça sayfalarda OG kartı için Latin karşılık. */
const LATIN_FALLBACK =
  "Osman Can Çetlenbik — Cyber Security & Software Engineering";

type SeoArgs = {
  /** Site köküne göre yol — kanonik ve hreflang bundan üretilir. */
  path: string;
  title: string;
  description: string;
  locale?: Locale;
  keywords?: string[];
  /** Mutlak ya da göreli görsel; verilmezse dinamik OG görseli kullanılır. */
  image?: string;
  /**
   * OG görselindeki başlık. `/api/og` yalnızca Latin alfabesi içeren varsayılan
   * yazı tipiyle çiziyor; Arapça başlık kutucuk olarak çıkacağı için o dilde
   * Latin bir karşılık kullanılır.
   */
  ogTitle?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
};

/**
 * Tek noktadan kanonik + hreflang + OG/Twitter üretir.
 *
 * Search Console'daki "kullanıcı tarafından seçilen standart sayfa olmadan
 * kopya" uyarısının sebebi kanonik etiketin hiç basılmamasıydı; her indekse
 * açık sayfa artık kendine referans veren bir canonical taşıyor.
 */
export function seoMeta({
  path,
  title,
  description,
  locale = "tr",
  keywords,
  image,
  ogTitle,
  type = "website",
  noindex = false,
}: SeoArgs): Metadata {
  const canonical = path === "/" ? "/" : path.replace(/\/$/, "");
  const cardTitle = ogTitle ?? (locale === "ar" ? LATIN_FALLBACK : title);
  const ogImage =
    image ??
    absoluteUrl(
      `/api/og?title=${encodeURIComponent(
        cardTitle
      )}&eyebrow=${encodeURIComponent("Osman Can Çetlenbik")}`
    );

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: languageAlternates(canonical),
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      type,
      url: absoluteUrl(canonical),
      locale: ogLocale[locale],
      siteName: "Osman Can Çetlenbik",
      images: [{ url: ogImage, width: 1200, height: 630, alt: cardTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Kanonik + hreflang'i mevcut metadata bloğuna eklemek için kısa yol. */
export function canonicalOnly(path: string): Metadata["alternates"] {
  const canonical = path === "/" ? "/" : path.replace(/\/$/, "");
  return { canonical, languages: languageAlternates(canonical) };
}
