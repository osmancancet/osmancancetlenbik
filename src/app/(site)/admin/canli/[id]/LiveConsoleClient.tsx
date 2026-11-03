"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Eye,
  Lock,
  Monitor,
  Play,
  RotateCcw,
  Square,
  Trophy,
  Users,
} from "lucide-react";
import { ACTIVITY_LABELS, type ActivityType } from "@/lib/live";
import { useQrDataUrl } from "@/components/useQrDataUrl";

type Option = { id: string; label: string; correct?: boolean };
type Activity = {
  id: string;
  order: number;
  type: ActivityType;
  prompt: string;
  seconds: number;
  state: "IDLE" | "OPEN" | "LOCKED" | "REVEALED";
  options: Option[];
};
type Data = {
  session: {
    id: string;
    code: string;
    title: string;
    status: "LOBBY" | "LIVE" | "ENDED";
    course: { title: string; slug: string } | null;
    weekNumber: number | null;
    currentActivityId: string | null;
  };
  activities: Activity[];
  current: { id: string; state: string; answered: number } | null;
  results:
    | { counts: Record<string, number>; total: number }
    | { words: Array<{ word: string; count: number }> }
    | { texts: string[] }
    | null;
  participants: Array<{ id: string; nickname: string; score: number }>;
};

const POLL_MS = 2000;

