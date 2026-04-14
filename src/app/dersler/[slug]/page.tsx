import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Presentation, BookOpen, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/ui/Reveal";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) return { title: "Ders Bulunamadı" };
  return {
    title: course.title,
    description: course.description ?? `${course.title} — ${course.program}`,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { weeks: { orderBy: { weekNumber: "asc" } } },
  });
  if (!course) notFound();

  return (
    <section className="relative pt-32 pb-24 px-6">
      <div className="relative max-w-5xl mx-auto">
        <Reveal>
          <Link
            href="/dersler"
            className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Tüm dersler
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
            <span className="w-6 h-px bg-[var(--accent)]" />
            {course.type}
            {course.semester && <span>· {course.semester}</span>}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--fg)] mb-3">
            {course.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-lg text-[var(--fg-muted)] mb-2">
            {course.program}
          </p>
        </Reveal>

        {course.schedule && (
          <Reveal delay={0.18}>
            <div className="inline-flex items-center gap-2 mt-2 text-sm font-mono text-[var(--accent)] border border-[var(--accent)]/30 bg-[var(--accent)]/5 rounded-md px-3 py-1.5">
              <Clock className="w-3.5 h-3.5" />
              {course.schedule}
            </div>
          </Reveal>
        )}

        {course.description && (
          <Reveal delay={0.2}>
            <p className="text-base text-[var(--fg-muted)] leading-relaxed mt-6 max-w-3xl">
              {course.description}
            </p>
          </Reveal>
        )}

        {course.syllabus && (
          <Reveal delay={0.25}>
            <div className="mt-12 max-w-3xl">
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] mb-4">
                Ders İçeriği
              </div>
              <MarkdownRenderer content={course.syllabus} />
            </div>
          </Reveal>
        )}

        {/* Weekly plan */}
        <div className="mt-16">
          <Reveal>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-[var(--fg)]">
                Haftalık Plan
              </h2>
              <span className="font-mono text-xs text-[var(--fg-subtle)]">
                {course.weeks.length} hafta
              </span>
            </div>
          </Reveal>

          {course.weeks.length === 0 ? (
            <Reveal>
              <div className="card rounded-lg p-12 text-center">
                <BookOpen className="w-10 h-10 text-[var(--fg-subtle)] mx-auto mb-4" />
                <p className="text-sm text-[var(--fg-muted)]">
                  Haftalık plan henüz eklenmedi.
                </p>
              </div>
            </Reveal>
          ) : (
            <div className="space-y-3">
              {course.weeks.map((w, i) => (
                <Reveal key={w.id} delay={i * 0.04}>
                  <Link
                    href={`/dersler/${course.slug}/hafta/${w.weekNumber}`}
                    className="group card rounded-lg p-5 flex items-center gap-5 hover:border-[var(--accent)]/40"
                  >
                    <div className="w-12 h-12 rounded-md border border-[var(--border-strong)] flex flex-col items-center justify-center shrink-0">
                      <div className="text-[10px] uppercase tracking-wider text-[var(--fg-subtle)]">
                        Hafta
                      </div>
                      <div className="text-sm font-mono text-[var(--accent)] font-semibold">
                        {String(w.weekNumber).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                        {w.topic}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[var(--fg-subtle)]">
                        {w.notes && (
                          <span className="inline-flex items-center gap-1">
                            <FileText className="w-3 h-3" /> Notlar
                          </span>
                        )}
                        {w.slides && (
                          <span className="inline-flex items-center gap-1">
                            <Presentation className="w-3 h-3" /> Sunum
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
