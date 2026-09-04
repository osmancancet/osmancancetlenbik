import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  normalizeCode,
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

  const base = {
    code: session.code,
    title: session.title,
    status: session.status,
    anonymous: session.anonymous,
    participants: session._count.participants,
    activityCount: session.activities.length,
    me: me
      ? { nickname: me.nickname, score: me.score }
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
        }
      : null,
  });
}
