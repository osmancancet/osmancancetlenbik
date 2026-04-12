import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteUrl, absoluteUrl } from "@/lib/site";
import { personJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

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
  ],
  authors: [{ name: "Osman Can Çetlenbik" }],
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

const themeInitScript = `document.documentElement.setAttribute('data-theme','dark');`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
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
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
