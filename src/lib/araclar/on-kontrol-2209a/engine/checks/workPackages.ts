import type { Issue, ProgramRules, Rule } from "../types";
import { FORBIDDEN, VAGUE } from "../../rules/dictionaries";
import { contributionSum, fmt, lower } from "../text";

const NA = { applies: false, issues: [] as Issue[] };

export const isVague = (crit: string): boolean => VAGUE.some((rx) => rx.test(lower(crit.trim())));

export function workPackageRules(rules: ProgramRules): Rule[] {
  const max = rules.maxMonths;
  const total = rules.contributionTotal;
  return [
    {
      id: "wp-any", sec: "takvim", sev: "bad", title: "Çalışma takviminde en az bir iş adımı", source: "Bilgi notu",
      run: (s) => ({ applies: true, issues: s.wp.length ? [] : [{ msg: "Çalışma takviminde iş adımı yok.", hint: "En az bir iş adımı eklenmeli." }] }),
    },
    {
      id: "wp-time", sec: "takvim", sev: "bad", title: `İş adımları 1–${max}. aylar arasında`, source: "Bilgi notu",
      run: (s) => {
        if (!s.wp.length) return NA;
        const issues: Issue[] = [];
        s.wp.forEach((w, i) => {
          const st = +w.start, e = +w.end;
          if (!st || !e) issues.push({ msg: `İA${i + 1}: başlangıç ya da bitiş ayı boş.`, hint: "Her iş adımına ay aralığı gir." });
          else if (e < st) issues.push({ msg: `İA${i + 1}: bitiş ayı (${e}) başlangıçtan (${st}) önce.`, hint: "Ay aralığını düzelt." });
          else if (st < 1 || e > max) issues.push({ msg: `İA${i + 1}: ${st}–${e}. aylar; proje süresi en fazla ${max} ay.`, hint: `İş adımını ${max} aya sığdır.` });
        });
        return { applies: true, issues };
      },
    },
    {
      id: "wp-sum", sec: "takvim", sev: "bad", title: `Başarı ölçütü katkıları toplamı ${total}`, source: "Bilgi notu",
      run: (s) => {
        if (!s.wp.length) return NA;
        const sum = contributionSum(s);
        return { applies: true, issues: Math.abs(sum - total) < 0.01 ? [] : [{ msg: `Katkı değerlerinin toplamı ${fmt(sum)}; ${total} olmalı.`, hint: "Her iş adımının projenin başarısına katkısını yeniden dağıt." }] };
      },
    },
    {
      id: "wp-forbidden", sec: "takvim", sev: "bad", title: "Ayrı iş adımı olmaması gereken işler yok", source: "Bilgi notu · sezgisel tespit",
      run: (s) => {
        if (!s.wp.length) return NA;
        const issues: Issue[] = [];
        s.wp.forEach((w, i) => {
          const hit = FORBIDDEN.find(([rx]) => rx.test(lower(w.name)));
          if (hit) issues.push({ msg: `İA${i + 1} “${w.name}”: ${hit[1]} ayrı iş adımı olarak gösterilmez.`, hint: "Bilgi notu bu işi ayrı iş adımı saymıyor. Çıktı üreten bir işle birleştir ya da çıkar." });
        });
        return { applies: true, issues };
      },
    },
    {
      id: "wp-crit", sec: "takvim", sev: "bad", title: "Her iş adımının başarı ölçütü var", source: "Bilgi notu",
      run: (s) => {
        if (!s.wp.length) return NA;
        const issues: Issue[] = [];
        s.wp.forEach((w, i) => { if (!w.crit.trim()) issues.push({ msg: `İA${i + 1} için başarı ölçütü yazılmamış.`, hint: "Bu adımın bittiğini neyle kanıtlayacağını yaz." }); });
        return { applies: true, issues };
      },
    },
    {
      id: "wp-vague", sec: "takvim", sev: "warn", title: "Başarı ölçütleri ölçülebilir", source: "Bilgi notu · sezgisel tespit",
      run: (s) => {
        if (!s.wp.some((w) => w.crit.trim())) return NA;
        const issues: Issue[] = [];
        s.wp.forEach((w, i) => {
          if (w.crit.trim() && isVague(w.crit)) issues.push({ msg: `İA${i + 1} başarı ölçütü ölçülebilir değil: “${w.crit.trim()}”.`, hint: "Örnek: “120 katılımcıdan eksiksiz veri” ya da “modelin test setinde F1 ≥ 0,80”." });
        });
        return { applies: true, issues };
      },
    },
  ];
}
