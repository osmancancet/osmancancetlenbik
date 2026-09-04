import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { tallyWords, type ActivityOption } from "@/lib/live";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** Eğitmen konsolunun izlediği tam durum: sonuçlar burada gizlenmiyor. */
export async function GET(_: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  const session = await prisma.liveSession.findUnique({
    where: { id },
    include: {
      course: { select: { title: true, slug: true } },
      activities: { orderBy: { order: "asc" } },
    },
  });
  if (!session) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const current =
    session.activities.find((a) => a.id === session.currentActivityId) ?? null;

  const [participants, answered] = await Promise.all([
    prisma.liveParticipant.findMany({
      where: { sessionId: session.id },
      orderBy: [{ score: "desc" }, { joinedAt: "asc" }],
      select: {
        id: true,
        nickname: true,
        score: true,
        lastSeenAt: true,
      },
    }),
    current
      ? prisma.liveResponse.count({ where: { activityId: current.id } })
      : Promise.resolve(0),
  ]);

  let results: unknown = null;
  if (current) {
    if (current.type === "WORDCLOUD" || current.type === "QA") {
      const rows = await prisma.liveResponse.findMany({
        where: { activityId: current.id },
        select: { text: true, createdAt: true },
        orderBy: { createdAt: "desc" },
        take: 300,
      });
      const texts = rows.map((r) => r.text ?? "").filter(Boolean);
      results =
        current.type === "WORDCLOUD"
          ? { words: tallyWords(texts) }
          : { texts };
    } else {
      const grouped = await prisma.liveResponse.groupBy({
        by: ["optionId"],
        where: { activityId: current.id },
        _count: { _all: true },
      });
      const counts: Record<string, number> = {};
      for (const g of grouped) if (g.optionId) counts[g.optionId] = g._count._all;
      results = {
        counts,
        total: Object.values(counts).reduce((a, b) => a + b, 0),
      };
    }
  }

  return NextResponse.json({
    session: {
      id: session.id,
      code: session.code,
      title: session.title,
      status: session.status,
      anonymous: session.anonymous,
      course: session.course,
      weekNumber: session.weekNumber,
      currentActivityId: session.currentActivityId,
    },
    activities: session.activities.map((a) => ({
      id: a.id,
      order: a.order,
      type: a.type,
      prompt: a.prompt,
      seconds: a.seconds,
      state: a.state,
      openedAt: a.openedAt,
      options: (a.options as ActivityOption[] | null) ?? [],
    })),
    current: current
      ? { id: current.id, state: current.state, answered }
      : null,
    results,
    participants,
  });
}

const ActionSchema = z.object({
  action: z.enum(["show", "open", "lock", "reveal", "end", "reopen", "reset"]),
  activityId: z.string().max(40).optional(),
});

/**
 * Konsol düğmeleri. Akış: show (sahneye al) → open (yanıt topla) →
 * lock (yanıtı kapat) → reveal (sonucu göster).
 */
export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  const parsed = ActionSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }
  const { action, activityId } = parsed.data;

  const session = await prisma.liveSession.findUnique({ where: { id } });
  if (!session) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  if (action === "end") {
    await prisma.liveSession.update({
      where: { id },
      data: { status: "ENDED", endedAt: new Date(), currentActivityId: null },
    });
    return NextResponse.json({ ok: true });
  }

  if (action === "reopen") {
    await prisma.liveSession.update({
      where: { id },
      data: { status: "LOBBY", endedAt: null },
    });
    return NextResponse.json({ ok: true });
  }

  if (!activityId) {
    return NextResponse.json({ error: "activityId gerekli" }, { status: 400 });
  }
  const activity = await prisma.liveActivity.findUnique({
    where: { id: activityId },
  });
  if (!activity || activity.sessionId !== session.id) {
    return NextResponse.json({ error: "Etkinlik bulunamadı" }, { status: 404 });
  }

  if (action === "reset") {
    // Soruyu baştan sormak: yanıtlar ve o sorudan kazanılan puanlar silinir.
    const responses = await prisma.liveResponse.findMany({
      where: { activityId },
      select: { participantId: true, correct: true, elapsedMs: true },
    });
    await prisma.$transaction([
      prisma.liveResponse.deleteMany({ where: { activityId } }),
      prisma.liveActivity.update({
        where: { id: activityId },
        data: { state: "IDLE", openedAt: null },
      }),
    ]);
    if (activity.type === "QUIZ" && responses.length) {
      const { scoreFor } = await import("@/lib/live");
      await Promise.all(
        responses
          .filter((r) => r.correct)
          .map((r) =>
            prisma.liveParticipant.update({
              where: { id: r.participantId },
              data: {
                score: {
                  decrement: scoreFor({
                    correct: true,
                    elapsedMs: r.elapsedMs,
                    seconds: activity.seconds,
                  }),
                },
              },
            })
          )
      );
    }
    return NextResponse.json({ ok: true });
  }

  const stateFor = { show: "IDLE", open: "OPEN", lock: "LOCKED", reveal: "REVEALED" } as const;
  const nextState = stateFor[action];

  await prisma.$transaction([
    prisma.liveActivity.update({
      where: { id: activityId },
      data: {
        state: nextState,
        // Süre ölçümü sorunun açıldığı ana göre yapılıyor.
        ...(action === "open" ? { openedAt: new Date() } : {}),
      },
    }),
    prisma.liveSession.update({
      where: { id },
      data: { currentActivityId: activityId, status: "LIVE" },
    }),
  ]);

  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.liveSession.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
