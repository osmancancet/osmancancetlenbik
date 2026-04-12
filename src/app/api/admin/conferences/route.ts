import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const conferences = await prisma.conference.findMany({
    orderBy: { date: "desc" },
  });
  return NextResponse.json({ conferences });
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    title?: string;
    location?: string;
    date?: string;
    role?: string;
    description?: string;
    link?: string;
    slides?: string;
    presentationSlug?: string;
  };

  if (!body.title || !body.location || !body.date || !body.role) {
    return NextResponse.json(
      { error: "title, location, date, role zorunlu" },
      { status: 400 }
    );
  }

  const conference = await prisma.conference.create({
    data: {
      title: body.title,
      location: body.location,
      date: new Date(body.date),
      role: body.role,
      description: body.description || null,
      link: body.link || null,
      slides: body.slides || null,
      presentationSlug: body.presentationSlug || null,
    },
  });

  return NextResponse.json({ conference });
}
