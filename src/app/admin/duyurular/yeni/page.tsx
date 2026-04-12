import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnnouncementForm } from "@/components/admin/AnnouncementForm";

export default function NewAnnouncementPage() {
  return (
    <div>
      <Link
        href="/admin/duyurular"
        className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Duyurulara dön
      </Link>
      <h1 className="text-3xl font-semibold text-[var(--fg)] mb-10">
        Yeni Duyuru
      </h1>
      <AnnouncementForm />
    </div>
  );
}
