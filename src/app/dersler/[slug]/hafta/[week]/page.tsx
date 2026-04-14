import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Presentation,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/ui/Reveal";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; week: string }>;
}): Promise<Metadata> {
  const { slug, week } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) return { title: "Hafta Bulunamadı" };
  const w = await prisma.courseWeek.findUnique({
    where: { courseId_weekNumber: { courseId: course.id, weekNumber: Number(week) } },
  });
  return {
    title: w ? `${w.weekNumber}. Hafta · ${w.topic}` : course.title,
    description: w?.topic,
  };
}

export default async function WeekDetailPage({
  params,
}: {
  params: Promise<{ slug: string; week: string }>;
}) {
  const { slug, week } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { weeks: { orderBy: { weekNumber: "asc" } } },
  });
  if (!course) notFound();

  const weekNumber = Number(week);
  const current = course.weeks.find((w) => w.weekNumber === weekNumber);
  if (!current) notFound();

  const idx = course.weeks.findIndex((w) => w.weekNumber === weekNumber);
  const prevWeek = idx > 0 ? course.weeks[idx - 1] : null;
  const nextWeek =
    idx < course.weeks.length - 1 ? course.weeks[idx + 1] : null;

  return (
    <section className="relative pt-32 pb-24 px-6">
      <div className="relative max-w-3xl mx-auto">
        <Reveal>
          <Link
            href={`/dersler/${course.slug}`}
            className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {course.title}
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
            {current.weekNumber}. Hafta
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--fg)] leading-tight mb-8">
            {current.topic}
          </h1>
        </Reveal>

        {current.slides && (
          <Reveal delay={0.15}>
            <Link
              href={`/dersler/${course.slug}/hafta/${current.weekNumber}/sunum`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md hover:bg-white transition-colors mb-12"
            >
              <Presentation className="w-4 h-4" />
              Sunumu Başlat
            </Link>
          </Reveal>
        )}

        {current.notes && (
          <Reveal delay={0.2}>
            <div className="mb-12">
              <h2 className="text-xs uppercase tracking-[0.18em] text-[var(--fg-subtle)] font-mono mb-4">
                Ders Notları
              </h2>
              <MarkdownRenderer content={current.notes} />
            </div>
          </Reveal>
        )}

        {current.resources && (
          <Reveal delay={0.25}>
            <div className="mb-12">
              <h2 className="text-xs uppercase tracking-[0.18em] text-[var(--fg-subtle)] font-mono mb-4">
                Kaynaklar
              </h2>
              <MarkdownRenderer content={current.resources} />
            </div>
          </Reveal>
        )}

        {/* Pagination */}
        <Reveal delay={0.3}>
          <div className="grid grid-cols-2 gap-3 mt-16 pt-8 border-t border-[var(--border)]">
            {prevWeek ? (
              <Link
                href={`/dersler/${course.slug}/hafta/${prevWeek.weekNumber}`}
                className="card rounded-lg p-4 hover:border-[var(--accent)]/40 group"
              >
                <div className="flex items-center gap-2 text-xs text-[var(--fg-subtle)] mb-1">
                  <ChevronLeft className="w-3 h-3" />
                  {prevWeek.weekNumber}. Hafta
                </div>
                <div className="text-sm text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors truncate">
                  {prevWeek.topic}
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextWeek ? (
              <Link
                href={`/dersler/${course.slug}/hafta/${nextWeek.weekNumber}`}
                className="card rounded-lg p-4 hover:border-[var(--accent)]/40 group text-right"
              >
                <div className="flex items-center justify-end gap-2 text-xs text-[var(--fg-subtle)] mb-1">
                  {nextWeek.weekNumber}. Hafta
                  <ChevronRight className="w-3 h-3" />
                </div>
                <div className="text-sm text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors truncate">
                  {nextWeek.topic}
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
