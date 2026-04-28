import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export type PresentationMeta = {
  slug: string;
  title: string;
  description?: string;
};

type Entry = {
  meta: PresentationMeta;
  Component: ComponentType;
};

/**
 * Yeni sunum eklemek için:
 *   1. src/presentations/<slug>/Presentation.tsx oluştur
 *   2. (varsa) src/presentations/<slug>/styles.css ekle ve component'te import et
 *   3. Buraya yeni bir entry ekle
 *   4. Admin'de konferans/dersi düzenleyip "Sunum" alanından bu slug'ı seç
 */
export const presentations: Record<string, Entry> = {
  "siber-guvenlik": {
    meta: {
      slug: "siber-guvenlik",
      title: "Siber Güvenlik Farkındalık Etkinliği",
      description:
        "37 slaytlık interaktif siber güvenlik farkındalık sunumu (Matrix Rain, glitch, otomatik simülasyonlar).",
    },
    Component: dynamic(() => import("./siber-guvenlik/Presentation"), {
      ssr: false,
    }),
  },
  "ofis-programlari": {
    meta: {
      slug: "ofis-programlari",
      title: "Ofis Programları (PowerPoint · Canva · Gamma)",
      description:
        "BVA 1108 9. hafta — Sunum hazırlama araçları için 24 slaytlık görsel React sunum.",
    },
    Component: dynamic(() => import("./ofis-programlari/Presentation"), {
      ssr: false,
    }),
  },
  "kelime-islem": {
    meta: {
      slug: "kelime-islem",
      title: "Kelime İşlem Programı (Word · Google Docs · LibreOffice)",
      description:
        "BVA 1108 10. hafta — Microsoft Word ve alternatifleri için 35 slaytlık görsel React sunum.",
    },
    Component: dynamic(() => import("./kelime-islem/Presentation"), {
      ssr: false,
    }),
  },
  "denklem-cizim-grafik": {
    meta: {
      slug: "denklem-cizim-grafik",
      title: "Denklem · Çizim · Grafik",
      description:
        "BVA 1108 11. hafta — Word'ün üç görsel süper gücü (Equation Editor, Shapes/SmartArt, Charts) için 34 slaytlık React sunum.",
    },
    Component: dynamic(() => import("./denklem-cizim-grafik/Presentation"), {
      ssr: false,
    }),
  },
};

export const presentationList: PresentationMeta[] = Object.values(
  presentations
).map((p) => p.meta);

export function getPresentation(slug: string | null | undefined): Entry | null {
  if (!slug) return null;
  return presentations[slug] ?? null;
}
