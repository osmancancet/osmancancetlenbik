import type { NextConfig } from "next";

/**
 * Search Console'da "Bulunamadı (404)" olarak raporlanan adresler, atölye
 * sayfaları yeniden adlandırıldığında geride kalan eski URL'lerdi. Kalıcı
 * (308) yönlendirme hem hatayı kapatır hem de dışarıdan verilmiş eski
 * bağlantıları kurtarır.
 */
const legacyRedirects = [
  { source: "/mcbukaf/sahte-banka", destination: "/mcbukaf/banka" },
  { source: "/mcbukaf/sifre-test", destination: "/mcbukaf/sifre" },
  { source: "/mcbukaf/cihaz-iz", destination: "/" },
  { source: "/mcbukaf/cihaz", destination: "/" },
  { source: "/mcbukaf", destination: "/" },
];

/** Kısa/İngilizce takma adlar — paylaşılması kolay, tek hedefe düşer. */
const aliasRedirects = [
  { source: "/hizmet", destination: "/hizmetler" },
  { source: "/sizma-testi", destination: "/hizmetler#web-sizma-testi" },
  { source: "/pentest", destination: "/hizmetler#web-sizma-testi" },
  { source: "/blog", destination: "/yazilarim" },
  { source: "/services", destination: "/en/services" },
  { source: "/about", destination: "/en/about" },
  { source: "/contact", destination: "/en/contact" },
  { source: "/publications", destination: "/en/publications" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async redirects() {
    return [...legacyRedirects, ...aliasRedirects].map((r) => ({
      ...r,
      permanent: true,
    }));
  },

  /**
   * HASAT 2026 başvuru siteleri public/hasat2026 altında statik HTML olarak
   * duruyor. Next.js public klasöründe dizin index'i sunmadığı için temiz
   * adresleri ilgili index.html dosyalarına yeniden yazıyoruz.
   */
  async rewrites() {
    return [
      { source: "/hasat2026", destination: "/hasat2026/index.html" },
      {
        source: "/hasat2026/:proje(siper|tribosense|omur)",
        destination: "/hasat2026/:proje/index.html",
      },
      {
        source: "/hasat2026/:proje(siper|tribosense|omur)/demo",
        destination: "/hasat2026/:proje/demo/index.html",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
