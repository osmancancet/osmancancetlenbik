import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";
import { Reveal } from "@/components/ui/Reveal";
import { profileI18n } from "@/data/profile";
import { publications } from "@/data/publications";
import type { Locale } from "@/lib/i18n";

/**
 * Türkçe dışındaki dillerin ana sayfası. Türkçe ana sayfa veritabanına
 * bağlı (duyuru, ders, yazı akışı) ve o içerik çevrilmiyor; bu yüzden diğer
 * diller ortak, tamamen statik bir tanıtım sayfası paylaşıyor.
 */

const COPY = {
  en: {
    overviewEyebrow: "Overview",
    overviewTitle: "Three things I do well",
    highlights: [
      {
        label: "Security",
        body: "Web, mobile, network and IoT penetration testing with evidence-backed reporting and a free re-test after remediation.",
      },
      {
        label: "Engineering",
        body: "Mobile and web products built with React Native, Expo and Next.js — shipped to the App Store, Google Play and production.",
      },
      {
        label: "Research",
        body: `${publications.length} peer-reviewed publications on explainable AI, phishing classification and IoT security.`,
      },
    ],
    ctaEyebrow: "Contact",
    ctaTitle: "Let's work together.",
    ctaBody:
      "Reach out for a security assessment, a product build or a research collaboration.",
    contactLabel: "Contact",
    servicesLabel: "Services",
    contactHref: "/en/contact",
    servicesHref: "/en/services",
  },
  de: {
    overviewEyebrow: "Überblick",
    overviewTitle: "Drei Dinge, die ich gut kann",
    highlights: [
      {
        label: "Sicherheit",
        body: "Penetrationstests für Web, Mobil, Netzwerk und IoT — mit belegten Befunden und kostenlosem Nachtest nach der Behebung.",
      },
      {
        label: "Entwicklung",
        body: "Mobil- und Webprodukte mit React Native, Expo und Next.js — bis in den App Store, zu Google Play und in die Produktion.",
      },
      {
        label: "Forschung",
        body: `${publications.length} begutachtete Veröffentlichungen zu erklärbarer KI, Phishing-Klassifikation und IoT-Sicherheit.`,
      },
    ],
    ctaEyebrow: "Kontakt",
    ctaTitle: "Arbeiten wir zusammen.",
    ctaBody:
      "Melden Sie sich für eine Sicherheitsprüfung, eine Produktentwicklung oder eine Forschungskooperation.",
    contactLabel: "Kontakt",
    servicesLabel: "Leistungen",
    contactHref: "/de/kontakt",
    servicesHref: "/de/leistungen",
  },
  ar: {
    overviewEyebrow: "نظرة عامة",
    overviewTitle: "ثلاثة أمور أُتقنها",
    highlights: [
      {
        label: "الأمن",
        body: "اختبار اختراق للويب والهاتف والشبكات وإنترنت الأشياء، بتقارير مدعومة بالأدلة وإعادة اختبار مجانية بعد المعالجة.",
      },
      {
        label: "التطوير",
        body: "منتجات محمولة وويب باستخدام React Native و Expo و Next.js — حتى النشر على App Store و Google Play وبيئة الإنتاج.",
      },
      {
        label: "البحث",
        body: `${publications.length} منشورات محكّمة في الذكاء الاصطناعي القابل للتفسير وتصنيف التصيّد وأمن إنترنت الأشياء.`,
      },
    ],
    ctaEyebrow: "تواصل",
    ctaTitle: "لنعمل معًا.",
    ctaBody: "راسلوني لإجراء تقييم أمني، أو بناء منتج، أو تعاون بحثي.",
    contactLabel: "تواصل معي",
    servicesLabel: "الخدمات",
    contactHref: "/ar/contact",
    servicesHref: "/ar/services",
  },
} as const;

export function LocaleHome({ locale }: { locale: Exclude<Locale, "tr"> }) {
  const t = COPY[locale];

  return (
    <div className="pt-16">
      <Hero locale={locale} />

      <ServicesTeaser locale={locale} />

      <section className="relative px-6 py-24 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-[10px] text-[var(--accent)] uppercase tracking-[0.18em] mb-2">
              {t.overviewEyebrow}
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--fg)] mb-10">
              {t.overviewTitle}
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {t.highlights.map((h) => (
              <div key={h.label} className="card rounded-lg p-6">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-3">
                  {h.label}
                </div>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
                  {h.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="text-[10px] text-[var(--accent)] uppercase tracking-[0.18em] mb-3">
              {t.ctaEyebrow}
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--fg)] tracking-tight mb-4">
              {t.ctaTitle}
            </h2>
            <p className="text-[var(--fg-muted)] mb-8">
              {profileI18n[locale].tagline} {t.ctaBody}
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                href={t.contactHref}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] text-sm font-semibold rounded-md hover:opacity-90 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                {t.contactLabel}
              </Link>
              <Link
                href={t.servicesHref}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-strong)] text-[var(--fg)] text-sm font-medium rounded-md hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                {t.servicesLabel}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
