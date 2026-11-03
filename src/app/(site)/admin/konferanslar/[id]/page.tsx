import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ConferenceForm } from "@/components/admin/ConferenceForm";

export const dynamic = "force-dynamic";

export default async function EditConferencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = await prisma.conference.findUnique({ where: { id } });
  if (!c) notFound();

  return (
    <div>
      <Link
        href="/admin/konferanslar"
        className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Konferanslarıma dön
      </Link>
      <h1 className="text-3xl font-semibold text-[var(--fg)] mb-10">
        Konferansı Düzenle
      </h1>
      <ConferenceForm
        initial={{
          id: c.id,
          title: c.title,
          location: c.location,
          date: c.date.toISOString().slice(0, 10),
          role: c.role,
          description: c.description ?? "",
          link: c.link ?? "",
          slides: c.slides ?? "",
          presentationSlug: c.presentationSlug ?? "",
        }}
      />
    </div>
  );
}
