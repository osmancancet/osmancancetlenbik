import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { personJsonLd, webSiteJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";
import { htmlLang, localeDir, type Locale } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeInitScript = `document.documentElement.setAttribute('data-theme','dark');`;

/**
 * Tüm dil bölümlerinin ortak `<html>` kabuğu.
 *
 * Her dilin kendi kök layout'u var (`app/(site)`, `app/(en)`, `app/(de)`,
 * `app/(ar)`); böylece `<html lang>` ve `<html dir>` sunucuda, ilk HTML'de
 * doğru basılır — arama motorları ve AI tarayıcıları JavaScript çalıştırmadan
 * sayfanın dilini görür.
 */
export function RootShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <html
      lang={htmlLang[locale]}
      dir={localeDir[locale]}
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
