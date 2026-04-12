import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string; weekId: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { weekId } = await params;
  const body = (await req.json().catch(() => ({}))) as {
    weekNumber?: number;
    topic?: string;
    notes?: string | null;
    slides?: string | null;
    resources?: string | null;
  };

  const week = await prisma.courseWeek.update({
    where: { id: weekId },
    data: {
      ...(body.weekNumber !== undefined && { weekNumber: body.weekNumber }),
      ...(body.topic !== undefined && { topic: body.topic }),
      ...(body.notes !== undefined && { notes: body.notes }),
      ...(body.slides !== undefined && { slides: body.slides }),
      ...(body.resources !== undefined && { resources: body.resources }),
    },
  });
  return NextResponse.json({ week });
}

export async function DELETE(_: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { weekId } = await params;
  await prisma.courseWeek.delete({ where: { id: weekId } });
  return NextResponse.json({ ok: true });
}
