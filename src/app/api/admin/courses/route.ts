import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { slugify } from "@/lib/slug";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: { weeks: { orderBy: { weekNumber: "asc" } } },
  });
  return NextResponse.json({ courses });
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    title?: string;
    program?: string;
    type?: string;
    description?: string;
    semester?: string;
    credits?: number;
    slug?: string;
  };

  if (!body.title || !body.program || !body.type) {
    return NextResponse.json(
      { error: "title, program, type zorunlu" },
      { status: 400 }
    );
  }

  let slug = body.slug?.trim() || slugify(body.title);
  if (!slug) slug = `ders-${Date.now()}`;
  const existing = await prisma.course.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now().toString(36)}`;

  const course = await prisma.course.create({
    data: {
      slug,
      title: body.title,
      program: body.program,
      type: body.type,
      description: body.description || null,
      semester: body.semester || null,
      credits: body.credits ?? null,
    },
  });

  return NextResponse.json({ course });
}
