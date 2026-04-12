import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/ui/Reveal";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { getReadingTime } from "@/lib/readingTime";
import { extractToc } from "@/lib/toc";
import { absoluteUrl } from "@/lib/site";
import { articleJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return { title: "Yazı Bulunamadı" };
  const ogImage = absoluteUrl(
    `/api/og?title=${encodeURIComponent(post.title)}&eyebrow=${encodeURIComponent("Blog")}`
  );
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: [post.coverImage || ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage || ogImage],
    },
  };
}

export default async function YaziDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) notFound();

  const reading = getReadingTime(post.content);
  const toc = extractToc(post.content);
  const url = absoluteUrl(`/yazilarim/${post.slug}`);

  return (
    <article className="relative pt-32 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          articleJsonLd({
            title: post.title,
            description: post.excerpt,
            url,
            datePublished: post.createdAt,
            dateModified: post.updatedAt,
            image: post.coverImage ?? undefined,
          })
        )}
      />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1fr_220px] gap-12">
        <div className="max-w-3xl min-w-0">
          <Reveal>
            <Link
              href="/yazilarim"
              className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Tüm yazılar
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
              <span>
                {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="text-[var(--fg-subtle)]">·</span>
              <span className="inline-flex items-center gap-1 text-[var(--fg-muted)]">
                <Clock className="w-3 h-3" />
                {reading.text}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--fg)] leading-tight mb-6">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-lg text-[var(--fg-muted)] leading-relaxed mb-10">
              {post.excerpt}
            </p>
          </Reveal>

          {post.coverImage && (
            <Reveal delay={0.2}>
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-[var(--bg-soft)] mb-12">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  unoptimized
                  priority
                />
              </div>
            </Reveal>
          )}

          <Reveal delay={0.25}>
            <MarkdownRenderer content={post.content} />
          </Reveal>
        </div>

        <aside className="hidden lg:block">
          <TableOfContents items={toc} />
        </aside>
      </div>
    </article>
  );
}
