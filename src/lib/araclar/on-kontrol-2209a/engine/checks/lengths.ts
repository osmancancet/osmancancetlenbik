import type { ProgramRules, Rule, TextKey } from "../types";
import { chars, words } from "../text";

export function lengthRules(rules: ProgramRules): Rule[] {
  return (Object.entries(rules.limits) as [TextKey, NonNullable<ProgramRules["limits"][TextKey]>][]).map(([key, lim]) => {
    const name = rules.sections[key];
    return {
      id: "len-" + key,
      sec: key,
      sev: "bad",
      title: `${name}: ${lim.max ? `${lim.min}–${lim.max}` : `en az ${lim.min}`} ${lim.unit}`,
      source: "Bilgi notu",
      run: (s) => {
        const t = s.text[key];
        const n = lim.unit === "kelime" ? words(t) : chars(t);
        if (!t.trim()) return { applies: true, issues: [{ msg: `${name} boş.`, hint: "Bu bölüm zorunlu." }] };
        if (n < lim.min) return { applies: true, issues: [{ msg: `${name} ${n} ${lim.unit}; en az ${lim.min} olmalı.`, hint: `${lim.min - n} ${lim.unit} eksik. Somut bilgiyle genişlet, dolgu cümlesi ekleme.` }] };
        if (lim.max && n > lim.max) return { applies: true, issues: [{ msg: `${name} ${n} ${lim.unit}; en fazla ${lim.max} olmalı.`, hint: `${n - lim.max} ${lim.unit} fazla. Tekrarları ve genel ifadeleri çıkar.` }] };
        return { applies: true, issues: [] };
      },
    };
  });
}
