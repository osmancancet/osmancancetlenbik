import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PollClient } from "./PollClient";
import type { Metadata } from "next";

// Etkinlik anketi — kalıcı içerik değil, dizine girmesin.
export const metadata: Metadata = {
  title: "Anket",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type PollOption = { id: string; label: string; emoji?: string };

export default async function PollPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const poll = await prisma.poll.findUnique({ where: { slug } });
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
