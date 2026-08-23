"use client";

import { useState } from "react";
import { MailAction } from "@/components/MailAction";
import Image from "next/image";
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";
import { profile } from "@/data/profile";
import type { Book } from "@/data/books";

/* ------------------------------------------------------------------ *
 * Yardımcılar
 * ------------------------------------------------------------------ */

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
    <div className="border border-[var(--border)] rounded-md overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-4 py-2 bg-[var(--bg-card)] border-b border-[var(--border)]">
        <span className="text-[11px] uppercase tracking-wider font-mono text-[var(--fg-subtle)]">
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 text-[11px] text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" /> Kopyalandı
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" /> Kopyala
            </>
          )}
        </button>
      </div>
      <div className="px-4 py-3.5 text-[var(--fg-muted)] leading-relaxed space-y-3 text-[14px]">
        {children}
      </div>
    </div>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="flex items-baseline gap-3 mb-5 pb-2 border-b border-[var(--border)]">
        <span className="font-mono text-[11px] text-[var(--fg-subtle)]">{n}</span>
        <span className="text-sm uppercase tracking-[0.14em] text-[var(--fg)] font-medium">
          {title}
        </span>
      </h2>
      {children}
    </section>
  );
}

/** Varlık satırı — küçük önizleme, teknik künye, indirme. Galeri değil. */
function AssetRow({
  src,
  alt,
  title,
  meta,
  wide,
}: {
  src: string;
  alt: string;
  title: string;
  meta: string;
  wide?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-[var(--border)] last:border-0">
      <Image
        src={src}
        alt={alt}
        width={wide ? 1024 : 1100}
        height={wide ? 1024 : 1422}
        sizes="48px"
        className="w-12 h-auto rounded-sm border border-[var(--border)] flex-none"
      />
      <div className="min-w-0 flex-1">
        <div className="text-sm text-[var(--fg)]">{title}</div>
        <div className="text-[11px] font-mono text-[var(--fg-subtle)] mt-0.5">
          {meta}
        </div>
      </div>
      <a
        href={src}
        download
        className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline flex-none"
      >
        <Download className="w-3.5 h-3.5" />
        İndir
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function PressKit({ book }: { book: Book }) {
  const pk = book.pressKit;
  if (!pk) return null;

  const fullTitle = `${book.title} — ${book.subtitle}`;

  const kunye: Array<[string, string]> = [
    ["Kitap", fullTitle],
    ["Yazar", profile.name],
    ["Yayınevi", book.publisher],
    ["ISBN", book.isbn],
    ["Sayfa", `${book.pages}`],
    ["Baskı", `${book.edition}, ${book.year}`],
    ["Boyut", book.dimensions],
    ["Kâğıt", book.paper],
    ["Etiket fiyatı", book.listPrice],
  ];

  const kunyeText = kunye.map(([k, v]) => `${k}: ${v}`).join("\n");

  return (
    <div className="space-y-14">
      {/* ---------- 01 · Özet ---------- */}
      <Section n="01" title="Özet">
        <p className="text-[var(--fg-muted)] leading-relaxed text-[15px] max-w-3xl">
          {book.excerpt}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-[13px] font-mono text-[var(--fg-subtle)]">
          {kunye.slice(2, 7).map(([k, v]) => (
            <span key={k}>
              <span className="text-[var(--fg-subtle)]">{k}:</span>{" "}
              <span className="text-[var(--fg-muted)]">{v}</span>
            </span>
          ))}
        </div>
      </Section>

      {/* ---------- 02 · Basın metinleri ---------- */}
      <Section n="02" title="Basın metinleri">
        <p className="text-[13px] text-[var(--fg-subtle)] mb-4">
          Aşağıdaki metinler doğrudan yayımlanabilir; düzenleme veya kısaltma
          serbesttir.
        </p>
        <div className="space-y-4">
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

          <CopyBlock label="Künye" text={kunyeText}>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-[13px]">
              {kunye.map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <dt className="text-[var(--fg-subtle)] min-w-[6.5rem] flex-none">
                    {k}
                  </dt>
                  <dd className="text-[var(--fg-muted)]">{v}</dd>
                </div>
              ))}
            </dl>
          </CopyBlock>
        </div>
      </Section>

      {/* ---------- 03 · Haber açıları ---------- */}
      <Section n="03" title="Haber açıları">
        <ol className="space-y-4 max-w-3xl">
          {pk.angles.map((a, i) => (
            <li key={a.title} className="flex gap-4">
              <span className="font-mono text-[11px] text-[var(--fg-subtle)] pt-1 flex-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[var(--fg)] font-medium leading-snug">
                  {a.title}
                </h3>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed mt-1">
                  {a.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------- 04 · Görseller ---------- */}
      <Section n="04" title="Görseller">
        <div className="max-w-2xl">
          <AssetRow
            src={book.cover}
            alt={book.coverAlt}
            title="Kitap kapağı"
            meta="JPEG · 1100 × 1422 px · 236 KB"
          />
          <AssetRow
            src="/profile.png"
            alt={`${profile.name} portre fotoğrafı`}
            title="Yazar portresi"
            meta="PNG · 1024 × 1024 px · 1,3 MB"
            wide
          />
        </div>
        <p className="text-[13px] text-[var(--fg-subtle)] mt-4 max-w-2xl leading-relaxed">
          Görseller kitabın tanıtımına ilişkin haber ve yazılarda telifsiz
          kullanılabilir. Baskı için daha yüksek çözünürlüklü dosya gerekirse
          talep üzerine iletilir.
        </p>
      </Section>

      {/* ---------- 05 · Örnek bölüm (dosya eklendiyse) ---------- */}
      {pk.sampleChapterUrl && (
        <Section n="05" title="Örnek bölüm">
          <a
            href={pk.sampleChapterUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 text-sm text-[var(--accent)] hover:underline"
          >
            <FileText className="w-4 h-4" />
            Kitaptan bir vakanın tamamı (PDF)
          </a>
        </Section>
      )}

      {/* ---------- 06 · Satış noktaları ---------- */}
      <Section n={pk.sampleChapterUrl ? "06" : "05"} title="Satış noktaları">
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {[...book.stores]
            .sort((a, b) => a.name.localeCompare(b.name, "tr"))
            .map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
              >
                {s.name}
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            ))}
        </div>
      </Section>

      {/* ---------- 07 · İletişim ---------- */}
      <Section n={pk.sampleChapterUrl ? "07" : "06"} title="İletişim">
        <div className="max-w-2xl">
          <p className="text-[var(--fg-muted)] leading-relaxed mb-4 text-[15px]">
            Değerlendirme nüshası, röportaj ve program davetleri için doğrudan
            yazabilirsiniz.
          </p>
          <MailAction
            email={profile.email}
            subject={`Basın · ${fullTitle}`}
            label={profile.email}
            variant="inline"
          />
          <div className="mt-6 pt-4 border-t border-[var(--border)] text-[13px] text-[var(--fg-subtle)] leading-relaxed">
            {profile.name} · {profile.title.split("·")[0].trim()}
            <br />
            {profile.institution}
          </div>
        </div>
      </Section>
    </div>
  );
}
