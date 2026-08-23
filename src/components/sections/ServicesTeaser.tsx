import Link from "next/link";
import {
  Globe,
  Smartphone,
  Radar,
  Code2,
  Brain,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { featuredServices } from "@/data/services";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";

const ICONS: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Radar,
  Code2,
  Brain,
  GraduationCap,
  ShieldCheck,
};

const UI = {
  tr: {
    eyebrow: "Hizmetler",
    title: "Ne yapıyorum?",
    subtitle:
      "Sızma testinden mobil uygulama geliştirmeye, yapay zekâ projelerinden kurumsal eğitime kadar; kurumların hem güvenliğini hem ürününü aynı elden çıkarabildiği bir hizmet seti.",
    all: "Tüm hizmetleri gör",
    href: "/hizmetler",
  },
  en: {
    eyebrow: "Services",
    title: "What I do",
    subtitle:
      "Penetration testing, mobile and web app development, AI projects and corporate training — security and product delivered by the same pair of hands.",
    all: "See all services",
    href: "/en/services",
  },
  de: {
    eyebrow: "Leistungen",
    title: "Was ich mache",
    subtitle:
      "Penetrationstests, Mobil- und Webentwicklung, KI-Projekte und Unternehmensschulungen — Sicherheit und Produkt aus einer Hand.",
    all: "Alle Leistungen ansehen",
    href: "/de/leistungen",
  },
  ar: {
    eyebrow: "الخدمات",
    title: "ماذا أقدّم",
    subtitle:
      "اختبار الاختراق، وتطوير تطبيقات الهاتف والويب، ومشاريع الذكاء الاصطناعي، وتدريب الشركات — الأمن والمنتج من مصدر واحد.",
    all: "عرض جميع الخدمات",
    href: "/ar/services",
  },
} as const;

export function ServicesTeaser({ locale = "tr" }: { locale?: Locale }) {
  const t = UI[locale];

  return (
    <section className="relative px-6 py-24 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-[10px] text-[var(--accent)] uppercase tracking-[0.18em] mb-2">
            {t.eyebrow}
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--fg)] mb-3">
            {t.title}
          </h2>
          <p className="text-[var(--fg-muted)] max-w-2xl mb-10 leading-relaxed">
            {t.subtitle}
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s) => {
            const Icon = ICONS[s.icon] ?? ShieldCheck;
            const copy = s.copy[locale];
            return (
              <Link
                key={s.slug}
                href={`${t.href}#${s.slug}`}
                className="card rounded-lg p-5 group hover:border-[var(--accent)]/40 flex flex-col"
              >
                <span className="grid place-items-center w-9 h-9 rounded-md border border-[var(--border-strong)] bg-[var(--accent-soft)] mb-3">
                  <Icon className="w-4 h-4 text-[var(--accent)]" aria-hidden />
                </span>
                <h3 className="text-base font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors mb-1.5">
                  {copy.title}
                </h3>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed line-clamp-3">
                  {copy.summary}
                </p>
              </Link>
            );
          })}
        </div>

        <Reveal>
          <Link
            href={t.href}
            className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:gap-3 transition-all"
          >
            {t.all}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
