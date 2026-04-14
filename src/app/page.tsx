import { Hero } from "@/components/sections/Hero";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { HomeStats } from "@/components/sections/HomeStats";
import { HomeRecent } from "@/components/sections/HomeRecent";
import { Reveal } from "@/components/ui/Reveal";
import { prisma } from "@/lib/prisma";
import { publications } from "@/data/publications";
import { getReadingTime } from "@/lib/readingTime";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export const revalidate = 60;

export default async function Home() {
  const now = new Date();

  const [
    announcement,
    courseCount,
    postCount,
    conferenceCount,
    recentPosts,
    recentCourses,
    recentConferences,
  ] = await Promise.all([
    prisma.announcement.findFirst({
      where: {
        pinned: true,
        OR: [{ expiresAt: null }, { expiresAt: { gte: now } }],
      },
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, body: true, type: true },
    }),
    prisma.course.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.conference.count(),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      include: { _count: { select: { weeks: true } } },
    }),
    prisma.conference.findMany({
      orderBy: { date: "desc" },
      take: 3,
    }),
  ]);

  const hasContent =
    recentPosts.length > 0 ||
    recentCourses.length > 0 ||
    recentConferences.length > 0;

  return (
    <div className="pt-16">
      <AnnouncementBar announcement={announcement} />
      <Hero />

      {/* Stats strip */}
      <section className="relative px-6 py-24 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-[10px] text-[var(--accent)] uppercase tracking-[0.18em] mb-2">
              Genel Bakış
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--fg)] mb-10">
              Rakamlarla
            </h2>
          </Reveal>
          <HomeStats
            stats={{
              courses: courseCount,
              posts: postCount,
              conferences: conferenceCount,
              publications: publications.length,
            }}
          />
        </div>
      </section>

      {/* Recent activity */}
      {hasContent && (
        <section className="relative px-6 py-12 pb-24">
          <div className="max-w-6xl mx-auto">
            <HomeRecent
              posts={recentPosts.map((p) => ({
                id: p.id,
                slug: p.slug,
                title: p.title,
                excerpt: p.excerpt,
                createdAt: p.createdAt,
                reading: getReadingTime(p.content).text,
              }))}
              courses={recentCourses.map((c) => ({
                id: c.id,
                slug: c.slug,
                title: c.title,
                program: c.program,
                weekCount: c._count.weeks,
              }))}
              conferences={recentConferences.map((c) => ({
                id: c.id,
                title: c.title,
                location: c.location,
                date: c.date,
                hasSlides: Boolean(c.slides) || Boolean(c.presentationSlug),
              }))}
            />
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="relative px-6 py-24 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="text-[10px] text-[var(--accent)] uppercase tracking-[0.18em] mb-3">
              İletişim
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--fg)] tracking-tight mb-4">
              Birlikte çalışalım.
            </h2>
            <p className="text-[var(--fg-muted)] mb-8">
              Akademik iş birliği, danışmanlık veya yeni bir proje için bana
              ulaşabilirsiniz.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] text-sm font-semibold rounded-md hover:opacity-90 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                İletişim
              </Link>
              <Link
                href="/cv"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-strong)] text-[var(--fg)] text-sm font-medium rounded-md hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                CV
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
