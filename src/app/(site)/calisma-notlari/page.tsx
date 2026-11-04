import type { Metadata } from "next";
import { statSync } from "node:fs";
import path from "node:path";
import { Download, FileText } from "lucide-react";
import { seoMeta } from "@/lib/seo/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { studyNotes, STUDY_NOTES_DIR } from "@/data/studyNotes";

export const metadata: Metadata = seoMeta({
  path: "/calisma-notlari",
  title: "Çalışma Notları",
  description:
    "Büyük Veri Analistliği dersleri için hikâyeli, 5 şıklı, 200'er soruluk çalışma kağıtları; ücretsiz PDF.",
});

function fileSize(slug: string): string | null {
  try {
    const { size } = statSync(
      path.join(process.cwd(), "public", STUDY_NOTES_DIR, `${slug}.pdf`),
    );
    return size >= 1024 * 1024
      ? `${(size / 1024 / 1024).toFixed(1).replace(".", ",")} MB`
      : `${Math.round(size / 1024)} KB`;
  } catch {
    return null;
  }
}

export default function CalismaNotlariPage() {
  // Yalnız PDF'i depoda bulunan dersler listelenir — kırık indirme bağlantısı olmasın.
  const available = studyNotes
    .map((note) => ({ note, size: fileSize(note.slug) }))
    .filter(
      (x): x is { note: (typeof studyNotes)[number]; size: string } =>
        x.size !== null,
    );

  return (
    <PageShell
      eyebrow="Akademik"
      title="Çalışma Notları"
      subtitle="Her ders için 200 soruluk, hikâyeli ve öğretici çalışma kağıtları. Her soru kısa bir olayla başlar ve 5 şıklıdır."
    >
      {available.length === 0 ? (
        <Reveal>
          <div className="card rounded-lg p-12 text-center">
            <FileText className="w-10 h-10 text-[var(--fg-subtle)] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[var(--fg)] mb-2">
              Çalışma Notları Hazırlanıyor
            </h3>
            <p className="text-sm text-[var(--fg-muted)] max-w-md mx-auto">
              Ders çalışma kağıtları kısa süre içinde burada indirilebilir
              olacak.
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {available.map(({ note: n, size }, i) => {
            const href = `${STUDY_NOTES_DIR}/${n.slug}.pdf`;
            return (
              <Reveal key={n.slug} delay={i * 0.04}>
                <div className="card rounded-lg p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-10 h-10 rounded-md border border-[var(--border-strong)] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--accent)]">
                      {n.code}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-[var(--fg)]">
                    {n.course}
                  </h2>
                  <p className="font-mono text-xs text-[var(--fg-subtle)] mt-1">
                    {n.questions} soru · {n.scope}
                  </p>
                  <p className="text-sm text-[var(--fg-muted)] mt-3 leading-relaxed flex-1">
                    {n.summary}
                  </p>

                  <div className="flex items-center gap-3 mt-5">
                    <a
                      href={href}
                      download
                      className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-[var(--accent)] text-[var(--bg)] font-medium hover:opacity-90 transition-opacity"
                    >
                      <Download className="w-4 h-4" />
                      PDF indir
                    </a>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener"
                      className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                    >
                      Tarayıcıda aç
                    </a>
                    <span className="ms-auto font-mono text-xs text-[var(--fg-subtle)]">
                      {size}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
