import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import type {
  Service,
  ServiceCategory,
  ServiceCopy,
  CategoryCopy,
  FaqItem,
  LocaleServiceDict,
  ServiceSlug,
} from "./types";
import { tr } from "./tr";
import { en } from "./en";
import { de } from "./de";
import { ar } from "./ar";

export type {
  Service,
  ServiceCategory,
  ServiceCopy,
  ServiceSlug,
} from "./types";

/** Dil sözlükleri. Yeni bir dil eklemek: dosyayı yaz, buraya bağla. */
const dicts: Record<Locale, LocaleServiceDict> = { tr, en, de, ar };

/**
 * Hizmetin dilden bağımsız yapısı. Metinler `./<locale>.ts` dosyalarında
 * durur; burada yalnızca slug, ikon, kategori ve etiketler tanımlanır.
 */
const structure: ReadonlyArray<Omit<Service, "copy">> = [
  {
    slug: "web-sizma-testi",
    icon: "Globe",
    category: "guvenlik",
    featured: true,
    tags: ["OWASP Top 10", "Burp Suite", "API", "Kaynak Kod"],
  },
  {
    slug: "mobil-sizma-testi",
    icon: "Smartphone",
    category: "guvenlik",
    featured: true,
    tags: ["iOS", "Android", "MASVS", "Frida"],
  },
  {
    slug: "ag-altyapi-sizma-testi",
    icon: "Network",
    category: "guvenlik",
    tags: ["Nmap", "Active Directory", "Wi-Fi", "İç Ağ"],
  },
  {
    slug: "sosyal-muhendislik-simulasyonu",
    icon: "Radar",
    category: "guvenlik",
    featured: true,
    tags: ["Phishing", "Vishing", "QR", "Farkındalık"],
  },
  {
    slug: "iot-guvenlik-testi",
    icon: "Cpu",
    category: "guvenlik",
    tags: ["Gömülü Sistem", "Firmware", "MQTT", "BLE"],
  },
  {
    slug: "kaynak-kod-guvenlik-incelemesi",
    icon: "Bug",
    category: "guvenlik",
    tags: ["SAST", "Code Review", "CI/CD", "Bağımlılık"],
  },
  {
    slug: "mobil-uygulama-gelistirme",
    icon: "Smartphone",
    category: "gelistirme",
    featured: true,
    tags: ["React Native", "Expo", "iOS", "Android"],
  },
  {
    slug: "web-uygulamasi-gelistirme",
    icon: "Code2",
    category: "gelistirme",
    featured: true,
    tags: ["Next.js", "React", "TypeScript", "Kurumsal Site"],
  },
  {
    slug: "api-backend-gelistirme",
    icon: "Server",
    category: "gelistirme",
    tags: ["REST", "tRPC", "PostgreSQL", "Prisma"],
  },
  {
    slug: "seo-geo-optimizasyonu",
    icon: "Search",
    category: "gelistirme",
    tags: ["Teknik SEO", "GEO", "Core Web Vitals", "Schema.org"],
  },
  {
    slug: "veri-analitigi-yapay-zeka",
    icon: "Brain",
    category: "veri",
    featured: true,
    tags: ["Makine Öğrenmesi", "NLP", "XAI", "Python"],
  },
  {
    slug: "veri-gorsellestirme-panolar",
    icon: "LineChart",
    category: "veri",
    tags: ["Dashboard", "BI", "Raporlama"],
  },
  {
    slug: "kurumsal-siber-guvenlik-egitimi",
    icon: "GraduationCap",
    category: "egitim",
    featured: true,
    tags: ["Farkındalık", "Atölye", "Kurumsal"],
  },
  {
    slug: "teknik-danismanlik",
    icon: "ShieldCheck",
    category: "egitim",
    tags: ["Mimari", "Danışmanlık", "Akademik"],
  },
];

function copyFor(slug: ServiceSlug): Record<Locale, ServiceCopy> {
  return Object.fromEntries(
    locales.map((l) => [l, dicts[l].services[slug]])
  ) as Record<Locale, ServiceCopy>;
}

export const services: Service[] = structure.map((s) => ({
  ...s,
  copy: copyFor(s.slug),
}));

export const featuredServices = services.filter((s) => s.featured);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

const CATEGORIES: ServiceCategory[] = [
  "guvenlik",
  "gelistirme",
  "veri",
  "egitim",
];

/** Kategori başlıkları, dört dilde. */
export const categoryCopy = Object.fromEntries(
  CATEGORIES.map((c) => [
    c,
    Object.fromEntries(locales.map((l) => [l, dicts[l].categories[c]])),
  ])
) as unknown as Record<ServiceCategory, Record<Locale, CategoryCopy>>;

/** Sıkça sorulan sorular — FAQPage yapısal verisi ve GEO için. */
export const serviceFaq = Object.fromEntries(
  locales.map((l) => [l, dicts[l].faq])
) as unknown as Record<Locale, ReadonlyArray<FaqItem>>;
