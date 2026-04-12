import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { slugify } from "@/lib/slug";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ posts });
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    title?: string;
    excerpt?: string;
    content?: string;
    coverImage?: string;
    published?: boolean;
    slug?: string;
  };

  if (!body.title || !body.excerpt || !body.content) {
    return NextResponse.json(
      { error: "title, excerpt, content zorunlu" },
      { status: 400 }
    );
  }

  let slug = body.slug?.trim() || slugify(body.title);
  if (!slug) slug = `yazi-${Date.now()}`;

  // Ensure unique slug
  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now().toString(36)}`;

  const post = await prisma.post.create({
    data: {
      slug,
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage || null,
      published: body.published ?? true,
    },
  });

  return NextResponse.json({ post });
}
