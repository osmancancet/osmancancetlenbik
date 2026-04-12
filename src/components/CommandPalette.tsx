"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import Fuse from "fuse.js";
import {
  FileText,
  BookOpen,
  CalendarDays,
  Mic,
  Layers,
  Newspaper,
  Search,
  ArrowRight,
} from "lucide-react";
import type { SearchResult } from "@/app/api/search/route";

const TYPE_META: Record<
  SearchResult["type"],
  { label: string; icon: typeof FileText }
> = {
  page: { label: "Sayfa", icon: Layers },
  post: { label: "Yazı", icon: FileText },
  course: { label: "Ders", icon: BookOpen },
  week: { label: "Hafta", icon: CalendarDays },
  conference: { label: "Konferans", icon: Mic },
  press: { label: "Basın", icon: Newspaper },
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState("");

  // Fetch index when opened
  useEffect(() => {
    if (!open || results.length > 0) return;
    fetch("/api/search")
      .then((r) => r.json())
      .then((d) => setResults(d.results ?? []))
      .catch(() => {});
  }, [open, results.length]);

  const fuse = useMemo(
    () =>
      new Fuse(results, {
        keys: ["title", "description"],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [results]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return results.slice(0, 12);
    return fuse.search(query).map((r) => r.item).slice(0, 20);
  }, [query, fuse, results]);

  // ⌘K / Ctrl+K shortcut + custom event
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpenEvent);
    };
  }, []);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden
      />
      <div
        className="relative w-full max-w-xl bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Site içi arama" shouldFilter={false}>
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
            <Search className="w-4 h-4 text-[var(--fg-subtle)]" />
            <Command.Input
              autoFocus
              value={query}
              onValueChange={setQuery}
              placeholder="Ara: yazı, ders, hafta, konferans, sayfa..."
              className="flex-1 bg-transparent text-sm text-[var(--fg)] placeholder-[var(--fg-subtle)] outline-none"
            />
            <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--fg-subtle)]">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="px-4 py-8 text-sm text-center text-[var(--fg-subtle)]">
              Sonuç bulunamadı.
            </Command.Empty>
            {filtered.map((item) => {
              const meta = TYPE_META[item.type];
              const Icon = meta.icon;
              return (
                <Command.Item
                  key={item.id}
                  value={`${item.title} ${item.description ?? ""}`}
                  onSelect={() => go(item.href)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer text-sm aria-selected:bg-[var(--accent-soft)] aria-selected:text-[var(--accent)]"
                >
                  <Icon className="w-4 h-4 text-[var(--fg-subtle)] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[var(--fg)] truncate">
                      {item.title}
                    </div>
                    {item.description && (
                      <div className="text-[10px] text-[var(--fg-subtle)] truncate">
                        {item.description}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--fg-subtle)] font-mono">
                    {meta.label}
                  </span>
                  <ArrowRight className="w-3 h-3 text-[var(--fg-subtle)]" />
                </Command.Item>
              );
            })}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
