import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminConferencesPage() {
  const conferences = await prisma.conference.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-2">
            Etkinlik
          </div>
          <h1 className="text-3xl font-semibold text-[var(--fg)]">
            Konferanslarım
          </h1>
        </div>
        <Link
          href="/admin/konferanslar/yeni"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md hover:bg-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Konferans
        </Link>
      </div>

      <div className="space-y-2">
        {conferences.length === 0 && (
          <div className="card rounded-lg p-12 text-center">
            <div className="text-sm text-[var(--fg-muted)]">
              Henüz hiç konferans eklenmemiş.
            </div>
            <Link
              href="/admin/konferanslar/yeni"
              className="inline-block mt-4 text-sm text-[var(--accent)] hover:underline"
            >
              İlk konferansını ekle →
            </Link>
          </div>
        )}
        {conferences.map((c) => (
          <Link
            key={c.id}
            href={`/admin/konferanslar/${c.id}`}
            className="card rounded-md p-4 flex items-center gap-4 hover:border-[var(--accent)]/40 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--accent)] font-mono">
                  {c.role}
                </span>
                <h3 className="text-sm font-medium text-[var(--fg)] truncate">
                  {c.title}
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--fg-subtle)]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {c.location}
                </span>
              </div>
            </div>
            <div className="text-xs text-[var(--fg-subtle)] font-mono shrink-0">
              {new Date(c.date).toLocaleDateString("tr-TR")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
