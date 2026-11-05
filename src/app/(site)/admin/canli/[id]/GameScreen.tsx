"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Check, Pause, Play, SkipForward, Trophy, Users, X } from "lucide-react";
import { useQrDataUrl } from "@/components/useQrDataUrl";
import { optionColor } from "@/lib/liveColors";
import type { Activity, Data } from "./LiveConsoleClient";

/**
 * Yarışma oyunu — tek akış (Kahoot mantığı):
 *   lobi → 3-2-1 → soru tek başına → şıklar + süre → dağılım + doğru şık
 *   → sıralama → sıradaki soru … → podyum.
 *
 * Her aşama süresi dolunca kendiliğinden ilerler; Boşluk / → / "İleri" ile
 * beklemeden geçilir, P ile duraklatılır. Zamanlayıcı eğitmenin
 * tarayıcısında çalışıyor: sunucuya yalnız konsol düğmelerinin attığı
 * istekler gidiyor (show → open → reveal → end), bu sekme açık kalmalı.
 */

const COUNTDOWN_MS = 3000;
/** Soru şıklar olmadan bu kadar gösterilir: önce herkes soruyu okusun. */
const INTRO_MS = 5000;
/** Öğrenci ekranı ~1 sn'de bir yenileniyor; soruyu geç gören haksızlığa uğramasın. */
const GRACE_MS = 1500;
const RESULT_MS = 6000;
const SCOREBOARD_MS = 6000;
const DEFAULT_SECONDS = 20;

type Timed = "countdown" | "intro" | "question" | "result" | "scoreboard";
type Stage =
  | { k: "lobby" }
  | { k: Timed; idx: number; endsAt: number }
  | { k: "podium" };

