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

async function probe(url: string) {
  const t = Date.now();
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(6000), redirect: "manual" });
    return `${r.status} ${Date.now() - t}ms`;
  } catch (e) {
    const c = (e as { cause?: { code?: string; message?: string } }).cause;
    return `${(e as Error).name} ${c?.code ?? ""} ${c?.message ?? ""} ${Date.now() - t}ms`;
  }
}

export async function GET(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  // GEÇİCİ tanı: sunucunun dış adreslere erişimi.
  if (new URL(req.url).searchParams.has("tani")) {
    const [fake, fakeMe, tg1, tg2, ex] = await Promise.all([
      probe("https://api.telegram.org/bot123456789:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/getMe"),
      probe("https://api.telegram.org/bot/getMe"),
      probe("https://api.telegram.org/"),
      probe("https://149.154.166.110/"),
      probe("https://www.google.com/"),
    ]);
    const raw = process.env.TELEGRAM_BOT_TOKEN ?? "";
    const tok = raw.trim();
    const shape = {
      rawLen: raw.length,
      len: tok.length,
      pattern: /^\d{6,12}:[A-Za-z0-9_-]{30,40}$/.test(tok),
      quoted: /^["']|["']$/.test(tok),
      nonAscii: /[^\x21-\x7e]/.test(tok),
    };
    const t = Date.now();
    let getMe = "";
    try {
      const r = await fetch(`https://api.telegram.org/bot${tok}/getMe`, {
        signal: AbortSignal.timeout(8000),
      });
      const j = await r.json();
      getMe = `${r.status} ok=${j.ok} ${j.description ?? j.result?.username ?? ""} ${Date.now() - t}ms`;
    } catch (e) {
      getMe = `${(e as Error).name} ${(e as Error).message} ${Date.now() - t}ms`;
    }
    const viaTg = await tg("getMe", {});
    return NextResponse.json({ region: process.env.VERCEL_REGION, fake, fakeMe, tg1, tg2, ex, shape, getMe, viaTg: viaTg.ok ? "ok" : viaTg.description });
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
