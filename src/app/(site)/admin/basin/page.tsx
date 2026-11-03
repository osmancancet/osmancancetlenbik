import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Newspaper, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

const TYPE_LABEL: Record<string, string> = {
  HABER: "Haber",
  ROPORTAJ: "Röportaj",
  YAZI: "Köşe Yazısı",
  TV: "TV / Video",
  PODCAST: "Podcast",
};

export default async function AdminPressPage() {
  const items = await prisma.pressItem.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] mb-2">
            Medya
          </div>
          <h1 className="text-3xl font-semibold text-[var(--fg)]">Basın</h1>
        </div>
        <Link
          href="/admin/basin/yeni"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Yeni Kayıt
        </Link>
      </div>

      <div className="space-y-2">
        {items.length === 0 && (
          <div className="card rounded-lg p-12 text-center">
            <Newspaper className="w-10 h-10 text-[var(--fg-subtle)] mx-auto mb-4" />
            <div className="text-sm text-[var(--fg-muted)]">
              Henüz hiç basın kaydı eklenmemiş.
            </div>
          </div>
        )}
        {items.map((p) => (
          <Link
            key={p.id}
            href={`/admin/basin/${p.id}`}
            className="card rounded-md p-4 flex items-center gap-4 hover:border-[var(--accent)]/40 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--accent)]">
                  {TYPE_LABEL[p.type] ?? p.type}
                </span>
                <span className="text-xs text-[var(--fg-muted)]">
                  {p.source}
                </span>
                <h3 className="text-sm font-medium text-[var(--fg)] truncate">
                  {p.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[var(--fg-subtle)]">
                <ExternalLink className="w-3 h-3" />
                <span className="truncate max-w-md">{p.url}</span>
              </div>
            </div>
            <div className="text-xs text-[var(--fg-subtle)] font-mono shrink-0">
              {new Date(p.date).toLocaleDateString("tr-TR")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
