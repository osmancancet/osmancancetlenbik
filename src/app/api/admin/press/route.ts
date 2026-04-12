import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const items = await prisma.pressItem.findMany({
    orderBy: { date: "desc" },
  });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as {
    title?: string;
    source?: string;
    url?: string;
    date?: string;
    excerpt?: string;
    type?: string;
    coverImage?: string;
  };
  if (!body.title || !body.source || !body.url || !body.date) {
    return NextResponse.json(
      { error: "title, source, url, date zorunlu" },
      { status: 400 }
    );
  }
  const item = await prisma.pressItem.create({
    data: {
      title: body.title,
      source: body.source,
      url: body.url,
      date: new Date(body.date),
      excerpt: body.excerpt || null,
      type: body.type || "HABER",
      coverImage: body.coverImage || null,
    },
  });
  return NextResponse.json({ item });
}
