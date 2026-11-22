import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Site sohbeti ↔ Telegram köprüsü.
 *
 * Tek ortam değişkeni gerekir: TELEGRAM_BOT_TOKEN. Webhook gizli anahtarı ve
 * botu sahibine bağlayan kod JWT_SECRET'tan türetilir; sahibin Telegram sohbet
 * numarası veritabanında (SiteSetting) durur.
 */

export * from "./chatShared";

export function botToken(): string | null {
  return process.env.TELEGRAM_BOT_TOKEN?.trim() || null;
}

function derive(label: string, length: number): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET environment variable not set or too short");
  }
  return createHmac("sha256", secret).update(label).digest("hex").slice(0, length);
}

/** Telegram'ın her webhook isteğinde başlıkta geri gönderdiği anahtar. */
export function webhookSecret(): string {
  return derive("telegram-webhook", 48);
}

/** Bota `/start <kod>` ile gelen kişiyi sohbetin sahibi yapan kod. */
export function ownerCode(): string {
  return derive("telegram-owner", 32);
}

export function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

type TgResult<T> = { ok: true; result: T } | { ok: false; description?: string };

export async function tg<T = unknown>(
  method: string,
  body: Record<string, unknown>
): Promise<TgResult<T>> {
  const token = botToken();
  if (!token) return { ok: false, description: "TELEGRAM_BOT_TOKEN yok" };
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
    return (await res.json()) as TgResult<T>;
  } catch (e) {
    return { ok: false, description: e instanceof Error ? e.name : "hata" };
  }
}

/** Telegram'a düşen mesajın metni. Düz metin: biçimlendirme yorumlanmaz. */
export function forwardText(name: string, threadId: string, text: string) {
  return `💬 ${name} · #${threadId.slice(-4)}\n\n${text}\n\n↩️ Cevap için bu mesajı "Yanıtla" ile seçin.`;
}
