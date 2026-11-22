/** Sohbetin tarayıcıda da kullanılan saf kısmı (Node modülü içermez). */

export const BUSY_AFTER_MS = 15 * 60 * 1000;
export const OWNER_CHAT_SETTING = "chat.ownerChatId";
export const NAME_MAX = 40;
export const TEXT_MAX = 1000;

export type ChatSender = "VISITOR" | "OWNER";

/**
 * Yanıt bekleyen ilk ziyaretçi mesajının zamanı. Son sahip yanıtından sonra
 * ziyaretçi yazmadıysa null. Pencere bu zamandan 15 dakika geçince "şu an
 * meşgulüm, e-posta atın" notunu gösterir.
 */
export function waitingSince(
  messages: { sender: string; createdAt: Date }[]
): Date | null {
  let since: Date | null = null;
  for (const m of messages) {
    if (m.sender === "OWNER") since = null;
    else if (!since) since = m.createdAt;
  }
  return since;
}

export function isBusy(since: Date | string | null, now = Date.now()): boolean {
  if (!since) return false;
  return now - new Date(since).getTime() >= BUSY_AFTER_MS;
}
