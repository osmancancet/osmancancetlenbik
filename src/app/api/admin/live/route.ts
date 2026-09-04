import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { generateCode, isActivityType, SCALE_OPTIONS } from "@/lib/live";

export const dynamic = "force-dynamic";

const OptionSchema = z.object({
  id: z.string().min(1).max(80),
  label: z.string().trim().min(1).max(120),
  correct: z.boolean().optional(),
});

const ActivitySchema = z.object({
  type: z.string().refine(isActivityType, "Bilinmeyen etkinlik türü"),
  prompt: z.string().trim().min(1).max(300),
  seconds: z.number().int().min(0).max(600).default(0),
  options: z.array(OptionSchema).max(8).optional(),
});

const CreateSchema = z.object({
  title: z.string().trim().min(1).max(140),
  courseId: z.string().max(40).optional().nullable(),
  weekNumber: z.number().int().min(1).max(20).optional().nullable(),
  anonymous: z.boolean().default(false),
  activities: z.array(ActivitySchema).max(40).default([]),
});

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const sessions = await prisma.liveSession.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      course: { select: { title: true, slug: true } },
      _count: { select: { participants: true, activities: true } },
    },
  });
  return NextResponse.json({ sessions });
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const parsed = CreateSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Geçersiz istek" },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // Kod çakışması pratikte çok düşük ihtimalli ama sessizce bozulmasın diye
  // birkaç kez deneniyor.
  let code = generateCode();
  for (let i = 0; i < 5; i++) {
    const clash = await prisma.liveSession.findUnique({ where: { code } });
    if (!clash) break;
    code = generateCode();
  }

  const session = await prisma.liveSession.create({
    data: {
      code,
      title: data.title,
      courseId: data.courseId || null,
      weekNumber: data.weekNumber ?? null,
      anonymous: data.anonymous,
      activities: {
        create: data.activities.map((a, i) => ({
          order: i,
          type: a.type,
          prompt: a.prompt,
          seconds: a.seconds,
          options:
            a.type === "WORDCLOUD" || a.type === "QA"
              ? undefined
              : a.type === "SCALE"
                ? SCALE_OPTIONS
                : (a.options ?? []),
        })),
      },
    },
  });

  return NextResponse.json({ ok: true, id: session.id, code: session.code });
}
