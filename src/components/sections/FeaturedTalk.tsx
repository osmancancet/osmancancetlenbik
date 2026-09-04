import Link from "next/link";
import { ArrowRight, Download, FileText, Wrench } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { publicTalks } from "@/presentations/publicTalks";
import { tools } from "@/data/tools";

/**
 * Ana sayfada öne çıkan sunum ve araçlar.
 *
 * Sunum LinkedIn'de paylaşılıyor; oradan gelen ziyaretçi ana sayfaya
 * düştüğünde sunumu ve araçları hemen bulabilmeli. Aksi hâlde en çok emek
 * verilen iki içerik menüde kaybolmuş oluyor.
 */
export function FeaturedTalk() {
  const talk = publicTalks[0];
  if (!talk) return null;

  return (
    <section className="relative px-6 py-24 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-[10px] text-[var(--accent)] uppercase tracking-[0.18em] mb-2">
            Öne çıkan
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--fg)] mb-10">
            Akademisyenler için hazırladıklarım
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-5">
          {/* Sunum */}
          <Reveal>
            <Link
              href={`/sunumlar/${talk.slug}`}
              className="group card rounded-lg p-8 h-full flex flex-col hover:border-[var(--accent)]/40"
            >
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
                <FileText className="w-3 h-3" />
                Sunum · 84 slayt
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-[var(--fg)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                {talk.title}
              </h3>
              <p className="text-[var(--fg-muted)] leading-relaxed mb-6 flex-1">
                Claude&apos;un akademik işte nereye girdiği, neyin gerçekten
                ücretsiz olduğu, istem yazma tekniği, yayıncıların yapay zekâ
                beyan kuralları ve veri gizliliği. Her iddianın kaynağı slaytta
                yazılı.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-2 text-[var(--accent)]">
                  Sunumu aç
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="inline-flex items-center gap-1.5 text-[var(--fg-subtle)]">
                  <Download className="w-3.5 h-3.5" />
                  PDF olarak da indirilebilir
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Araçlar */}
          <Reveal delay={0.08}>
            <Link
              href="/araclar"
              className="group card rounded-lg p-8 h-full flex flex-col hover:border-[var(--accent)]/40"
            >
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
                <Wrench className="w-3 h-3" />
                {tools.length} ücretsiz araç
              </div>
              <h3 className="text-xl font-semibold text-[var(--fg)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                Akademisyen araçları
              </h3>
              <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-5 flex-1">
                Atıf denetleyici, PDF bölücü, anonimleştirici, kaynakça
                biçimlendirici ve dokuz araç daha. Üyelik yok; çoğu tamamen
                tarayıcınızda çalışıyor, dosyanız bilgisayarınızdan çıkmıyor.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {tools.slice(0, 5).map((t) => (
                  <span
                    key={t.slug}
                    className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border)] text-[var(--fg-subtle)]"
                  >
                    {t.title}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 text-sm text-[var(--accent)]">
                Araçları aç
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
