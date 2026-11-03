import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Eye, EyeOff } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-2">
            İçerik
          </div>
          <h1 className="text-3xl font-semibold text-[var(--fg)]">Yazılarım</h1>
        </div>
        <Link
          href="/admin/yazilar/yeni"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md hover:bg-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Yazı
        </Link>
      </div>

      <div className="space-y-2">
        {posts.length === 0 && (
          <div className="card rounded-lg p-12 text-center">
            <div className="text-sm text-[var(--fg-muted)]">
              Henüz hiç yazı eklenmemiş.
            </div>
            <Link
              href="/admin/yazilar/yeni"
              className="inline-block mt-4 text-sm text-[var(--accent)] hover:underline"
            >
              İlk yazını ekle →
            </Link>
          </div>
        )}
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/admin/yazilar/${p.id}`}
            className="card rounded-md p-4 flex items-center gap-4 hover:border-[var(--accent)]/40 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {p.published ? (
                  <Eye className="w-3 h-3 text-emerald-400" />
                ) : (
                  <EyeOff className="w-3 h-3 text-[var(--fg-subtle)]" />
                )}
                <h3 className="text-sm font-medium text-[var(--fg)] truncate">
                  {p.title}
                </h3>
              </div>
              <div className="text-xs text-[var(--fg-subtle)] truncate">
                {p.excerpt}
              </div>
            </div>
            <div className="text-xs text-[var(--fg-subtle)] font-mono shrink-0">
              {new Date(p.createdAt).toLocaleDateString("tr-TR")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
