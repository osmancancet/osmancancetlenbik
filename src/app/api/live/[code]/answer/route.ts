import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { cached } from "@/lib/liveCache";
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

  const parsed = AnswerSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  // Sınıftaki herkes aynı Wi-Fi'dan (tek IP) yanıt veriyor: IP başına sınır
  // 40 kişilik bir sınıfı ikinci soruda kilitlerdi. Sınır katılımcı başına,
  // IP sınırı yalnız toplu saldırıya karşı geniş tutuldu.
  const rl = checkRateLimit(`live-answer:${parsed.data.key}`, { max: 30, windowMs: 60_000 });
  const rlIp = checkRateLimit(`live-answer-ip:${ip}`, { max: 1200, windowMs: 60_000 });
  if (!rl.ok || !rlIp.ok) {
    const retry = Math.max(rl.retryAfterSeconds, rlIp.retryAfterSeconds);
    return NextResponse.json(
      { error: "Çok hızlı gönderiyorsunuz." },
      { status: 429, headers: { "Retry-After": String(retry) } }
    );
  }

  // Oturum satırı herkes için aynı; yanıt anında yeniden okumaya gerek yok.
  // Asıl kapı aşağıda: sorunun durumu her seferinde taze okunuyor.
  const code = normalizeCode(raw);
  const session = await cached(`live:a:${code}`, 2000, () =>
    prisma.liveSession.findUnique({
      where: { code },
      select: { id: true, status: true },
    })
  );
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

  const where = {
    activityId_participantId: {
      activityId: activity.id,
      participantId: participant.id,
    },
  };
  const fields = {
    optionId: isText ? null : parsed.data.optionId,
    text: isText ? parsed.data.text : null,
    correct,
    elapsedMs,
  };

  if (activity.type === "QUIZ") {
    // Yarışmada ilk yanıt bağlayıcı: aksi hâlde sonuç açılmadan önce tekrar
    // deneyip puan avlamak mümkün olurdu. Önce "var mı" diye sormak yerine
    // doğrudan yazılıyor; ikinci yanıtı benzersizlik kısıtı geri çeviriyor.
    // Çift dokunuş ya da yeniden deneme de buraya düşer ve başarı sayılır.
    try {
      await prisma.liveResponse.create({
        data: {
          activityId: activity.id,
          participantId: participant.id,
          ...fields,
        },
      });
    } catch (e) {
      if ((e as { code?: string }).code === "P2002") {
        return NextResponse.json({ ok: true, already: true });
      }
      throw e;
    }
  } else {
    await prisma.liveResponse.upsert({
      where,
      create: {
        activityId: activity.id,
        participantId: participant.id,
        ...fields,
      },
      update: fields,
    });
  }

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
