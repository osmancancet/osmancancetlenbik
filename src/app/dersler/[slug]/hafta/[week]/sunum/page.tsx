import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SlideDeck } from "@/components/SlideDeck";
import { PresentationHost } from "@/components/PresentationHost";
import type { Metadata } from "next";

// Slayt görüntüleyici: hafta sayfasının içeriğini tekrar eder ve JavaScript
// olmadan anlamsızdır — kanonik sinyali hafta sayfasında kalsın diye noindex.
export const metadata: Metadata = {
  title: "Sunum",
  robots: { index: false, follow: false },
};

export const revalidate = 300;

export default async function CourseWeekSlidesPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; week: string }>;
  searchParams: Promise<{ format?: string }>;
}) {
  const { slug, week } = await params;
  const { format } = await searchParams;
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

  // React component sunum varsa onu kullan, yoksa markdown SlideDeck.
  // `?format=markdown` ikisi birden varken yazılı slaytları açar.
  if (w.presentationSlug && format !== "markdown") {
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
