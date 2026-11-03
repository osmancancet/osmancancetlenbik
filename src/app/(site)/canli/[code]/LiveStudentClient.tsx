"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Check,
  Clock,
  LoaderCircle,
  MessageSquare,
  Send,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { ACTIVITY_LABELS, type ActivityType } from "@/lib/live";
import { readKey } from "../storage";

type Option = { id: string; label: string; correct?: boolean };

type State = {
  code: string;
  title: string;
  status: "LOBBY" | "LIVE" | "ENDED";
  participants: number;
  activityCount: number;
  me: { nickname: string; score: number } | null;
  activity: {
    id: string;
    type: ActivityType;
    prompt: string;
    seconds: number;
    state: "IDLE" | "OPEN" | "LOCKED" | "REVEALED";
    openedAt: string | null;
    options: Option[];
    results:
      | { counts: Record<string, number>; total: number }
      | { words: Array<{ word: string; count: number }> }
      | { texts: string[] }
      | null;
  } | null;
  myAnswer: { optionId: string | null; text: string | null; correct: boolean | null } | null;
};

/** Yoklamayı ders temposunda tutmak için 2 saniye; sunucuya yük bindirmeden
 *  öğrenci soruyu tahtayla neredeyse aynı anda görüyor. */
const POLL_MS = 2000;

