import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  OWNER_CHAT_SETTING,
  TEXT_MAX,
  ownerCode,
  safeEqual,
  tg,
  webhookSecret,
} from "@/lib/chat";

export const dynamic = "force-dynamic";

type Update = {
  message?: {
    message_id: number;
    chat: { id: number; type: string };
    text?: string;
    reply_to_message?: { message_id: number };
  };
};

const ok = () => NextResponse.json({ ok: true });

/**
 * Telegram buraya her mesajı gönderir. Yalnız sohbetin sahibinden gelen ve
 * iletilmiş bir ziyaretçi mesajına "Yanıtla" ile yazılanlar siteye düşer.
 * Telegram yeniden denemesin diye tanınan her istek 200 ile kapanır.
 */
export async function POST(req: Request) {
  const given = req.headers.get("x-telegram-bot-api-secret-token") ?? "";
  if (!safeEqual(given, webhookSecret())) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const update = (await req.json().catch(() => null)) as Update | null;
  const msg = update?.message;
  if (!msg || msg.chat.type !== "private") return ok();

  const chatId = String(msg.chat.id);
  const text = (msg.text ?? "").trim();
  const say = (t: string) => tg("sendMessage", { chat_id: chatId, text: t });

  // Bağlama: yönetim panelindeki bağlantı `/start <kod>` gönderir.
  if (text.startsWith("/start")) {
    const code = text.split(/\s+/)[1] ?? "";
    const match = Boolean(code) && safeEqual(code, ownerCode());
    console.log("telegram /start", { codeLen: code.length, match });
    if (match) {
      await prisma.siteSetting.upsert({
        where: { key: OWNER_CHAT_SETTING },
        create: { key: OWNER_CHAT_SETTING, value: chatId },
        update: { value: chatId },
      });
      const sent = await say(
        "✅ Site sohbeti bu hesaba bağlandı.\n\nZiyaretçi mesajları buraya düşer. Cevap vermek için mesajı \"Yanıtla\" ile seçip yazın.\n\nBir mesajı yanıtlayarak /engelle yazarsanız o kişi engellenir, /ac ile açılır."
      );
      console.log("telegram /start bound", { replied: sent.ok, err: sent.ok ? null : sent.description });
    } else {
      const owner = await prisma.siteSetting.findUnique({ where: { key: OWNER_CHAT_SETTING } });
      if (!owner) {
        await say(
          "Bağlantı kodu gelmedi. /start'ı elle yazmak yerine sitedeki Yönetim › Sohbet sayfasındaki \"Telegram'da aç\" bağlantısıyla açıp Başlat'a basın."
        );
      }
    }
    return ok();
  }

  const owner = await prisma.siteSetting.findUnique({
    where: { key: OWNER_CHAT_SETTING },
  });
  if (!owner || owner.value !== chatId) return ok();

  const repliedTo = msg.reply_to_message?.message_id;
  if (!repliedTo) {
    await say("Cevap vermek için ilgili ziyaretçi mesajını \"Yanıtla\" ile seçin.");
    return ok();
  }

  const source = await prisma.chatMessage.findFirst({
    where: { tgMessageId: repliedTo },
    select: { threadId: true },
  });
  if (!source) {
    await say("Bu mesajın konuşması bulunamadı (30 günden eski olabilir).");
    return ok();
  }

  if (text === "/engelle" || text === "/ac") {
    const blocked = text === "/engelle";
    await prisma.chatThread.update({
      where: { id: source.threadId },
      data: { blocked },
    });
    await say(blocked ? "🚫 Engellendi." : "Engel kaldırıldı.");
    return ok();
  }

  if (!text) {
    await say("Yalnız yazılı mesaj iletilebilir.");
    return ok();
  }

  await prisma.chatMessage.create({
    data: {
      threadId: source.threadId,
      sender: "OWNER",
      text: text.slice(0, TEXT_MAX * 2),
    },
  });
  await prisma.chatThread.update({
    where: { id: source.threadId },
    data: { lastActivityAt: new Date() },
  });
  // İletildiğinin işareti; desteklenmezse sessizce geçilir.
  await tg("setMessageReaction", {
    chat_id: chatId,
    message_id: msg.message_id,
    reaction: [{ type: "emoji", emoji: "👍" }],
  });
  return ok();
}
