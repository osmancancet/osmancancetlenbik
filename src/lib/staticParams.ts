import { prisma } from "@/lib/prisma";

/**
 * Ders sayfaları için `generateStaticParams` yardımcıları.
 *
 * Next.js, dinamik segmentli bir sayfada `generateStaticParams` yoksa sayfayı
 * her istekte sunucuda yeniden üretir (Vercel Function çalışır, CPU harcanır).
 * Bu fonksiyonlar sayfaları build sırasında önceden üretir; listede olmayan
 * yeni bir ders/hafta ilk ziyarette üretilip önbelleğe alınır (ISR).
 *
 * Build sırasında veritabanına ulaşılamazsa boş liste dönülür: build yine
 * başarılı olur ve sayfalar ilk ziyarette üretilip önbelleğe alınır.
 */

export async function courseSlugParams(): Promise<{ slug: string }[]> {
  try {
    const courses = await prisma.course.findMany({ select: { slug: true } });
    return courses.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function courseWeekParams(): Promise<
  { slug: string; week: string }[]
> {
  try {
    const weeks = await prisma.courseWeek.findMany({
      select: { weekNumber: true, course: { select: { slug: true } } },
    });
    return weeks.map((w) => ({
      slug: w.course.slug,
      week: String(w.weekNumber),
    }));
  } catch {
    return [];
  }
}
