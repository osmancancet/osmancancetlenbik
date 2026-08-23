import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/site";
import { books } from "@/data/books";
import { locales, htmlLang, localizedRoutes } from "@/lib/i18n";

// Build sırasında DB bağlanamazsa fail etmesin — request-time'da generate
export const dynamic = "force-dynamic";
export const revalidate = 3600;

/** İki dilli sayfalar için sitemap içi hreflang bloğu. */
function altsFor(path: string) {
  const group = localizedRoutes.find((r) =>
    locales.some((l) => r[l] === path)
  );
  if (!group) return undefined;
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[htmlLang[l]] = `${siteUrl}${group[l] === "/" ? "" : group[l]}`;
  }
  languages["x-default"] = `${siteUrl}${group.tr === "/" ? "" : group.tr}`;
  return { languages };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const trPages: Array<[string, number]> = [
    ["", 1],
    ["/hizmetler", 0.95],
    ["/hakkimda", 0.8],
    ["/dersler", 0.7],
    ["/yazilarim", 0.8],
    ["/kitaplar", 0.8],
    ["/yayinlar", 0.7],
    ["/konferanslarim", 0.6],
    ["/projeler", 0.7],
    ["/iletisim", 0.7],
    ["/duyurular", 0.5],
    ["/basin", 0.5],
    ["/cv", 0.6],
  ];

  const enPages: Array<[string, number]> = [
    ["/en", 0.9],
    ["/en/services", 0.9],
    ["/en/about", 0.7],
    ["/en/publications", 0.6],
    ["/en/contact", 0.6],
  ];

  const dePages: Array<[string, number]> = [
    ["/de", 0.9],
    ["/de/leistungen", 0.9],
    ["/de/ueber-mich", 0.7],
    ["/de/publikationen", 0.6],
    ["/de/kontakt", 0.6],
  ];

  const arPages: Array<[string, number]> = [
    ["/ar", 0.9],
    ["/ar/services", 0.9],
    ["/ar/about", 0.7],
    ["/ar/publications", 0.6],
    ["/ar/contact", 0.6],
  ];

  const staticPages: MetadataRoute.Sitemap = [
    ...trPages,
    ...enPages,
    ...dePages,
    ...arPages,
  ].map(
    ([p, priority]) => ({
      url: `${siteUrl}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority,
      alternates: altsFor(p === "" ? "/" : p),
    })
  );

  const [posts, courses, weeks] = await Promise.all([
    prisma.post
      .findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      })
      .catch(() => [] as { slug: string; updatedAt: Date }[]),
    prisma.course
      .findMany({ select: { slug: true, updatedAt: true } })
      .catch(() => [] as { slug: string; updatedAt: Date }[]),
    prisma.courseWeek
      .findMany({
        select: {
          weekNumber: true,
          updatedAt: true,
          course: { select: { slug: true } },
        },
      })
      .catch(
        () =>
          [] as {
            weekNumber: number;
            updatedAt: Date;
            course: { slug: string };
          }[]
      ),
  ]);

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteUrl}/yazilarim/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const coursePages: MetadataRoute.Sitemap = courses.map((c) => ({
    url: `${siteUrl}/dersler/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const weekPages: MetadataRoute.Sitemap = weeks.map((w) => ({
    url: `${siteUrl}/dersler/${w.course.slug}/hafta/${w.weekNumber}`,
    lastModified: w.updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const bookPages: MetadataRoute.Sitemap = books.map((b) => ({
    url: `${siteUrl}/kitaplar/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Konferans slaytları (/konferanslarim/[id]/sunum) bilerek listelenmiyor:
  // JavaScript ile çalışan sunum görüntüleyicileri; artık noindex.
  return [
    ...staticPages,
    ...bookPages,
    ...postPages,
    ...coursePages,
    ...weekPages,
  ];
}
