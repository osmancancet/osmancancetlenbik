import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id: courseId } = await params;
  const body = (await req.json().catch(() => ({}))) as {
    weekNumber?: number;
    topic?: string;
    notes?: string;
    slides?: string;
    resources?: string;
  };

  if (!body.weekNumber || !body.topic) {
    return NextResponse.json(
      { error: "weekNumber, topic zorunlu" },
      { status: 400 }
    );
  }

  const exists = await prisma.courseWeek.findUnique({
    where: { courseId_weekNumber: { courseId, weekNumber: body.weekNumber } },
  });
  if (exists) {
    return NextResponse.json(
      { error: `${body.weekNumber}. hafta zaten var` },
      { status: 409 }
    );
  }

  const week = await prisma.courseWeek.create({
    data: {
      courseId,
      weekNumber: body.weekNumber,
      topic: body.topic,
      notes: body.notes || null,
      slides: body.slides || null,
      resources: body.resources || null,
    },
  });
  return NextResponse.json({ week });
}
