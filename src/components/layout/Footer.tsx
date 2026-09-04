"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile, profileTaglines } from "@/data/profile";
import { services } from "@/data/services";
import { localeFromPath, homePath, type Locale } from "@/lib/i18n";

const TAGLINE: Record<Locale, string> = {
  tr: profileTaglines.tr,
  en: profileTaglines.en,
  de: profileTaglines.de,
  ar: profileTaglines.ar,
};

const COUNT_LABEL: Record<Locale, (n: number) => string> = {
  tr: (n) => `${n} hizmet · Manisa, Türkiye`,
  en: (n) => `${n} services · Manisa, Türkiye`,
  de: (n) => `${n} Leistungen · Manisa, Türkei`,
  ar: (n) => `${n} خدمة · مانيسا، تركيا`,
};

const COLUMNS: Record<
  Locale,
  ReadonlyArray<{ title: string; links: ReadonlyArray<{ href: string; label: string }> }>
> = {
  tr: [
    {
      title: "Hizmetler",
      links: [
        { href: "/hizmetler#web-sizma-testi", label: "Web Sızma Testi" },
        { href: "/hizmetler#mobil-sizma-testi", label: "Mobil Sızma Testi" },
        {
          href: "/hizmetler#mobil-uygulama-gelistirme",
          label: "Mobil Uygulama Geliştirme",
        },
        {
          href: "/hizmetler#web-uygulamasi-gelistirme",
          label: "Web Uygulaması Geliştirme",
        },
        { href: "/hizmetler", label: "Tüm hizmetler" },
      ],
    },
    {
      title: "Akademik",
      links: [
        { href: "/dersler", label: "Dersler" },
        { href: "/yayinlar", label: "Yayınlar" },
        { href: "/konferanslarim", label: "Konferanslarım" },
        { href: "/kitaplar", label: "Kitaplarım" },
        { href: "/cv", label: "Özgeçmiş" },
      ],
    },
    {
      title: "Site",
      links: [
        { href: "/hakkimda", label: "Hakkımda" },
        { href: "/yazilarim", label: "Yazılarım" },
        { href: "/projeler", label: "Projeler" },
        { href: "/basin", label: "Basında" },
        { href: "/duyurular", label: "Duyurular" },
        { href: "/iletisim", label: "İletişim" },
      ],
    },
  ],
  en: [
    {
      title: "Services",
      links: [
        { href: "/en/services#web-sizma-testi", label: "Web Penetration Testing" },
        {
          href: "/en/services#mobil-sizma-testi",
          label: "Mobile Penetration Testing",
        },
        {
          href: "/en/services#mobil-uygulama-gelistirme",
          label: "Mobile App Development",
        },
        {
          href: "/en/services#web-uygulamasi-gelistirme",
          label: "Web App Development",
        },
        { href: "/en/services", label: "All services" },
      ],
    },
    {
      title: "About",
      links: [
        { href: "/en/about", label: "About me" },
        { href: "/en/publications", label: "Publications" },
        { href: "/en/contact", label: "Contact" },
      ],
    },
    {
      title: "Türkçe",
      links: [
        { href: "/", label: "Türkçe ana sayfa" },
        { href: "/hizmetler", label: "Hizmetler" },
        { href: "/yazilarim", label: "Blog" },
      ],
    },
  ],
  de: [
    {
      title: "Leistungen",
      links: [
        { href: "/de/leistungen#web-sizma-testi", label: "Web-Penetrationstest" },
        {
          href: "/de/leistungen#mobil-sizma-testi",
          label: "Mobile Penetrationstests",
        },
        {
          href: "/de/leistungen#mobil-uygulama-gelistirme",
          label: "App-Entwicklung",
        },
        {
          href: "/de/leistungen#web-uygulamasi-gelistirme",
          label: "Web-Entwicklung",
        },
        { href: "/de/leistungen", label: "Alle Leistungen" },
      ],
    },
    {
      title: "Über mich",
      links: [
        { href: "/de/ueber-mich", label: "Über mich" },
        { href: "/de/publikationen", label: "Publikationen" },
        { href: "/de/kontakt", label: "Kontakt" },
      ],
    },
    {
      title: "Türkçe",
      links: [
        { href: "/", label: "Türkische Startseite" },
        { href: "/hizmetler", label: "Leistungen (TR)" },
        { href: "/yazilarim", label: "Blog" },
      ],
    },
  ],
  ar: [
    {
      title: "الخدمات",
      links: [
        { href: "/ar/services#web-sizma-testi", label: "اختبار اختراق الويب" },
        {
          href: "/ar/services#mobil-sizma-testi",
          label: "اختبار اختراق التطبيقات",
        },
        {
          href: "/ar/services#mobil-uygulama-gelistirme",
          label: "تطوير تطبيقات الهاتف",
        },
        {
          href: "/ar/services#web-uygulamasi-gelistirme",
          label: "تطوير تطبيقات الويب",
        },
        { href: "/ar/services", label: "جميع الخدمات" },
      ],
    },
    {
      title: "نبذة",
      links: [
        { href: "/ar/about", label: "نبذة عني" },
        { href: "/ar/publications", label: "المنشورات" },
        { href: "/ar/contact", label: "تواصل معي" },
      ],
    },
    {
      title: "التركية",
      links: [
        { href: "/", label: "الصفحة الرئيسية بالتركية" },
        { href: "/hizmetler", label: "الخدمات (تركي)" },
        { href: "/yazilarim", label: "المدونة" },
      ],
    },
  ],
};

export function Footer() {
  const pathname = usePathname() || "/";
  // Bkz. Navbar: canlı ders odası kendi düzenini yönetiyor.
  if (pathname.startsWith("/admin") || /^\/canli\/[^/]+/.test(pathname))
    return null;

  const locale = localeFromPath(pathname);
  const cols = COLUMNS[locale];
  const year = new Date().getFullYear();
  const tagline = TAGLINE[locale];
  const serviceCount = services.length;

  return (
    <footer className="relative border-t border-[var(--border)] px-6 pt-14 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              href={homePath(locale)}
              className="font-mono text-sm text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
            >
              osmancancetlenbik
              <span className="text-[var(--accent)]">.</span>
            </Link>
            <p className="mt-3 text-sm text-[var(--fg-muted)] leading-relaxed max-w-xs">
              {tagline}
            </p>
            <p className="mt-3 text-xs text-[var(--fg-subtle)] font-mono">
              {COUNT_LABEL[locale](serviceCount)}
            </p>
          </div>

          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-3">
                {col.title}
              </div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--fg-muted)]">
          <div className="font-mono">
            © {year} {profile.name}
          </div>
          <div className="font-mono text-[var(--fg-subtle)]">
            {profile.email}
          </div>
        </div>
      </div>
    </footer>
  );
}
