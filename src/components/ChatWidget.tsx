"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Mail, MessageCircle, Send, X } from "lucide-react";
import { NAME_MAX, TEXT_MAX, isBusy } from "@/lib/chatShared";

type Msg = { id: string; sender: string; text: string; at: string };
type View = { messages: Msg[]; waitingSince: string | null };

const KEY_STORE = "occ_chat_key";
const SEEN_STORE = "occ_chat_seen";
// Tam ekran ya da kendi akışı olan sayfalarda pencere gösterilmez.
const HIDDEN = ["/admin", "/canli", "/poll", "/yoklama-tuzak", "/sunum-test"];

function read(name: string): string | null {
  try {
    return localStorage.getItem(name);
  } catch {
    return null;
  }
}
function write(name: string, value: string) {
  try {
    localStorage.setItem(name, value);
  } catch {
    /* gizli sekme: konuşma yalnız bu sayfa açıkken sürer */
  }
}

export function ChatWidget({ email }: { email: string }) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState<string | null>(null);
  const [view, setView] = useState<View>({ messages: [], waitingSince: null });
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seen, setSeen] = useState(0);
  const [, tick] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setKey(read(KEY_STORE));
    setSeen(Number(read(SEEN_STORE)) || 0);
  }, []);

  const refresh = useCallback(async (k: string) => {
    try {
      const res = await fetch("/api/chat", {
        headers: { "x-chat-key": k },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      if (res.status === 404) {
        // Konuşma silinmiş (30 gün): baştan başlanır.
        setKey(null);
        write(KEY_STORE, "");
        setView({ messages: [], waitingSince: null });
        return;
      }
      if (res.ok) setView(await res.json());
    } catch {
      /* bağlantı yok: sıradaki yoklamada yeniden denenir */
    }
  }, []);

  // Açıkken sık, kapalıyken seyrek yoklama; sekme gizliyken hiç.
  useEffect(() => {
    if (!key) return;
    let stop = false;
    let timer: ReturnType<typeof setTimeout>;
    const loop = async () => {
      if (stop) return;
      if (document.visibilityState === "visible") {
        await refresh(key);
        tick((n) => n + 1);
      }
      timer = setTimeout(loop, open ? 4000 : 30000);
    };
    loop();
    return () => {
      stop = true;
      clearTimeout(timer);
    };
  }, [key, open, refresh]);

  const ownerCount = view.messages.filter((m) => m.sender === "OWNER").length;
  const unread = Math.max(0, ownerCount - seen);

  useEffect(() => {
    if (!open) return;
    if (ownerCount !== seen) {
      setSeen(ownerCount);
      write(SEEN_STORE, String(ownerCount));
    }
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [open, ownerCount, seen, view.messages.length]);

  if (HIDDEN.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return null;
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const body = text.trim();
    if (!body || sending) return;
    if (!key && name.trim().length < 2) {
      setError("Lütfen adınızı yazın.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, name: name.trim() || undefined, text: body, website }),
        signal: AbortSignal.timeout(12000),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(j.error || "Mesaj gönderilemedi.");
        return;
      }
      if (j.key) {
        setKey(j.key);
        write(KEY_STORE, j.key);
      }
      setView({ messages: j.messages ?? [], waitingSince: j.waitingSince ?? null });
      setText("");
    } catch {
      setError("Bağlantı kurulamadı. Tekrar deneyin.");
    } finally {
      setSending(false);
    }
  }

  const busy = isBusy(view.waitingSince);
  const started = view.messages.length > 0;

  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-3 print:hidden">
      {open && (
        <div
          role="dialog"
          aria-label="Sohbet"
          className="w-[min(22rem,calc(100vw-2rem))] h-[min(30rem,calc(100dvh-7rem))] flex flex-col rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <div>
              <div className="text-sm font-semibold text-[var(--fg)]">Bana yazın</div>
              <div className="text-xs text-[var(--fg-subtle)]">
                Osman Can Çetlenbik · genelde 15 dk içinde yanıt
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Sohbeti kapat"
              className="p-1.5 rounded-md text-[var(--fg-muted)] hover:text-[var(--fg)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2 text-sm">
            {!started && (
              <p className="text-[var(--fg-muted)] leading-relaxed">
                Merhaba! Ders, sınav ya da proje hakkında sorunuzu yazın; mesajınız
                doğrudan bana ulaşır ve cevabım burada görünür.
              </p>
            )}
            {view.messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === "VISITOR" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-lg px-3 py-2 ${
                    m.sender === "VISITOR"
                      ? "bg-[var(--accent)] text-[var(--bg)]"
                      : "bg-[var(--bg)] border border-[var(--border)] text-[var(--fg)]"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {started && view.waitingSince && !busy && (
              <p className="text-xs text-[var(--fg-subtle)] text-center pt-1">
                Mesajınız iletildi. Bu pencereyi açık tutabilir ya da sonra dönebilirsiniz.
              </p>
            )}
            {busy && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-[var(--fg)]">
                <p className="leading-relaxed">
                  Şu an meşgulüm, hemen dönüş yapamadım. Mesajınızı gördüğümde buradan
                  yanıtlayacağım; acil ise e-posta ile yazabilirsiniz.
                </p>
                <a
                  href={`mailto:${email}?subject=${encodeURIComponent("Siteden mesaj")}`}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-[var(--bg)]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {email}
                </a>
              </div>
            )}
          </div>

          <form onSubmit={send} className="border-t border-[var(--border)] p-3 space-y-2">
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />
            {!key && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={NAME_MAX}
                placeholder="Adınız"
                aria-label="Adınız"
                autoComplete="name"
                className="w-full px-3 py-2 rounded-md bg-[var(--bg)] border border-[var(--border-strong)] text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
              />
            )}
            <div className="flex items-end gap-2">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
                maxLength={TEXT_MAX}
                rows={2}
                placeholder="Mesajınız"
                aria-label="Mesajınız"
                className="flex-1 resize-none px-3 py-2 rounded-md bg-[var(--bg)] border border-[var(--border-strong)] text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
              />
              <button
                type="submit"
                disabled={sending || !text.trim()}
                aria-label="Gönder"
                className="p-2.5 rounded-md bg-[var(--accent)] text-[var(--bg)] disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            {!key && (
              <p className="text-[11px] leading-snug text-[var(--fg-subtle)]">
                Adınız ve mesajınız yalnızca size yanıt vermek için saklanır, 30 gün
                sonra silinir.
              </p>
            )}
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Sohbeti kapat" : "Sohbeti aç"}
        aria-expanded={open}
        className="relative w-13 h-13 p-3.5 rounded-full bg-[var(--accent)] text-[var(--bg)] shadow-lg hover:opacity-90 transition-opacity"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs font-semibold flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}
