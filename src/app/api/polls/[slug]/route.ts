import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

type PollOption = { id: string; label: string; emoji?: string };

export async function GET(_: Request, { params }: Ctx) {
  const { slug } = await params;
  const poll = await prisma.poll.findUnique({ where: { slug } });
  if (!poll) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const grouped = await prisma.pollVote.groupBy({
    by: ["optionId"],
    where: { pollId: poll.id },
    _count: { _all: true },
  });
  const counts: Record<string, number> = {};
  for (const g of grouped) counts[g.optionId] = g._count._all;
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return NextResponse.json({
    slug: poll.slug,
    question: poll.question,
    options: poll.options as PollOption[],
    counts,
    total,
    closed: !!poll.closedAt,
  });
}
