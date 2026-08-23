import Link from "next/link";
import {
  Globe,
  Smartphone,
  Network,
  Radar,
  Cpu,
  Bug,
  Code2,
  Server,
  Search,
  Brain,
  LineChart,
  GraduationCap,
  ShieldCheck,
  Check,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  services,
  categoryCopy,
  serviceFaq,
  type Service,
  type ServiceCategory,
} from "@/data/services";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { MailAction } from "@/components/MailAction";

const ICONS: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Network,
  Radar,
  Cpu,
  Bug,
  Code2,
  Server,
  Search,
  Brain,
  LineChart,
  GraduationCap,
  ShieldCheck,
};

const ORDER: ServiceCategory[] = ["guvenlik", "gelistirme", "veri", "egitim"];

const GENERIC_SUBJECT: Record<Locale, string> = {
  tr: "Proje / teklif talebi",
  en: "Project enquiry",
  de: "Projektanfrage",
  ar: "استفسار عن مشروع",
};

const GENERIC_TOPIC: Record<Locale, string> = {
  tr: "hizmetleriniz",
  en: "your services",
  de: "Ihre Leistungen",
  ar: "خدماتكم",
};

const FORM_LABEL: Record<Locale, string> = {
  tr: "İletişim formu",
  en: "Contact form",
  de: "Kontaktformular",
  ar: "نموذج التواصل",
};

const UI = {
  tr: {
    deliverables: "Neler teslim ediliyor",
    contact: "İletişime geçin",
    mailSubject: (title: string) => `${title} — teklif talebi`,
    mailBody: (title: string) =>
      `Merhaba Osman Can Bey,\n\n"${title}" hizmeti için teklif almak istiyorum.\n\nKurum:\nKapsam / ihtiyaç:\nHedef tarih:\n\nTeşekkürler,`,
    mailDirect: "Doğrudan e-posta gönderin",
    faqTitle: "Sıkça sorulan sorular",
    faqEyebrow: "SSS",
    ctaTitle: "Projenizi konuşalım.",
    ctaBody:
      "Kapsamı birlikte netleştirelim; iki iş günü içinde net bir zaman ve fiyat teklifiyle dönüş yapıyorum.",
    ctaButton: "Teklif isteyin",
    contactHref: "/iletisim",
  },
  en: {
    deliverables: "What you get",
    contact: "Get in touch",
    mailSubject: (title: string) => `${title} — request for quote`,
    mailBody: (title: string) =>
      `Hello Osman Can,\n\nI would like to request a quote for "${title}".\n\nOrganisation:\nScope / need:\nTarget date:\n\nThank you,`,
    mailDirect: "Email me directly",
    faqTitle: "Frequently asked questions",
    faqEyebrow: "FAQ",
    ctaTitle: "Let's talk about your project.",
    ctaBody:
      "We scope it together, and I come back within two working days with a firm timeline and quote.",
    ctaButton: "Request a quote",
    contactHref: "/en/contact",
  },
  de: {
    deliverables: "Was Sie bekommen",
    contact: "Kontakt aufnehmen",
    mailSubject: (title: string) => `${title} — Angebotsanfrage`,
    mailBody: (title: string) =>
      `Guten Tag Herr Çetlenbik,\n\nich möchte ein Angebot für "${title}" anfragen.\n\nUnternehmen:\nUmfang / Bedarf:\nWunschtermin:\n\nVielen Dank,`,
    mailDirect: "Schreiben Sie mir direkt",
    faqTitle: "Häufige Fragen",
    faqEyebrow: "FAQ",
    ctaTitle: "Sprechen wir über Ihr Projekt.",
    ctaBody:
      "Wir stecken den Umfang gemeinsam ab, und innerhalb von zwei Arbeitstagen erhalten Sie einen verbindlichen Zeitplan und Preis.",
    ctaButton: "Angebot anfragen",
    contactHref: "/de/kontakt",
  },
  ar: {
    deliverables: "ما الذي ستحصلون عليه",
    contact: "تواصل معي",
    mailSubject: (title: string) => `${title} — طلب عرض سعر`,
    mailBody: (title: string) =>
      `مرحبًا أستاذ عثمان جان،\n\nأرغب في الحصول على عرض سعر لخدمة "${title}".\n\nالمؤسسة:\nالنطاق / الحاجة:\nالموعد المستهدف:\n\nشكرًا لكم،`,
    mailDirect: "راسلوني مباشرة",
    faqTitle: "الأسئلة الشائعة",
    faqEyebrow: "أسئلة",
    ctaTitle: "لنتحدث عن مشروعكم.",
    ctaBody:
      "نحدّد النطاق معًا، ثم أعود إليكم خلال يومَي عمل بجدول زمني وعرض سعر محددين.",
    ctaButton: "اطلب عرض سعر",
    contactHref: "/ar/contact",
  },
} as const;

