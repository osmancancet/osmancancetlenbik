import type { Locale } from "@/lib/i18n";

export type ServiceCategory = "guvenlik" | "gelistirme" | "veri" | "egitim";

export type ServiceCopy = {
  title: string;
  summary: string;
  /** Teslim edilenler — hem kullanıcıya hem de arama motoruna somut sinyal. */
  deliverables: string[];
};

export type CategoryCopy = { label: string; blurb: string };

export type FaqItem = { q: string; a: string };

/** Bir dilin tüm hizmet metinleri. Anahtarlar `services/index.ts` içindeki
 *  slug'larla birebir eşleşmek zorunda — eşleşmezse tip hatası alınır. */
export type LocaleServiceDict = {
  categories: Record<ServiceCategory, CategoryCopy>;
  services: Record<ServiceSlug, ServiceCopy>;
  faq: FaqItem[];
};

export const serviceSlugs = [
  "web-sizma-testi",
  "mobil-sizma-testi",
  "ag-altyapi-sizma-testi",
  "sosyal-muhendislik-simulasyonu",
  "iot-guvenlik-testi",
  "kaynak-kod-guvenlik-incelemesi",
  "mobil-uygulama-gelistirme",
  "web-uygulamasi-gelistirme",
  "api-backend-gelistirme",
  "seo-geo-optimizasyonu",
  "veri-analitigi-yapay-zeka",
  "veri-gorsellestirme-panolar",
  "kurumsal-siber-guvenlik-egitimi",
  "teknik-danismanlik",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export type Service = {
  slug: ServiceSlug;
  icon: string;
  category: ServiceCategory;
  featured?: boolean;
  tags: string[];
  copy: Record<Locale, ServiceCopy>;
};
