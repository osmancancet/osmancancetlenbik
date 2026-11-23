import { createHmac, timingSafeEqual } from "node:crypto";
import { request } from "node:https";

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

/**
 * Telegram Bot API çağrısı. Bilerek IPv4 ile (`family: 4`) yapılıyor:
 * api.telegram.org'un IPv6 adresi de var ve sunucusuz ortamda fetch IPv6'ya
 * takılıp zaman aşımına düşüyordu.
 */
export function tg<T = unknown>(
  method: string,
  body: Record<string, unknown>
): Promise<TgResult<T>> {
  const token = botToken();
  if (!token) {
    return Promise.resolve({ ok: false, description: "TELEGRAM_BOT_TOKEN yok" });
  }
  const payload = JSON.stringify(body);
  return new Promise((resolve) => {
    const req = request(
      {
        host: "api.telegram.org",
        path: `/bot${token}/${method}`,
        method: "POST",
        family: 4,
        timeout: 10_000,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
      },
      (res) => {
        let raw = "";
        res.setEncoding("utf8");
        res.on("data", (c) => (raw += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(raw) as TgResult<T>);
          } catch {
            resolve({ ok: false, description: `HTTP ${res.statusCode}` });
          }
        });
      }
    );
    req.on("timeout", () => req.destroy(new Error("TimeoutError")));
    req.on("error", (e) => resolve({ ok: false, description: e.message }));
    req.end(payload);
  });
}

/** Telegram'a düşen mesajın metni. Düz metin: biçimlendirme yorumlanmaz. */
export function forwardText(name: string, threadId: string, text: string) {
  return `💬 ${name} · #${threadId.slice(-4)}\n\n${text}\n\n↩️ Cevap için bu mesajı "Yanıtla" ile seçin.`;
}
