"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Check,
  ExternalLink,
  LoaderCircle,
  Search,
  X,
} from "lucide-react";

/**
 * Atıf denetleyici.
 *
 * Kaynakçadan DOI'leri ayıklayıp her birini CrossRef'e sorar. Amaç, yapay
 * zekânın ürettiği uydurma atıfları yayına gitmeden yakalamak — bu, sunumda
 * anlatılan en somut risk.
 *
 * CrossRef'in genel API'si anahtar istemiyor ve tarayıcıdan çağrılabiliyor.
 * Nazik kullanım için istekler sıraya alınıyor ve araya kısa bir bekleme
 * konuyor; toplu sorguda servisi zorlamak istemiyoruz.
 */

type Row = {
  doi: string;
  state: "bekliyor" | "sorgulanıyor" | "bulundu" | "yok" | "hata";
  title?: string;
  authors?: string;
  year?: string;
  journal?: string;
};

/** Metinden DOI ayıkla. DOI'ler 10. ile başlar ve boşluğa kadar sürer. */
function extractDois(text: string): string[] {
  const re = /10\.\d{4,9}\/[^\s"'<>,;)\]]+/g;
  const found = (text.match(re) ?? []).map((d) =>
    // Cümle sonundaki noktalama DOI'ye yapışır; temizle.
    d.replace(/[.,;:)\]]+$/, "")
  );
  return [...new Set(found)];
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function AtifDenetleyiciClient() {
  const [text, setText] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [busy, setBusy] = useState(false);

  async function check() {
    const dois = extractDois(text);
    if (dois.length === 0) {
      setRows([]);
      return;
    }
    setBusy(true);
    setRows(dois.map((doi) => ({ doi, state: "bekliyor" })));

    for (let i = 0; i < dois.length; i++) {
      const doi = dois[i];
      setRows((prev) =>
        prev.map((r) => (r.doi === doi ? { ...r, state: "sorgulanıyor" } : r))
      );
      try {
        const res = await fetch(
          `https://api.crossref.org/works/${encodeURIComponent(doi)}`,
          { headers: { Accept: "application/json" } }
        );
        if (res.status === 404) {
          setRows((prev) =>
            prev.map((r) => (r.doi === doi ? { ...r, state: "yok" } : r))
          );
        } else if (!res.ok) {
          setRows((prev) =>
            prev.map((r) => (r.doi === doi ? { ...r, state: "hata" } : r))
          );
        } else {
          const j = await res.json();
          const m = j.message ?? {};
          const authors = (m.author ?? [])
            .slice(0, 3)
            .map((a: { family?: string; given?: string }) =>
              [a.family, a.given?.[0]].filter(Boolean).join(" ")
            )
            .join(", ");
          setRows((prev) =>
            prev.map((r) =>
              r.doi === doi
                ? {
                    ...r,
                    state: "bulundu",
                    title: Array.isArray(m.title) ? m.title[0] : m.title,
                    authors: authors + ((m.author?.length ?? 0) > 3 ? " ve diğerleri" : ""),
                    year: String(
                      m.issued?.["date-parts"]?.[0]?.[0] ??
                        m.created?.["date-parts"]?.[0]?.[0] ??
                        ""
                    ),
                    journal: Array.isArray(m["container-title"])
                      ? m["container-title"][0]
                      : m["container-title"],
                  }
                : r
            )
          );
        }
      } catch {
        setRows((prev) =>
          prev.map((r) => (r.doi === doi ? { ...r, state: "hata" } : r))
        );
      }
      // CrossRef'i yormayalım.
      if (i < dois.length - 1) await sleep(120);
    }
    setBusy(false);
  }

  const found = rows.filter((r) => r.state === "bulundu").length;
  const missing = rows.filter((r) => r.state === "yok").length;
  const errored = rows.filter((r) => r.state === "hata").length;
  const done = rows.length > 0 && !busy;

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="kaynakca"
          className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2"
        >
          Kaynakçanızı yapıştırın
        </label>
        <textarea
          id="kaynakca"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder={`Kaynakçanızı olduğu gibi yapıştırın. DOI içeren satırlar otomatik bulunur.

Örnek:
Çetlenbik, O. C., Süzen, A. A., Duman, B. (2024). IoT Security and Software Testing. Yalvaç Akademi Dergisi. https://doi.org/10.57120/yalvac.1437571`}
          className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm font-mono leading-relaxed focus:outline-none focus:border-[var(--accent)]"
        />
        <p className="mt-2 text-xs text-[var(--fg-subtle)]">
          Metniniz hiçbir yere gönderilmiyor. Yalnızca bulunan DOI numaraları
          CrossRef&apos;e sorulur.
        </p>
      </div>

      <button
        onClick={check}
        disabled={busy || !text.trim()}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-40"
      >
        {busy ? (
          <LoaderCircle className="w-4 h-4 animate-spin" />
        ) : (
          <Search className="w-4 h-4" />
        )}
        Denetle
      </button>

      {rows.length === 0 && text.trim() && !busy && (
        <p className="text-sm text-[var(--fg-muted)] border border-[var(--border-strong)] rounded-md px-4 py-3">
          Metinde DOI bulunamadı. DOI&apos;ler <code>10.</code> ile başlar —
          kaynakçanızda yoksa bu araç doğrulama yapamaz.
        </p>
      )}

      {done && (
        <div className="grid grid-cols-3 gap-3">
          <Stat label="Doğrulandı" value={found} tone="ok" />
          <Stat label="Bulunamadı" value={missing} tone="bad" />
          <Stat label="Sorgulanamadı" value={errored} tone="warn" />
        </div>
      )}

      {missing > 0 && (
        <div className="border-s-[3px] border-red-400 bg-red-500/10 rounded-e-md px-5 py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
            <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
              <strong className="text-[var(--fg)]">
                {missing} kaynak CrossRef&apos;te bulunamadı.
              </strong>{" "}
              Bu, kaynağın var olmadığı anlamına gelebileceği gibi DOI&apos;nin
              yanlış yazıldığı ya da yayıncının CrossRef&apos;e kayıt yapmadığı
              anlamına da gelebilir. Her birini elle kontrol edin.
            </p>
          </div>
        </div>
      )}

      {rows.length > 0 && (
        <ul className="space-y-2">
          {rows.map((r) => (
            <li
              key={r.doi}
              className="card rounded-lg px-4 py-3 flex items-start gap-3"
            >
              <span className="mt-0.5 shrink-0">
                {r.state === "bulundu" && (
                  <Check className="w-4 h-4 text-[var(--accent)]" />
                )}
                {r.state === "yok" && <X className="w-4 h-4 text-red-400" />}
                {r.state === "hata" && (
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                )}
                {(r.state === "bekliyor" || r.state === "sorgulanıyor") && (
                  <LoaderCircle
                    className={`w-4 h-4 text-[var(--fg-subtle)] ${
                      r.state === "sorgulanıyor" ? "animate-spin" : "opacity-40"
                    }`}
                  />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <a
                  href={`https://doi.org/${r.doi}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-[var(--accent)] hover:underline inline-flex items-center gap-1 break-all"
                >
                  {r.doi}
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
                {r.state === "bulundu" && (
                  <div className="mt-1.5 text-sm text-[var(--fg)] leading-snug">
                    {r.title}
                    <div className="text-xs text-[var(--fg-muted)] mt-1">
                      {[r.authors, r.journal, r.year].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                )}
                {r.state === "yok" && (
                  <div className="mt-1 text-sm text-red-400">
                    CrossRef kaydı yok
                  </div>
                )}
                {r.state === "hata" && (
                  <div className="mt-1 text-sm text-yellow-500">
                    Sorgulanamadı — bağlantı sorunu olabilir
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "ok" | "bad" | "warn";
}) {
  const color =
    tone === "ok"
      ? "text-[var(--accent)]"
      : tone === "bad"
        ? "text-red-400"
        : "text-yellow-500";
  return (
    <div className="card rounded-lg px-4 py-3 text-center">
      <div className={`text-2xl font-semibold ${value > 0 ? color : "text-[var(--fg-subtle)]"}`}>
        {value}
      </div>
      <div className="text-[11px] uppercase tracking-wider text-[var(--fg-subtle)] mt-0.5">
        {label}
      </div>
    </div>
  );
}
