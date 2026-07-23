"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  projects,
  featuredProjects,
  otherProjects,
  categoryLabels,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Kart yüzeyi. Başlık bağlantısı `after:` ile tüm kartı kaplar, böylece
 *  canlı demo bağlantısı iç içe <a> olmadan ayrı tıklanabilir kalır. */
function ProjectCard({ p, large = false }: { p: Project; large?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={`group card rounded-lg h-full relative flex flex-col hover:border-[var(--accent)]/40 ${
        large ? "p-7" : "p-6"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <GithubIcon className="w-4 h-4 shrink-0 text-[var(--fg-subtle)] group-hover:text-[var(--accent)] transition-colors" />
          <h3
            className={`font-medium font-mono text-[var(--fg)] truncate ${
              large ? "text-lg" : "text-base"
            }`}
          >
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="after:absolute after:inset-0 after:content-['']"
            >
              {p.name}
            </a>
          </h3>
        </div>
        <ArrowUpRight className="w-4 h-4 shrink-0 text-[var(--fg-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>

      <p
        className={`text-[var(--fg-muted)] leading-relaxed mb-5 flex-1 ${
          large ? "text-[15px]" : "text-sm"
        }`}
      >
        {p.description}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {p.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border)] text-[var(--fg-subtle)]"
          >
            {t}
          </span>
        ))}
        {p.live && (
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 ml-auto inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--accent)]/40 text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Canlı
          </a>
        )}
      </div>
    </motion.div>
  );
}

type Filter = "all" | ProjectCategory;

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");

  // Yalnızca gerçekten proje bulunan kategoriler sekme olarak gösterilir.
  const filters = useMemo<{ key: Filter; label: string }[]>(() => {
    const present = (Object.keys(categoryLabels) as ProjectCategory[]).filter(
      (c) => projects.some((p) => p.category === c),
    );
    return [
      { key: "all", label: "Tümü" },
      ...present.map((c) => ({ key: c, label: categoryLabels[c] })),
    ];
  }, []);

  const visible = useMemo(
    () =>
      filter === "all"
        ? otherProjects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <div className="space-y-14">
      {/* Öne çıkanlar — yalnızca filtre yokken */}
      {filter === "all" && (
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--fg-subtle)] mb-4">
            Öne çıkanlar
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.name} p={p} large />
            ))}
          </div>
        </div>
      )}

      <div>
        {/* Kategori sekmeleri */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                aria-pressed={active}
                className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors ${
                  active
                    ? "border-[var(--accent)]/50 text-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border-[var(--border)] text-[var(--fg-subtle)] hover:text-[var(--fg-muted)] hover:border-[var(--border-strong)]"
                }`}
              >
                {f.label}
                <span className="ml-1.5 opacity-50">
                  {f.key === "all"
                    ? projects.length
                    : projects.filter((p) => p.category === f.key).length}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.div
                key={p.name}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <ProjectCard p={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
