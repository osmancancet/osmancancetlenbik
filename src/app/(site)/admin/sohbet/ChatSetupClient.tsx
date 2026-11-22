"use client";

import { useCallback, useEffect, useState } from "react";

type Status = { tokenSet: boolean; connected: boolean };

export function ChatSetupClient() {
  const [status, setStatus] = useState<Status | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [bot, setBot] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/chat/setup", { cache: "no-store" });
    if (res.ok) setStatus(await res.json());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Bağlantı verildikten sonra Telegram'da "Başlat"a basılmasını bekler.
  useEffect(() => {
    if (!link || status?.connected) return;
    const t = setInterval(load, 3000);
    return () => clearInterval(t);
  }, [link, status?.connected, load]);

  async function setup() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/chat/setup", { method: "POST" });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(j.error || "Kurulum yapılamadı.");
        return;
      }
      setLink(j.link);
      setBot(j.bot);
    } catch {
      setError("Bağlantı kurulamadı.");
    } finally {
      setBusy(false);
    }
  }

  if (!status) return <p className="text-sm text-[var(--fg-subtle)]">Yükleniyor…</p>;

  const row = "flex items-center gap-2 text-sm text-[var(--fg)]";
  const dot = (ok: boolean) => (
    <span className={`w-2 h-2 rounded-full ${ok ? "bg-emerald-400" : "bg-amber-400"}`} />
  );

  return (
    <div className="max-w-xl space-y-5">
      <div className="space-y-2">
        <div className={row}>
          {dot(status.tokenSet)}
          {status.tokenSet
            ? "Bot anahtarı tanımlı"
            : "Bot anahtarı tanımlı değil (Vercel › Environment Variables › TELEGRAM_BOT_TOKEN, ardından yeniden dağıtım)"}
        </div>
        <div className={row}>
          {dot(status.connected)}
          {status.connected
            ? "Telegram hesabınız bağlı — mesajlar size iletiliyor"
            : "Telegram hesabı henüz bağlı değil"}
        </div>
      </div>

      {status.tokenSet && (
        <button
          type="button"
          onClick={setup}
          disabled={busy}
          className="px-4 py-2 rounded-md bg-[var(--accent)] text-[var(--bg)] text-sm font-medium disabled:opacity-50"
        >
          {busy ? "Kuruluyor…" : status.connected ? "Yeniden kur / hesabı değiştir" : "Telegram'ı bağla"}
        </button>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      {link && !status.connected && (
        <div className="rounded-md border border-[var(--border-strong)] bg-[var(--bg-card)] p-4 text-sm text-[var(--fg)] space-y-2">
          <p>
            Webhook kuruldu (@{bot}). Şimdi aşağıdaki bağlantıyı Telegram&apos;ın
            kurulu olduğu cihazda açıp <strong>Başlat</strong>&apos;a basın:
          </p>
          <a href={link} target="_blank" rel="noreferrer" className="text-[var(--accent)] underline break-all">
            Telegram&apos;da aç
          </a>
          <p className="text-xs text-[var(--fg-subtle)]">
            Bu bağlantı size özeldir; başkasıyla paylaşmayın.
          </p>
        </div>
      )}
    </div>
  );
}
