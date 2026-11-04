import { HaritaClient } from "@/app/(site)/harita/HaritaClient";
import type { HaritaSummary } from "@/lib/harita";

/** Ana sayfanın başındaki Dolandırıcılık Haritası. */
export function HaritaTeaser({ initial }: { initial: HaritaSummary | null }) {
  if (!initial) return null;
  return (
    <section id="harita" className="relative scroll-mt-20 px-6 py-20 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
          <span className="w-6 h-px bg-[var(--accent)]" />
          Türkiye&apos;nin Dolandırıcılık Haritası
        </div>
        <div className="mb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[var(--fg)]">
              Sana hangi tuzak kuruldu?
            </h2>
            <p className="mt-3 text-[var(--fg-muted)] leading-relaxed">
              İlini ve sana ya da bir yakınına denenen yöntemi 10 saniyede, anonim olarak işaretle.
              Harita herkesin bildirimiyle canlı olarak büyüyor.
            </p>
          </div>
        </div>
        <HaritaClient initial={initial} />
      </div>
    </section>
  );
}
