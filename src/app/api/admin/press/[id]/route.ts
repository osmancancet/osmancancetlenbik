import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as {
    title?: string;
    source?: string;
    url?: string;
    date?: string;
    excerpt?: string | null;
    type?: string;
    coverImage?: string | null;
  };
  const item = await prisma.pressItem.update({
    where: { id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.source !== undefined && { source: body.source }),
      ...(body.url !== undefined && { url: body.url }),
      ...(body.date !== undefined && { date: new Date(body.date) }),
      ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
      ...(body.type !== undefined && { type: body.type }),
      ...(body.coverImage !== undefined && { coverImage: body.coverImage }),
    },
  });
  return NextResponse.json({ item });
}

export async function DELETE(_: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.pressItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
