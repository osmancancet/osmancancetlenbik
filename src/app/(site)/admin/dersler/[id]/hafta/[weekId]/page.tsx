import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CourseWeekForm } from "@/components/admin/CourseWeekForm";

export const dynamic = "force-dynamic";

export default async function EditWeekPage({
  params,
}: {
  params: Promise<{ id: string; weekId: string }>;
}) {
  const { id, weekId } = await params;
  const [course, week] = await Promise.all([
    prisma.course.findUnique({ where: { id } }),
    prisma.courseWeek.findUnique({ where: { id: weekId } }),
  ]);
  if (!course || !week) notFound();

  return (
    <div>
      <Link
        href={`/admin/dersler/${course.id}`}
        className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {course.title}
      </Link>

      <div className="mb-10">
        <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-2">
          {week.weekNumber}. Hafta
        </div>
        <h1 className="text-3xl font-semibold text-[var(--fg)]">
          {week.topic}
        </h1>
      </div>

      <CourseWeekForm
        courseId={course.id}
        courseSlug={course.slug}
        initial={{
          id: week.id,
          weekNumber: week.weekNumber,
          topic: week.topic,
          notes: week.notes ?? "",
          slides: week.slides ?? "",
          resources: week.resources ?? "",
          presentationSlug: week.presentationSlug ?? "",
        }}
      />
    </div>
  );
}
