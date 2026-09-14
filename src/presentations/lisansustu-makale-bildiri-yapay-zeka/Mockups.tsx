"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, FileText, Plus } from "lucide-react";

/**
 * Araç arayüzlerinin şematik çizimleri.
 *
 * NEDEN ÇİZİM, EKRAN GÖRÜNTÜSÜ DEĞİL: Araçların arayüzü yılda birkaç kez
 * değişiyor; ekran görüntüsü altı ayda eskiyor, telif de belirsiz. Çizim,
 * arayüzün DEĞİŞMEYEN parçalarını gösteriyor — soru kutusu, ölçer, filtre,
 * sütun ekleme, kaynak numarası — ve slayttaki numaralı adımlarla
 * eşleşiyor. Makale adları, sayılar ve yazarlar temsilîdir; hiçbiri gerçek
 * bir yayına karşılık gelmiyor ve bunu çerçevedeki etiket söylüyor.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Ortak parçalar ─────────────────────────────────────────── */

/** Tarayıcı çerçevesi. */
export function Win({
  url,
  children,
  className = "",
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
      className={`lz-win ${className}`}
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-white/[0.03]">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        </div>
        <div className="flex-1 mx-2 px-3 py-1 rounded-md bg-black/40 font-mono text-[10px] text-white/45 truncate">
          {url}
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
          temsilî
        </span>
      </div>
      <div className="relative text-[11px] leading-snug text-white/70">{children}</div>
    </motion.div>
  );
}

/** Numaralı işaret — slayttaki adım listesiyle eşleşir. */
export function Mark({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span
      className={`lz-mark absolute z-10 grid place-items-center w-5 h-5 rounded-full font-mono text-[10px] font-semibold text-black ${className}`}
      style={{ background: "var(--deck-accent)" }}
    >
      {n}
    </span>
  );
}

function Pill({ children, on = false }: { children: ReactNode; on?: boolean }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-[10px] border"
      style={
        on
          ? {
              borderColor: "color-mix(in srgb, var(--deck-accent) 60%, transparent)",
              color: "var(--deck-accent)",
              background: "color-mix(in srgb, var(--deck-accent) 12%, transparent)",
            }
          : { borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }
      }
    >
      {children}
    </span>
  );
}

function Btn({ children, primary = false }: { children: ReactNode; primary?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-medium"
      style={
        primary
          ? { background: "var(--deck-accent)", color: "#000" }
          : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)" }
      }
    >
      {children}
    </span>
  );
}

