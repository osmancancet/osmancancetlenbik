"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Clock, Layers, Search, Signal } from "lucide-react";
import { RoadmapIcon } from "@/components/roadmaps/RoadmapIcon";
import type { Level, RoadmapCategory } from "@/data/roadmaps/types";
import { useProgressCounts } from "./progress";

export type RoadmapCard = {
  slug: string;
  title: string;
  summary: string;
  icon: string;
  category: RoadmapCategory;
  level: Level;
  duration: string;
  stageCount: number;
  topicCount: number;
  /** Aramada eşleşsin diye: roller, araçlar, anahtar kelimeler. */
  haystack: string;
};

const LEVELS: Level[] = ["Başlangıç", "Orta", "İleri"];

/** "Güvenlik" ile "guvenlik" aynı sonucu versin. */
function fold(s: string) {
  return s
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i");
}

export function RoadmapExplorer({
  cards,
  categories,
  order,
}: {
  cards: RoadmapCard[];
  categories: Record<RoadmapCategory, { label: string; blurb: string }>;
  order: RoadmapCategory[];
}) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<RoadmapCategory | "hepsi">("hepsi");
  const [level, setLevel] = useState<Level | "hepsi">("hepsi");
  const progress = useProgressCounts(cards.map((c) => c.slug));

  const filtered = useMemo(() => {
    const q = fold(query.trim());
    return cards.filter(
      (c) =>
        (cat === "hepsi" || c.category === cat) &&
        (level === "hepsi" || c.level === level) &&
        (!q || fold(`${c.title} ${c.summary} ${c.haystack}`).includes(q))
    );
  }, [cards, query, cat, level]);

  const grouped = order
    .map((key) => ({ key, items: filtered.filter((c) => c.category === key) }))
    .filter((g) => g.items.length > 0);

  const chip = (active: boolean) =>
    `px-3 py-1.5 rounded-md text-xs font-mono border transition-colors ${
      active
        ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-soft)]"
        : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4 mb-10">
        <label className="relative block">
          <span className="sr-only">Yol haritalarında ara</span>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--fg-subtle)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Alan, rol ya da araç ara: Spark, pentest, React, Kubernetes…"
            className="w-full rounded-md border border-[var(--border)] bg-[var(--bg-card)] pl-10 pr-4 py-3 text-sm text-[var(--fg)] placeholder:text-[var(--fg-subtle)] focus:outline-none focus:border-[var(--accent)]"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={chip(cat === "hepsi")} onClick={() => setCat("hepsi")}>
            Tümü
          </button>
          {order.map((key) => (
            <button key={key} type="button" className={chip(cat === key)} onClick={() => setCat(key)}>
              {categories[key].label}
            </button>
          ))}
          <span className="hidden sm:block w-px h-5 bg-[var(--border)] mx-1" />
          {(["hepsi", ...LEVELS] as const).map((l) => (
            <button key={l} type="button" className={chip(level === l)} onClick={() => setLevel(l)}>
              {l === "hepsi" ? "Her seviye" : l}
            </button>
          ))}
        </div>
      </div>

      {grouped.length === 0 && (
        <p className="text-sm text-[var(--fg-muted)] py-12 text-center">
          Bu aramaya uyan bir yol haritası yok. Farklı bir kelime deneyin.
        </p>
      )}

      <div className="space-y-14">
        {grouped.map((g) => (
          <section key={g.key} aria-labelledby={`kat-${g.key}`}>
            <div className="flex items-baseline justify-between gap-4 mb-5 border-b border-[var(--border)] pb-3">
              <h2 id={`kat-${g.key}`} className="text-xl font-semibold text-[var(--fg)]">
                {categories[g.key].label}
              </h2>
              <span className="text-xs text-[var(--fg-subtle)] font-mono text-end">
                {categories[g.key].blurb}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((c) => {
                const done = progress[c.slug] ?? 0;
                const pct = Math.round((done / c.topicCount) * 100);
                return (
                  <Link
                    key={c.slug}
                    href={`/yol-haritalari/${c.slug}`}
                    className="group card rounded-lg p-5 h-full flex flex-col hover:border-[var(--accent)]/40"
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="grid place-items-center w-10 h-10 rounded-md border border-[var(--border-strong)] bg-[var(--accent-soft)]">
                        <RoadmapIcon name={c.icon} className="w-4 h-4 text-[var(--accent)]" />
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[var(--fg-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    <h3 className="text-base font-semibold text-[var(--fg)] mb-1.5 group-hover:text-[var(--accent)] transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-sm text-[var(--fg-muted)] leading-relaxed flex-1">{c.summary}</p>

                    <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-[var(--fg-subtle)]">
                      <span className="inline-flex items-center gap-1">
                        <Signal className="w-3 h-3" /> {c.level}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {c.duration}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Layers className="w-3 h-3" /> {c.stageCount} aşama
                      </span>
                    </div>

                    {done > 0 && (
                      <div className="mt-3" aria-label={`İlerleme yüzde ${pct}`}>
                        <div className="h-1 rounded-full bg-[var(--border)] overflow-hidden">
                          <div className="h-full bg-[var(--accent)]" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="mt-1 block text-[10px] font-mono text-[var(--accent)]">
                          %{pct} tamamlandı
                        </span>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