export function LiveConsoleClient({ id }: { id: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [board, setBoard] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch(`/api/admin/live/${id}`, { cache: "no-store" });
    if (res.ok) setData(await res.json());
  }, [id]);

  useEffect(() => {
    load();
    const t = setInterval(load, POLL_MS);
    return () => clearInterval(t);
  }, [load]);

  const act = useCallback(
    async (action: string, activityId?: string) => {
      await fetch(`/api/admin/live/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, activityId }),
      });
      load();
    },
    [id, load]
  );

  if (!data) return <p className="text-sm text-[var(--fg-subtle)]">Yükleniyor…</p>;

  const s = data.session;
  const current = data.activities.find((a) => a.id === s.currentActivityId);

  if (board) {
    return (
      <BoardView
        data={data}
        current={current}
        onClose={() => setBoard(false)}
        onAct={act}
      />
    );
  }

  return (
    <div>
      <Link
        href="/admin/canli"
        className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Canlı dersler
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--fg)]">{s.title}</h1>
          <p className="text-sm text-[var(--fg-subtle)] mt-1">
            {s.course
              ? `${s.course.title}${s.weekNumber ? ` · ${s.weekNumber}. hafta` : ""}`
              : "Derse bağlı değil"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBoard(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-[var(--bg)] text-sm font-semibold rounded-md hover:opacity-90"
          >
            <Monitor className="w-4 h-4" />
            Tahta görünümü
          </button>
          {s.status !== "ENDED" ? (
            <button
              onClick={() => act("end")}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--border-strong)] text-sm rounded-md text-[var(--fg-muted)] hover:border-red-400 hover:text-red-400"
            >
              <Square className="w-4 h-4" />
              Dersi bitir
            </button>
          ) : (
            <button
              onClick={() => act("reopen")}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--border-strong)] text-sm rounded-md text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Play className="w-4 h-4" />
              Yeniden aç
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-8">
        <div className="space-y-3">
          {data.activities.map((a) => {
            const isCurrent = a.id === s.currentActivityId;
            return (
              <div
                key={a.id}
                className={`card rounded-lg p-5 ${
                  isCurrent ? "border-[var(--accent)]" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs text-[var(--fg-subtle)]">
                        {String(a.order + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--fg-subtle)]">
                        {ACTIVITY_LABELS[a.type]}
                      </span>
                      <StateBadge state={a.state} />
                    </div>
                    <p className="text-[var(--fg)]">{a.prompt}</p>
                  </div>
                  {isCurrent && data.current && (
                    <span className="shrink-0 text-sm font-mono text-[var(--accent)]">
                      {data.current.answered} yanıt
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Btn onClick={() => act("show", a.id)} icon={Monitor}>
                    Sahneye al
                  </Btn>
                  <Btn onClick={() => act("open", a.id)} icon={Play} primary>
                    Yanıtları aç
                  </Btn>
                  <Btn onClick={() => act("lock", a.id)} icon={Lock}>
                    Kilitle
                  </Btn>
                  <Btn onClick={() => act("reveal", a.id)} icon={Eye}>
                    Sonucu göster
                  </Btn>
                  <Btn onClick={() => act("reset", a.id)} icon={RotateCcw}>
                    Sıfırla
                  </Btn>
                </div>

                {isCurrent && (
                  <div className="mt-4 pt-4 border-t border-[var(--border)]">
                    <Results activity={a} results={data.results} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <aside className="space-y-6">
          <JoinCard code={s.code} />
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-3 flex items-center gap-2">
              <Users className="w-3 h-3" />
              Katılımcılar ({data.participants.length})
            </h2>
            <ol className="space-y-1.5">
              {data.participants.slice(0, 20).map((p, i) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-[var(--fg-muted)] truncate">
                    <span className="font-mono text-[var(--fg-subtle)] me-2">
                      {i + 1}
                    </span>
                    {p.nickname}
                  </span>
                  {p.score > 0 && (
                    <span className="font-mono text-xs text-[var(--accent)] shrink-0">
                      {p.score}
                    </span>
                  )}
                </li>
              ))}
              {data.participants.length === 0 && (
                <li className="text-sm text-[var(--fg-subtle)]">
                  Henüz kimse katılmadı.
                </li>
              )}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Btn({
  onClick,
  icon: Icon,
  children,
  primary = false,
}: {
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs border transition-colors ${
        primary
          ? "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-soft)]"
          : "border-[var(--border-strong)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--accent)]/50"
      }`}
    >
      <Icon className="w-3 h-3" />
      {children}
    </button>
  );
}

const STATE_LABEL: Record<string, string> = {
  IDLE: "Sahnede",
  OPEN: "Yanıt alınıyor",
  LOCKED: "Kilitli",
  REVEALED: "Sonuç açık",
};

function StateBadge({ state }: { state: string }) {
  if (state === "IDLE") return null;
  return (
    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--accent)] text-[var(--accent)]">
      {STATE_LABEL[state]}
    </span>
  );
}

function JoinCard({ code }: { code: string }) {
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);
  const url = origin ? `${origin}/canli?kod=${code}` : "";
  const qr = useQrDataUrl(url, 480);

  return (
    <div className="card rounded-lg p-5 text-center">
      <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--fg-subtle)] mb-2">
        Katılım kodu
      </div>
      <div className="font-mono text-3xl text-[var(--accent)] tracking-[0.2em] mb-4">
        {code}
      </div>
      {qr && (
        <Image
          src={qr}
          alt={`${code} kodlu derse katılım QR kodu`}
          width={160}
          height={160}
          unoptimized
          className="mx-auto rounded"
        />
      )}
      <p className="mt-3 text-xs text-[var(--fg-subtle)] break-all">
        {origin}/canli
      </p>
    </div>
  );
}

function Results({
  activity,
  results,
}: {
  activity: Activity;
  results: Data["results"];
}) {
  if (!results) return null;

  if ("words" in results) {
    if (results.words.length === 0)
      return <p className="text-sm text-[var(--fg-subtle)]">Henüz yanıt yok.</p>;
    const max = results.words[0].count;
    return (
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        {results.words.slice(0, 40).map((w) => (
          <span
            key={w.word}
            className="text-[var(--fg)]"
            style={{
              fontSize: `${0.85 + (w.count / max) * 1.6}rem`,
              opacity: 0.5 + (w.count / max) * 0.5,
            }}
          >
            {w.word}
            <span className="ms-1 text-xs text-[var(--fg-subtle)] font-mono">
              {w.count}
            </span>
          </span>
        ))}
      </div>
    );
  }

  if ("texts" in results) {
    if (results.texts.length === 0)
      return <p className="text-sm text-[var(--fg-subtle)]">Henüz soru yok.</p>;
    return (
      <ul className="space-y-2 max-h-72 overflow-y-auto">
        {results.texts.map((t, i) => (
          <li
            key={i}
            className="text-sm text-[var(--fg-muted)] border border-[var(--border)] rounded px-3 py-2"
          >
            {t}
          </li>
        ))}
      </ul>
    );
  }

  const { counts, total } = results;
  return (
    <div className="space-y-2">
      {activity.options.map((o) => {
        const n = counts[o.id] ?? 0;
        const pct = total ? Math.round((n / total) * 100) : 0;
        return (
          <div key={o.id} className="relative">
            <div className="relative flex items-center justify-between gap-3 px-3 py-2 rounded border border-[var(--border)] overflow-hidden">
              <span
                aria-hidden
                className="absolute inset-y-0 start-0 bg-[var(--accent-soft)]"
                style={{ width: `${pct}%` }}
              />
              <span className="relative text-sm text-[var(--fg-muted)] flex items-center gap-2">
                {o.correct && <Check className="w-3.5 h-3.5 text-[var(--accent)]" />}
                {o.label}
              </span>
              <span className="relative font-mono text-xs text-[var(--fg-subtle)]">
                {n} · %{pct}
              </span>
            </div>
          </div>
        );
      })}
      <p className="text-xs text-[var(--fg-subtle)] pt-1">Toplam {total} yanıt</p>
    </div>
  );
}

/** Projeksiyona yansıtılan büyük ekran. Yazılar uzaktan okunacak boyutta. */
function BoardView({
  data,
  current,
  onClose,
  onAct,
}: {
  data: Data;
  current: Activity | undefined;
  onClose: () => void;
  onAct: (action: string, activityId?: string) => void;
}) {
  const s = data.session;
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);
  const qr = useQrDataUrl(origin ? `${origin}/canli?kod=${s.code}` : "", 600);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[120] bg-black text-white overflow-auto">
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-10 px-3 py-1.5 text-xs rounded border border-white/20 text-white/60 hover:text-white"
      >
        Kapat (Esc)
      </button>

      <div className="min-h-full flex flex-col items-center justify-center p-10 gap-10">
        {!current ? (
          <div className="text-center">
            <p className="text-white/50 uppercase tracking-[0.3em] text-sm mb-6">
              Derse katılmak için
            </p>
            <div className="font-mono text-[12rem] leading-none text-[var(--accent)] tracking-[0.1em]">
              {s.code}
            </div>
            {qr && (
              <Image
                src={qr}
                alt="Katılım QR kodu"
                width={260}
                height={260}
                unoptimized
                className="mx-auto mt-10 rounded-lg"
              />
            )}
            <p className="mt-6 text-2xl text-white/70">{origin}/canli</p>
            <p className="mt-10 text-xl text-white/50">
              {data.participants.length} kişi katıldı
            </p>
          </div>
        ) : (
          <div className="w-full max-w-5xl">
            <div className="flex items-center justify-between mb-8 text-white/50">
              <span className="uppercase tracking-[0.3em] text-sm">
                {ACTIVITY_LABELS[current.type]}
              </span>
              <span className="font-mono text-sm">
                {s.code} · {data.current?.answered ?? 0} yanıt ·{" "}
                {data.participants.length} kişi
              </span>
            </div>
            <h2 className="text-5xl font-semibold leading-tight mb-12">
              {current.prompt}
            </h2>

            <div className="text-2xl [&_*]:!text-white">
              <Results activity={current} results={data.results} />
            </div>

            <div className="mt-10 flex gap-3 justify-center">
              <Btn onClick={() => onAct("open", current.id)} icon={Play} primary>
                Yanıtları aç
              </Btn>
              <Btn onClick={() => onAct("lock", current.id)} icon={Lock}>
                Kilitle
              </Btn>
              <Btn onClick={() => onAct("reveal", current.id)} icon={Eye}>
                Sonucu göster
              </Btn>
            </div>
          </div>
        )}

        {data.participants.some((p) => p.score > 0) && (
          <div className="w-full max-w-2xl">
            <h3 className="text-white/50 uppercase tracking-[0.3em] text-sm mb-4 flex items-center gap-2 justify-center">
              <Trophy className="w-4 h-4" />
              Sıralama
            </h3>
            <ol className="space-y-2">
              {data.participants.slice(0, 8).map((p, i) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between text-2xl border-b border-white/10 pb-2"
                >
                  <span>
                    <span className="font-mono text-white/40 me-4">{i + 1}</span>
                    {p.nickname}
                  </span>
                  <span className="font-mono text-[var(--accent)]">{p.score}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
