import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Route } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import {
  allResources,
  categories,
  categoryOrder,
  getRoadmap,
  roadmaps,
  topicCount,
  tracks,
} from "@/data/roadmaps";
import { seoMeta } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";
import { RoadmapExplorer, type RoadmapCard } from "./RoadmapExplorer";

export const metadata: Metadata = seoMeta({
  path: "/yol-haritalari",
  title: "Yazılım Yol Haritaları — Siber Güvenlikten Büyük Veriye",
  description:
    "Frontend, backend, mobil, siber güvenlik, sızma testi, SOC, büyük veri, veri bilimi, yapay zekâ, DevOps ve bulut için adım adım yol haritaları. Her aşama için ücretsiz kurslar, eğitimler ve sertifikalar.",
  keywords: [
    "yazılım yol haritası",
    "roadmap",
    "siber güvenlik yol haritası",
    "büyük veri yol haritası",
    "yapay zeka yol haritası",
    "ücretsiz yazılım kursları",
    "kariyer yol haritası",
  ],
});

export default function YolHaritalariPage() {
  const cards: RoadmapCard[] = roadmaps.map((r) => ({
    slug: r.slug,
    title: r.title,
    summary: r.summary,
    icon: r.icon,
    category: r.category,
    level: r.level,
    duration: r.duration,
    stageCount: r.stages.length,
    topicCount: topicCount(r),
    haystack: [...r.roles, ...r.tools, ...r.keywords].join(" "),
  }));

  const stats = [
    { value: roadmaps.length, label: "yol haritası" },
    { value: roadmaps.reduce((n, r) => n + r.stages.length, 0), label: "aşama" },
    { value: roadmaps.reduce((n, r) => n + topicCount(r), 0), label: "konu" },
    {
      value: new Set(roadmaps.flatMap((r) => allResources(r).map((x) => x.url))).size,
      label: "kurs ve kaynak",
    },
  ];

  return (
    <PageShell
      eyebrow="Yol Haritaları"
      title="Yazılımda nereden başlamalı?"
      subtitle="Her yazılım alanı için adım adım yol haritası: hangi konuyu hangi sırayla öğreneceğiniz, her aşamada ne inşa edeceğiniz, hangi kursların ve sertifikaların işe yaradığı. İlerlemenizi işaretleyebilirsiniz — kayıt yalnızca tarayıcınızda tutulur."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Yol Haritaları", path: "/yol-haritalari" },
          ])
        )}
      />

      <dl className="grid grid-cols-2 md:grid-cols-4 gap-px mb-16 rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--border)]">
        {stats.map((s) => (
          <div key={s.label} className="bg-[var(--bg-card)] px-5 py-4">
            <dt className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-subtle)]">
              {s.label}
            </dt>
            <dd className="text-2xl font-semibold text-[var(--fg)] tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="rotalar" className="mb-20">
        <div className="flex items-center gap-2 mb-2">
          <Route className="w-4 h-4 text-[var(--accent)]" />
          <h2 id="rotalar" className="text-xl font-semibold text-[var(--fg)]">
            Hedefe göre önerilen rotalar
          </h2>
        </div>
        <p className="text-sm text-[var(--fg-muted)] mb-6 max-w-2xl">
          Ne olmak istediğinizi biliyorsanız haritaları bu sırayla izleyin.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {tracks.map((t) => (
            <div key={t.title} className="card rounded-lg p-5">
              <h3 className="font-semibold text-[var(--fg)]">{t.title}</h3>
              <p className="text-sm text-[var(--fg-muted)] mt-1 mb-4">{t.goal}</p>
              <ol className="flex flex-wrap items-center gap-2">
                {t.steps.map((slug, i) => {
                  const r = getRoadmap(slug);
                  if (!r) return null;
                  return (
                    <li key={slug} className="flex items-center gap-2">
                      {i > 0 && <ArrowRight className="w-3 h-3 text-[var(--fg-subtle)]" aria-hidden />}
                      <Link
                        href={`/yol-haritalari/${slug}`}
                        className="text-xs font-mono px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                      >
                        <span className="text-[var(--fg-subtle)] me-1">{i + 1}.</span>
                        {r.title}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <RoadmapExplorer cards={cards} categories={categories} order={categoryOrder} />

      <p className="mt-16 text-xs text-[var(--fg-subtle)] max-w-3xl leading-relaxed">
        Süreler günde 1-2 saat ayıran biri için kaba tahmindir. Bağlantılar ilgili
        platformun ana sayfasına verilmiştir; kurs içerikleri ve ücretler
        platformlar tarafından değiştirilebilir.
      </p>
    </PageShell>
  );
}
