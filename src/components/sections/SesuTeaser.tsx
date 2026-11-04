import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/** Ana sayfada Sesu ürün sayfasına giden kısa şerit. */
export function SesuTeaser() {
  return (
    <section className="relative px-6 py-20 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-8">
            <span className="w-6 h-px bg-[var(--accent)]" />
            Mobil uygulama
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-[88px_1fr] gap-6 md:gap-10 items-center">
          <Reveal>
            <Link href="/sesu" className="block group">
              <Image
                src="/sesu/sesu-icon.png"
                alt="Sesu uygulama simgesi"
                width={88}
                height={88}
                className="rounded-[22px] transition-transform duration-500 group-hover:-translate-y-1"
              />
            </Link>
          </Reveal>

          <div className="min-w-0">
            <Reveal delay={0.05}>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
                <Link href="/sesu" className="hover:text-[var(--accent)] transition-colors">
                  Sesu
                </Link>
              </h2>
              <p className="mt-3 max-w-2xl text-[var(--fg-muted)] leading-relaxed">
                Dil ve konuşma terapistleri için ücretsiz, reklamsız ve
                çevrimdışı Türkçe egzersiz uygulaması. Aileler seans arasındaki
                ev ödevini buradan sürdürür.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/sesu"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] text-sm font-semibold rounded-md hover:opacity-90 transition-opacity"
              >
                Uygulamayı incele
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
