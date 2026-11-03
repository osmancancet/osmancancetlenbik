import type { Metadata, Viewport } from "next";
import { siteUrl, absoluteUrl } from "@/lib/site";

/**
 * Tüm kök layout'ların paylaştığı varsayılan metadata. Sayfalar kendi
 * başlık/açıklama/kanonik/OG değerlerini `seoMeta()` ile üretir; bunlar
 * yalnızca sayfa bir şey vermediğinde devreye girer.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Osman Can Çetlenbik — Öğretim Görevlisi",
    template: "%s · Osman Can Çetlenbik",
  },
  description:
    "Manisa Celal Bayar Üniversitesi Teknik Bilimler MYO Büyük Veri Analistliği Programı öğretim görevlisi. Büyük veri, yapay zekâ, web ve mobil programlama.",
  keywords: [
    "Osman Can Çetlenbik",
    "Manisa Celal Bayar Üniversitesi",
    "Büyük Veri Analistliği",
    "Öğretim Görevlisi",
    "Yapay Zekâ",
    "Veri Bilimi",
    "web sızma testi",
    "mobil uygulama geliştirme",
    "siber güvenlik danışmanlığı",
  ],
  applicationName: "Osman Can Çetlenbik",
  category: "technology",
  authors: [{ name: "Osman Can Çetlenbik", url: siteUrl }],
  creator: "Osman Can Çetlenbik",
  publisher: "Osman Can Çetlenbik",
  formatDetection: { telephone: false },
  // Sayfa bazında canonical veriliyor (bkz. lib/seo/metadata.ts); burada
  // sadece varsayılan tarama politikası tanımlanıyor.
  robots: {
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
    title: "Osman Can Çetlenbik",
    description: "Öğretim Görevlisi · Büyük Veri Analistliği · MCBÜ",
    type: "website",
    locale: "tr_TR",
    siteName: "Osman Can Çetlenbik",
    images: [
      {
        url: absoluteUrl("/api/og"),
        width: 1200,
        height: 630,
        alt: "Osman Can Çetlenbik",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Osman Can Çetlenbik",
    description: "Öğretim Görevlisi · Büyük Veri Analistliği · MCBÜ",
    images: [absoluteUrl("/api/og")],
  },
};

export const rootViewport: Viewport = {
  themeColor: "#00ff41",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};
