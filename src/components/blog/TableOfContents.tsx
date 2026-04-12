"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="İçindekiler" className="sticky top-24">
      <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-subtle)] font-mono mb-4">
        İçindekiler
      </div>
      <ul className="space-y-2 border-l border-[var(--border)]">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 2) * 12 + 16}px` }}
            >
              <a
                href={`#${item.id}`}
                className={`block text-xs leading-relaxed transition-colors -ml-px border-l-2 pl-3 ${
                  isActive
                    ? "text-[var(--accent)] border-[var(--accent)] font-medium"
                    : "text-[var(--fg-muted)] border-transparent hover:text-[var(--fg)]"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
