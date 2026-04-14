import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { prisma } from "@/lib/prisma";
import { ArrowUpRight, Clock } from "lucide-react";
import { getReadingTime } from "@/lib/readingTime";

export const metadata: Metadata = {
  title: "Yazılarım",
  description:
    "Yapay zekâ, büyük veri, yazılım ve eğitim üzerine kişisel yazılar.",
};

export const revalidate = 60;

export default async function YazilarimPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <PageShell
      eyebrow="Blog"
      title="Yazılarım"
      subtitle="Yapay zekâ, büyük veri, yazılım ve eğitim üzerine düşüncelerim."
    >
      {posts.length === 0 ? (
        <Reveal>
          <div className="card rounded-lg p-12 text-center">
            <p className="text-[var(--fg-muted)]">
              Henüz yazı yayınlanmadı. Yakında burada olacak.
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.05}>
              <Link
                href={`/yazilarim/${post.slug}`}
                className="group card rounded-lg overflow-hidden h-full flex flex-col hover:border-[var(--accent)]/40"
              >
                {post.coverImage && (
                  <div className="relative aspect-[16/9] bg-[var(--bg-soft)] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--fg-subtle)] mb-2">
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {getReadingTime(post.content).text}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-[var(--fg)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="inline-flex items-center gap-1 text-sm text-[var(--accent)]">
                    Devamını oku
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </PageShell>
  );
}
