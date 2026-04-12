import Link from "next/link";
import { Search, Home, ArrowRight } from "lucide-react";

const links = [
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/dersler", label: "Dersler" },
  { href: "/yazilarim", label: "Yazılarım" },
  { href: "/konferanslarim", label: "Konferanslarım" },
];

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-3">
          404
        </div>
        <h1 className="text-5xl md:text-6xl font-semibold text-[var(--fg)] tracking-tight mb-4">
          Sayfa bulunamadı
        </h1>
        <p className="text-[var(--fg-muted)] mb-10">
          Aradığın sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md hover:opacity-90 transition-opacity mb-10"
        >
          <Home className="w-4 h-4" />
          Ana Sayfaya Dön
        </Link>

        <div className="pt-8 border-t border-[var(--border)]">
          <div className="text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-4 flex items-center justify-center gap-2">
            <Search className="w-3 h-3" />
            Belki bunlardan biri
          </div>
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  {l.label}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
