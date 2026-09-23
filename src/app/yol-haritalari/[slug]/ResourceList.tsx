"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { Resource } from "@/data/roadmaps/types";
import { resourceKindLabel } from "@/data/roadmaps";

export function ResourceList({ resources }: { resources: Resource[] }) {
  const [onlyFree, setOnlyFree] = useState(false);
  const [onlyTr, setOnlyTr] = useState(false);

  const shown = resources.filter((r) => (!onlyFree || r.free) && (!onlyTr || r.lang === "tr"));
  const hasTr = resources.some((r) => r.lang === "tr");

  const toggle = (active: boolean) =>
    `px-3 py-1.5 rounded-md text-xs font-mono border transition-colors ${
      active
        ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-soft)]"
        : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--border-strong)]"
    }`;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        <button type="button" aria-pressed={onlyFree} className={toggle(onlyFree)} onClick={() => setOnlyFree((v) => !v)}>
          Yalnızca ücretsiz
        </button>
        {hasTr && (
          <button type="button" aria-pressed={onlyTr} className={toggle(onlyTr)} onClick={() => setOnlyTr((v) => !v)}>
            Yalnızca Türkçe
          </button>
        )}
      </div>

      {shown.length === 0 ? (
        <p className="text-sm text-[var(--fg-muted)]">Bu filtreye uyan kaynak yok.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {shown.map((r) => (
            <li key={r.url}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group card rounded-lg p-4 h-full flex flex-col hover:border-[var(--accent)]/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                    {r.title}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[var(--fg-subtle)] group-hover:text-[var(--accent)]" />
                </div>
                <span className="text-xs text-[var(--fg-subtle)] mt-1">{r.provider}</span>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-mono">
                  <span className="px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--fg-muted)]">
                    {resourceKindLabel[r.kind]}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded border ${
                      r.free
                        ? "border-[var(--accent)]/40 text-[var(--accent)]"
                        : "border-[var(--border)] text-[var(--fg-muted)]"
                    }`}
                  >
                    {r.free ? "Ücretsiz" : "Ücretli"}
                  </span>
                  <span className="px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--fg-muted)]">
                    {r.lang === "tr" ? "Türkçe" : "İngilizce"}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
