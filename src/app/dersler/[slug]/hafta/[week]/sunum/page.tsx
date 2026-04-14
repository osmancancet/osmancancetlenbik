import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SlideDeck } from "@/components/SlideDeck";
import { PresentationHost } from "@/components/PresentationHost";

export const dynamic = "force-dynamic";

export default async function CourseWeekSlidesPage({
  params,
}: {
  params: Promise<{ slug: string; week: string }>;
}) {
  const { slug, week } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) notFound();

  const w = await prisma.courseWeek.findUnique({
    where: {
      courseId_weekNumber: {
        courseId: course.id,
        weekNumber: Number(week),
      },
    },
  });
  if (!w) notFound();

  const backHref = `/dersler/${course.slug}/hafta/${w.weekNumber}`;

  // React component sunum varsa onu kullan, yoksa markdown SlideDeck
  if (w.presentationSlug) {
    return <PresentationHost slug={w.presentationSlug} backHref={backHref} />;
  }

  return (
    <SlideDeck
      content={w.slides ?? ""}
      title={`${course.title} · ${w.weekNumber}. Hafta — ${w.topic}`}
      backHref={backHref}
    />
  );
}
