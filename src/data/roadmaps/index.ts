import type { Resource, ResourceKind, Roadmap, RoadmapCategory } from "./types";
import { gelistirmeRoadmaps } from "./gelistirme";
import { veriYzRoadmaps } from "./veri-yz";
import { altyapiRoadmaps } from "./altyapi";
import { guvenlikRoadmaps } from "./guvenlik";
import { uzmanlikRoadmaps } from "./uzmanlik";

export type { Resource, ResourceKind, Roadmap, RoadmapCategory } from "./types";

export const roadmaps: Roadmap[] = [
  ...gelistirmeRoadmaps,
  ...veriYzRoadmaps,
  ...altyapiRoadmaps,
  ...guvenlikRoadmaps,
  ...uzmanlikRoadmaps,
];

export const categories: Record<RoadmapCategory, { label: string; blurb: string }> = {
  temel: { label: "Temeller", blurb: "Her alanın ortak zemini" },
  gelistirme: { label: "Yazılım Geliştirme", blurb: "Web, mobil, oyun, gömülü ve daha fazlası" },
  "veri-yz": { label: "Veri ve Yapay Zekâ", blurb: "Analitikten büyük veriye, derin öğrenmeden LLM'e" },
  altyapi: { label: "Altyapı ve Bulut", blurb: "Sistem, ağ, DevOps, bulut ve veritabanı" },
  guvenlik: { label: "Siber Güvenlik", blurb: "Kırmızı takım, mavi takım, adli bilişim, GRC" },
  uzmanlik: { label: "Kıdemli Roller", blurb: "Mimari ve liderlik" },
};

export const categoryOrder: RoadmapCategory[] = [
  "temel",
  "gelistirme",
  "veri-yz",
  "altyapi",
  "guvenlik",
  "uzmanlik",
];

export const resourceKindLabel: Record<ResourceKind, string> = {
  kurs: "Kurs",
  platform: "Eğitim platformu",
  dokuman: "Doküman",
  kitap: "Kitap",
  pratik: "Uygulama / Lab",
  video: "Video",
};

/**
 * "Nereden başlamalıyım?" sorusuna hazır cevaplar — haritaları bir kariyer
 * hedefi etrafında sıraya diziyor.
 */
export const tracks: { title: string; goal: string; steps: string[] }[] = [
  {
    title: "Sıfırdan web geliştiriciye",
    goal: "İlk işinizi frontend ya da full stack geliştirici olarak almak.",
    steps: ["programlamaya-giris", "frontend", "backend", "full-stack"],
  },
  {
    title: "Siber güvenlik uzmanı",
    goal: "Sızma testi ya da SOC ekibinde çalışmak.",
    steps: ["ag-ve-sistem-yonetimi", "siber-guvenlik-temelleri", "soc-analisti", "sizma-testi"],
  },
  {
    title: "Büyük veri mühendisi",
    goal: "Terabaytlık veriyi işleyen platformlar kurmak.",
    steps: ["veri-analisti", "veri-muhendisligi", "bulut-bilisim", "buyuk-veri"],
  },
  {
    title: "Yapay zekâ mühendisi",
    goal: "Model eğitmek ve LLM tabanlı ürünler geliştirmek.",
    steps: ["programlamaya-giris", "veri-bilimi", "yapay-zeka-makine-ogrenmesi", "yapay-zeka-muhendisligi", "mlops"],
  },
  {
    title: "Bulut ve DevOps mühendisi",
    goal: "Yazılımı güvenle ve hızla üretime taşımak.",
    steps: ["ag-ve-sistem-yonetimi", "devops", "bulut-bilisim", "bulut-guvenligi"],
  },
];

export function getRoadmap(slug: string): Roadmap | undefined {
  return roadmaps.find((r) => r.slug === slug);
}

/** İlerleme anahtarı — localStorage'da harita başına bu kimliklerin kümesi tutuluyor. */
export function topicId(stageIndex: number, topic: string): string {
  return `${stageIndex}:${topic}`;
}

export function topicCount(r: Roadmap): number {
  return r.stages.reduce((n, s) => n + s.topics.length, 0);
}

/** Aşama kaynakları + genel kaynaklar, URL'ye göre tekilleştirilmiş. */
export function allResources(r: Roadmap): Resource[] {
  const seen = new Set<string>();
  const out: Resource[] = [];
  for (const res of [...r.resources, ...r.stages.flatMap((s) => s.resources ?? [])]) {
    if (seen.has(res.url)) continue;
    seen.add(res.url);
    out.push(res);
  }
  return out;
}

// Harita içi bağlantılar yazım hatasıyla kırılırsa geliştirme sırasında hemen görünsün.
if (process.env.NODE_ENV !== "production") {
  const slugs = new Set(roadmaps.map((r) => r.slug));
  for (const r of roadmaps) {
    for (const ref of [...(r.prerequisites ?? []), ...(r.related ?? [])]) {
      if (!slugs.has(ref)) console.warn(`[roadmaps] ${r.slug} → bilinmeyen harita: ${ref}`);
    }
  }
  for (const t of tracks) {
    for (const s of t.steps) {
      if (!slugs.has(s)) console.warn(`[roadmaps] rota "${t.title}" → bilinmeyen harita: ${s}`);
    }
  }
}