export function GameScreen({
  data,
  act,
  onClose,
}: {
  data: Data;
  act: (action: string, activityId?: string) => Promise<void>;
  onClose: () => void;
}) {
  const qs = useMemo(
    () => data.activities.filter((a) => a.type === "QUIZ"),
    [data.activities]
  );
  const [stage, setStage] = useState<Stage>({ k: "lobby" });
  const [pausedLeft, setPausedLeft] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const busy = useRef(false);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(t);
  }, []);

  const advance = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    setPausedLeft(null);
    try {
      switch (stage.k) {
        case "lobby": {
          const idx = qs.findIndex((a) => a.state !== "REVEALED");
          if (idx < 0) {
            setStage({ k: "podium" });
            break;
          }
          await act("show", qs[idx].id);
          setStage({ k: "countdown", idx, endsAt: Date.now() + COUNTDOWN_MS });
          break;
        }
        case "countdown":
          setStage({ k: "intro", idx: stage.idx, endsAt: Date.now() + INTRO_MS });
          break;
        case "intro": {
          const a = qs[stage.idx];
          await act("open", a.id);
          setStage({
            k: "question",
            idx: stage.idx,
            endsAt: Date.now() + (a.seconds || DEFAULT_SECONDS) * 1000 + GRACE_MS,
          });
          break;
        }
        case "question":
          await act("reveal", qs[stage.idx].id);
          setStage({ k: "result", idx: stage.idx, endsAt: Date.now() + RESULT_MS });
          break;
        case "result":
          if (stage.idx >= qs.length - 1) {
            await act("end");
            setStage({ k: "podium" });
          } else {
            setStage({
              k: "scoreboard",
              idx: stage.idx,
              endsAt: Date.now() + SCOREBOARD_MS,
            });
          }
          break;
        case "scoreboard": {
          const idx = stage.idx + 1;
          await act("show", qs[idx].id);
          setStage({ k: "intro", idx, endsAt: Date.now() + INTRO_MS });
          break;
        }
        case "podium":
          break;
      }
    } finally {
      busy.current = false;
    }
  }, [stage, qs, act]);

  const current = "idx" in stage ? qs[stage.idx] : undefined;
  const answered =
    current && data.current?.id === current.id ? data.current.answered : 0;
  const players = data.participants.length;

  // Süre dolunca — ya da soruda herkes yanıtlayınca — kendiliğinden ilerle.
  useEffect(() => {
    if (pausedLeft != null || !("endsAt" in stage)) return;
    const allIn = stage.k === "question" && players > 0 && answered >= players;
    if (now >= stage.endsAt || allIn) advance();
  }, [now, stage, pausedLeft, players, answered, advance]);

  const togglePause = useCallback(() => {
    if (!("endsAt" in stage)) return;
    if (pausedLeft == null) {
      setPausedLeft(Math.max(0, stage.endsAt - Date.now()));
    } else {
      setStage({ ...stage, endsAt: Date.now() + pausedLeft });
      setPausedLeft(null);
    }
  }, [stage, pausedLeft]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") {
        e.preventDefault();
        advance();
      } else if (e.key.toLowerCase() === "p") togglePause();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, togglePause, onClose]);

  const left = "endsAt" in stage ? (pausedLeft ?? stage.endsAt - now) : 0;
  const s = data.session;

  return (
    <div className="fixed inset-0 z-[120] bg-[#0b0d12] text-white flex flex-col select-none">
      {/* Üst çubuk */}
      <div className="flex items-center justify-between gap-4 px-6 py-3 border-b border-white/10 text-sm text-white/60">
        <span className="font-mono">
          /canli · <span className="text-[var(--accent)] tracking-[0.15em]">{s.code}</span>
        </span>
        <span>{"idx" in stage && `Soru ${stage.idx + 1} / ${qs.length}`}</span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 me-2">
            <Users className="w-4 h-4" /> {players}
          </span>
          {"endsAt" in stage && (
            <TopBtn onClick={togglePause} title="Duraklat / sürdür (P)">
              {pausedLeft == null ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </TopBtn>
          )}
          {stage.k !== "lobby" && stage.k !== "podium" && (
            <TopBtn onClick={advance} title="İleri (Boşluk)">
              <SkipForward className="w-4 h-4" />
              <span>{stage.k === "question" ? "Soruyu bitir" : "İleri"}</span>
            </TopBtn>
          )}
          <TopBtn onClick={onClose} title="Kapat (Esc)">
            <X className="w-4 h-4" />
          </TopBtn>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        {stage.k === "lobby" && (
          <Lobby data={data} total={qs.length} onStart={advance} />
        )}
        {stage.k === "countdown" && (
          <Center>
            <div className="w-56 h-56 rounded-full border-4 border-[var(--accent)] grid place-items-center text-[9rem] font-bold tabular-nums">
              {Math.max(1, Math.ceil(left / 1000))}
            </div>
            <p className="mt-8 text-2xl text-white/60">Hazır olun!</p>
          </Center>
        )}
        {stage.k === "intro" && current && (
          <Center>
            <p className="text-white/50 uppercase tracking-[0.3em] mb-8">
              Soru {stage.idx + 1} / {qs.length}
            </p>
            <h2 className="text-5xl md:text-6xl font-semibold leading-tight text-center max-w-6xl px-8">
              {current.prompt}
            </h2>
            <div className="mt-14 w-[min(70vw,900px)] h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-[var(--accent)] transition-[width] duration-200 ease-linear"
                style={{ width: `${Math.max(0, Math.min(1, left / INTRO_MS)) * 100}%` }}
              />
            </div>
          </Center>
        )}
        {stage.k === "question" && current && (
          <QuestionView
            activity={current}
            secondsLeft={Math.max(0, Math.ceil((left - GRACE_MS) / 1000))}
            answered={answered}
            players={players}
            paused={pausedLeft != null}
          />
        )}
        {stage.k === "result" && current && (
          <ResultView
            activity={current}
            counts={
              data.current?.id === current.id && data.results && "counts" in data.results
                ? data.results.counts
                : {}
            }
          />
        )}
        {stage.k === "scoreboard" && <Scoreboard data={data} />}
        {stage.k === "podium" && <Podium data={data} />}
      </div>
    </div>
  );
}

function TopBtn({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/15 text-white/70 hover:text-white hover:border-white/40"
    >
      {children}
    </button>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col items-center justify-center">{children}</div>
  );
}

