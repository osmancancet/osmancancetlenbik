import { ChatSetupClient } from "./ChatSetupClient";

export default function AdminChatPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-[var(--fg)] mb-1">Sohbet</h1>
      <p className="text-sm text-[var(--fg-subtle)] mb-8">
        Sitedeki sohbet penceresine yazılanlar Telegram&apos;a düşer; oradan
        verdiğiniz yanıt ziyaretçinin penceresinde görünür.
      </p>
      <ChatSetupClient />
    </div>
  );
}
