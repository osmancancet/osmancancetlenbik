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