function Lobby({
  data,
  total,
  onStart,
}: {
  data: Data;
  total: number;
  onStart: () => void;
}) {
  const s = data.session;
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);
  const qr = useQrDataUrl(origin ? `${origin}/canli?kod=${s.code}` : "", 600);
  const host = origin.replace(/^https?:\/\//, "");

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-center gap-10 py-8 border-b border-white/10 bg-white/[0.03]">
        <div className="text-end">
          <p className="text-white/60 text-xl">Katılmak için</p>
          <p className="text-3xl font-semibold">{host}/canli</p>
        </div>
        <div className="h-24 w-px bg-white/15" />
        <div>
          <p className="text-white/60 text-xl">Oyun kodu</p>
          <p className="font-mono text-7xl font-bold tracking-[0.12em] text-[var(--accent)]">
            {s.code}
          </p>
        </div>
        {qr && (
          <Image
            src={qr}
            alt="Katılım QR kodu"
            width={140}
            height={140}
            unoptimized
            className="rounded-lg bg-white p-1.5"
          />
        )}
      </div>

      <div className="flex items-center justify-between px-10 py-6">
        <div>
          <h1 className="text-3xl font-semibold">{s.title}</h1>
          <p className="text-white/50 mt-1">{total} soru</p>
        </div>
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-2 text-2xl">
            <Users className="w-6 h-6 text-white/50" />
            {data.participants.length}
          </span>
          <button
            onClick={onStart}
            disabled={data.participants.length === 0}
            className="px-8 py-4 rounded-lg bg-[var(--accent)] text-[var(--bg)] text-xl font-bold hover:opacity-90 disabled:opacity-30"
          >
            Başlat
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-10 pb-10">
        {data.participants.length === 0 ? (
          <p className="text-center text-white/40 text-2xl mt-16 animate-pulse">
            Katılımcılar bekleniyor…
          </p>
        ) : (
          <div className="flex flex-wrap gap-3 justify-center">
            {data.participants.map((p) => (
              <span
                key={p.id}
                className="px-5 py-2.5 rounded-lg bg-white/10 text-2xl font-semibold"
              >
                {p.nickname}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OptionGrid({
  activity,
  reveal = false,
}: {
  activity: Activity;
  reveal?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {activity.options.map((o, i) => {
        const c = optionColor(i);
        const dim = reveal && !o.correct;
        return (
          <div
            key={o.id}
            className="flex items-center gap-4 rounded-lg px-5 py-5 min-h-[96px] transition-opacity"
            style={{ background: c.bg, opacity: dim ? 0.35 : 1 }}
          >
            <span className="w-11 h-11 shrink-0 rounded-md bg-black/25 grid place-items-center text-2xl font-bold">
              {c.letter}
            </span>
            <span className="flex-1 text-3xl font-semibold leading-tight">{o.label}</span>
            {reveal &&
              (o.correct ? (
                <Check className="w-9 h-9 shrink-0" strokeWidth={3} />
              ) : (
                <X className="w-8 h-8 shrink-0 opacity-80" strokeWidth={3} />
              ))}
          </div>
        );
      })}
    </div>
  );
}

function QuestionView({
  activity,
  secondsLeft,
  answered,
  players,
  paused,
}: {
  activity: Activity;
  secondsLeft: number;
  answered: number;
  players: number;
  paused: boolean;
}) {
  return (
    <div className="h-full flex flex-col">
      <h2 className="mx-6 mt-6 rounded-lg bg-white text-[#0b0d12] text-4xl font-semibold leading-snug text-center px-8 py-6">
        {activity.prompt}
      </h2>
      <div className="flex-1 flex items-center justify-between px-12">
        <div className="text-center">
          <div
            className={`w-36 h-36 rounded-full grid place-items-center text-7xl font-bold tabular-nums ${
              secondsLeft <= 3 ? "bg-red-600" : "bg-[var(--accent)] text-[var(--bg)]"
            }`}
          >
            {secondsLeft}
          </div>
          {paused && <p className="mt-3 text-white/60">Duraklatıldı</p>}
        </div>
        <div className="text-center">
          <div className="text-7xl font-bold tabular-nums">{answered}</div>
          <p className="text-white/60 text-xl mt-1">
            yanıt{players ? ` / ${players}` : ""}
          </p>
        </div>
      </div>
      <OptionGrid activity={activity} />
    </div>
  );
}

function ResultView({
  activity,
  counts,
}: {
  activity: Activity;
  counts: Record<string, number>;
}) {
  const max = Math.max(1, ...activity.options.map((o) => counts[o.id] ?? 0));
  return (
    <div className="h-full flex flex-col">
      <h2 className="mx-6 mt-6 rounded-lg bg-white text-[#0b0d12] text-4xl font-semibold leading-snug text-center px-8 py-6">
        {activity.prompt}
      </h2>
      <div className="flex-1 flex items-end justify-center gap-8 px-10 pb-4 pt-8 min-h-0">
        {activity.options.map((o, i) => {
          const n = counts[o.id] ?? 0;
          const c = optionColor(i);
          return (
            <div key={o.id} className="flex flex-col items-center justify-end h-full w-28">
              <div
                className="w-full rounded-t-md transition-[height] duration-700"
                style={{
                  background: c.bg,
                  height: `${Math.max(4, (n / max) * 100)}%`,
                  opacity: o.correct ? 1 : 0.35,
                }}
              />
              <div
                className="w-full mt-1 rounded-b-md py-2 flex items-center justify-center gap-2 text-2xl font-bold"
                style={{ background: c.bg, opacity: o.correct ? 1 : 0.35 }}
              >
                {c.letter} · {n}
                {o.correct && <Check className="w-6 h-6" strokeWidth={3} />}
              </div>
            </div>
          );
        })}
      </div>
      <OptionGrid activity={activity} reveal />
    </div>
  );
}

function Scoreboard({ data }: { data: Data }) {
  const top = data.participants.slice(0, 5);
  return (
    <Center>
      <h2 className="text-5xl font-bold mb-10 inline-flex items-center gap-4">
        <Trophy className="w-10 h-10 text-[var(--accent)]" />
        Sıralama
      </h2>
      <ol className="w-[min(80vw,900px)] space-y-3">
        {top.map((p, i) => (
          <li
            key={p.id}
            className="flex items-center justify-between rounded-lg px-6 py-4 text-3xl font-semibold"
            style={{ background: i === 0 ? "var(--accent)" : "rgba(255,255,255,0.08)", color: i === 0 ? "var(--bg)" : undefined }}
          >
            <span>
              <span className="font-mono opacity-60 me-5">{i + 1}</span>
              {p.nickname}
            </span>
            <span className="font-mono tabular-nums">{p.score}</span>
          </li>
        ))}
        {top.length === 0 && (
          <li className="text-center text-white/40 text-2xl">Henüz puan yok.</li>
        )}
      </ol>
    </Center>
  );
}

function Podium({ data }: { data: Data }) {
  const [first, second, third] = data.participants;
  const rest = data.participants.slice(3, 10);
  const col = (p: Data["participants"][number] | undefined, place: number, h: string) => (
    <div className="flex flex-col items-center justify-end w-64">
      {p && (
        <>
          <p className="text-3xl font-bold text-center truncate max-w-full">{p.nickname}</p>
          <p className="font-mono text-xl text-white/60 mb-3">{p.score}</p>
        </>
      )}
      <div
        className="w-full rounded-t-lg grid place-items-start justify-center pt-4 text-6xl font-bold"
        style={{
          height: h,
          background: place === 1 ? "var(--accent)" : "rgba(255,255,255,0.12)",
          color: place === 1 ? "var(--bg)" : undefined,
        }}
      >
        {place}
      </div>
    </div>
  );
  return (
    <div className="h-full flex flex-col items-center justify-end pb-0">
      <h2 className="text-5xl font-bold mb-auto mt-10 inline-flex items-center gap-4">
        <Trophy className="w-10 h-10 text-[var(--accent)]" />
        Podyum
      </h2>
      {rest.length > 0 && (
        <p className="text-white/50 text-lg mb-6">
          {rest.map((p, i) => `${i + 4}. ${p.nickname} (${p.score})`).join(" · ")}
        </p>
      )}
      <div className="flex items-end gap-4">
        {col(second, 2, "32vh")}
        {col(first, 1, "44vh")}
        {col(third, 3, "22vh")}
      </div>
    </div>
  );
}
