import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AnnouncementForm } from "@/components/admin/AnnouncementForm";

export const dynamic = "force-dynamic";

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const a = await prisma.announcement.findUnique({ where: { id } });
  if (!a) notFound();

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
        Duyuru Düzenle
      </h1>
      <AnnouncementForm
        initial={{
          id: a.id,
          title: a.title,
          body: a.body,
          type: a.type,
          pinned: a.pinned,
          expiresAt: a.expiresAt
            ? a.expiresAt.toISOString().slice(0, 10)
            : "",
        }}
      />
    </div>
  );
}
