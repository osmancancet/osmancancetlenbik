import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { weeks: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-2">
            Akademik
          </div>
          <h1 className="text-3xl font-semibold text-[var(--fg)]">Derslerim</h1>
        </div>
        <Link
          href="/admin/dersler/yeni"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md hover:bg-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Ders
        </Link>
      </div>

      <div className="space-y-2">
        {courses.length === 0 && (
          <div className="card rounded-lg p-12 text-center">
            <BookOpen className="w-10 h-10 text-[var(--fg-subtle)] mx-auto mb-4" />
            <div className="text-sm text-[var(--fg-muted)]">
              Henüz hiç ders eklenmemiş.
            </div>
            <Link
              href="/admin/dersler/yeni"
              className="inline-block mt-4 text-sm text-[var(--accent)] hover:underline"
            >
              İlk dersini ekle →
            </Link>
          </div>
        )}
        {courses.map((c) => (
          <Link
            key={c.id}
            href={`/admin/dersler/${c.id}`}
            className="card rounded-md p-4 flex items-center gap-4 hover:border-[var(--accent)]/40 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--accent)] font-mono">
                  {c.type}
                </span>
                <h3 className="text-sm font-medium text-[var(--fg)] truncate">
                  {c.title}
                </h3>
              </div>
              <div className="text-xs text-[var(--fg-subtle)] truncate">
                {c.program}
                {c.semester && ` · ${c.semester}`}
              </div>
            </div>
            <div className="text-xs text-[var(--fg-subtle)] font-mono shrink-0">
              {c._count.weeks} hafta
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
