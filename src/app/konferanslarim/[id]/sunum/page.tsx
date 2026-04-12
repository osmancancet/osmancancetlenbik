import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SlideDeck } from "@/components/SlideDeck";
import { PresentationHost } from "@/components/PresentationHost";

export const dynamic = "force-dynamic";

export default async function ConferenceSlidesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const conference = await prisma.conference.findUnique({ where: { id } });
  if (!conference) notFound();

  if (conference.presentationSlug) {
    return (
      <PresentationHost
        slug={conference.presentationSlug}
        backHref="/konferanslarim"
      />
    );
  }

  return (
    <SlideDeck
      content={conference.slides ?? ""}
      title={conference.title}
      backHref="/konferanslarim"
    />
  );
}
