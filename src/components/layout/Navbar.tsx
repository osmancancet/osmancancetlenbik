"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { localeFromPath, homePath, type Locale } from "@/lib/i18n";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

type NavLink = { href: string; label: string };

/** Üst çubukta doğrudan görünen bağlantılar. */
const primary: Record<Locale, NavLink[]> = {
  tr: [
    { href: "/hakkimda", label: "Hakkımda" },
    { href: "/hizmetler", label: "Hizmetler" },
    { href: "/dersler", label: "Dersler" },
    { href: "/yazilarim", label: "Yazılarım" },
    { href: "/projeler", label: "Projeler" },
    { href: "/iletisim", label: "İletişim" },
  ],
  en: [
    { href: "/en/about", label: "About" },
    { href: "/en/services", label: "Services" },
    { href: "/en/publications", label: "Publications" },
    { href: "/en/contact", label: "Contact" },
  ],
  de: [
    { href: "/de/ueber-mich", label: "Über mich" },
    { href: "/de/leistungen", label: "Leistungen" },
    { href: "/de/publikationen", label: "Publikationen" },
    { href: "/de/kontakt", label: "Kontakt" },
  ],
  ar: [
    { href: "/ar/about", label: "نبذة عني" },
    { href: "/ar/services", label: "الخدمات" },
    { href: "/ar/publications", label: "المنشورات" },
    { href: "/ar/contact", label: "تواصل" },
  ],
};

/**
 * Üst çubuğa sığmayan sayfalar. Genel bir "Daha fazla" yerine içeriği
 * tarif eden bir başlık altında toplanıyorlar — ziyaretçi açmadan da ne
 * bulacağını biliyor.
 *
 * Türkçe dışındaki diller yalnızca beş sayfa yayımladığı için hepsi çubuğa
 * sığıyor; orada menü hiç çizilmiyor (dil değiştirici zaten Türkçe siteye
 * dönüş yolunu veriyor).
 */
const secondary: Record<Locale, NavLink[]> = {
  tr: [
    { href: "/yayinlar", label: "Yayınlar" },
    { href: "/konferanslarim", label: "Konferanslarım" },
    { href: "/kitaplar", label: "Kitaplarım" },
    { href: "/cv", label: "Özgeçmiş" },
    { href: "/duyurular", label: "Duyurular" },
    { href: "/basin", label: "Basında" },
  ],
  en: [],
  de: [],
  ar: [],
};

const UI: Record<Locale, { home: string; more: string; search: string; menu: string }> = {
  tr: { home: "Ana Sayfa", more: "Akademik", search: "Ara", menu: "Menü" },
  en: { home: "Home", more: "Academic", search: "Search", menu: "Menu" },
  de: { home: "Startseite", more: "Akademisch", search: "Suche", menu: "Menü" },
  ar: { home: "الرئيسية", more: "أكاديمي", search: "بحث", menu: "القائمة" },
};

function dispatchOpenSearch() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  }
}

export function Navbar() {
  const pathname = usePathname();
  // Canlı ders odası (/canli/KOD) kendi başlık çubuğunu taşıyan tam ekran
  // bir görünüm — site menüsü sorunun üstüne binmesin. Katılım sayfası
  // (/canli) normal bir sayfa, menüsü durur.
  const isChromeless =
    pathname.startsWith("/admin") || /^\/canli\/[^/]+/.test(pathname);
  const locale = localeFromPath(pathname);
  const t = UI[locale];
  const home = homePath(locale);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Dışarı tıklama / Esc ile "daha fazla" menüsünü kapat.
  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  if (isChromeless) return null;

  const secondaryActive = secondary[locale].some((l) => l.href === pathname);

  const allLinks = [
    { href: home, label: t.home },
    ...primary[locale],
    ...secondary[locale],
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link
            href={home}
            className="font-mono text-sm tracking-tight text-[var(--fg)] hover:text-[var(--accent)] transition-colors shrink-0"
          >
            osmancancetlenbik
            <span className="text-[var(--accent)]">.</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {primary[locale].map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-2.5 py-2 text-sm transition-colors ${
                    active
                      ? "text-[var(--fg)]"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-2.5 right-2.5 -bottom-0.5 h-px bg-[var(--accent)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}

            {secondary[locale].length > 0 && (
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                className={`relative inline-flex items-center gap-1.5 px-2.5 py-2 text-sm transition-colors ${
                  secondaryActive || moreOpen
                    ? "text-[var(--fg)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                }`}
              >
                {t.more}
                <ChevronDown
                  className={`w-3 h-3 text-[var(--fg-subtle)] transition-transform ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
                {secondaryActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-2.5 right-6 -bottom-0.5 h-px bg-[var(--accent)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    role="menu"
                    className="absolute end-0 mt-3 min-w-[12.5rem] rounded-md border border-[var(--border-strong)] bg-[var(--bg)]/95 backdrop-blur-md py-1 shadow-[0_16px_40px_-24px_#000]"
                  >
                    {secondary[locale].map((l) => {
                      const active = pathname === l.href;
                      return (
                        <Link
                          key={l.href}
                          href={l.href}
                          role="menuitem"
                          aria-current={active ? "page" : undefined}
                          className={`group flex items-center gap-2.5 ps-3 pe-4 py-1.5 text-[13px] transition-colors ${
                            active
                              ? "text-[var(--accent)]"
                              : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                          }`}
                        >
                          {/* İnce vurgu çizgisi — dolgu yerine, üst çubuğun
                              altındaki etkin sayfa çizgisiyle aynı dil. */}
                          <span
                            aria-hidden
                            className={`h-px w-3 shrink-0 transition-all ${
                              active
                                ? "bg-[var(--accent)]"
                                : "bg-[var(--border-strong)] group-hover:bg-[var(--accent)] group-hover:w-4"
                            }`}
                          />
                          {l.label}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            )}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={dispatchOpenSearch}
              aria-label={`${t.search} (⌘K)`}
              className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] border border-[var(--border-strong)] rounded-md hover:border-[var(--accent)]/40 transition-colors"
            >
              <Search className="w-3 h-3" />
              <span>{t.search}</span>
              <kbd className="ml-2 font-mono text-[10px] px-1 py-0.5 rounded border border-[var(--border)] text-[var(--fg-subtle)]">
                ⌘K
              </kbd>
            </button>
            <LanguageToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 text-[var(--fg)]"
              aria-label={t.menu}
              aria-expanded={open}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-40 bg-[var(--bg)]/95 backdrop-blur-xl pt-20 overflow-y-auto"
          >
            <nav className="max-w-md mx-auto px-8 pb-16 flex flex-col gap-1">
              {allLinks.map((l, i) => {
                const active = pathname === l.href;
                return (
                  <motion.div
                    key={`${l.href}-${l.label}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.03 }}
                  >
                    <Link
                      href={l.href}
                      className={`block px-4 py-3.5 text-xl font-medium border-b border-[var(--border)] ${
                        active
                          ? "text-[var(--accent)]"
                          : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
