import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const conference = await prisma.conference.findUnique({ where: { id } });
  if (!conference)
    return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ conference });
}

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as {
    title?: string;
    location?: string;
    date?: string;
    role?: string;
    description?: string | null;
    link?: string | null;
    slides?: string | null;
    presentationSlug?: string | null;
  };

  const conference = await prisma.conference.update({
    where: { id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.location !== undefined && { location: body.location }),
      ...(body.date !== undefined && { date: new Date(body.date) }),
      ...(body.role !== undefined && { role: body.role }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.link !== undefined && { link: body.link }),
      ...(body.slides !== undefined && { slides: body.slides }),
      ...(body.presentationSlug !== undefined && {
        presentationSlug: body.presentationSlug,
      }),
    },
  });
  return NextResponse.json({ conference });
}

export async function DELETE(_: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.conference.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
