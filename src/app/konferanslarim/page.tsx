import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { MapPin, Calendar, ExternalLink, Mic, Presentation } from "lucide-react";

export const metadata: Metadata = {
  title: "Konferanslarım",
  description:
    "Katıldığım, konuşmacı olduğum ve düzenlediğim konferanslar ve etkinlikler.",
};

export const revalidate = 300;

export default async function KonferanslarimPage() {
  const conferences = await prisma.conference.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <PageShell
      eyebrow="Etkinlikler"
      title="Konferanslarım"
      subtitle="Katıldığım, konuşmacı olduğum ve düzenlediğim akademik etkinlikler."
    >
      {conferences.length === 0 ? (
        <Reveal>
          <div className="card rounded-lg p-12 text-center">
            <Mic className="w-10 h-10 text-[var(--fg-subtle)] mx-auto mb-4" />
            <p className="text-[var(--fg-muted)]">
              Henüz konferans eklenmedi.
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="space-y-4">
          {conferences.map((c, i) => {
            const inner = (
              <div className="group card rounded-lg p-6 md:p-7 grid md:grid-cols-[auto_1fr_auto] gap-5 items-start hover:border-[var(--accent)]/40">
                <div className="flex md:flex-col items-center gap-3 md:gap-2 md:w-24 md:border-r md:border-[var(--border)] md:pr-4">
                  <Mic className="w-5 h-5 text-[var(--accent)]" />
                  <div className="text-center">
                    <div className="font-mono text-sm text-[var(--fg-muted)]">
                      {new Date(c.date).toLocaleDateString("tr-TR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--accent)] font-mono">
                      {c.role}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-[var(--fg)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {c.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[var(--fg-subtle)] mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {c.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(c.date).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                  {c.description && (
                    <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-4">
                      {c.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 flex-wrap">
                    {c.slides && (
                      <Link
                        href={`/konferanslarim/${c.id}/sunum`}
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-[var(--accent)] text-[var(--bg)] font-medium hover:bg-white transition-colors"
                      >
                        <Presentation className="w-3 h-3" />
                        Sunumu İzle
                      </Link>
                    )}
                    {c.link && (
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-[var(--border-strong)] text-[var(--fg-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Bağlantı
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
            return (
              <Reveal key={c.id} delay={i * 0.05}>
                {inner}
              </Reveal>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
