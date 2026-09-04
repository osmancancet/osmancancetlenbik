import type { Metadata } from "next";
import Link from "next/link";
import {
  FileSearch,
  Scissors,
  EyeOff,
  Quote,
  Languages,
  Calculator,
  Shuffle,
  ArrowUpRight,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { tools } from "@/data/tools";
import { seoMeta } from "@/lib/seo/metadata";
import { InstallPrompt } from "@/components/tools/InstallPrompt";

const ICONS: Record<string, LucideIcon> = {
  FileSearch,
  Scissors,
  EyeOff,
  Quote,
  Languages,
  Calculator,
  Shuffle,
};

export const metadata: Metadata = seoMeta({
  path: "/araclar",
  title: "Akademisyen Araçları — Ücretsiz ve Tarayıcıda Çalışan",
  description:
    "Atıf denetleyici, PDF bölücü, anonimleştirici, kaynakça biçimlendirici, Türkçe karakter düzeltici, not hesaplayıcı ve sınav karıştırıcı. Hepsi ücretsiz, çoğu tarayıcıdan çıkmadan çalışıyor.",
  keywords: [
    "akademisyen araçları",
    "doi kontrol",
    "pdf böl",
    "apa kaynakça oluşturma",
    "türkçe karakter düzeltme",
    "ağırlıklı not hesaplama",
    "sınav formu oluşturma",
  ],
});

export default function AraclarPage() {
  return (
    <PageShell
      eyebrow="Araçlar"
      title="Akademisyen araçları."
      subtitle="Hepsi ücretsiz, üyelik yok. Çoğu tamamen tarayıcınızda çalışıyor — dosyanız bilgisayarınızdan çıkmıyor. Masaüstüne uygulama olarak da kurabilirsiniz."
    >
      <div className="mb-10">
        <InstallPrompt />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((t, i) => {
          const Icon = ICONS[t.icon] ?? FileSearch;
          return (
            <Reveal key={t.slug} delay={i * 0.04}>
              <Link
                href={`/araclar/${t.slug}`}
                className="group card rounded-lg p-6 h-full flex flex-col hover:border-[var(--accent)]/40"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="grid place-items-center w-10 h-10 rounded-md border border-[var(--border-strong)] bg-[var(--accent-soft)]">
                    <Icon className="w-4 h-4 text-[var(--accent)]" />
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--fg-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h2 className="text-lg font-semibold text-[var(--fg)] mb-1.5 group-hover:text-[var(--accent)] transition-colors">
                  {t.title}
                </h2>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed flex-1">
                  {t.summary}
                </p>

                <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center gap-2">
                  {t.offline && (
                    <ShieldCheck className="w-3 h-3 text-[var(--accent)] shrink-0" />
                  )}
                  <span className="text-[11px] text-[var(--fg-subtle)] leading-snug">
                    {t.problem}
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </PageShell>
  );
}
