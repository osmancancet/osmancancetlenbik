"use client";

import type { Finding, SectionKey } from "@/lib/araclar/on-kontrol-2209a/engine/types";
import { SEVERITY_LABEL } from "@/lib/araclar/on-kontrol-2209a/engine/report";
import s from "./OnKontrol.module.css";

interface Props {
  f: Finding;
  index: number;
  sections: Record<SectionKey, string>;
  onOpen(f: Finding): void;
}

export function FindingCard({ f, index, sections, onOpen }: Props) {
  return (
    <button type="button" className={`${s.finding} ${s[f.sev]}`} style={{ ["--i" as string]: Math.min(index, 8) }} onClick={() => onOpen(f)} data-rule={f.ruleId}>
      <span className={s.where}>{SEVERITY_LABEL[f.sev]}{f.sec ? ` · ${sections[f.sec]}` : ""}</span>
      <span>{f.msg}</span>
      {f.hint && <span className={s.hint}>{f.hint}</span>}
    </button>
  );
}