function Line({ w = "100%", dim = false }: { w?: string; dim?: boolean }) {
  return (
    <span
      className="block h-1.5 rounded-full"
      style={{ width: w, background: dim ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.14)" }}
    />
  );
}

/* ─── NotebookLM ─────────────────────────────────────────────── */

export function NotebookLM() {
  return (
    <Win url="notebooklm.google.com/notebook/…">
      <div className="grid grid-cols-[9rem_1fr_8rem] min-h-[15rem]">
        <div className="relative border-r border-white/10 p-3 pt-4">
          <Mark n={1} className="-top-2 -left-2" />
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">Kaynaklar</span>
            <Plus className="w-3 h-3 text-white/40" />
          </div>
          <div className="space-y-1.5">
            {["remote-work-panel.pdf", "hybrid-rct.pdf", "wfh-review.pdf", "autonomy-survey.pdf", "…+18"].map((f, i) => (
              <div key={f} className="flex items-center gap-1.5 text-[10px] text-white/60">
                <span
                  className="grid place-items-center w-3 h-3 rounded-sm border"
                  style={{ borderColor: "rgba(255,255,255,0.25)" }}
                >
                  {i < 4 && <Check className="w-2.5 h-2.5" style={{ color: "var(--deck-accent)" }} />}
                </span>
                <span className="truncate">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3 flex flex-col">
          <div className="flex-1 space-y-2.5">
            <div className="ml-auto max-w-[85%] px-2.5 py-1.5 rounded-lg bg-white/[0.06] text-white/75">
              Hangi kaynak hangi tükenmişlik ölçeğini kullanmış? Bulgular nerede çelişiyor?
            </div>
            <div className="relative max-w-[95%] px-3 py-2 rounded-lg border border-white/10 bg-black/30 text-white/70 space-y-1.5">
              <Mark n={2} className="-top-2 -left-2" />
              <p>
                Dört kaynağın üçü MBI kullanıyor{" "}
                <Cite n={1} /> <Cite n={2} /> <Cite n={4} />; derleme ise OLBI ve MBI&apos;yi
                birlikte raporluyor <Cite n={3} />.
              </p>
              <p>
                Çelişki: panel çalışması küçük bir azalma bulurken <Cite n={1} /> RCT anlamlı
                fark bulmuyor <Cite n={2} />; derleme farkı ölçüm süresine bağlıyor <Cite n={3} />.
              </p>
            </div>
          </div>
          <div className="relative mt-2 px-2.5 py-1.5 rounded-lg border border-white/15 bg-black/30 text-white/40">
            <Mark n={3} className="-top-2 -left-2" />
            Kaynaklara dayanarak sor…
          </div>
        </div>
        <div className="relative border-l border-white/10 p-3 pt-4">
          <Mark n={4} className="-top-2 -left-2" />
          <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35 mb-2">Notlar</div>
          <div className="space-y-1.5">
            <div className="px-2 py-1.5 rounded-md bg-white/[0.04] text-[10px] text-white/60">Kapsam notu — taslak</div>
            <div className="px-2 py-1.5 rounded-md bg-white/[0.04] text-[10px] text-white/60">Çelişen bulgular</div>
            <div className="px-2 py-1.5 rounded-md bg-white/[0.04] text-[10px] text-white/60">Ölçek tablosu</div>
          </div>
        </div>
      </div>
    </Win>
  );
}

function Cite({ n }: { n: number }) {
  return (
    <span
      className="inline-grid place-items-center w-3.5 h-3.5 rounded-sm font-mono text-[8px] align-middle"
      style={{
        background: "color-mix(in srgb, var(--deck-accent) 18%, transparent)",
        color: "var(--deck-accent)",
      }}
    >
      {n}
    </span>
  );
}

/* ─── Gemini · derin araştırma ───────────────────────────────── */

export function GeminiResearch() {
  return (
    <Win url="gemini.google.com/app">
      <div className="p-3 space-y-2.5">
        <div className="relative flex items-center gap-2 ps-4">
          <Mark n={1} className="-top-1 -left-2" />
          <Pill on>Deep Research</Pill>
          <Pill>Canvas</Pill>
          <span className="text-white/35 text-[10px]">← kipi aramadan önce seçin</span>
        </div>
        <div className="ml-auto max-w-[80%] px-2.5 py-1.5 rounded-lg bg-white/[0.06] text-white/75">
          [KONU] üzerine yüksek lisans makalesi yazacağım. Web&apos;i tarayarak kaynaklı bir rapor…
        </div>
        <div className="relative rounded-lg border border-white/10 p-3 bg-black/30 space-y-2">
          <Mark n={2} className="-top-2 -left-2" />
          <div className="font-semibold text-white/85">Araştırma planı</div>
          {[
            "Alandaki ana tartışma başlıklarını belirle",
            "Her başlık için en çok atıf alan çalışmaları bul",
            "Son üç yılın yöntemlerini tara",
            "Türkiye bağlamındaki çalışmaları ayrı listele",
          ].map((p, i) => (
            <div key={p} className="flex items-start gap-2 text-white/65">
              <span className="font-mono text-[10px]" style={{ color: "var(--deck-accent)" }}>
                {i + 1}.
              </span>
              {p}
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <Btn primary>Araştırmayı başlat</Btn>
            <Btn>Planı düzenle</Btn>
          </div>
        </div>
        <div className="relative rounded-lg border border-white/10 p-3 space-y-1.5">
          <Mark n={3} className="-top-2 -left-2" />
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white/85">Rapor</span>
            <span className="text-[10px] text-white/40">38 kaynak · 12 dk</span>
          </div>
          <Line />
          <Line w="88%" />
          <div className="flex flex-wrap gap-1.5 pt-1">
            {["doi.org/10.…", "doi.org/10.…", "dergipark.org.tr/…", "arxiv.org/…"].map((u, i) => (
              <span key={i} className="px-1.5 py-0.5 rounded bg-white/[0.06] font-mono text-[9px] text-white/50">
                {u}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Win>
  );
}

/* ─── Claude · Proje ─────────────────────────────────────────── */

export function ClaudeProject() {
  return (
    <Win url="claude.ai/project/makale-2026">
      <div className="grid grid-cols-[1fr_10rem] min-h-[15rem]">
        <div className="p-3 flex flex-col">
          <div className="flex-1 space-y-2.5">
            <div className="ml-auto max-w-[85%] px-2.5 py-1.5 rounded-lg bg-white/[0.06] text-white/75">
              Ekteki kapsam notuna ve kaynak tablosuna dayanarak makale iskeleti çıkar… Metin yazma.
            </div>
            <div className="relative max-w-[95%] px-3 py-2 rounded-lg border border-white/10 bg-black/30 text-white/70">
              <Mark n={3} className="-top-2 -left-2" />
              <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/35 mb-1.5">İskelet</div>
              <div className="space-y-1">
                <div><span className="text-white/85">1. Giriş</span> — İddia: uzaktan çalışma–tükenmişlik ilişkisi ölçüm süresine bağlı. Kaynak: [1][3][7]</div>
                <div><span className="text-white/85">2. Yöntem</span> — <span style={{ color: "var(--deck-accent)" }}>Soru:</span> örneklem büyüklüğü ve ölçek?</div>
                <div><span className="text-white/85">3. Bulgular</span> — Tablo 1: betimleyici; Şekil 1: dalga farkı</div>
                <div className="text-white/40">…</div>
              </div>
            </div>
          </div>
          <div className="mt-2 px-2.5 py-1.5 rounded-lg border border-white/15 bg-black/30 text-white/40">
            Claude&apos;a yaz…
          </div>
        </div>
        <div className="border-l border-white/10 p-3 space-y-3">
          <div className="relative ps-4">
            <Mark n={1} className="-top-1 -left-2" />
            <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35 mb-1.5">Proje bilgisi</div>
            <div className="space-y-1">
              {["kapsam-notu.md", "kaynak-tablosu.csv", "dergi-yazim-kurallari.pdf", "notebooklm-celiskiler.md"].map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-[10px] text-white/60">
                  <FileText className="w-3 h-3 text-white/35 shrink-0" />
                  <span className="truncate">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative ps-4">
            <Mark n={2} className="-top-1 -left-2" />
            <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35 mb-1.5">Talimatlar</div>
            <div className="px-2 py-1.5 rounded-md bg-white/[0.04] text-[10px] text-white/55 leading-snug">
              Yalnızca proje dosyalarındaki kaynakları kullan. Listede olmayan çalışma önerme. Emin değilsen sor.
            </div>
          </div>
        </div>
      </div>
    </Win>
  );
}

/* ─── DeepL Write ────────────────────────────────────────────── */

export function DeepLWrite() {
  return (
    <Win url="deepl.com/write">
      <div className="p-3 space-y-2.5">
        <div className="relative flex items-center gap-2 ps-4">
          <Mark n={1} className="-top-1 -left-2" />
          <Pill on>Write</Pill>
          <Pill>Translate</Pill>
          <span className="text-white/25">·</span>
          <span className="text-[10px] text-white/45">Üslup:</span>
          <Pill on>Academic</Pill>
          <Pill>Business</Pill>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="relative rounded-lg border border-white/10 p-3 bg-black/30 text-white/65">
            <Mark n={2} className="-top-2 -left-2" />
            <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/35 mb-1.5">Sizin metniniz</div>
            The results is showing that the remote work has a small effect to burnout, however this effect was not significant in the RCT study.
          </div>
          <div className="relative rounded-lg border p-3 text-white/80" style={{ borderColor: "color-mix(in srgb, var(--deck-accent) 40%, transparent)" }}>
            <Mark n={3} className="-top-2 -left-2" />
            <div className="font-mono text-[9px] uppercase tracking-[0.12em] mb-1.5" style={{ color: "var(--deck-accent)" }}>Düzeltilmiş</div>
            The results <Hl>show</Hl> that remote work has a small effect <Hl>on</Hl> burnout; however, this effect was not significant in the <Hl>randomised controlled trial</Hl>.
          </div>
        </div>
        <div className="relative flex items-center justify-between">
          <Mark n={4} className="-top-2 -left-2" />
          <span className="text-[10px] text-white/45">3 değişiklik — her birine tıklayıp alternatif görebilirsiniz</span>
          <Btn>Kopyala</Btn>
        </div>
      </div>
    </Win>
  );
}

function Hl({ children }: { children: ReactNode }) {
  return (
    <span
      className="px-0.5 rounded"
      style={{ background: "color-mix(in srgb, var(--deck-accent) 22%, transparent)" }}
    >
      {children}
    </span>
  );
}

/* ─── K-Dense Web ────────────────────────────────────────────── */

export function KDenseWeb() {
  const phases = [
    ["Planlama ve kapsam", true],
    ["Çok veritabanlı tarama", true],
    ["Eleme (dahil / hariç)", true],
    ["Veri çıkarımı", true],
    ["Tematik sentez", false],
    ["Atıf doğrulama (verify_citations)", false],
    ["Belge üretimi (MD + PDF)", false],
  ] as const;
  return (
    <Win url="app.k-dense.ai/projects/uzaktan-calisma-tukenmislik">
      <div className="grid grid-cols-[1fr_10rem] min-h-[16rem]">
        <div className="p-3 flex flex-col">
          <div className="relative flex items-center gap-2 mb-2.5 ps-4">
            <Mark n={3} className="-top-1 -left-2" />
            <span className="text-[10px] text-white/40">Çaba düzeyi:</span>
            <Pill>Instant · ücretsiz</Pill>
            <Pill on>Standard · ≤ 9 $</Pill>
            <Pill>Pro · ≤ 29 $</Pill>
          </div>
          <div className="flex-1 space-y-2.5">
            <div className="relative ml-auto max-w-[88%] px-2.5 py-1.5 rounded-lg bg-white/[0.06] text-white/75">
              <Mark n={1} className="-top-2 -left-2" />
              Uzaktan çalışma ve tükenmişlik üzerine 2019–2026 literatür taraması yap; yalnızca hakemli, DOI&apos;li kaynak; Türkçe çalışmaları ayrı listele.
            </div>
            <div className="relative max-w-[95%] px-3 py-2 rounded-lg border border-white/10 bg-black/30">
              <Mark n={2} className="-top-2 -left-2" />
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-white/85">Kady · plan</span>
                <span className="text-[10px] text-white/40">4 / 7 tamamlandı</span>
              </div>
              <div className="space-y-1">
                {phases.map(([t, done], i) => (
                  <div key={t} className="flex items-center gap-2 text-[10px]">
                    <span
                      className="grid place-items-center w-3.5 h-3.5 rounded-full border shrink-0"
                      style={{
                        borderColor: done ? "var(--deck-accent)" : "rgba(255,255,255,0.2)",
                        background: done ? "color-mix(in srgb, var(--deck-accent) 25%, transparent)" : "transparent",
                      }}
                    >
                      {done && <Check className="w-2.5 h-2.5" style={{ color: "var(--deck-accent)" }} />}
                    </span>
                    <span className={done ? "text-white/70" : "text-white/40"}>
                      {i + 1}. {t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-2 px-2.5 py-1.5 rounded-lg border border-white/15 bg-black/30 text-white/40">
            Kady&apos;ye görev ver…
          </div>
        </div>
        <div className="relative border-l border-white/10 p-3 pt-4 space-y-3">
          <Mark n={4} className="-top-2 -left-2" />
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35 mb-1.5">Dosyalar</div>
            <div className="space-y-1">
              {["literature_review.md", "literature_review.pdf", "references.bib", "extraction_table.csv", "figure_1.png"].map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-[10px] text-white/60">
                  <FileText className="w-3 h-3 text-white/35 shrink-0" />
                  <span className="truncate">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-md border p-2" style={{ borderColor: "color-mix(in srgb, var(--deck-accent) 40%, transparent)" }}>
            <Mark n={5} className="-top-2 -left-2" />
            <div className="font-mono text-[9px] uppercase tracking-[0.12em] mb-1" style={{ color: "var(--deck-accent)" }}>
              Atıf doğrulama
            </div>
            <div className="text-[10px] text-white/65">38 / 41 DOI doğrulandı</div>
            <div className="text-[10px] text-white/40">3 işaretli — elle bakın</div>
          </div>
        </div>
      </div>
    </Win>
  );
}

/* ─── K-Dense BYOK (masaüstü) ────────────────────────────────── */

export function KDenseByok() {
  return (
    <Win url="K-Dense BYOK — localhost:3000">
      <div className="grid grid-cols-[10rem_1fr] min-h-[14rem]">
        <div className="relative border-r border-white/10 p-3 pt-4 space-y-3">
          <Mark n={1} className="-top-2 -left-2" />
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35 mb-1.5">Sağlayıcı</div>
            <div className="space-y-1 text-[10px]">
              {[["Anthropic · Claude", true], ["OpenAI", false], ["Google Gemini", false], ["Ollama · yerel", false], ["OpenRouter", false]].map(([n, on]) => (
                <div key={String(n)} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full border"
                    style={{
                      borderColor: on ? "var(--deck-accent)" : "rgba(255,255,255,0.25)",
                      background: on ? "var(--deck-accent)" : "transparent",
                    }}
                  />
                  <span className={on ? "text-white/85" : "text-white/50"}>{String(n)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <Mark n={2} className="-top-1 -left-3" />
            <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35 mb-1.5 ps-4">API anahtarı</div>
            <div className="px-2 py-1 rounded-md bg-black/40 border border-white/10 font-mono text-[10px] text-white/60">
              sk-ant-••••••••••••
            </div>
          </div>
          <div className="relative text-[10px] text-white/40 leading-snug pt-1">
            <Mark n={4} className="top-0 -left-3" />
            <span className="ps-4 block">Veri bilgisayarınızda kalır; yalnızca seçtiğiniz sağlayıcıya gider.</span>
          </div>
        </div>
        <div className="p-3 flex flex-col">
          <div className="flex-1 space-y-2.5">
            <div className="ml-auto max-w-[85%] px-2.5 py-1.5 rounded-lg bg-white/[0.06] text-white/75">
              Ekteki 24 PDF&apos;ten veri çıkarım tablosu üret: örneklem, ölçek, ana bulgu. Belgede olmayanı &ldquo;yok&rdquo; yaz.
            </div>
            <div className="relative max-w-[95%] px-3 py-2 rounded-lg border border-white/10 bg-black/30 text-white/70">
              <Mark n={3} className="-top-2 -left-2" />
              <div className="font-semibold text-white/85 mb-1">Kady</div>
              <div className="space-y-1 text-[10px]">
                <div>24 PDF okundu · <span style={{ color: "var(--deck-accent)" }}>extraction_table.csv</span> yazıldı</div>
                <div>3 makalede örneklem bulunamadı → &ldquo;yok&rdquo;</div>
                <div>Uyarı: 2 PDF taranmış görüntü; metin çıkarımı eksik olabilir</div>
              </div>
            </div>
          </div>
          <div className="mt-2 px-2.5 py-1.5 rounded-lg border border-white/15 bg-black/30 text-white/40">
            Kady&apos;ye yaz…
          </div>
        </div>
      </div>
    </Win>
  );
}
