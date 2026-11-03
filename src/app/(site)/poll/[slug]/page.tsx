import { cache } from "react";
import { notFound } from "next/navigation";
import { databaseConfigured, prisma } from "@/lib/prisma";
import { PollClient } from "./PollClient";
import type { Metadata } from "next";

const loadPoll = cache(async (slug: string) => {
  if (!databaseConfigured()) return null;
  return prisma.poll.findUnique({ where: { slug } });
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const poll = await loadPoll(slug);
  if (!poll) notFound();
  // Etkinlik anketi — kalıcı içerik değil, dizine girmesin.
  return {
    title: "Anket",
    robots: { index: false, follow: false },
  };
}

export const dynamic = "force-dynamic";

type PollOption = { id: string; label: string; emoji?: string };

export default async function PollPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const poll = await loadPoll(slug);
  if (!poll) notFound();

  return (
    <PollClient
      slug={poll.slug}
      question={poll.question}
      options={poll.options as PollOption[]}
      closed={!!poll.closedAt}
    />
  );
}
