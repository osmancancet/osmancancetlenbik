import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PressForm } from "@/components/admin/PressForm";

export const dynamic = "force-dynamic";

export default async function EditPressPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.pressItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <Link
        href="/admin/basin"
        className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Basına dön
      </Link>
      <h1 className="text-3xl font-semibold text-[var(--fg)] mb-10">
        Basın Kaydını Düzenle
      </h1>
      <PressForm
        initial={{
          id: item.id,
          title: item.title,
          source: item.source,
          url: item.url,
          date: item.date.toISOString().slice(0, 10),
          excerpt: item.excerpt ?? "",
          type: item.type,
          coverImage: item.coverImage ?? "",
        }}
      />
    </div>
  );
}
