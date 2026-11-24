"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { todayIstanbul } from "@/lib/courseSchedule";

export type CalendarCourse = {
  slug: string;
  title: string;
  type: string;
  day: number;
  dayName: string;
  start: string;
  end: string;
  startMin: number;
  endMin: number;
  room: string | null;
};

const PX_PER_MIN = 1.1;

/**
 * Haftalık ders takvimi. Masaüstünde saat eksenli ızgara (her ders saat
 * aralığı kadar yer kaplar), mobilde gün gün sıralı liste. "Bugün" yalnızca
 * tarayıcıda işaretlenir; sunucu çıktısı saatten bağımsız kalsın diye.
 */
export function WeekCalendar({ courses }: { courses: CalendarCourse[] }) {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(todayIstanbul()), []);

  const days = [...new Set(courses.map((c) => c.day))].sort((a, b) => a - b);
  const byDay = (d: number) =>
    courses.filter((c) => c.day === d).sort((a, b) => a.startMin - b.startMin);

  const first =
    Math.floor(Math.min(...courses.map((c) => c.startMin)) / 60) * 60;
  const last = Math.ceil(Math.max(...courses.map((c) => c.endMin)) / 60) * 60;
  const hours: number[] = [];
  for (let m = first; m <= last; m += 60) hours.push(m);
  const height = (last - first) * PX_PER_MIN;

  const dayLabel = (d: number) => byDay(d)[0].dayName;
  const isToday = (d: number) => today === d;

  const block = (c: CalendarCourse, compact: boolean) => (
    <Link
      key={c.slug}
      href={`/dersler/${c.slug}`}
      className={`group block rounded-md border border-[var(--border-strong)] bg-[var(--bg-card)] hover:border-[var(--accent)]/60 transition-colors overflow-hidden ${
        compact ? "absolute inset-x-1 p-2.5" : "p-4"
      }`}
      style={
        compact
          ? {
              top: (c.startMin - first) * PX_PER_MIN,
              height: (c.endMin - c.startMin) * PX_PER_MIN - 4,
            }
          : undefined
      }
    >
      <div
        className="absolute inset-y-0 start-0 w-0.5 bg-[var(--accent)]/70"
        aria-hidden
      />
      <div className="font-mono text-[11px] text-[var(--accent)]">
        {c.start}–{c.end}
      </div>
      <div className="mt-1 text-sm font-medium leading-snug text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
        {c.title}
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[var(--fg-subtle)]">
        {c.room && (
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {c.room}
          </span>
        )}
        <span className="uppercase tracking-wider text-[10px]">{c.type}</span>
      </div>
    </Link>
  );

  return (
    <>
      {/* Masaüstü: saat eksenli haftalık ızgara */}
      <div className="hidden md:block card rounded-lg p-4">
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `3.5rem repeat(${days.length}, minmax(0, 1fr))`,
          }}
        >
          <div />
          {days.map((d) => (
            <div
              key={d}
              className={`pb-3 text-center text-sm font-medium ${
                isToday(d) ? "text-[var(--accent)]" : "text-[var(--fg)]"
              }`}
            >
              {dayLabel(d)}
              {isToday(d) && (
                <span className="ms-2 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-[var(--accent)]/50">
                  Bugün
                </span>
              )}
            </div>
          ))}

          <div className="relative" style={{ height }}>
            {hours.map((m) => (
              <div
                key={m}
                className="absolute end-2 -translate-y-1/2 font-mono text-[10px] text-[var(--fg-subtle)]"
                style={{ top: (m - first) * PX_PER_MIN }}
              >
                {String(m / 60).padStart(2, "0")}:00
              </div>
            ))}
          </div>
          {days.map((d) => (
            <div
              key={d}
              className={`relative rounded-md border ${
                isToday(d)
                  ? "border-[var(--accent)]/40 bg-[var(--accent)]/[0.03]"
                  : "border-[var(--border)]"
              }`}
              style={{ height }}
            >
              {hours.map((m) => (
                <div
                  key={m}
                  aria-hidden
                  className="absolute inset-x-0 border-t border-dashed border-[var(--border)]"
                  style={{ top: (m - first) * PX_PER_MIN }}
                />
              ))}
              {byDay(d).map((c) => block(c, true))}
            </div>
          ))}
        </div>
      </div>

      {/* Mobil: gün gün liste */}
      <div className="md:hidden space-y-6">
        {days.map((d) => (
          <section key={d}>
            <h3
              className={`mb-3 text-sm font-medium flex items-center gap-2 ${
                isToday(d) ? "text-[var(--accent)]" : "text-[var(--fg)]"
              }`}
            >
              {dayLabel(d)}
              {isToday(d) && (
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-[var(--accent)]/50">
                  Bugün
                </span>
              )}
            </h3>
            <div className="space-y-2">
              {byDay(d).map((c) => (
                <div key={c.slug} className="relative">
                  {block(c, false)}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
