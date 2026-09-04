import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { normalizeCode, scoreFor, type ActivityOption } from "@/lib/live";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ code: string }> };

const AnswerSchema = z.object({
  key: z.string().length(32),
  activityId: z.string().min(1).max(40),
  optionId: z.string().min(1).max(80).optional(),
  text: z.string().trim().min(1).max(160).optional(),
});

export async function POST(req: Request, { params }: Ctx) {
  const { code: raw } = await params;
  const ip = getClientIp(req);

  const rl = checkRateLimit(`live-answer:${ip}`, { max: 60, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Çok hızlı gönderiyorsunuz." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
    );
  }

  const parsed = AnswerSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const session = await prisma.liveSession.findUnique({
    where: { code: normalizeCode(raw) },
  });
  if (!session || session.status === "ENDED") {
    return NextResponse.json({ error: "Ders aktif değil." }, { status: 410 });
  }

  const [participant, activity] = await Promise.all([
    prisma.liveParticipant.findUnique({
      where: { sessionId_key: { sessionId: session.id, key: parsed.data.key } },
    }),
    prisma.liveActivity.findUnique({ where: { id: parsed.data.activityId } }),
  ]);

  if (!participant) {
    return NextResponse.json(
      { error: "Oturumunuz düşmüş. Sayfayı yenileyip tekrar katılın." },
      { status: 401 }
    );
  }
  if (!activity || activity.sessionId !== session.id) {
    return NextResponse.json({ error: "Etkinlik bulunamadı." }, { status: 404 });
  }
  // Yanıt yalnızca soru sahnedeyken alınır; kilitlendikten sonra gelen
  // istek sessizce yazılmaz — geç yanıt sonucu değiştirmemeli.
  if (activity.state !== "OPEN") {
    return NextResponse.json(
      { error: "Bu soru yanıtlamaya kapalı." },
      { status: 409 }
    );
  }

  const isText = activity.type === "WORDCLOUD" || activity.type === "QA";
  if (isText && !parsed.data.text) {
    return NextResponse.json({ error: "Bir şeyler yazın." }, { status: 400 });
  }

  const options = (activity.options as ActivityOption[] | null) ?? [];
  let correct: boolean | null = null;

  if (!isText) {
    const chosen = options.find((o) => o.id === parsed.data.optionId);
    if (!chosen) {
      return NextResponse.json({ error: "Geçersiz seçim." }, { status: 400 });
    }
    if (activity.type === "QUIZ") correct = !!chosen.correct;
  }

  const elapsedMs = activity.openedAt
    ? Date.now() - activity.openedAt.getTime()
    : null;

  const existing = await prisma.liveResponse.findUnique({
    where: {
      activityId_participantId: {
        activityId: activity.id,
        participantId: participant.id,
      },
    },
  });

  // Yarışmada ilk yanıt bağlayıcı: aksi hâlde sonuç açılmadan önce tekrar
  // deneyip puan avlamak mümkün olurdu.
  if (existing && activity.type === "QUIZ") {
    return NextResponse.json(
      { error: "Yanıtınız zaten alındı." },
      { status: 409 }
    );
  }

  await prisma.liveResponse.upsert({
    where: {
      activityId_participantId: {
        activityId: activity.id,
        participantId: participant.id,
      },
    },
    create: {
      activityId: activity.id,
      participantId: participant.id,
      optionId: isText ? null : parsed.data.optionId,
      text: isText ? parsed.data.text : null,
      correct,
      elapsedMs,
    },
    update: {
      optionId: isText ? null : parsed.data.optionId,
      text: isText ? parsed.data.text : null,
      correct,
      elapsedMs,
    },
  });

  if (activity.type === "QUIZ" && correct !== null) {
    const gained = scoreFor({
      correct,
      elapsedMs,
      seconds: activity.seconds,
    });
    if (gained > 0) {
      await prisma.liveParticipant.update({
        where: { id: participant.id },
        data: { score: { increment: gained } },
      });
    }
  }

  return NextResponse.json({ ok: true });
}
