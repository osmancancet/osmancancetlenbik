import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { LiveComposer } from "./LiveComposer";

export const dynamic = "force-dynamic";

export default async function NewLiveSessionPage() {
  const courses = await prisma.course.findMany({
    orderBy: { title: "asc" },
    select: {
      id: true,
      title: true,
      weeks: { select: { weekNumber: true }, orderBy: { weekNumber: "asc" } },
    },
  });

  return (
    <div>
      <Link
        href="/admin/canli"
        className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Canlı dersler
      </Link>
      <h1 className="text-2xl font-semibold text-[var(--fg)] mb-1">
        Yeni canlı oturum
      </h1>
      <p className="text-sm text-[var(--fg-subtle)] mb-8">
        Etkinlikleri şimdi hazırlayın; derste tek tek sahneye alacaksınız.
      </p>
      <LiveComposer
        courses={courses.map((c) => ({
          id: c.id,
          title: c.title,
          weeks: c.weeks.map((w) => w.weekNumber),
        }))}
      />
    </div>
  );
}
