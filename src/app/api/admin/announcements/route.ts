import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const announcements = await prisma.announcement.findMany({
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ announcements });
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as {
    title?: string;
    body?: string;
    type?: string;
    pinned?: boolean;
    expiresAt?: string | null;
  };
  if (!body.title || !body.body) {
    return NextResponse.json({ error: "title, body zorunlu" }, { status: 400 });
  }
  const announcement = await prisma.announcement.create({
    data: {
      title: body.title,
      body: body.body,
      type: body.type || "GENEL",
      pinned: body.pinned ?? false,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
    },
  });
  return NextResponse.json({ announcement });
}
