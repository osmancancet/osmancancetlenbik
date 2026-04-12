import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/hakkimda",
    "/dersler",
    "/yazilarim",
    "/yayinlar",
    "/konferanslarim",
    "/projeler",
    "/iletisim",
    "/cv",
    "/duyurular",
    "/basin",
  ].map((p) => ({
    url: `${siteUrl}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const [posts, courses, weeks, conferences] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.course.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.courseWeek.findMany({
      select: {
        weekNumber: true,
        updatedAt: true,
        course: { select: { slug: true } },
      },
    }),
    prisma.conference.findMany({
      select: { id: true, createdAt: true },
    }),
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

  const conferencePages: MetadataRoute.Sitemap = conferences.map((c) => ({
    url: `${siteUrl}/konferanslarim/${c.id}/sunum`,
    lastModified: c.createdAt,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...postPages,
    ...coursePages,
    ...weekPages,
    ...conferencePages,
  ];
}
