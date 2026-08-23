import type { Metadata } from "next";
import { canonicalOnly } from "@/lib/seo/metadata";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { books } from "@/data/books";

export const metadata: Metadata = {
  title: "Kitaplarım",
  description:
    "Siber güvenlik ve sosyal mühendislik üzerine yazdığım kitaplar; künye bilgileri ve satın alma bağlantıları.",
  alternates: canonicalOnly("/kitaplar"),
};

export default function KitaplarPage() {
  return (
    <PageShell
      eyebrow="Yayınlar"
      title="Kitaplarım"
      subtitle="Siber güvenlik ve sosyal mühendislik üzerine yazdığım kitaplar."
    >
      <div className="grid gap-6">
        {books.map((book, i) => (
          <Reveal key={book.slug} delay={i * 0.05}>
            <Link
              href={`/kitaplar/${book.slug}`}
              className="group card rounded-lg p-6 md:p-7 grid sm:grid-cols-[132px_1fr_auto] gap-6 items-start hover:border-[var(--accent)]/40"
            >
              <Image
                src={book.cover}
                alt={book.coverAlt}
                width={1100}
                height={1422}
                sizes="132px"
                className="w-[132px] h-auto rounded border border-[var(--border)]"
              />

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--accent)] font-mono">
                    Kitap
                  </span>
                  <span className="font-mono text-xs text-[var(--fg-subtle)]">
                    {book.year} · {book.publisher}
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-semibold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                  {book.title}
                </h2>
                <p className="text-[var(--fg-muted)] mt-1">{book.subtitle}</p>

                <p className="text-sm text-[var(--fg-muted)] mt-4 leading-relaxed">
                  {book.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {book.keyFacts.map((f) => (
                    <span
                      key={f}
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--fg-subtle)]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <ArrowUpRight className="hidden sm:block w-4 h-4 text-[var(--fg-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
