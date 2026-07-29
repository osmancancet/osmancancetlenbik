"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  AudioLines,
  CreditCard,
  ExternalLink,
  Gamepad2,
  Mail,
  Phone,
  QrCode,
  ShieldCheck,
  ShoppingCart,
  Usb,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { Book, BookStore } from "@/data/books";

/**
 * Mağazaları Türkçe alfabeye göre sıralar.
 * localeCompare("tr") şart: varsayılan İngilizce sıralama "Kitapseç"i
 * "Kitapsepeti"den sonraya atar (ç > p sanır) ve "İstanbul"u yanlış yere koyar.
 */
function sortedStores(stores: BookStore[]): BookStore[] {
  return [...stores].sort((a, b) => a.name.localeCompare(b.name, "tr"));
}

/** data/books.ts'teki ikon adlarını bileşene bağlar. */
const ICONS: Record<string, LucideIcon> = {
  Phone,
  Mail,
  Usb,
  AudioLines,
  QrCode,
  CreditCard,
  ShieldCheck,
  Gamepad2,
};

export function BookDetail({ book }: { book: Book }) {
  return (
    <div className="space-y-20">
      {/* ---------- Kapak + satın alma ---------- */}
      <div className="grid lg:grid-cols-[minmax(0,340px)_1fr] gap-10 lg:gap-14 items-start">
        <Reveal>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-lg overflow-hidden border border-[var(--border-strong)] bg-[var(--bg-card)]"
          >
            <Image
              src={book.cover}
              alt={book.coverAlt}
              width={1100}
              height={1422}
              priority
              sizes="(max-width: 1024px) 80vw, 340px"
              className="w-full h-auto"
            />
          </motion.div>
        </Reveal>

        <div className="min-w-0">
          <Reveal delay={0.05}>
            <p className="text-[var(--fg-muted)] text-lg leading-relaxed mb-6">
              <span className="text-[var(--accent)] font-medium">
                {book.tagline}
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-8">
              {book.keyFacts.map((f) => (
                <span
                  key={f}
                  className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded border border-[var(--border-strong)] text-[var(--fg-muted)] font-mono"
                >
                  {f}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Satın alma linkleri — hepsi eşit, Türkçe alfabeye göre sıralı */}
          <Reveal delay={0.15}>
            <div>
              <h2 className="text-xs uppercase tracking-[0.18em] text-[var(--fg-subtle)] font-mono mb-4">
                Satın al · {book.stores.length} satış noktası
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {sortedStores(book.stores).map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group card inline-flex items-center gap-2.5 px-4 py-3 rounded-md text-sm font-medium text-[var(--fg)] hover:border-[var(--accent)]/50 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4 text-[var(--accent)] flex-none" />
                    <span className="truncate">{s.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto flex-none text-[var(--fg-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                ))}
              </div>
              <p className="mt-3 text-xs text-[var(--fg-subtle)]">
                Yayınevi etiket fiyatı {book.listPrice}. Mağaza fiyatları
                değişkendir.
              </p>
            </div>
          </Reveal>

          {/* Künye */}
          <Reveal delay={0.2}>
            <dl className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm border-t border-[var(--border)] pt-6">
              {[
                ["Yayınevi", book.publisher],
                ["ISBN", book.isbn],
                ["Sayfa", `${book.pages}`],
                ["Baskı", `${book.edition} · ${book.year}`],
                ["Boyut", book.dimensions],
                ["Kâğıt", book.paper],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <dt className="text-[var(--fg-subtle)] min-w-[5.5rem]">{k}</dt>
                  <dd className="text-[var(--fg-muted)] font-mono text-[13px]">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* ---------- Kitap hakkında ---------- */}
      <section>
        <Reveal>
          <h2 className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-6 flex items-center gap-2">
            <span className="w-6 h-px bg-[var(--accent)]" />
            Kitap hakkında
          </h2>
        </Reveal>
        <div className="max-w-3xl space-y-5">
          {book.description.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-[var(--fg-muted)] leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Konular ---------- */}
      <section>
        <Reveal>
          <h2 className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-6 flex items-center gap-2">
            <span className="w-6 h-px bg-[var(--accent)]" />
            Kitapta ne var
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {book.highlights.map((h, i) => {
            const Icon = ICONS[h.icon] ?? ShieldCheck;
            return (
              <Reveal key={h.label} delay={i * 0.04}>
                <div className="card rounded-lg p-5 h-full">
                  <Icon className="w-5 h-5 text-[var(--accent)] mb-3" />
                  <p className="text-sm text-[var(--fg)] leading-snug">
                    {h.label}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
