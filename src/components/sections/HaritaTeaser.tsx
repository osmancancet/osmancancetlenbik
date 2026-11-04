import { HaritaClient } from "@/app/(site)/harita/HaritaClient";
import type { HaritaSummary } from "@/lib/harita";

/** Ana sayfanın başındaki Dolandırıcılık Haritası. */
export function HaritaTeaser({ initial }: { initial: HaritaSummary | null }) {
  if (!initial) return null;
  return (
    <section id="harita" className="relative scroll-mt-16 px-6 pt-10 pb-12 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-2">
          <span className="w-6 h-px bg-[var(--accent)]" />
          Türkiye&apos;nin Dolandırıcılık Haritası
        </div>
        <div className="mb-5">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
              Sana hangi tuzak kuruldu?
            </h2>
            <p className="mt-2 text-[var(--fg-muted)] leading-relaxed">
              İlini ve sana denenen yöntemi işaretle — anonim, 10 saniye.
            </p>
          </div>
        </div>
        <HaritaClient initial={initial} />
      </div>
    </section>
  );
}
