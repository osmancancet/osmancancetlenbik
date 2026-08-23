import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { BookDetail } from "@/components/sections/BookDetail";
import { books, getBook } from "@/data/books";
import { absoluteUrl } from "@/lib/site";
import { bookJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: "Kitap Bulunamadı" };

  const title = `${book.title} — ${book.subtitle}`;
  const image = absoluteUrl(book.cover);

  return {
    title,
    description: book.excerpt,
    alternates: { canonical: `/kitaplar/${slug}` },
    openGraph: {
      title,
      description: book.excerpt,
      type: "book",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: book.excerpt,
      images: [image],
    },
  };
}

export default async function KitapDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  return (
    <section className="relative pt-32 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          bookJsonLd({
            title: `${book.title} — ${book.subtitle}`,
            description: book.excerpt,
            url: absoluteUrl(`/kitaplar/${book.slug}`),
            image: absoluteUrl(book.cover),
            isbn: book.isbn,
            publisher: book.publisher,
            pages: book.pages,
            year: book.year,
            storeUrls: book.stores.map((s) => s.url),
          })
        )}
      />

      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <Link
            href="/kitaplar"
            className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Kitaplar
          </Link>
        </Reveal>

        <header className="mb-14 max-w-3xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
              <span className="w-6 h-px bg-[var(--accent)]" />
              {book.publisher} · {book.year}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[var(--fg)]">
              {book.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-xl md:text-2xl text-[var(--fg-muted)]">
              {book.subtitle}
            </p>
          </Reveal>
        </header>

        <BookDetail book={book} />
      </div>
    </section>
  );
}
