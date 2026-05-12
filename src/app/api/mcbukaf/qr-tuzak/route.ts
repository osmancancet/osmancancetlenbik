import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`qr-tuzak:${ip}`, { max: 4, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Çok fazla istek" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
    );
  }

  const body = await req.json().catch(() => ({}));
  const session = typeof body?.session === "string" && body.session.length <= 40
    ? body.session
    : "default";
  const userAgent = req.headers.get("user-agent")?.slice(0, 240) ?? null;

  await prisma.qrTrapHit.create({
    data: { session, userAgent },
  });

  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const session = url.searchParams.get("session") ?? "default";
  const sinceMin = Math.min(180, Math.max(1, Number(url.searchParams.get("min")) || 60));
  const since = new Date(Date.now() - sinceMin * 60_000);

  const hits = await prisma.qrTrapHit.findMany({
    where: { session, createdAt: { gte: since } },
    orderBy: { createdAt: "desc" },
    take: 60,
    select: { id: true, createdAt: true },
  });

  return NextResponse.json({
    total: hits.length,
    hits,
    session,
  });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const session = url.searchParams.get("session") ?? "default";
  const adminKey = req.headers.get("x-reset-key");
  if (adminKey !== process.env.MCBUKAF_RESET_KEY && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  await prisma.qrTrapHit.deleteMany({ where: { session } });
  return NextResponse.json({ ok: true });
}
