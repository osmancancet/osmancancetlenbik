import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { prisma } from "@/lib/prisma";
import { Newspaper, ExternalLink, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Basında",
  description:
    "Haberlerde, röportajlarda ve medyada yer aldığım çalışmalar.",
};

export const dynamic = "force-dynamic";

const TYPE_LABEL: Record<string, string> = {
  HABER: "Haber",
  ROPORTAJ: "Röportaj",
  YAZI: "Köşe Yazısı",
  TV: "TV / Video",
  PODCAST: "Podcast",
};

export default async function BasinPage() {
  const items = await prisma.pressItem.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <PageShell
      eyebrow="Medya"
      title="Basında"
      subtitle="Haberlerde, röportajlarda ve medyada yer aldığım çalışmalar."
    >
      {items.length === 0 ? (
        <Reveal>
          <div className="card rounded-lg p-12 text-center">
            <Newspaper className="w-10 h-10 text-[var(--fg-subtle)] mx-auto mb-4" />
            <p className="text-[var(--fg-muted)]">
              Henüz basın kaydı eklenmedi.
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group card rounded-lg overflow-hidden h-full flex flex-col hover:border-[var(--accent)]/40"
              >
                {item.coverImage && (
                  <div className="relative aspect-[16/9] bg-[var(--bg-soft)] overflow-hidden">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--accent)]">
                      {TYPE_LABEL[item.type] ?? item.type}
                    </span>
                    <span className="text-xs text-[var(--fg-muted)] font-medium">
                      {item.source}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-[var(--fg)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {item.title}
                  </h2>
                  {item.excerpt && (
                    <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-4 flex-1">
                      {item.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-[var(--fg-subtle)] pt-3 border-t border-[var(--border)] mt-auto">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.date).toLocaleDateString("tr-TR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[var(--accent)]">
                      Habere Git
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </PageShell>
  );
}
