"use client";

import { Check, Flag, RotateCcw } from "lucide-react";
import type { Resource, Stage } from "@/data/roadmaps/types";
import { topicId } from "@/data/roadmaps";
import { saveProgress, useProgress } from "../progress";

export function StageTimeline({ slug, stages }: { slug: string; stages: Stage[] }) {
  const done = useProgress(slug);
  const total = stages.reduce((n, s) => n + s.topics.length, 0);
  const pct = Math.round((done.size / total) * 100);

  const toggle = (id: string) => {
    const next = new Set(done);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    saveProgress(slug, next);
  };

  return (
    <div>
      <div className="sticky top-20 z-10 mb-8 rounded-lg border border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur px-4 py-3 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="text-[var(--fg-muted)]">
              {done.size}/{total} konu
            </span>
            <span className="text-[var(--accent)]">%{pct}</span>
          </div>
          <div
            className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label="Harita ilerlemesi"
          >
            <div className="h-full bg-[var(--accent)] transition-[width] duration-300" style={{ width: `${pct}%` }} />
          </div>
        </div>
        {done.size > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Bu haritadaki tüm işaretler silinsin mi?")) saveProgress(slug, new Set());
            }}
            className="inline-flex items-center gap-1.5 text-xs text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Sıfırla
          </button>
        )}
      </div>

      <ol className="relative border-s border-[var(--border-strong)] ms-4 space-y-10">
        {stages.map((stage, si) => {
          const stageDone = stage.topics.filter((t) => done.has(topicId(si, t))).length;
          const complete = stageDone === stage.topics.length;
          return (
            <li key={stage.title} className="ps-8 relative">
              <span
                className={`absolute -start-4 top-0 grid place-items-center w-8 h-8 rounded-full border text-xs font-mono ${
                  complete
                    ? "bg-[var(--accent)] border-[var(--accent)] text-black"
                    : "bg-[var(--bg)] border-[var(--border-strong)] text-[var(--accent)]"
                }`}
              >
                {complete ? <Check className="w-4 h-4" /> : si + 1}
              </span>

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-[var(--fg)]">{stage.title}</h3>
                <span className="text-[11px] font-mono text-[var(--fg-subtle)]">
                  {stageDone}/{stage.topics.length}
                </span>
              </div>
              <p className="text-sm text-[var(--fg-muted)] mt-1 mb-4">{stage.summary}</p>

              <ul className="grid gap-2 sm:grid-cols-2">
                {stage.topics.map((topic) => {
                  const id = topicId(si, topic);
                  const checked = done.has(id);
                  return (
                    <li key={id}>
                      <label
                        className={`flex items-start gap-2.5 rounded-md border px-3 py-2 text-sm cursor-pointer transition-colors ${
                          checked
                            ? "border-[var(--accent)]/40 bg-[var(--accent-soft)] text-[var(--fg)]"
                            : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--border-strong)]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(id)}
                          className="mt-0.5 accent-[var(--accent)] shrink-0"
                        />
                        <span className={checked ? "line-through decoration-[var(--accent)]/60" : ""}>{topic}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>

              {stage.project && (
                <p className="mt-4 flex items-start gap-2 text-sm text-[var(--fg)] rounded-md border border-dashed border-[var(--border-strong)] px-3 py-2.5">
                  <Flag className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span>
                    <span className="font-mono text-xs text-[var(--accent)] me-1.5">PROJE</span>
                    {stage.project}
                  </span>
                </p>
              )}

              {stage.resources && stage.resources.length > 0 && (
                <StageResources resources={stage.resources} />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function StageResources({ resources }: { resources: Resource[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {resources.map((r) => (
        <a
          key={r.url}
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
        >
          {r.title} ↗
        </a>
      ))}
    </div>
  );
}
