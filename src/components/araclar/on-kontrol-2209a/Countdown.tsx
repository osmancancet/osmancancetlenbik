"use client";

import { useEffect, useState } from "react";
import s from "./Window.module.css";

interface Props { deadline: string; opened: string }
interface Left { d: number; h: number; m: number; pct: number; done: boolean }

function compute(deadline: number, opened: number): Left {
  const now = Date.now();
  const ms = deadline - now;
  const pct = Math.max(0, Math.min(1, (now - opened) / (deadline - opened))) * 100;
  if (ms <= 0) return { d: 0, h: 0, m: 0, pct: 100, done: true };
  return { d: Math.floor(ms / 86400000), h: Math.floor((ms % 86400000) / 3600000), m: Math.floor((ms % 3600000) / 60000), pct, done: false };
}

function Unit({ v, label }: { v: number | null; label: string }) {
  return (
    <div className={s.cdUnit}>
      <strong key={v ?? "x"} className={v === null ? undefined : "bump"}>{v ?? "—"}</strong>
      <span>{label}</span>
    </div>
  );
}

/** Kalan süre yalnızca istemcide hesaplanır; sunucu HTML'i saat içermez. */
export function Countdown({ deadline, opened }: Props) {
  const [left, setLeft] = useState<Left | null>(null);

  useEffect(() => {
    const dl = new Date(deadline).getTime(), op = new Date(opened).getTime();
    const tick = () => setLeft(compute(dl, op));
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, [deadline, opened]);

  return (
    <>
      <div className={s.countdown}>
        {left?.done ? <span className={s.cdDone}>Süre doldu</span> : (
          <>
            <Unit v={left ? left.d : null} label="gün" />
            <Unit v={left ? left.h : null} label="saat" />
            <Unit v={left ? left.m : null} label="dakika" />
          </>
        )}
      </div>
      <div className={s.track}>
        <div className={s.trackBar} role="progressbar" aria-label="Başvuru süresinin geçen kısmı" aria-valuemin={0} aria-valuemax={100} aria-valuenow={left ? Math.round(left.pct) : undefined}>
          <span className={s.trackFill} style={{ width: `${left?.pct ?? 0}%` }} />
        </div>
        <div className={s.trackLabels}><span>7 Eki · çağrı açıldı</span><span>11 Kas · son gün</span></div>
      </div>
    </>
  );
}
