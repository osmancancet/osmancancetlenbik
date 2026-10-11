import { Suspense } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { courseWeekParams } from "@/lib/staticParams";
import { WeekSlides } from "@/components/WeekSlides";
import type { Metadata } from "next";

// Slayt görüntüleyici: hafta sayfasının içeriğini tekrar eder ve JavaScript
// olmadan anlamsızdır — kanonik sinyali hafta sayfasında kalsın diye noindex.
export const metadata: Metadata = {
  title: "Sunum",
  robots: { index: false, follow: false },
};

// İçerik yalnızca admin panelden değişiyor ve her değişiklik önbelleği
// anında tazeliyor (bkz. lib/revalidate.ts). Bu süre sadece güvenlik ağı.
export const revalidate = 86400;

export const generateStaticParams = courseWeekParams;

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

  // `searchParams` burada okunmuyor: okunursa sayfa önbelleğe alınamaz ve
  // her istekte yeniden render edilir. Görüntüleyici seçimi WeekSlides'ta.
  return (
    <Suspense fallback={null}>
      <WeekSlides
        presentationSlug={w.presentationSlug}
        slides={w.slides ?? ""}
        title={`${course.title} · ${w.weekNumber}. Hafta — ${w.topic}`}
        backHref={backHref}
      />
    </Suspense>
  );
}
