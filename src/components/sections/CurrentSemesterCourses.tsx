"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type Course = {
  id: string;
  slug: string;
  title: string;
  code: string;
  type: string;
  schedule: string | null;
  weekCount: number;
};

export function CurrentSemesterCourses({
  semester,
  courses,
}: {
  semester: string;
  courses: Course[];
}) {
  if (courses.length === 0) return null;

  return (
    <section className="relative px-6 py-20 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-baseline justify-between mb-2 flex-wrap gap-3">
            <div>
              <div className="text-[10px] text-[var(--accent)] uppercase tracking-[0.18em] mb-2 flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                {semester}
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--fg)]">
                Bu Dönem Verdiğim Dersler
              </h2>
            </div>
            <Link
              href="/dersler"
              className="text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5"
            >
              Tüm dersler
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-sm text-[var(--fg-muted)] max-w-2xl mt-2 mb-10 leading-relaxed">
            Manisa Celal Bayar Üniversitesi · Teknik Bilimler MYO · Büyük Veri
            Analistliği Programı &mdash; {courses.length} ders, {" "}
            {courses.reduce((acc, c) => acc + c.weekCount, 0)} haftalık içerik.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {courses.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.04}>
              <Link
                href={`/dersler/${c.slug}`}
                className="group card rounded-lg p-4 h-full flex flex-col hover:border-[var(--accent)]/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-[var(--accent)] tracking-wider">
                    {c.code}
                  </span>
                  <span
                    className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      c.type === "Zorunlu"
                        ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                        : "bg-[var(--fg-subtle)]/10 text-[var(--fg-subtle)]"
                    }`}
                  >
                    {c.type}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[var(--fg)] mb-3 leading-snug group-hover:text-[var(--accent)] transition-colors line-clamp-2 min-h-[2.5rem]">
                  {c.title}
                </h3>
                {c.schedule && (
                  <div className="mt-auto flex items-center gap-1.5 text-[10px] text-[var(--fg-subtle)] font-mono">
                    <Clock className="w-3 h-3" />
                    <span className="truncate">{c.schedule}</span>
                  </div>
                )}
                <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-[var(--fg-subtle)] font-mono">
                  <BookOpen className="w-3 h-3" />
                  <span>{c.weekCount} hafta</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
