import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { id },
    include: { weeks: { orderBy: { weekNumber: "asc" } } },
  });
  if (!course) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ course });
}

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as {
    title?: string;
    program?: string;
    type?: string;
    description?: string | null;
    semester?: string | null;
    credits?: number | null;
    slug?: string;
  };

  const course = await prisma.course.update({
    where: { id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.program !== undefined && { program: body.program }),
      ...(body.type !== undefined && { type: body.type }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.semester !== undefined && { semester: body.semester }),
      ...(body.credits !== undefined && { credits: body.credits }),
      ...(body.slug !== undefined && { slug: body.slug }),
    },
  });
  return NextResponse.json({ course });
}

export async function DELETE(_: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.course.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
