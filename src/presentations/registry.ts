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
  "mcbukaf-2026-siber": {
    meta: {
      slug: "mcbukaf-2026-siber",
      title:
        "İnteraktif Siber Güvenlik: Son Kullanıcı Zafiyetleri ve Sosyal Mühendislik",
      description:
        "MCBÜKAF'26 için sıfırdan kurgulanmış 23 slaytlık sunum: tıkla-açıl oltalama anatomisi, sahnede canlı şifre kırıcı ve cihaz parmak izi deneyi, deepfake ipuçları ve 5 dakikalık ransomware geri sayımı.",
    },
    Component: dynamic(() => import("./mcbukaf-2026-siber/Presentation"), {
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
  "tablolarla-calisma": {
    meta: {
      slug: "tablolarla-calisma",
      title: "Tablolarla Çalışma (Excel · Sheets · Word)",
      description:
        "BVA 1108 12. hafta — Excel temelleri, formüller, pivot tablolar, Word tabloları ve alternatifler için 33 slaytlık React sunum.",
    },
    Component: dynamic(() => import("./tablolarla-calisma/Presentation"), {
      ssr: false,
    }),
  },
  "sunum-dosyasi": {
    meta: {
      slug: "sunum-dosyasi",
      title: "Sunum Dosyası Hazırlama (PowerPoint · Canva · Gamma)",
      description:
        "BVA 1108 13. hafta — Strateji, yapı, tasarım, hareket, sunma ve paylaşım. 32 slaytlık uçtan uca pratik React sunum.",
    },
    Component: dynamic(() => import("./sunum-dosyasi/Presentation"), {
      ssr: false,
    }),
  },
  "programlama-temelleri-h01": {
    meta: {
      slug: "programlama-temelleri-h01",
      title: "Programlama Temellerine Giriş (BVA 1101 · 1. Hafta)",
      description:
        "Algoritma, akış diyagramı, programlama dili kavramları + Code Editor / Flowchart mockup'larıyla 19 slaytlık açılış sunumu.",
    },
    Component: dynamic(() => import("./programlama-temelleri-h01/Presentation"), {
      ssr: false,
    }),
  },
  "is-sagligi-ve-guvenligi-h01": {
    meta: {
      slug: "is-sagligi-ve-guvenligi-h01",
      title: "İlk Yardıma Giriş (BVA 1109 · 1. Hafta)",
      description:
        "ABC algoritması, ilk yardım çantası, 112 acil çağrı mockup'ı ile 20 slaytlık iş sağlığı ve güvenliği açılışı.",
    },
    Component: dynamic(() => import("./is-sagligi-ve-guvenligi-h01/Presentation"), {
      ssr: false,
    }),
  },
  "uretken-yapay-zekalar-h01": {
    meta: {
      slug: "uretken-yapay-zekalar-h01",
      title: "Üretken Yapay Zekâya Genel Bakış (BVA 1203 · 1. Hafta)",
      description:
        "ChatGPT/Claude/Gemini, token & olasılık, prompt demo, halüsinasyon ve etik konularıyla 20 slaytlık açılış.",
    },
    Component: dynamic(() => import("./uretken-yapay-zekalar-h01/Presentation"), {
      ssr: false,
    }),
  },
  "buyuk-veri-icin-bulut-bilisim-h01": {
    meta: {
      slug: "buyuk-veri-icin-bulut-bilisim-h01",
      title: "Bulut Bilişime Giriş (BVA 2103 · 1. Hafta)",
      description:
        "IaaS/PaaS/SaaS, AWS/Azure/GCP, on-prem vs cloud karşılaştırma ve AWS console mockup ile 20 slaytlık açılış.",
    },
    Component: dynamic(() => import("./buyuk-veri-icin-bulut-bilisim-h01/Presentation"), {
      ssr: false,
    }),
  },
  "sosyal-ag-analizi-h01": {
    meta: {
      slug: "sosyal-ag-analizi-h01",
      title: "Ağ Merkezilik Ölçüleri (BVA 2105 · 1. Hafta)",
      description:
        "Degree, betweenness, closeness, eigenvector merkezilikleri + interaktif graf SVG'leri ile 20 slaytlık açılış.",
    },
    Component: dynamic(() => import("./sosyal-ag-analizi-h01/Presentation"), {
      ssr: false,
    }),
  },
  "veri-gorsellestirme-h01": {
    meta: {
      slug: "veri-gorsellestirme-h01",
      title: "Veri Görselleştirmeye Giriş (BVA 2107 · 1. Hafta)",
      description:
        "Anscombe quartet, Tufte ilkeleri, renk teorisi, grafik türleri galerisi ve Tableau dashboard mockup ile 20 slaytlık açılış.",
    },
    Component: dynamic(() => import("./veri-gorsellestirme-h01/Presentation"), {
      ssr: false,
    }),
  },
  "siber-guvenlik-ve-bilisim-hukuku-h01": {
    meta: {
      slug: "siber-guvenlik-ve-bilisim-hukuku-h01",
      title: "Siber Güvenliğe Giriş & CIA Üçlüsü (BVA 2205 · 1. Hafta)",
      description:
        "CIA üçlüsü, tehdit aktörleri, phishing & nmap mockup'ları, Türk bilişim hukuku temelleri ile 20 slaytlık açılış.",
    },
    Component: dynamic(() => import("./siber-guvenlik-ve-bilisim-hukuku-h01/Presentation"), {
      ssr: false,
    }),
  },
  "kullanici-arayuzu-tasarimi-h01": {
    meta: {
      slug: "kullanici-arayuzu-tasarimi-h01",
      title: "UI/UX Tasarımına Giriş (BVA 2245 · 1. Hafta)",
      description:
        "UI vs UX, HCI, Don Norman ilkeleri, Figma workspace mockup ve bad-vs-good UI karşılaştırmalarıyla 20 slaytlık açılış.",
    },
    Component: dynamic(() => import("./kullanici-arayuzu-tasarimi-h01/Presentation"), {
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
