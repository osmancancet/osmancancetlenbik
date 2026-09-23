/**
 * Yol haritası veri modeli.
 *
 * Her harita sıralı aşamalardan oluşuyor; aşamadaki konular ziyaretçinin
 * tarayıcısında işaretlenebiliyor (ilerleme localStorage'da, sunucuya
 * gitmiyor). Kaynaklar harita düzeyinde toplanıyor, aşamaya özel olanlar
 * aşamanın içinde duruyor.
 */

export type RoadmapCategory =
  | "temel"
  | "gelistirme"
  | "veri-yz"
  | "altyapi"
  | "guvenlik"
  | "uzmanlik";

export type Level = "Başlangıç" | "Orta" | "İleri";

export type ResourceKind =
  | "kurs"
  | "platform"
  | "dokuman"
  | "kitap"
  | "pratik"
  | "video";

export type Resource = {
  title: string;
  provider: string;
  url: string;
  kind: ResourceKind;
  free: boolean;
  lang: "tr" | "en";
};

export type Certification = {
  name: string;
  issuer: string;
  level: Level;
  url: string;
};

export type Stage = {
  title: string;
  summary: string;
  topics: string[];
  /** Aşama bitince yapılacak somut iş — portfolyoya girecek şey. */
  project?: string;
  resources?: Resource[];
};

export type Roadmap = {
  slug: string;
  title: string;
  /** Kartta görünen tek cümle. */
  summary: string;
  /** Sayfa girişindeki paragraf ve meta açıklaması. */
  description: string;
  icon: string;
  category: RoadmapCategory;
  level: Level;
  /** Günde 1-2 saat ayıran biri için kaba süre. */
  duration: string;
  roles: string[];
  /** Önce bitirilmesi önerilen haritalar. */
  prerequisites?: string[];
  related?: string[];
  tools: string[];
  stages: Stage[];
  resources: Resource[];
  certifications: Certification[];
  /** Sitedeki ilgili dersler — /dersler/{slug}. */
  siteCourses?: { slug: string; title: string }[];
  keywords: string[];
};
