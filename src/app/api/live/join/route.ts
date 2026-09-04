import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { normalizeCode } from "@/lib/live";

export const dynamic = "force-dynamic";

const JoinSchema = z.object({
  code: z.string().min(4).max(12),
  nickname: z.string().trim().max(24).optional(),
  /** Öğrenci daha önce katıldıysa aynı anahtarla döner — sekme yenilenince
   *  puanı sıfırlanmasın diye. */
  key: z.string().length(32).optional(),
});

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`live-join:${ip}`, { max: 20, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Çok fazla deneme. Biraz bekleyin." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
    );
  }

  const parsed = JoinSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const code = normalizeCode(parsed.data.code);
  const session = await prisma.liveSession.findUnique({ where: { code } });

  if (!session) {
    return NextResponse.json(
      { error: "Bu koda ait bir ders bulunamadı. Tahtadaki kodu kontrol edin." },
      { status: 404 }
    );
  }
  if (session.status === "ENDED") {
    return NextResponse.json({ error: "Bu ders sona erdi." }, { status: 410 });
  }

  const key = parsed.data.key ?? randomBytes(16).toString("hex");
  const fallback = session.anonymous
    ? `Katılımcı-${key.slice(0, 4).toUpperCase()}`
    : null;
  const nickname = parsed.data.nickname?.trim() || fallback;

  if (!nickname) {
    return NextResponse.json(
      { error: "Adınızı yazın." },
      { status: 400 }
    );
  }

  const participant = await prisma.liveParticipant.upsert({
    where: { sessionId_key: { sessionId: session.id, key } },
    create: { sessionId: session.id, key, nickname },
    update: { nickname, lastSeenAt: new Date() },
  });

  return NextResponse.json({
    ok: true,
    key,
    code: session.code,
    title: session.title,
    nickname: participant.nickname,
  });
}
