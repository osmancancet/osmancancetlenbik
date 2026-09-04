import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Osman Can Çetlenbik",
    short_name: "OCÇ",
    description:
      "Öğretim görevlisi · Siber güvenlik, sızma testi, mobil ve web uygulama geliştirme.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#00ff41",
    lang: "tr",
    dir: "ltr",
    categories: ["education", "business", "productivity"],
    // Uygulama olarak kurulduğunda araçlar sayfasında açılsın — kuran kişi
    // blog okumak için değil, aracı kullanmak için kuruyor.
    shortcuts: [
      {
        name: "Atıf Denetleyici",
        short_name: "Atıf",
        url: "/araclar/atif-denetleyici",
      },
      { name: "PDF Bölücü", short_name: "PDF", url: "/araclar/pdf-bolucu" },
      {
        name: "Anonimleştirici",
        short_name: "Anonim",
        url: "/araclar/anonimlestirici",
      },
    ],
    icons: [
      {
        src: "/icon-180.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
