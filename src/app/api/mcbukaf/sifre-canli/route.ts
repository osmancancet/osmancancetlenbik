import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

const DropSchema = z.object({
  session: z.string().min(1).max(40).default("default"),
  length: z.number().int().min(1).max(200),
  entropy: z.number().min(0).max(400),
  crackSec: z.number().min(0).max(1e30),
  strength: z.string().min(1).max(20),
  leaked: z.boolean(),
});

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`sifre-canli:${ip}`, { max: 12, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Çok fazla istek" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = DropSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const { session, length, entropy, crackSec, strength, leaked } = parsed.data;

  await prisma.passwordDrop.create({
    data: { session, length, entropy, crackSec, strength, leaked },
  });

  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const session = url.searchParams.get("session") ?? "default";
  const sinceMin = Math.min(180, Math.max(1, Number(url.searchParams.get("min")) || 60));
  const since = new Date(Date.now() - sinceMin * 60_000);

  const drops = await prisma.passwordDrop.findMany({
    where: { session, createdAt: { gte: since } },
    orderBy: { createdAt: "desc" },
    take: 60,
    select: {
      id: true, length: true, entropy: true, crackSec: true,
      strength: true, leaked: true, createdAt: true,
    },
  });

  const dist: Record<string, number> = {
    "ÇOK ZAYIF": 0,
    "ZAYIF": 0,
    "ORTA": 0,
    "İYİ": 0,
    "MÜKEMMEL": 0,
  };
  let leakedCount = 0;
  for (const d of drops) {
    dist[d.strength] = (dist[d.strength] ?? 0) + 1;
    if (d.leaked) leakedCount++;
  }

  return NextResponse.json({
    drops, total: drops.length, dist, leakedCount, session,
  });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const session = url.searchParams.get("session") ?? "default";
  const adminKey = req.headers.get("x-reset-key");
  if (adminKey !== process.env.MCBUKAF_RESET_KEY && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  await prisma.passwordDrop.deleteMany({ where: { session } });
  return NextResponse.json({ ok: true });
}
