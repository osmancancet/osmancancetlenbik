"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { getPresentation } from "@/presentations/registry";

export function PresentationHost({
  slug,
  backHref,
}: {
  slug: string;
  backHref: string;
}) {
  const entry = getPresentation(slug);

  if (!entry) {
    return (
      <div className="fixed inset-0 z-[100] bg-[var(--bg)] flex items-center justify-center p-8 text-center">
        <div>
          <p className="text-[var(--fg-muted)] mb-4">
            <span className="font-mono text-[var(--accent)]">{slug}</span>{" "}
            adında bir sunum bulunamadı.
          </p>
          <Link
            href={backHref}
            className="text-sm text-[var(--accent)] hover:underline"
          >
            ← Geri dön
          </Link>
        </div>
      </div>
    );
  }

  const { Component } = entry;

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
      <Component />
      <Link
        href={backHref}
        aria-label="Sunumdan çık"
        className="fixed top-3 right-3 z-[110] w-9 h-9 flex items-center justify-center rounded-full bg-black/60 backdrop-blur border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors"
      >
        <X className="w-4 h-4" />
      </Link>
    </div>
  );
}
