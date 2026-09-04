import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { books } from "@/data/books";
import { services } from "@/data/services";
import { tools } from "@/data/tools";

export const dynamic = "force-dynamic";

export type SearchResult = {
  id: string;
  type: "post" | "course" | "week" | "conference" | "press" | "page" | "book";
  title: string;
  description?: string;
  href: string;
};

const STATIC_PAGES: SearchResult[] = [
  { id: "p-home", type: "page", title: "Ana Sayfa", href: "/" },
  { id: "p-about", type: "page", title: "Hakkımda", href: "/hakkimda" },
  {
    id: "p-services",
    type: "page",
    title: "Hizmetler",
    description: "Sızma testi, mobil ve web uygulama geliştirme, eğitim",
    href: "/hizmetler",
  },
  { id: "p-cv", type: "page", title: "CV / Özgeçmiş", href: "/cv" },
  { id: "p-courses", type: "page", title: "Dersler", href: "/dersler" },
  { id: "p-posts", type: "page", title: "Yazılarım", href: "/yazilarim" },
  { id: "p-books", type: "page", title: "Kitaplarım", href: "/kitaplar" },
  { id: "p-pubs", type: "page", title: "Yayınlar", href: "/yayinlar" },
  { id: "p-confs", type: "page", title: "Konferanslarım", href: "/konferanslarim" },
  { id: "p-press", type: "page", title: "Basında", href: "/basin" },
  { id: "p-projects", type: "page", title: "Projeler", href: "/projeler" },
  { id: "p-contact", type: "page", title: "İletişim", href: "/iletisim" },
  { id: "p-announce", type: "page", title: "Duyurular", href: "/duyurular" },
  { id: "p-en", type: "page", title: "English", href: "/en" },
  {
    id: "p-tools",
    type: "page",
    title: "Araçlar",
    description: "Atıf denetleyici, PDF bölücü, anonimleştirici ve diğerleri",
    href: "/araclar",
  },
  ...tools.map<SearchResult>((t) => ({
    id: `tool-${t.slug}`,
    type: "page",
    title: t.title,
    description: t.summary,
    href: `/araclar/${t.slug}`,
  })),
  // Her hizmet ayrı ayrı aranabilsin — "pentest" yazan doğrudan bölüme düşsün.
  ...services.map<SearchResult>((sv) => ({
    id: `svc-${sv.slug}`,
    type: "page",
    title: sv.copy.tr.title,
    description: sv.copy.tr.summary,
    href: `/hizmetler#${sv.slug}`,
  })),
];

export async function GET() {
  const [posts, courses, weeks, conferences, press] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      select: { id: true, slug: true, title: true, excerpt: true },
    }),
    prisma.course.findMany({
      select: { id: true, slug: true, title: true, program: true },
    }),
    prisma.courseWeek.findMany({
      select: {
        id: true,
        weekNumber: true,
        topic: true,
        course: { select: { slug: true, title: true } },
      },
    }),
    prisma.conference.findMany({
      select: { id: true, title: true, location: true },
    }),
    prisma.pressItem.findMany({
      select: { id: true, title: true, source: true, url: true },
    }),
  ]);

  const results: SearchResult[] = [
    ...STATIC_PAGES,
    ...books.map((b) => ({
      id: `book-${b.slug}`,
      type: "book" as const,
      title: `${b.title} — ${b.subtitle}`,
      description: b.excerpt,
      href: `/kitaplar/${b.slug}`,
    })),
    ...posts.map((p) => ({
      id: `post-${p.id}`,
      type: "post" as const,
      title: p.title,
      description: p.excerpt,
      href: `/yazilarim/${p.slug}`,
    })),
    ...courses.map((c) => ({
      id: `course-${c.id}`,
      type: "course" as const,
      title: c.title,
      description: c.program,
      href: `/dersler/${c.slug}`,
    })),
    ...weeks.map((w) => ({
      id: `week-${w.id}`,
      type: "week" as const,
      title: `${w.weekNumber}. Hafta · ${w.topic}`,
      description: w.course.title,
      href: `/dersler/${w.course.slug}/hafta/${w.weekNumber}`,
    })),
    ...conferences.map((c) => ({
      id: `conf-${c.id}`,
      type: "conference" as const,
      title: c.title,
      description: c.location,
      href: `/konferanslarim`,
    })),
    ...press.map((p) => ({
      id: `press-${p.id}`,
      type: "press" as const,
      title: p.title,
      description: p.source,
      href: `/basin`,
    })),
  ];

  return NextResponse.json({ results });
}
