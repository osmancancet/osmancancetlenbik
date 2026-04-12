import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CourseWeekForm } from "@/components/admin/CourseWeekForm";

export const dynamic = "force-dynamic";

export default async function NewWeekPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { id },
    include: { weeks: { orderBy: { weekNumber: "asc" } } },
  });
  if (!course) notFound();

  const nextWeekNumber =
    course.weeks.length === 0
      ? 1
      : Math.max(...course.weeks.map((w) => w.weekNumber)) + 1;

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
          Yeni Hafta
        </div>
        <h1 className="text-3xl font-semibold text-[var(--fg)]">
          {nextWeekNumber}. Hafta
        </h1>
      </div>

      <CourseWeekForm
        courseId={course.id}
        courseSlug={course.slug}
        initial={{
          weekNumber: nextWeekNumber,
          topic: "",
          notes: "",
          slides: "",
          resources: "",
        }}
      />
    </div>
  );
}
