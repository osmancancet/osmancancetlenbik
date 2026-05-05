import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

const VoteSchema = z.object({
  optionId: z.string().min(1).max(80),
});

type Ctx = { params: Promise<{ slug: string }> };

export async function POST(req: Request, { params }: Ctx) {
  const { slug } = await params;
  const ip = getClientIp(req);

  const rl = checkRateLimit(`poll-vote:${ip}`, { max: 30, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Çok fazla istek" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = VoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const poll = await prisma.poll.findUnique({ where: { slug } });
  if (!poll) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (poll.closedAt) {
    return NextResponse.json({ error: "closed" }, { status: 410 });
  }

  const opts = poll.options as { id: string }[];
  if (!opts.some((o) => o.id === parsed.data.optionId)) {
    return NextResponse.json({ error: "invalid option" }, { status: 400 });
  }

  const cookieStore = await cookies();
  let voterId = cookieStore.get("mcb_voter")?.value;
  if (!voterId) {
    voterId = randomBytes(16).toString("hex");
    cookieStore.set("mcb_voter", voterId, {
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }
  const voterKey = `${voterId}:${ip}`;

  await prisma.pollVote.upsert({
    where: { pollId_voterKey: { pollId: poll.id, voterKey } },
    create: {
      pollId: poll.id,
      voterKey,
      optionId: parsed.data.optionId,
    },
    update: { optionId: parsed.data.optionId },
  });

  const grouped = await prisma.pollVote.groupBy({
    by: ["optionId"],
    where: { pollId: poll.id },
    _count: { _all: true },
  });
  const counts: Record<string, number> = {};
  for (const g of grouped) counts[g.optionId] = g._count._all;
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return NextResponse.json({ ok: true, counts, total, votedFor: parsed.data.optionId });
}
