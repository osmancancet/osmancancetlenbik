import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { PressKit } from "@/components/sections/PressKit";
import { books, getBook } from "@/data/books";

/**
 * GİZLİ SAYFA — yalnızca linki bilen ulaşır.
 *
 * Nerelerde YOK (bilerek):
 *  - Navbar (components/layout/Navbar.tsx)
 *  - sitemap.xml (app/sitemap.ts yalnızca /kitaplar/<slug> ekliyor)
 *  - ⌘K araması (app/api/search/route.ts)
 *  - Kitap sayfasından bir bağlantı
 *
 * robots.txt'ye "Disallow" YAZILMADI: robots.txt herkese açık bir dosya,
 * gizli yolu oraya yazmak tam tersine adresi ilan etmek olurdu. Bunun yerine
 * sayfa düzeyinde noindex kullanılıyor — projedeki /mcbukaf/* sayfalarıyla
 * aynı desen.
 */
export const metadata: Metadata = {
  title: "Basın Kiti",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return books.filter((b) => b.pressKit).map((b) => ({ slug: b.slug }));
}

export default async function BasinKitiPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book?.pressKit) notFound();

  return (
    <section className="relative pt-32 pb-24 px-6">
      <div className="relative max-w-4xl mx-auto">
        <Reveal>
          <Link
            href={`/kitaplar/${book.slug}`}
            className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            {book.title}
          </Link>
        </Reveal>

        <header className="mb-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
              <span className="w-6 h-px bg-[var(--accent)]" />
              Basın Kiti
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--fg)]">
              {book.title}
            </h1>
            <p className="mt-2 text-xl text-[var(--fg-muted)]">
              {book.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 inline-flex items-start gap-2 text-xs text-[var(--fg-subtle)] border border-[var(--border)] rounded-md px-3 py-2 max-w-xl leading-relaxed">
              <Lock className="w-3.5 h-3.5 mt-0.5 flex-none" />
              Bu sayfa sitede listelenmiyor ve arama motorlarına kapalıdır.
              Görsel ve metinler basın kullanımı için serbesttir.
            </p>
          </Reveal>
        </header>

        <PressKit book={book} />
      </div>
    </section>
  );
}
