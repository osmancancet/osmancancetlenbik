import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import {
  NAME_MAX,
  OWNER_CHAT_SETTING,
  TEXT_MAX,
  forwardText,
  tg,
  waitingSince,
} from "@/lib/chat";

export const dynamic = "force-dynamic";

const RETENTION_MS = 30 * 24 * 60 * 60 * 1000;
const KEY_RE = /^[a-f0-9]{48}$/;

const PostSchema = z.object({
  key: z.string().regex(KEY_RE).optional().nullable(),
  name: z.string().trim().min(2, "Adınızı yazın").max(NAME_MAX).optional(),
  text: z.string().trim().min(1, "Mesaj boş olamaz").max(TEXT_MAX),
  // Tuzak alan: insanlar görmez, botlar doldurur.
  website: z.string().max(200).optional(),
});

type Row = { id: string; sender: string; text: string; createdAt: Date };

function view(messages: Row[]) {
  return {
    messages: messages.map((m) => ({
      id: m.id,
      sender: m.sender,
      text: m.text,
      at: m.createdAt.toISOString(),
    })),
    waitingSince: waitingSince(messages)?.toISOString() ?? null,
  };
}

async function loadMessages(threadId: string): Promise<Row[]> {
  return prisma.chatMessage.findMany({
    where: { threadId },
    orderBy: { createdAt: "asc" },
    take: 200,
    select: { id: true, sender: true, text: true, createdAt: true },
  });
}

/** Ziyaretçi penceresi konuşmayı buradan yoklar. Anahtar başlıkta gelir. */
export async function GET(req: Request) {
  const key = req.headers.get("x-chat-key") ?? "";
  if (!KEY_RE.test(key)) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const thread = await prisma.chatThread.findUnique({
    where: { key },
    select: { id: true },
  });
  if (!thread) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  return NextResponse.json(view(await loadMessages(thread.id)));
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const perMinute = checkRateLimit(`chat:m:${ip}`, { max: 6, windowMs: 60_000 });
  const perHour = checkRateLimit(`chat:h:${ip}`, { max: 40, windowMs: 3_600_000 });
  if (!perMinute.ok || !perHour.ok) {
    return NextResponse.json(
      { error: "Çok hızlı yazıyorsunuz. Biraz sonra tekrar deneyin." },
      { status: 429 }
    );
  }

  const parsed = PostSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Geçersiz istek" },
      { status: 400 }
    );
  }
  const { key, name, text, website } = parsed.data;
  if (website) return NextResponse.json({ ok: true, messages: [], waitingSince: null });

  let thread = key
    ? await prisma.chatThread.findUnique({
        where: { key },
        select: { id: true, key: true, name: true, blocked: true },
      })
    : null;

  if (!thread) {
    if (!name) {
      return NextResponse.json({ error: "Adınızı yazın" }, { status: 400 });
    }
    const fresh = checkRateLimit(`chat:new:${ip}`, { max: 3, windowMs: 3_600_000 });
    if (!fresh.ok) {
      return NextResponse.json(
        { error: "Çok fazla yeni konuşma açıldı. Daha sonra tekrar deneyin." },
        { status: 429 }
      );
    }
    // Eski konuşmalar 30 gün sonra silinir.
    await prisma.chatThread
      .deleteMany({
        where: { lastActivityAt: { lt: new Date(Date.now() - RETENTION_MS) } },
      })
      .catch(() => {});
    thread = await prisma.chatThread.create({
      data: { key: randomBytes(24).toString("hex"), name },
      select: { id: true, key: true, name: true, blocked: true },
    });
  }

  const message = await prisma.chatMessage.create({
    data: { threadId: thread.id, sender: "VISITOR", text },
    select: { id: true },
  });
  await prisma.chatThread.update({
    where: { id: thread.id },
    data: { lastActivityAt: new Date() },
  });

  // Engellenen kişinin mesajı kaydedilir ama Telegram'a iletilmez.
  if (!thread.blocked) {
    const owner = await prisma.siteSetting.findUnique({
      where: { key: OWNER_CHAT_SETTING },
    });
    if (owner) {
      const sent = await tg<{ message_id: number }>("sendMessage", {
        chat_id: owner.value,
        text: forwardText(thread.name, thread.id, text),
      });
      if (sent.ok) {
        await prisma.chatMessage.update({
          where: { id: message.id },
          data: { tgMessageId: sent.result.message_id },
        });
      } else {
        console.error("[chat] telegram iletilemedi:", sent.description);
      }
    }
  }

  return NextResponse.json({
    ok: true,
    key: thread.key,
    ...view(await loadMessages(thread.id)),
  });
}
