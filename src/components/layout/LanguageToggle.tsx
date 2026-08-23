"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Languages, Check } from "lucide-react";
import {
  locales,
  localeNames,
  localeFromPath,
  switchLocalePath,
  htmlLang,
} from "@/lib/i18n";

/**
 * TR / EN / DE / AR seçici. Bulunulan sayfanın karşılığı varsa oraya,
 * yoksa hedef dilin ana sayfasına götürür (bkz. switchLocalePath).
 * Dört seçenek üst çubuğa sığmadığı için açılır menü olarak duruyor.
 */
export function LanguageToggle() {
  const pathname = usePathname() || "/";
  const active = localeFromPath(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Dil / Language"
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[var(--border-strong)] text-[11px] font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--accent)]/40 transition-colors"
      >
        <Languages className="w-3.5 h-3.5" aria-hidden />
        {active}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute end-0 mt-2 min-w-40 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] p-1.5 shadow-xl shadow-black/50 z-50"
        >
          {locales.map((l) => {
            const isActive = l === active;
            return (
              <Link
                key={l}
                href={switchLocalePath(pathname, l)}
                hrefLang={htmlLang[l]}
                lang={htmlLang[l]}
                role="menuitem"
                aria-current={isActive ? "true" : undefined}
                dir={l === "ar" ? "rtl" : "ltr"}
                className={`flex items-center justify-between gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? "text-[var(--accent)] bg-[var(--accent-soft)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--accent-soft)]"
                }`}
              >
                <span>{localeNames[l]}</span>
                {isActive ? (
                  <Check className="w-3.5 h-3.5 shrink-0" aria-hidden />
                ) : (
                  <span className="font-mono text-[10px] uppercase text-[var(--fg-subtle)]">
                    {l}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
