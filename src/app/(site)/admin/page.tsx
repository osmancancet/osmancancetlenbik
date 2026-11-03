import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FileText, Mic, BookOpen, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    courseCount,
    postCount,
    conferenceCount,
    recentPosts,
    recentConferences,
  ] = await Promise.all([
    prisma.course.count(),
    prisma.post.count(),
    prisma.conference.count(),
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.conference.findMany({
      orderBy: { date: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div>
      <div className="mb-10">
        <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-2">
          Genel Bakış
        </div>
        <h1 className="text-3xl font-semibold text-[var(--fg)]">
          Kontrol Paneli
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <Link
          href="/admin/dersler"
          className="card rounded-lg p-6 hover:border-[var(--accent)]/40 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <BookOpen className="w-5 h-5 text-[var(--accent)]" />
            <span className="text-3xl font-semibold text-[var(--fg)]">
              {courseCount}
            </span>
          </div>
          <div className="text-sm text-[var(--fg-muted)]">Toplam Ders</div>
        </Link>

        <Link
          href="/admin/yazilar"
          className="card rounded-lg p-6 hover:border-[var(--accent)]/40 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <FileText className="w-5 h-5 text-[var(--accent)]" />
            <span className="text-3xl font-semibold text-[var(--fg)]">
              {postCount}
            </span>
          </div>
          <div className="text-sm text-[var(--fg-muted)]">Toplam Yazı</div>
        </Link>

        <Link
          href="/admin/konferanslar"
          className="card rounded-lg p-6 hover:border-[var(--accent)]/40 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <Mic className="w-5 h-5 text-[var(--accent)]" />
            <span className="text-3xl font-semibold text-[var(--fg)]">
              {conferenceCount}
            </span>
          </div>
          <div className="text-sm text-[var(--fg-muted)]">Toplam Konferans</div>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-[var(--fg)]">Son Yazılar</h2>
            <Link
              href="/admin/yazilar/yeni"
              className="inline-flex items-center gap-1 text-xs text-[var(--accent)] hover:underline"
            >
              <Plus className="w-3 h-3" /> Yeni
            </Link>
          </div>
          <div className="space-y-2">
            {recentPosts.length === 0 && (
              <div className="text-sm text-[var(--fg-subtle)] italic">
                Henüz yazı eklenmemiş.
              </div>
            )}
            {recentPosts.map((p) => (
              <Link
                key={p.id}
                href={`/admin/yazilar/${p.id}`}
                className="block card rounded-md p-3 hover:border-[var(--accent)]/40 transition-colors"
              >
                <div className="text-sm text-[var(--fg)] truncate">
                  {p.title}
                </div>
                <div className="text-xs text-[var(--fg-subtle)] mt-1">
                  {new Date(p.createdAt).toLocaleDateString("tr-TR")}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-[var(--fg)]">
              Son Konferanslar
            </h2>
            <Link
              href="/admin/konferanslar/yeni"
              className="inline-flex items-center gap-1 text-xs text-[var(--accent)] hover:underline"
            >
              <Plus className="w-3 h-3" /> Yeni
            </Link>
          </div>
          <div className="space-y-2">
            {recentConferences.length === 0 && (
              <div className="text-sm text-[var(--fg-subtle)] italic">
                Henüz konferans eklenmemiş.
              </div>
            )}
            {recentConferences.map((c) => (
              <Link
                key={c.id}
                href={`/admin/konferanslar/${c.id}`}
                className="block card rounded-md p-3 hover:border-[var(--accent)]/40 transition-colors"
              >
                <div className="text-sm text-[var(--fg)] truncate">
                  {c.title}
                </div>
                <div className="text-xs text-[var(--fg-subtle)] mt-1">
                  {new Date(c.date).toLocaleDateString("tr-TR")} · {c.location}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