export function LiveStudentClient({ code }: { code: string }) {
  const [state, setState] = useState<State | null>(null);
  const [gone, setGone] = useState(false);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const keyRef = useRef<string | null>(null);

  useEffect(() => {
    keyRef.current = readKey(code);
  }, [code]);

  const load = useCallback(async () => {
    const key = keyRef.current;
    const res = await fetch(
      `/api/live/${code}${key ? `?key=${encodeURIComponent(key)}` : ""}`,
      { cache: "no-store" }
    );
    if (res.status === 404) {
      setGone(true);
      return;
    }
    if (!res.ok) return;
    setState(await res.json());
  }, [code]);

  useEffect(() => {
    load();
    const id = setInterval(load, POLL_MS);
    // Sekme arkadayken yoklamayı durdurmak telefon pilini koruyor.
    const onVis = () => {
      if (document.visibilityState === "visible") load();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [load]);

  async function answer(payload: { optionId?: string; text?: string }) {
    const key = keyRef.current;
    if (!key || !state?.activity) return;
    setSending(true);
    setError(null);
    const res = await fetch(`/api/live/${code}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, activityId: state.activity.id, ...payload }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) setError(data.error ?? "Gönderilemedi.");
    else setText("");
    setSending(false);
    load();
  }

  if (gone) {
    return (
      <Centered>
        <X className="w-10 h-10 text-red-400 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-[var(--fg)] mb-2">
          Ders bulunamadı
        </h1>
        <p className="text-[var(--fg-muted)] mb-6">
          Kod yanlış olabilir ya da ders kapanmış olabilir.
        </p>
        <Link href="/canli" className="text-[var(--accent)] hover:underline">
          Kodu tekrar gir
        </Link>
      </Centered>
    );
  }

  if (!state) {
    return (
      <Centered>
        <LoaderCircle className="w-6 h-6 animate-spin text-[var(--accent)] mx-auto" />
      </Centered>
    );
  }

  if (!keyRef.current) {
    return (
      <Centered>
        <h1 className="text-2xl font-semibold text-[var(--fg)] mb-2">
          {state.title}
        </h1>
        <p className="text-[var(--fg-muted)] mb-6">
          Bu derse henüz katılmadınız.
        </p>
        <Link
          href={`/canli?kod=${code}`}
          className="inline-flex px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-md"
        >
          Katıl
        </Link>
      </Centered>
    );
  }

  const a = state.activity;
  const answered = Boolean(state.myAnswer);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur px-5 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] font-mono">
              {state.code}
            </div>
            <div className="text-sm text-[var(--fg)] truncate">{state.title}</div>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-xs text-[var(--fg-muted)]">
            <span className="inline-flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {state.participants}
            </span>
            {state.me && (
              <span className="inline-flex items-center gap-1 text-[var(--accent)] font-mono">
                <Trophy className="w-3.5 h-3.5" />
                {state.me.score}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 px-5 py-8">
        <div className="max-w-lg mx-auto">
          {state.status === "ENDED" ? (
            <Waiting
              title="Ders bitti"
              body={
                state.me
                  ? `Toplam puanınız: ${state.me.score}. Katıldığınız için teşekkürler.`
                  : "Katıldığınız için teşekkürler."
              }
            />
          ) : !a || a.state === "IDLE" ? (
            <Waiting
              title="Ekranı izleyin"
              body="Soru geldiğinde burada belirecek."
              pulse
            />
          ) : (
            <ActivityView
              activity={a}
              answered={answered}
              myAnswer={state.myAnswer}
              sending={sending}
              text={text}
              setText={setText}
              onAnswer={answer}
            />
          )}

          {error && (
            <p className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
              {error}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-6 text-center">
      <div>{children}</div>
    </div>
  );
}

function Waiting({
  title,
  body,
  pulse = false,
}: {
  title: string;
  body: string;
  pulse?: boolean;
}) {
  return (
    <div className="text-center py-16">
      <div
        className={`w-14 h-14 mx-auto mb-5 rounded-full border-2 border-[var(--accent)]/40 grid place-items-center ${
          pulse ? "animate-pulse" : ""
        }`}
      >
        <Clock className="w-6 h-6 text-[var(--accent)]" />
      </div>
      <h2 className="text-xl font-semibold text-[var(--fg)] mb-2">{title}</h2>
      <p className="text-[var(--fg-muted)]">{body}</p>
    </div>
  );
}

function ActivityView({
  activity,
  answered,
  myAnswer,
  sending,
  text,
  setText,
  onAnswer,
}: {
  activity: NonNullable<State["activity"]>;
  answered: boolean;
  myAnswer: State["myAnswer"];
  sending: boolean;
  text: string;
  setText: (v: string) => void;
  onAnswer: (p: { optionId?: string; text?: string }) => void;
}) {
  const isText = activity.type === "WORDCLOUD" || activity.type === "QA";
  const open = activity.state === "OPEN";
  const revealed = activity.state === "REVEALED";

  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-3">
        {ACTIVITY_LABELS[activity.type]}
      </div>
      <h2 className="text-2xl font-semibold text-[var(--fg)] leading-snug mb-7">
        {activity.prompt}
      </h2>

      {isText ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (text.trim()) onAnswer({ text: text.trim() });
            }}
            className="flex gap-2"
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={activity.type === "WORDCLOUD" ? 24 : 160}
              disabled={!open || sending}
              placeholder={
                activity.type === "WORDCLOUD"
                  ? "Tek kelime yaz"
                  : "Sorunu yaz"
              }
              className="flex-1 px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!open || sending || !text.trim()}
              className="px-4 rounded-md bg-[var(--accent)] text-[var(--bg)] disabled:opacity-40"
              aria-label="Gönder"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          {answered && (
            <p className="mt-3 text-sm text-[var(--accent)] inline-flex items-center gap-2">
              <Check className="w-4 h-4" />
              Gönderildi{myAnswer?.text ? `: “${myAnswer.text}”` : ""}
              {open && " — değiştirmek için yeniden yazabilirsin."}
            </p>
          )}
          {revealed && "texts" in (activity.results ?? {}) && (
            <ul className="mt-6 space-y-2">
              {(activity.results as { texts: string[] }).texts.map((t, i) => (
                <li
                  key={i}
                  className="text-sm text-[var(--fg-muted)] border border-[var(--border)] rounded-md px-3 py-2 inline-flex gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--fg-subtle)]" />
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {activity.options.map((o) => {
            const mine = myAnswer?.optionId === o.id;
            const counts =
              revealed && activity.results && "counts" in activity.results
                ? activity.results
                : null;
            const pct =
              counts && counts.total > 0
                ? Math.round(((counts.counts[o.id] ?? 0) / counts.total) * 100)
                : 0;

            return (
              <button
                key={o.id}
                type="button"
                disabled={!open || sending}
                onClick={() => onAnswer({ optionId: o.id })}
                aria-pressed={mine}
                className={`relative w-full overflow-hidden text-start px-4 py-4 rounded-md border transition-colors disabled:cursor-default ${
                  revealed && o.correct
                    ? "border-[var(--accent)] text-[var(--fg)]"
                    : mine
                      ? "border-[var(--accent)] text-[var(--fg)]"
                      : "border-[var(--border-strong)] text-[var(--fg-muted)] hover:border-[var(--accent)]/50 hover:text-[var(--fg)]"
                }`}
              >
                {counts && (
                  <span
                    aria-hidden
                    className="absolute inset-y-0 start-0 bg-[var(--accent-soft)] transition-all"
                    style={{ width: `${pct}%` }}
                  />
                )}
                <span className="relative flex items-center justify-between gap-3">
                  <span>{o.label}</span>
                  <span className="flex items-center gap-2 shrink-0">
                    {revealed && o.correct && (
                      <Check className="w-4 h-4 text-[var(--accent)]" />
                    )}
                    {mine && !revealed && (
                      <Check className="w-4 h-4 text-[var(--accent)]" />
                    )}
                    {counts && (
                      <span className="font-mono text-xs text-[var(--fg-subtle)]">
                        %{pct}
                      </span>
                    )}
                  </span>
                </span>
              </button>
            );
          })}

          {answered && !revealed && (
            <p className="pt-2 text-sm text-[var(--accent)] inline-flex items-center gap-2">
              <Check className="w-4 h-4" />
              Yanıtınız alındı.
            </p>
          )}
          {revealed && activity.type === "QUIZ" && myAnswer && (
            <p
              className={`pt-2 text-sm font-medium ${
                myAnswer.correct ? "text-[var(--accent)]" : "text-red-400"
              }`}
            >
              {myAnswer.correct ? "Doğru!" : "Bu sefer olmadı."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
