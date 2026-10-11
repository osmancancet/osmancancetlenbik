"use client";

import type { WorkPackage } from "@/lib/araclar/on-kontrol-2209a/engine/types";
import { fmt } from "@/lib/araclar/on-kontrol-2209a/engine/text";
import s from "./OnKontrol.module.css";

interface Props {
  wp: WorkPackage[];
  newRow: number | null;
  total: number;
  sum: number;
  onChange(i: number, field: keyof WorkPackage, value: string): void;
  onAdd(): void;
  onDelete(i: number): void;
}

const COLS: { f: keyof WorkPackage; label: string; type: "text" | "number"; min?: number; max?: number }[] = [
  { f: "name", label: "iş adımı", type: "text" },
  { f: "start", label: "başlangıç ayı", type: "number", min: 1, max: 12 },
  { f: "end", label: "bitiş ayı", type: "number", min: 1, max: 12 },
  { f: "crit", label: "başarı ölçütü", type: "text" },
  { f: "pct", label: "katkı yüzdesi", type: "number", min: 0, max: 100 },
];

export function WorkPackageTable({ wp, newRow, total, sum, onChange, onAdd, onDelete }: Props) {
  const ok = Math.abs(sum - total) < 0.01;
  return (
    <>
      <div className={s.tableScroll}>
        <table className={s.wp}>
          <thead>
            <tr><th>#</th><th>İş adımı</th><th>Başl. ayı</th><th>Bitiş ayı</th><th>Başarı ölçütü</th><th>Katkı %</th><th><span className={s.srOnly}>Sil</span></th></tr>
          </thead>
          <tbody>
            {wp.map((w, i) => (
              <tr key={i} className={i === newRow ? s.rowNew : undefined}>
                <td className={s.n}>İA{i + 1}</td>
                {COLS.map((c) => (
                  <td key={c.f}>
                    <input
                      id={`wp-${c.f}-${i}`}
                      type={c.type}
                      inputMode={c.type === "number" ? "decimal" : undefined}
                      min={c.min}
                      max={c.max}
                      aria-label={`İA${i + 1} ${c.label}`}
                      value={w[c.f] ?? ""}
                      autoFocus={i === newRow && c.f === "name"}
                      onChange={(e) => onChange(i, c.f, e.target.value)}
                    />
                  </td>
                ))}
                <td><button type="button" className={s.ghost} onClick={() => onDelete(i)} aria-label={`İA${i + 1} sil`}>Sil</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={s.wpActions}>
        <button type="button" onClick={onAdd}>İş adımı ekle</button>
        <span className={s.sum} data-bad={ok ? "0" : "1"} data-testid="wp-sum">
          Katkı toplamı <span key={ok ? "ok" : "bad"} className="mono bump">{fmt(sum)} / {total}</span>
        </span>
      </div>
    </>
  );
}
