import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteUrl, absoluteUrl } from "@/lib/site";
import { personJsonLd, webSiteJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";
import { HtmlLangSync } from "@/components/HtmlLangSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
    url: siteUrl,
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

export const viewport: Viewport = {
  themeColor: "#00ff41",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const themeInitScript = `document.documentElement.setAttribute('data-theme','dark');`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      dir="ltr"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(personJsonLd())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(webSiteJsonLd())}
        />
        {/* GEO: üretken arama motorları siteyi özetlerken bu Markdown özeti
            okuyor. robots.txt'te tanımlı bir alan olmadığı için keşfi head'den
            veriyoruz. */}
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="llms.txt"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <HtmlLangSync />
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
