import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { prisma } from "@/lib/prisma";
import { BookOpen, ArrowUpRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Dersler",
  description:
    "Manisa Celal Bayar Üniversitesi Teknik Bilimler MYO Büyük Veri Analistliği Programı'nda verilen dersler.",
};

export const revalidate = 300;

export default async function DerslerPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { weeks: true } } },
  });

  return (
    <PageShell
      eyebrow="Akademik"
      title="Verdiğim Dersler"
      subtitle="MCBÜ Teknik Bilimler MYO · İstatistik Bölümü · Büyük Veri Analistliği Programı"
    >
      {courses.length === 0 ? (
        <Reveal>
          <div className="card rounded-lg p-12 text-center">
            <BookOpen className="w-10 h-10 text-[var(--fg-subtle)] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[var(--fg)] mb-2">
              Ders Listesi Güncelleniyor
            </h3>
            <p className="text-sm text-[var(--fg-muted)] max-w-md mx-auto">
              Güncel dersler kısa süre içinde burada listelenecek.
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, i) => (
            <Reveal key={course.id} delay={i * 0.05}>
              <Link
                href={`/dersler/${course.slug}`}
                className="group card rounded-lg p-6 h-full block hover:border-[var(--accent)]/40"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-md border border-[var(--border-strong)] flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--fg-subtle)]">
                    {course.type}
                  </span>
                </div>
                <h3 className="text-base font-medium text-[var(--fg)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-[var(--fg-muted)] mb-3">
                  {course.program}
                </p>
                {course.schedule && (
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[var(--accent)] border border-[var(--border-strong)] rounded px-2 py-0.5 mb-4">
                    <Clock className="w-3 h-3" />
                    {course.schedule}
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-[var(--fg-subtle)] pt-4 border-t border-[var(--border)]">
                  <span className="font-mono">{course._count.weeks} hafta</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </PageShell>
  );
}
