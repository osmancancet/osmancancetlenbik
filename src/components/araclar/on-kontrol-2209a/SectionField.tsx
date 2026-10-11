"use client";

import { memo } from "react";
import type { Limit, TextKey } from "@/lib/araclar/on-kontrol-2209a/engine/types";
import { chars, words } from "@/lib/araclar/on-kontrol-2209a/engine/text";
import { hasDoi, refLines } from "@/lib/araclar/on-kontrol-2209a/engine/citations";
import s from "./OnKontrol.module.css";

interface Props {
  id: TextKey;
  label: string;
  rule: string;
  help?: string;
  limit?: Limit;
  value: string;
  tall?: boolean;
  onChange(key: TextKey, value: string): void;
}

type CountState = "bos" | "eksik" | "fazla" | "uygun" | "";

export const SectionField = memo(function SectionField({ id, label, rule, help, limit, value, tall, onChange }: Props) {
  const w = words(value), c = chars(value);
  let state: CountState = "";
  let shown = `${w} kelime · ${c} karakter`;
  let side = `${c} karakter`;
  let fill = 0;
  if (id === "kaynak") {
    const refs = refLines(value);
    shown = `${refs.length} kaynak · ${refs.filter(hasDoi).length} tanesinde DOI`;
  } else if (limit) {
    const n = limit.unit === "kelime" ? w : c;
    state = n === 0 ? "bos" : n < limit.min ? "eksik" : limit.max && n > limit.max ? "fazla" : "uygun";
    shown = limit.unit === "kelime" ? `${w} / ${limit.min}–${limit.max} kelime` : `${c} / en az ${limit.min} karakter`;
    side = limit.unit === "karakter" ? `${w} kelime` : `${c} karakter`;
    fill = Math.min(n / (limit.max || limit.min * 2), 1) * 100;
  }

  return (
    <div className={s.field} id={`f-${id}`}>
      <div className={s.fieldHead}>
        <label htmlFor={id}>{label}</label>
        <span className={s.rule}>{rule}</span>
      </div>
      {help && <p className={s.help}>{help}</p>}
      <textarea id={id} value={value} onChange={(e) => onChange(id, e.target.value)} className={tall ? s.tall : undefined} spellCheck lang="tr" />
      {limit && (
        <div className={s.lenbar} data-state={state} aria-hidden="true">
          <i style={{ width: `${fill}%` }} />
        </div>
      )}
      <div className={s.counter} data-state={state}>
        {id === "kaynak" ? <span>{shown}</span> : (<><span key={state} className={`mono ${state === "uygun" ? "bump" : ""}`}>{shown}</span><span>{side}</span></>)}
      </div>
    </div>
  );
});
