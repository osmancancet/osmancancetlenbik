import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pin, Megaphone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-2">
            İletişim
          </div>
          <h1 className="text-3xl font-semibold text-[var(--fg)]">Duyurular</h1>
        </div>
        <Link
          href="/admin/duyurular/yeni"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Yeni Duyuru
        </Link>
      </div>

      <div className="space-y-2">
        {announcements.length === 0 && (
          <div className="card rounded-lg p-12 text-center">
            <Megaphone className="w-10 h-10 text-[var(--fg-subtle)] mx-auto mb-4" />
            <div className="text-sm text-[var(--fg-muted)]">
              Henüz hiç duyuru eklenmemiş.
            </div>
          </div>
        )}
        {announcements.map((a) => {
          const expired = a.expiresAt && new Date(a.expiresAt) < new Date();
          return (
            <Link
              key={a.id}
              href={`/admin/duyurular/${a.id}`}
              className="card rounded-md p-4 flex items-center gap-4 hover:border-[var(--accent)]/40 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {a.pinned && (
                    <Pin className="w-3 h-3 text-[var(--accent)]" />
                  )}
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--accent)] font-mono">
                    {a.type}
                  </span>
                  {expired && (
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border)] text-[var(--fg-subtle)]">
                      Süresi doldu
                    </span>
                  )}
                  <h3 className="text-sm font-medium text-[var(--fg)] truncate">
                    {a.title}
                  </h3>
                </div>
                <div className="text-xs text-[var(--fg-subtle)] truncate">
                  {a.body}
                </div>
              </div>
              <div className="text-xs text-[var(--fg-subtle)] font-mono shrink-0">
                {new Date(a.createdAt).toLocaleDateString("tr-TR")}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
