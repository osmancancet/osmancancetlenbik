"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Mail,
  Newspaper,
} from "lucide-react";
import { profile } from "@/data/profile";
import type { Book } from "@/data/books";

/** Gazetecinin metni tek tıkla alabilmesi için kopyalanabilir blok. */
function CopyBlock({
  label,
  text,
  children,
}: {
  label: string;
  text: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* pano izni yoksa sessizce geç — metin zaten seçilebilir durumda */
    }
  }

  return (
    <div className="card rounded-lg overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-[var(--border)]">
        <span className="text-xs uppercase tracking-wider font-mono text-[var(--fg-subtle)]">
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" /> Kopyalandı
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" /> Kopyala
            </>
          )}
        </button>
      </div>
      <div className="px-5 py-4 text-[var(--fg-muted)] leading-relaxed space-y-3 text-[15px]">
        {children}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-5 flex items-center gap-2">
        <span className="w-6 h-px bg-[var(--accent)]" />
        {title}
      </h2>
      {children}
    </section>
  );
}

export function PressKit({ book }: { book: Book }) {
  const pk = book.pressKit;
  if (!pk) return null;

  const fullTitle = `${book.title} — ${book.subtitle}`;

  const kunyeText = [
    `Kitap: ${fullTitle}`,
    `Yazar: ${profile.name}`,
    `Yayınevi: ${book.publisher}`,
    `ISBN: ${book.isbn}`,
    `Sayfa: ${book.pages}`,
    `Baskı: ${book.edition}, ${book.year}`,
    `Boyut: ${book.dimensions}`,
    `Etiket fiyatı: ${book.listPrice}`,
  ].join("\n");

  return (
    <div className="space-y-16">
      {/* ---------- Görseller ---------- */}
      <Section title="Görseller">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="card rounded-lg p-5">
            <Image
              src={book.cover}
              alt={book.coverAlt}
              width={1100}
              height={1422}
              sizes="(max-width: 640px) 90vw, 300px"
              className="w-full max-w-[220px] h-auto rounded border border-[var(--border)] mb-4"
            />
            <p className="text-sm text-[var(--fg)] mb-1">Kitap kapağı</p>
            <p className="text-xs text-[var(--fg-subtle)] font-mono mb-3">
              JPEG · 1100 × 1422 px
            </p>
            <a
              href={book.cover}
              download
              className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
            >
              <Download className="w-4 h-4" />
              İndir
            </a>
          </div>

          <div className="card rounded-lg p-5">
            <Image
              src="/profile.png"
              alt={`${profile.name} portre fotoğrafı`}
              width={1024}
              height={1024}
              sizes="(max-width: 640px) 90vw, 220px"
              className="w-full max-w-[220px] h-auto rounded border border-[var(--border)] mb-4"
            />
            <p className="text-sm text-[var(--fg)] mb-1">Yazar fotoğrafı</p>
            <p className="text-xs text-[var(--fg-subtle)] font-mono mb-3">
              PNG · 1024 × 1024 px
            </p>
            <a
              href="/profile.png"
              download
              className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
            >
              <Download className="w-4 h-4" />
              İndir
            </a>
          </div>
        </div>
      </Section>

      {/* ---------- Künye ---------- */}
      <Section title="Künye">
        <CopyBlock label="Künye bilgileri" text={kunyeText}>
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {[
              ["Kitap", fullTitle],
              ["Yazar", profile.name],
              ["Yayınevi", book.publisher],
              ["ISBN", book.isbn],
              ["Sayfa", `${book.pages}`],
              ["Baskı", `${book.edition}, ${book.year}`],
              ["Boyut", book.dimensions],
              ["Kâğıt", book.paper],
              ["Etiket fiyatı", book.listPrice],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-3">
                <dt className="text-[var(--fg-subtle)] min-w-[6.5rem] flex-none">
                  {k}
                </dt>
                <dd className="text-[var(--fg-muted)]">{v}</dd>
              </div>
            ))}
          </dl>
        </CopyBlock>
      </Section>

      {/* ---------- Basın metinleri ---------- */}
      <Section title="Basın metinleri">
        <div className="space-y-5">
          <CopyBlock label="Kısa tanıtım · tek paragraf" text={pk.shortPitch}>
            <p>{pk.shortPitch}</p>
          </CopyBlock>

          <CopyBlock label="Uzun basın metni" text={pk.longPitch.join("\n\n")}>
            {pk.longPitch.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </CopyBlock>

          <CopyBlock label="Yazar tanıtımı" text={pk.authorBio}>
            <p>{pk.authorBio}</p>
          </CopyBlock>
        </div>
      </Section>

      {/* ---------- Haber açıları ---------- */}
      <Section title="Haber açıları">
        <div className="grid sm:grid-cols-2 gap-4">
          {pk.angles.map((a) => (
            <div key={a.title} className="card rounded-lg p-5">
              <div className="flex items-start gap-3">
                <Newspaper className="w-4 h-4 text-[var(--accent)] mt-1 flex-none" />
                <div>
                  <h3 className="text-[var(--fg)] font-medium mb-1.5 leading-snug">
                    {a.title}
                  </h3>
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
                    {a.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- Örnek bölüm (dosya eklendiyse) ---------- */}
      {pk.sampleChapterUrl && (
        <Section title="Örnek bölüm">
          <a
            href={pk.sampleChapterUrl}
            target="_blank"
            rel="noreferrer"
            className="card rounded-lg p-5 inline-flex items-center gap-3 hover:border-[var(--accent)]/50 transition-colors"
          >
            <FileText className="w-5 h-5 text-[var(--accent)]" />
            <span className="text-[var(--fg)]">
              Örnek bölüm (PDF)
              <span className="block text-xs text-[var(--fg-subtle)] mt-0.5">
                Kitaptan bir vakanın tamamı
              </span>
            </span>
            <Download className="w-4 h-4 text-[var(--fg-subtle)] ml-2" />
          </a>
        </Section>
      )}

      {/* ---------- Satış noktaları ---------- */}
      <Section title="Satış noktaları">
        <div className="flex flex-wrap gap-2">
          {[...book.stores]
            .sort((a, b) => a.name.localeCompare(b.name, "tr"))
            .map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded border border-[var(--border-strong)] text-[var(--fg-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/50 transition-colors"
              >
                {s.name}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
        </div>
      </Section>

      {/* ---------- İletişim ---------- */}
      <Section title="İletişim">
        <div className="card rounded-lg p-6">
          <p className="text-[var(--fg-muted)] mb-4 leading-relaxed">
            Röportaj, değerlendirme nüshası talebi ve program davetleri için
            doğrudan yazabilirsiniz.
          </p>
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent(
              `Basın · ${fullTitle}`
            )}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] text-sm font-semibold rounded-md hover:opacity-90 transition-opacity"
          >
            <Mail className="w-4 h-4" />
            {profile.email}
          </a>
        </div>
      </Section>
    </div>
  );
}
