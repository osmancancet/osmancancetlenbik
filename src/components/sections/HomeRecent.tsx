"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, BookOpen, Mic, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  createdAt: Date;
  reading: string;
};

type Course = {
  id: string;
  slug: string;
  title: string;
  program: string;
  weekCount: number;
};

type Conference = {
  id: string;
  title: string;
  location: string;
  date: Date;
  hasSlides: boolean;
};

export function HomeRecent({
  posts,
  courses,
  conferences,
}: {
  posts: Post[];
  courses: Course[];
  conferences: Conference[];
}) {
  return (
    <div className="space-y-20">
      {/* Posts */}
      {posts.length > 0 && (
        <Block
          eyebrow="Blog"
          title="Son Yazılar"
          icon={FileText}
          href="/yazilarim"
          ctaLabel="Tüm yazılar"
        >
          <div className="grid md:grid-cols-3 gap-4">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <Link
                  href={`/yazilarim/${p.slug}`}
                  className="group card rounded-lg p-5 h-full block hover:border-[var(--accent)]/40 transition-colors"
                >
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--fg-subtle)] mb-3">
                    <span>
                      {new Date(p.createdAt).toLocaleDateString("tr-TR", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {p.reading}
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-[var(--fg)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[var(--fg-muted)] line-clamp-3 leading-relaxed">
                    {p.excerpt}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Block>
      )}

      {/* Courses */}
      {courses.length > 0 && (
        <Block
          eyebrow="Akademik"
          title="Güncel Dersler"
          icon={BookOpen}
          href="/dersler"
          ctaLabel="Tüm dersler"
        >
          <div className="grid md:grid-cols-3 gap-4">
            {courses.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.05}>
                <Link
                  href={`/dersler/${c.slug}`}
                  className="group card rounded-lg p-5 h-full block hover:border-[var(--accent)]/40 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-9 h-9 rounded-md border border-[var(--border-strong)] flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <span className="font-mono text-[10px] text-[var(--fg-subtle)]">
                      {c.weekCount} hafta
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-[var(--fg)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[var(--fg-muted)]">{c.program}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Block>
      )}

      {/* Conferences */}
      {conferences.length > 0 && (
        <Block
          eyebrow="Konuşmalar"
          title="Son Etkinlikler"
          icon={Mic}
          href="/konferanslarim"
          ctaLabel="Tüm konferanslar"
        >
          <div className="space-y-3">
            {conferences.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.05}>
                <article className="group card rounded-lg p-5 grid md:grid-cols-[auto_1fr_auto] gap-4 items-center hover:border-[var(--accent)]/40 transition-colors">
                  <div className="flex md:flex-col items-center gap-2 md:w-20 md:border-r md:border-[var(--border)] md:pr-4">
                    <Mic className="w-4 h-4 text-[var(--accent)]" />
                    <span className="font-mono text-xs text-[var(--fg-muted)]">
                      {new Date(c.date).toLocaleDateString("tr-TR", {
                        day: "2-digit",
                        month: "short",
                        year: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                      {c.title}
                    </h3>
                    <div className="text-xs text-[var(--fg-muted)] mt-0.5 truncate">
                      {c.location}
                    </div>
                  </div>
                  {c.hasSlides && (
                    <Link
                      href={`/konferanslarim/${c.id}/sunum`}
                      className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-[var(--accent)]/40 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors shrink-0"
                    >
                      Sunum →
                    </Link>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </Block>
      )}
    </div>
  );
}

function Block({
  eyebrow,
  title,
  icon: Icon,
  href,
  ctaLabel,
  children,
}: {
  eyebrow: string;
  title: string;
  icon: typeof FileText;
  href: string;
  ctaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <Reveal>
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] text-[var(--accent)] uppercase tracking-[0.18em] mb-2">
              <Icon className="w-3 h-3" />
              {eyebrow}
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--fg)]">
              {title}
            </h2>
          </div>
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
          >
            {ctaLabel}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </Reveal>
      {children}
    </section>
  );
}
