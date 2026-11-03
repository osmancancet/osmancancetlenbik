import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CourseForm } from "@/components/admin/CourseForm";

export default function NewCoursePage() {
  return (
    <div>
      <Link
        href="/admin/dersler"
        className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Derslerime dön
      </Link>
      <h1 className="text-3xl font-semibold text-[var(--fg)] mb-10">
        Yeni Ders
      </h1>
      <CourseForm />
    </div>
  );
}
