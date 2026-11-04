import { Suspense, cache } from "react";
import { notFound } from "next/navigation";
import { databaseConfigured, prisma } from "@/lib/prisma";
import { courseWeekParams } from "@/lib/staticParams";
import { WeekSlides } from "@/components/WeekSlides";
import type { Metadata } from "next";

// Slayt görüntüleyici: hafta sayfasının içeriğini tekrar eder ve JavaScript
// olmadan anlamsızdır — kanonik sinyali hafta sayfasında kalsın diye noindex.
const NOINDEX: Metadata = {
  title: "Sunum",
  robots: { index: false, follow: false },
};

function parseWeek(week: string): number | null {
  if (!/^\d+$/.test(week)) return null;
  const n = Number(week);
  return Number.isInteger(n) ? n : null;
}

const loadWeek = cache(async (slug: string, weekNumber: number) => {
  if (!databaseConfigured()) return null;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) return null;
  const w = await prisma.courseWeek.findUnique({
    where: {
      courseId_weekNumber: { courseId: course.id, weekNumber },
    },
  });
  if (!w) return null;
  return { course, w };
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; week: string }>;
}): Promise<Metadata> {
  const { slug, week } = await params;
  const weekNumber = parseWeek(week);
  if (weekNumber == null) notFound();
  const found = await loadWeek(slug, weekNumber);
  if (!found) notFound();
  return NOINDEX;
}

// İçerik yalnızca admin panelden değişiyor ve her değişiklik önbelleği
// anında tazeliyor (bkz. lib/revalidate.ts). Bu süre sadece güvenlik ağı.
export const revalidate = 86400;

export async function generateStaticParams() {
  return courseWeekParams();
}

export default async function CourseWeekSlidesPage({
  params,
}: {
  params: Promise<{ slug: string; week: string }>;
}) {
  const { slug, week } = await params;
  const weekNumber = parseWeek(week);
  if (weekNumber == null) notFound();
  const found = await loadWeek(slug, weekNumber);
  if (!found) notFound();
  const { course, w } = found;

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
