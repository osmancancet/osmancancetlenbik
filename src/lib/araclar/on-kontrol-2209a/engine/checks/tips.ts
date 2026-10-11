import type { DraftState, Issue, ProgramRules, TextKey } from "../types";
import { B_PLAN, METHOD_WORDS } from "../../rules/dictionaries";
import { chars, hasNum, lower } from "../text";
import { isVague } from "./workPackages";

const NEAR_KEYS: readonly TextKey[] = ["bilimsel", "amac", "yontem"];

export function tips(s: DraftState, rules: ProgramRules): Issue[] {
  const T: Issue[] = [];
  const name = rules.sections;
  for (const key of NEAR_KEYS) {
    const min = rules.limits[key]?.min ?? 0;
    const n = chars(s.text[key]);
    if (n >= min && n < min + rules.nearLimitMargin) T.push({ sec: key, msg: `${name[key]} ${n} karakter; alt sınıra çok yakın.`, hint: "TYBS sayımı farklı olabilir; biraz pay bırak." });
  }
  if (s.text.amac.trim() && !hasNum(s.text.amac)) T.push({ sec: "amac", msg: "Hedeflerde sayı, oran ya da süre yok.", hint: "Bilgi notu hedeflerin ölçülebilir olmasını istiyor." });
  if (s.text.yontem.trim() && !METHOD_WORDS.test(lower(s.text.yontem))) T.push({ sec: "yontem", msg: "Yöntemde tasarım, değişken ya da analiz ifadesi bulunamadı.", hint: "Araştırma tasarımını, değişkenleri ve istatistiksel yöntemi yaz." });
  if (s.text.risk.trim() && !B_PLAN.test(lower(s.text.risk))) T.push({ sec: "risk", msg: "Risk yönetiminde B planı ifadesi geçmiyor.", hint: "Her önemli risk için bir B planı yaz; B planı temel hedeflerden saptırmamalı." });
  s.wp.forEach((w, i) => {
    const crit = w.crit.trim();
    if (crit && !hasNum(crit) && !isVague(crit)) T.push({ sec: "takvim", msg: `İA${i + 1} başarı ölçütünde sayısal bir eşik yok: “${crit}”.`, hint: "Mümkünse sayı, oran ya da somut bir çıktı ekle." });
  });
  return T;
}
