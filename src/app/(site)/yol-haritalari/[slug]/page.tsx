import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Clock,
  GraduationCap,
  Layers,
  Signal,
  Wrench,
} from "lucide-react";
import type { ReactNode } from "react";
import { RoadmapIcon } from "@/components/roadmaps/RoadmapIcon";
import { allResources, categories, getRoadmap, roadmaps, topicCount } from "@/data/roadmaps";
import { absoluteUrl } from "@/lib/site";
import { seoMeta } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";
import { StageTimeline } from "./StageTimeline";
import { ResourceList } from "./ResourceList";

export const dynamicParams = false;

export function generateStaticParams() {
  return roadmaps.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = getRoadmap(slug);
  if (!r) return { title: "Yol Haritası Bulunamadı" };
  return seoMeta({
    path: `/yol-haritalari/${r.slug}`,
    title: `${r.title} Yol Haritası`,
    description: r.description,
    keywords: r.keywords,
    type: "article",
  });
}

function Section({ id, icon, title, children }: { id: string; icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-20">
      <h2 id={id} className="flex items-center gap-2 text-xl font-semibold text-[var(--fg)] mb-6">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

const levelOrder = { Başlangıç: 0, Orta: 1, İleri: 2 } as const;

export default async function YolHaritasiPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getRoadmap(slug);
  if (!r) notFound();

  const resources = allResources(r).sort((a, b) => Number(b.free) - Number(a.free));
  const certs = [...r.certifications].sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);
  const prereqs = (r.prerequisites ?? []).map(getRoadmap).filter((x) => x !== undefined);
  const related = (r.related ?? []).map(getRoadmap).filter((x) => x !== undefined);
  const url = absoluteUrl(`/yol-haritalari/${r.slug}`);

  const facts = [
    { icon: <Signal className="w-3.5 h-3.5" />, label: "Seviye", value: r.level },
    { icon: <Clock className="w-3.5 h-3.5" />, label: "Süre", value: r.duration },
    { icon: <Layers className="w-3.5 h-3.5" />, label: "Kapsam", value: `${r.stages.length} aşama · ${topicCount(r)} konu` },
  ];

  return (
    <section className="relative pt-32 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          breadcrumbJsonLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Yol Haritaları", path: "/yol-haritalari" },
            { name: r.title, path: `/yol-haritalari/${r.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: `${r.title} Yol Haritası`,
            description: r.description,
            url,
            inLanguage: "tr",
            educationalLevel: r.level,
            learningResourceType: "Roadmap",
            teaches: r.stages.map((s) => s.title),
            timeRequired: r.duration,
          },
        ])}
      />

      <div className="relative max-w-5xl mx-auto">
        <Link
          href="/yol-haritalari"
          className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Tüm yol haritaları
        </Link>

        <header className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
            <span className="w-6 h-px bg-[var(--accent)]" />
            {categories[r.category].label}
          </div>
          <div className="flex items-center gap-4">
            <span className="grid place-items-center w-12 h-12 shrink-0 rounded-md border border-[var(--border-strong)] bg-[var(--accent-soft)]">
              <RoadmapIcon name={r.icon} className="w-5 h-5 text-[var(--accent)]" />
            </span>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[var(--fg)]">{r.title}</h1>
          </div>
          <p className="mt-5 text-[var(--fg-muted)] text-lg leading-relaxed">{r.description}</p>
        </header>

        <dl className="mt-8 grid sm:grid-cols-3 gap-px rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--border)]">
          {facts.map((f) => (
            <div key={f.label} className="bg-[var(--bg-card)] px-4 py-3">
              <dt className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[var(--fg-subtle)]">
                {f.icon}
                {f.label}
              </dt>
              <dd className="text-sm font-medium text-[var(--fg)] mt-0.5">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--fg-subtle)] mb-2">
              <Briefcase className="w-3.5 h-3.5" /> Hedef roller
            </h2>
            <p className="text-sm text-[var(--fg)]">{r.roles.join(" · ")}</p>
          </div>
          {prereqs.length > 0 && (
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--fg-subtle)] mb-2">Önce bunlar</h2>
              <div className="flex flex-wrap gap-2">
                {prereqs.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/yol-haritalari/${p.slug}`}
                    className="text-xs font-mono px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="md:col-span-2">
            <h2 className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--fg-subtle)] mb-2">
              <Wrench className="w-3.5 h-3.5" /> Araçlar ve teknolojiler
            </h2>
            <ul className="flex flex-wrap gap-1.5">
              {r.tools.map((t) => (
                <li key={t} className="text-xs px-2 py-0.5 rounded border border-[var(--border)] text-[var(--fg-muted)]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Section id="asamalar" icon={<Layers className="w-5 h-5 text-[var(--accent)]" />} title="Adım adım yol haritası">
          <StageTimeline slug={r.slug} stages={r.stages} />
        </Section>

        <Section id="kaynaklar" icon={<BookOpen className="w-5 h-5 text-[var(--accent)]" />} title="Kurslar ve eğitimler">
          <ResourceList resources={resources} />
        </Section>

        {certs.length > 0 && (
          <Section id="sertifikalar" icon={<Award className="w-5 h-5 text-[var(--accent)]" />} title="Sertifikalar">
            <p className="text-sm text-[var(--fg-muted)] mb-5 max-w-2xl">
              Başlangıçtan ileriye doğru sıralı. Sertifika tek başına iş getirmez; yukarıdaki projelerle birlikte anlam kazanır.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {certs.map((c) => (
                <li key={c.name}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group card rounded-lg px-4 py-3 flex items-center justify-between gap-3 hover:border-[var(--accent)]/40"
                  >
                    <span>
                      <span className="block text-sm font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                        {c.name}
                      </span>
                      <span className="text-xs text-[var(--fg-subtle)]">{c.issuer}</span>
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--fg-muted)] shrink-0">
                      {c.level}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {r.siteCourses && r.siteCourses.length > 0 && (
          <Section id="derslerim" icon={<GraduationCap className="w-5 h-5 text-[var(--accent)]" />} title="Bu alandaki derslerim">
            <ul className="grid gap-3 sm:grid-cols-2">
              {r.siteCourses.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/dersler/${c.slug}`}
                    className="group card rounded-lg px-4 py-3 flex items-center justify-between gap-3 hover:border-[var(--accent)]/40"
                  >
                    <span className="text-sm font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                      {c.title}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--fg-subtle)] group-hover:text-[var(--accent)]" />
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {related.length > 0 && (
          <Section id="ilgili" icon={<RoadmapIcon name="Layers" className="w-5 h-5 text-[var(--accent)]" />} title="Sonra nereye?">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((x) => (
                <li key={x.slug}>
                  <Link
                    href={`/yol-haritalari/${x.slug}`}
                    className="group card rounded-lg p-4 h-full flex gap-3 hover:border-[var(--accent)]/40"
                  >
                    <RoadmapIcon name={x.icon} className="w-4 h-4 mt-0.5 shrink-0 text-[var(--accent)]" />
                    <span>
                      <span className="block text-sm font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                        {x.title}
                      </span>
                      <span className="text-xs text-[var(--fg-muted)] leading-relaxed">{x.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </section>
  );
}
