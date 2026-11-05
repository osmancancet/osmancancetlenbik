import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  normalizeCode,
  scoreFor,
  tallyWords,
  type ActivityOption,
  type ActivityState,
} from "@/lib/live";

export const dynamic = "force-dynamic";

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

  const session = await prisma.liveSession.findUnique({
    where: { code },
    include: {
      activities: { orderBy: { order: "asc" } },
      _count: { select: { participants: true } },
    },
  });

  if (!session) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const current =
    session.activities.find((a) => a.id === session.currentActivityId) ?? null;

  const me = key
    ? await prisma.liveParticipant.findUnique({
        where: { sessionId_key: { sessionId: session.id, key } },
      })
    : null;

  if (me) {
    // Katılımcı listesinde "çevrimiçi" göstergesini besler.
    await prisma.liveParticipant.update({
      where: { id: me.id },
      data: { lastSeenAt: new Date() },
    });
  }

  // Kahoot'taki "3. sıradasın, Ayşe'nin 120 puan gerisinde" satırı için.
  let standing: { rank: number; ahead: { nickname: string; gap: number } | null } | null =
    null;
  if (me) {
    const [higher, ahead] = await Promise.all([
      prisma.liveParticipant.count({
        where: { sessionId: session.id, score: { gt: me.score } },
      }),
      prisma.liveParticipant.findFirst({
        where: { sessionId: session.id, score: { gt: me.score } },
        orderBy: [{ score: "asc" }, { joinedAt: "asc" }],
        select: { nickname: true, score: true },
      }),
    ]);
    standing = {
      rank: higher + 1,
      ahead: ahead ? { nickname: ahead.nickname, gap: ahead.score - me.score } : null,
    };
  }

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

  const state = current.state as ActivityState;
  const revealed = state === "REVEALED";
  const options = (current.options as ActivityOption[] | null) ?? [];

  const myResponse = me
    ? await prisma.liveResponse.findUnique({
        where: {
          activityId_participantId: {
            activityId: current.id,
            participantId: me.id,
          },
        },
      })
    : null;

  // Cevap serisi: sonucu açılmış yarışma sorularında arka arkaya doğru sayısı.
  let streak = 0;
  if (me && revealed && current.type === "QUIZ") {
    const quizIds = session.activities
      .filter((a) => a.type === "QUIZ" && a.order <= current.order)
      .map((a) => a.id);
    const mine = await prisma.liveResponse.findMany({
      where: { participantId: me.id, activityId: { in: quizIds } },
      select: { activityId: true, correct: true },
    });
    const byId = new Map(mine.map((r) => [r.activityId, r.correct]));
    for (let i = quizIds.length - 1; i >= 0; i--) {
      if (byId.get(quizIds[i]) !== true) break;
      streak++;
    }
  }

  let results: unknown = null;
  if (revealed) {
    if (current.type === "WORDCLOUD" || current.type === "QA") {
      const rows = await prisma.liveResponse.findMany({
        where: { activityId: current.id },
        select: { text: true },
        orderBy: { createdAt: "desc" },
        take: 300,
      });
      const texts = rows.map((r) => r.text ?? "").filter(Boolean);
      results =
        current.type === "WORDCLOUD"
          ? { words: tallyWords(texts) }
          : { texts: texts.slice(0, 50) };
    } else {
      const grouped = await prisma.liveResponse.groupBy({
        by: ["optionId"],
        where: { activityId: current.id },
        _count: { _all: true },
      });
      const counts: Record<string, number> = {};
      for (const g of grouped) {
        if (g.optionId) counts[g.optionId] = g._count._all;
      }
      results = {
        counts,
        total: Object.values(counts).reduce((a, b) => a + b, 0),
      };
    }
  }

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
