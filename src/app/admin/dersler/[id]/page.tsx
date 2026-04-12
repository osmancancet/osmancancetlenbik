import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Plus, FileText, Presentation } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CourseForm } from "@/components/admin/CourseForm";

export const dynamic = "force-dynamic";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { id },
    include: { weeks: { orderBy: { weekNumber: "asc" } } },
  });
  if (!course) notFound();

  return (
    <div>
      <Link
        href="/admin/dersler"
        className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Derslerime dön
      </Link>

      <div className="mb-10">
        <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-2">
          Ders Düzenle
        </div>
        <h1 className="text-3xl font-semibold text-[var(--fg)]">
          {course.title}
        </h1>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        {/* Course details form */}
        <div>
          <h2 className="text-sm font-medium text-[var(--fg)] mb-5 uppercase tracking-wider">
            Ders Bilgileri
          </h2>
          <CourseForm
            initial={{
              id: course.id,
              title: course.title,
              slug: course.slug,
              program: course.program,
              type: course.type,
              description: course.description ?? "",
              semester: course.semester ?? "",
              credits: course.credits?.toString() ?? "",
            }}
          />
        </div>

        {/* Weekly plan */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-medium text-[var(--fg)] uppercase tracking-wider">
              Haftalık Plan
            </h2>
            <Link
              href={`/admin/dersler/${course.id}/hafta/yeni`}
              className="inline-flex items-center gap-1 text-xs text-[var(--accent)] hover:underline"
            >
              <Plus className="w-3 h-3" /> Hafta Ekle
            </Link>
          </div>

          <div className="space-y-2">
            {course.weeks.length === 0 && (
              <div className="card rounded-md p-6 text-center">
                <div className="text-xs text-[var(--fg-subtle)]">
                  Henüz hafta eklenmedi.
                </div>
              </div>
            )}
            {course.weeks.map((w) => (
              <Link
                key={w.id}
                href={`/admin/dersler/${course.id}/hafta/${w.id}`}
                className="card rounded-md p-3 flex items-center gap-3 hover:border-[var(--accent)]/40 transition-colors"
              >
                <div className="w-8 h-8 rounded border border-[var(--border-strong)] flex items-center justify-center text-xs font-mono text-[var(--accent)] shrink-0">
                  {w.weekNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-[var(--fg)] truncate">
                    {w.topic}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-[var(--fg-subtle)] mt-0.5">
                    {w.notes && (
                      <span className="inline-flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Notlar
                      </span>
                    )}
                    {w.slides && (
                      <span className="inline-flex items-center gap-1">
                        <Presentation className="w-3 h-3" /> Sunum
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
