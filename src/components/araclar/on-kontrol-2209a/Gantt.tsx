"use client";

import type { WorkPackage } from "@/lib/araclar/on-kontrol-2209a/engine/types";
import s from "./OnKontrol.module.css";

export function Gantt({ wp, months }: { wp: WorkPackage[]; months: number }) {
  const cols = Array.from({ length: months }, (_, m) => m + 1);
  return (
    <>
      <div className={s.ganttWrap}>
        <div className={s.gantt} style={{ gridTemplateColumns: `34px repeat(${months}, minmax(0, 1fr))` }} role="img" aria-label={`Çalışma takvimi, ${months} ay`}>
          <span />
          {cols.map((m) => <span key={m} className={s.m}>{m}</span>)}
          {wp.map((w, i) => {
            const st = +w.start, e = +w.end;
            const row = i + 2;
            const bad = e < st || st < 1 || e > months;
            const from = Math.min(Math.max(Math.min(st, e), 1), months), to = Math.min(Math.max(st, e), months);
            return [
              <span key={`l${i}`} className={s.rl} style={{ gridRow: row, gridColumn: 1 }}>İA{i + 1}</span>,
              ...cols.map((m) => <span key={`c${i}-${m}`} className={s.cell} style={{ gridRow: row, gridColumn: m + 1 }} />),
              st && e ? (
                <span
                  key={`b${i}-${from}-${to}-${bad}`}
                  className={`${s.ganttBar} ${bad ? s.badbar : ""}`}
                  style={{ gridRow: row, gridColumn: `${from + 1} / ${to + 2}`, ["--i" as string]: i }}
                  title={`İA${i + 1}: ${st}–${e}. ay`}
                />
              ) : null,
            ];
          })}
        </div>
      </div>
      <span className={s.legend}>Izgara {months} aylık proje süresini gösterir; kırmızı çubuk süreyi aşan ya da hatalı aralığı işaret eder.</span>
    </>
  );
}
