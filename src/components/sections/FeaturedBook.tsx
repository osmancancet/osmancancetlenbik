import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { featuredBook } from "@/data/books";

/** Ana sayfada yeni kitabı öne çıkaran şerit. */
export function FeaturedBook() {
  const book = featuredBook;
  if (!book) return null;

  return (
    <section className="relative px-6 py-20 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-8">
            <span className="w-6 h-px bg-[var(--accent)]" />
            Yeni kitap
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-[180px_1fr] gap-8 md:gap-12 items-center">
          <Reveal>
            <Link href={`/kitaplar/${book.slug}`} className="block group">
              <Image
                src={book.cover}
                alt={book.coverAlt}
                width={1100}
                height={1422}
                sizes="180px"
                className="w-[180px] h-auto rounded-lg border border-[var(--border-strong)] transition-transform duration-500 group-hover:-translate-y-1"
              />
            </Link>
          </Reveal>

          <div className="min-w-0">
            <Reveal delay={0.05}>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
                <Link
                  href={`/kitaplar/${book.slug}`}
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  {book.title}
                </Link>
              </h2>
              <p className="mt-1.5 text-lg text-[var(--fg-muted)]">
                {book.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[var(--fg-muted)] leading-relaxed max-w-2xl">
                {book.excerpt}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href={`/kitaplar/${book.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] text-sm font-semibold rounded-md hover:opacity-90 transition-opacity"
                >
                  Kitabı incele
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {/* Tek bir mağazayı öne çıkarmak yerine sayıyı söyle;
                    satın alma linklerinin tamamı kitap sayfasında eşit duruyor. */}
                <span className="text-sm text-[var(--fg-subtle)]">
                  {book.stores.length} satış noktasında
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
