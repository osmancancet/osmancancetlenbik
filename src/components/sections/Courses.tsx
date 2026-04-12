"use client";

import { courses } from "@/data/courses";
import { Reveal } from "@/components/ui/Reveal";
import {
  Brain,
  Sparkles,
  Smartphone,
  Globe,
  Terminal,
  HeartPulse,
  Cpu,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Sparkles,
  Smartphone,
  Globe,
  Terminal,
  HeartPulse,
  Cpu,
};

export function Courses() {
  if (courses.length === 0) {
    return (
      <Reveal>
        <div className="card rounded-lg p-12 text-center">
          <BookOpen className="w-10 h-10 text-[var(--fg-subtle)] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[var(--fg)] mb-2">
            Ders Listesi Güncelleniyor
          </h3>
          <p className="text-sm text-[var(--fg-muted)] max-w-md mx-auto">
            Manisa Celal Bayar Üniversitesi Teknik Bilimler Meslek Yüksekokulu
            Büyük Veri Analistliği Programı bünyesinde verilen güncel dersler
            kısa süre içinde burada listelenecek.
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course, i) => {
        const Icon = iconMap[course.icon] ?? Brain;
        return (
          <Reveal key={course.title} delay={i * 0.04}>
            <div className="card rounded-lg p-6 h-full">
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 rounded-md border border-[var(--border-strong)] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--fg-subtle)]">
                  {course.type}
                </span>
              </div>
              <h3 className="text-base font-medium text-[var(--fg)] mb-1">
                {course.title}
              </h3>
              <p className="text-xs text-[var(--fg-muted)]">{course.program}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
