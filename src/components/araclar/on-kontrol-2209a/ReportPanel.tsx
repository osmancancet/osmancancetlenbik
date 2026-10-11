"use client";

import type { Finding, SectionKey, Summary } from "@/lib/araclar/on-kontrol-2209a/engine/types";
import type { Evaluation } from "@/lib/araclar/on-kontrol-2209a/engine/types";
import { useCountUp } from "./hooks/useCountUp";
import { FindingCard } from "./FindingCard";
import s from "./OnKontrol.module.css";

const R = 31;
const CIRC = 2 * Math.PI * R;

interface Props {
  summary: Summary;
  evaluation: Evaluation;
  sections: Record<SectionKey, string>;
  actions: React.ReactNode;
  onOpen(f: Finding): void;
}

export function ReportPanel({ summary, evaluation, sections, actions, onOpen }: Props) {
  const { passed, applicable, bad, warn, tip, findings } = summary;
  const shown = useCountUp(passed);
  const ratio = applicable ? passed / applicable : 0;
  const pctShown = applicable ? Math.round((shown / applicable) * 100) : 0;
  const tone = bad ? "bad" : warn ? "warn" : "ok";

  // Aynı mesaj iki kez çıkarsa anahtar çakışmasın.
  const seen = new Map<string, number>();
  const keyed = findings.map((f) => {
    const k = `${f.sev}|${f.msg}`;
    const n = seen.get(k) ?? 0;
    seen.set(k, n + 1);
    return { f, key: `${k}|${n}` };
  });

  return (
    <aside className={s.side} aria-label="Kontrol listesi">
      <div className={`${s.card} ${s.score}`}>
        <span className="eyebrow">Kontrol listesi</span>
        <div className={s.scoreTop}>
          <svg className={s.ring} data-tone={tone} viewBox="0 0 76 76" aria-hidden="true">
            <circle className={s.ringBg} cx="38" cy="38" r={R} />
            <circle className={s.ringFg} cx="38" cy="38" r={R} strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - ratio)} />
            <text x="38" y="43" textAnchor="middle">{pctShown}%</text>
          </svg>
          <div className={s.scoreLine}>
            <span className={s.scoreBig} data-testid="score">{shown}/{applicable}</span>
            <span className={s.scoreOf}>kural tamam</span>
          </div>
        </div>
        <div className={s.meter}>
          {evaluation.results.filter((r) => r.applies).map((r, i) => (
            <i key={r.rule.id} style={{ ["--i" as string]: i }} className={r.pass ? s.okCell : r.rule.sev === "bad" ? s.badCell : s.warnCell} title={r.rule.title} />
          ))}
        </div>
        <div className={s.pills}>
          {bad > 0 && <span className={`${s.pill} ${s.bad}`}>{bad} düzelt</span>}
          {warn > 0 && <span className={`${s.pill} ${s.warn}`}>{warn} gözden geçir</span>}
          {tip > 0 && <span className={`${s.pill} ${s.tip}`}>{tip} ipucu</span>}
          {!bad && !warn && <span className={`${s.pill} ${s.okp}`}>Kurallara uygun</span>}
        </div>
        {actions}
      </div>
      <div className={s.findings} aria-live="polite">
        {keyed.length
          ? keyed.map(({ f, key }, i) => <FindingCard key={key} f={f} index={i} sections={sections} onOpen={onOpen} />)
          : <div className={s.emptyOk}>Bilgi notundaki kuralların hepsi tamam görünüyor. Son kontrol için TYBS önizlemesine bak.</div>}
      </div>
      <details className={`${s.card} ${s.passed}`}>
        <summary>Tamam olan kurallar ({passed})</summary>
        <ul>{summary.passedTitles.length ? summary.passedTitles.map((t) => <li key={t}>{t}</li>) : <li>Henüz yok</li>}</ul>
      </details>
    </aside>
  );
}