function ServiceCard({ s, locale }: { s: Service; locale: Locale }) {
  const Icon = ICONS[s.icon] ?? ShieldCheck;
  const copy = s.copy[locale];
  const t = UI[locale];

  return (
    <article
      id={s.slug}
      className="card rounded-lg p-6 h-full flex flex-col scroll-mt-24"
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="shrink-0 grid place-items-center w-9 h-9 rounded-md border border-[var(--border-strong)] bg-[var(--accent-soft)]">
          <Icon className="w-4 h-4 text-[var(--accent)]" aria-hidden />
        </span>
        <h3 className="text-lg font-semibold text-[var(--fg)] leading-snug pt-1.5">
          {copy.title}
        </h3>
      </div>

      <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-5">
        {copy.summary}
      </p>

      <div className="mb-5">
        <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--fg-subtle)] mb-2.5">
          {t.deliverables}
        </div>
        <ul className="space-y-1.5">
          {copy.deliverables.map((d) => (
            <li
              key={d}
              className="flex items-start gap-2 text-sm text-[var(--fg-muted)]"
            >
              <Check
                className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--accent)]"
                aria-hidden
              />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <div className="flex flex-wrap gap-2">
          {s.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border)] text-[var(--fg-subtle)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <MailAction
          className="mt-5"
          email={profile.email}
          subject={t.mailSubject(copy.title)}
          body={t.mailBody(copy.title)}
          label={t.contact}
          locale={locale}
          variant="outline"
        />
      </div>
    </article>
  );
}

export function Services({ locale = "tr" }: { locale?: Locale }) {
  const t = UI[locale];

  return (
    <div className="space-y-20">
      {ORDER.map((cat) => {
        const items = services.filter((s) => s.category === cat);
        if (items.length === 0) return null;
        const head = categoryCopy[cat][locale];

        return (
          <section key={cat} aria-labelledby={`svc-${cat}`}>
            <Reveal>
              <h2
                id={`svc-${cat}`}
                className="text-2xl md:text-3xl font-semibold text-[var(--fg)] tracking-tight"
              >
                {head.label}
              </h2>
              <p className="mt-3 mb-8 max-w-2xl text-[var(--fg-muted)] leading-relaxed">
                {head.blurb}
              </p>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2">
              {items.map((s) => (
                <ServiceCard key={s.slug} s={s} locale={locale} />
              ))}
            </div>
          </section>
        );
      })}

      {/* SSS — <details> kullanıldı: JavaScript'siz açılır ve tarayıcı
          botları içeriği ilk HTML'de görür (GEO için önemli). */}
      <section aria-labelledby="svc-faq">
        <Reveal>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
            <span className="w-6 h-px bg-[var(--accent)]" />
            {t.faqEyebrow}
          </div>
          <h2
            id="svc-faq"
            className="text-2xl md:text-3xl font-semibold text-[var(--fg)] tracking-tight mb-8"
          >
            {t.faqTitle}
          </h2>
        </Reveal>

        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {serviceFaq[locale].map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-[var(--fg)] font-medium marker:content-none">
                <span>{item.q}</span>
                <span
                  className="shrink-0 mt-1 text-[var(--accent)] transition-transform group-open:rotate-90 rtl:group-open:-rotate-90"
                  aria-hidden
                >
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </span>
              </summary>
              <p className="mt-3 pe-8 text-sm text-[var(--fg-muted)] leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="text-center pt-4">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--fg)] tracking-tight mb-3">
            {t.ctaTitle}
          </h2>
          <p className="text-[var(--fg-muted)] max-w-xl mx-auto mb-8">
            {t.ctaBody}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MailAction
              email={profile.email}
              subject={GENERIC_SUBJECT[locale]}
              body={t.mailBody(GENERIC_TOPIC[locale])}
              label={t.ctaButton}
              locale={locale}
              variant="primary"
            />
            <Link
              href={t.contactHref}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-strong)] text-[var(--fg)] text-sm font-medium rounded-md hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              {FORM_LABEL[locale]}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-[var(--fg-subtle)] font-mono">
            <span>{t.mailDirect}:</span>
            <MailAction
              email={profile.email}
              label={profile.email}
              locale={locale}
              variant="inline"
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
