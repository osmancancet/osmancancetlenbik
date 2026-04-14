import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { prisma } from "@/lib/prisma";
import { Megaphone, Pin } from "lucide-react";

export const metadata: Metadata = {
  title: "Duyurular",
  description: "Ders, etkinlik ve genel duyurular.",
};

export const revalidate = 60;

const TYPE_LABEL: Record<string, string> = {
  GENEL: "Genel",
  DERS: "Ders",
  ETKINLIK: "Etkinlik",
};

export default async function DuyurularPage() {
  const now = new Date();
  const announcements = await prisma.announcement.findMany({
    where: {
      OR: [{ expiresAt: null }, { expiresAt: { gte: now } }],
    },
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
  });

  return (
    <PageShell
      eyebrow="Bilgilendirme"
      title="Duyurular"
      subtitle="Ders, etkinlik ve genel duyurular."
    >
      {announcements.length === 0 ? (
        <Reveal>
          <div className="card rounded-lg p-12 text-center">
            <Megaphone className="w-10 h-10 text-[var(--fg-subtle)] mx-auto mb-4" />
            <p className="text-[var(--fg-muted)]">
              Şu an aktif duyuru yok.
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="space-y-3">
          {announcements.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.05}>
              <article className="card rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {a.pinned && (
                    <Pin className="w-3 h-3 text-[var(--accent)]" />
                  )}
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--accent)] font-mono">
                    {TYPE_LABEL[a.type] ?? a.type}
                  </span>
                  <time className="text-xs font-mono text-[var(--fg-subtle)]">
                    {new Date(a.createdAt).toLocaleDateString("tr-TR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="text-lg font-semibold text-[var(--fg)] mb-2">
                  {a.title}
                </h2>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed whitespace-pre-line">
                  {a.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </PageShell>
  );
}
