import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { siteUrl } from "@/lib/site";
import {
  OWNER_CHAT_SETTING,
  botToken,
  ownerCode,
  tg,
  webhookSecret,
} from "@/lib/chat";

export const dynamic = "force-dynamic";

async function connected() {
  const owner = await prisma.siteSetting.findUnique({
    where: { key: OWNER_CHAT_SETTING },
  });
  return Boolean(owner);
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    tokenSet: Boolean(botToken()),
    connected: await connected(),
  });
}

/** Webhook'u kurar ve botu bu hesaba bağlayan Telegram bağlantısını döndürür. */
export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!botToken()) {
    return NextResponse.json(
      { error: "TELEGRAM_BOT_TOKEN Vercel'de tanımlı değil (ekledikten sonra yeniden dağıtım gerekir)." },
      { status: 400 }
    );
  }

  const me = await tg<{ username: string }>("getMe", {});
  if (!me.ok) {
    return NextResponse.json(
      { error: `Bot anahtarı geçersiz görünüyor: ${me.description ?? ""}` },
      { status: 400 }
    );
  }

  const hook = await tg("setWebhook", {
    url: `${siteUrl}/api/telegram/webhook`,
    secret_token: webhookSecret(),
    allowed_updates: ["message"],
  });
  if (!hook.ok) {
    return NextResponse.json(
      { error: `Webhook kurulamadı: ${hook.description ?? ""}` },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    bot: me.result.username,
    link: `https://t.me/${me.result.username}?start=${ownerCode()}`,
    connected: await connected(),
  });
}
