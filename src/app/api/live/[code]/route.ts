import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cached } from "@/lib/liveCache";
import {
  normalizeCode,
  scoreFor,
  tallyWords,
  type ActivityOption,
  type ActivityState,
} from "@/lib/live";

export const dynamic = "force-dynamic";

const SESSION_TTL_MS = 400;
const RESULTS_TTL_MS = 1000;
const LAST_SEEN_EVERY_MS = 15_000;

async function loadResults(activityId: string, type: string): Promise<unknown> {
  if (type === "WORDCLOUD" || type === "QA") {
    const rows = await prisma.liveResponse.findMany({
      where: { activityId },
      select: { text: true },
      orderBy: { createdAt: "desc" },
      take: 300,
    });
    const texts = rows.map((r) => r.text ?? "").filter(Boolean);
    return type === "WORDCLOUD"
      ? { words: tallyWords(texts) }
      : { texts: texts.slice(0, 50) };
  }
  const grouped = await prisma.liveResponse.groupBy({
    by: ["optionId"],
    where: { activityId },
    _count: { _all: true },
  });
  const counts: Record<string, number> = {};
  for (const g of grouped) {
    if (g.optionId) counts[g.optionId] = g._count._all;
  }
  return { counts, total: Object.values(counts).reduce((a, b) => a + b, 0) };
}

type Ctx = { params: Promise<{ code: string }> };

/**
 * Öğrenci ekranının kısa aralıklarla çektiği durum.
 *
 * Sonuç açılana kadar (`REVEALED`) doğru şık ve sayımlar yanıta konmuyor:
 * tarayıcı konsolunu açan öğrenci cevabı görebilmemeli.
 */
export async function GET(req: Request, { params }: Ctx) {
  const { code: raw } = await params;
  const code = normalizeCode(raw);
  const key = new URL(req.url).searchParams.get("key");

  // Oturum ve soru listesi herkes için aynı: kısa süre önbellekten.
  const session = await cached(`live:s:${code}`, SESSION_TTL_MS, () =>
    prisma.liveSession.findUnique({
      where: { code },
      include: {
        activities: { orderBy: { order: "asc" } },
        _count: { select: { participants: true } },
      },
    })
  );

  if (!session) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const current =
    session.activities.find((a) => a.id === session.currentActivityId) ?? null;
  const state = (current?.state ?? "IDLE") as ActivityState;
  const revealed = !!current && state === "REVEALED";
  const ended = session.status === "ENDED";

  const me = key
    ? await prisma.liveParticipant.findUnique({
        where: { sessionId_key: { sessionId: session.id, key } },
      })
    : null;

  // Katılımcıya özel sorgular birlikte gidiyor; sıra ve seri yalnızca
  // ekranda gösterildikleri anda (sonuç açıkken, ders bitince) hesaplanıyor.
  const needStanding = !!me && (revealed || ended);
  const quizIds =
    me && revealed && current!.type === "QUIZ"
      ? session.activities
          .filter((a) => a.type === "QUIZ" && a.order <= current!.order)
          .map((a) => a.id)
      : [];

  const [myResponse, higher, ahead, mine] = await Promise.all([
    me && current
      ? prisma.liveResponse.findUnique({
          where: {
            activityId_participantId: {
              activityId: current.id,
              participantId: me.id,
            },
          },
        })
      : null,
    needStanding
      ? prisma.liveParticipant.count({
          where: { sessionId: session.id, score: { gt: me!.score } },
        })
      : null,
    needStanding
      ? prisma.liveParticipant.findFirst({
          where: { sessionId: session.id, score: { gt: me!.score } },
          orderBy: [{ score: "asc" }, { joinedAt: "asc" }],
          select: { nickname: true, score: true },
        })
      : null,
    quizIds.length
      ? prisma.liveResponse.findMany({
          where: { participantId: me!.id, activityId: { in: quizIds } },
          select: { activityId: true, correct: true },
        })
      : null,
    // "Çevrimiçi" göstergesi: her yoklamada değil, arada bir yazılıyor.
    me && Date.now() - me.lastSeenAt.getTime() > LAST_SEEN_EVERY_MS
      ? prisma.liveParticipant
          .update({ where: { id: me.id }, data: { lastSeenAt: new Date() } })
          .catch(() => null)
      : null,
  ]);

  // Kahoot'taki "3. sıradasın, Ayşe'nin 120 puan gerisinde" satırı için.
  const standing =
    me && higher != null
      ? {
          rank: higher + 1,
          ahead: ahead
            ? { nickname: ahead.nickname, gap: ahead.score - me.score }
            : null,
        }
      : null;

  const base = {
    code: session.code,
    title: session.title,
    status: session.status,
    anonymous: session.anonymous,
    participants: session._count.participants,
    activityCount: session.activities.length,
    me: me
      ? { nickname: me.nickname, score: me.score, ...standing }
      : null,
  };

  if (!current) {
    return NextResponse.json({ ...base, activity: null });
  }

  const options = (current.options as ActivityOption[] | null) ?? [];

  // Cevap serisi: sonucu açılmış yarışma sorularında arka arkaya doğru sayısı.
  let streak = 0;
  if (mine) {
    const byId = new Map(mine.map((r) => [r.activityId, r.correct]));
    for (let i = quizIds.length - 1; i >= 0; i--) {
      if (byId.get(quizIds[i]) !== true) break;
      streak++;
    }
  }

  // Açılmış sonucun dağılımı da herkes için aynı.
  const results = revealed
    ? await cached(`live:r:${current.id}`, RESULTS_TTL_MS, () =>
        loadResults(current.id, current.type)
      )
    : null;

  return NextResponse.json({
    ...base,
    activity: {
      id: current.id,
      /** 1'den başlayan soru numarası ("Soru 3 / 25"). */
      index: current.order + 1,
      type: current.type,
      prompt: current.prompt,
      seconds: current.seconds,
      state,
      openedAt: current.openedAt,
      // Doğru şık yalnızca sonuç açıldığında iniyor.
      options: options.map((o) => ({
        id: o.id,
        label: o.label,
        ...(revealed && current.type === "QUIZ" ? { correct: !!o.correct } : {}),
      })),
      results,
    },
    myAnswer: myResponse
      ? {
          optionId: myResponse.optionId,
          text: myResponse.text,
          correct: revealed ? myResponse.correct : null,
          points:
            revealed && current.type === "QUIZ"
              ? scoreFor({
                  correct: !!myResponse.correct,
                  elapsedMs: myResponse.elapsedMs,
                  seconds: current.seconds,
                })
              : null,
        }
      : null,
    streak,
  });
}
