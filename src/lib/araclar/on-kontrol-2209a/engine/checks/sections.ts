import type { Rule, ProgramRules, TextKey } from "../types";

const FILL_KEYS: readonly TextKey[] = ["risk", "olanak", "etki"];

export function sectionRules(rules: ProgramRules): Rule[] {
  return FILL_KEYS.map((key) => ({
    id: "fill-" + key,
    sec: key,
    sev: "warn",
    title: `${rules.sections[key]} dolu`,
    source: "Bilgi notu",
    run: (s) => ({ applies: true, issues: s.text[key].trim() ? [] : [{ msg: `${rules.sections[key]} boş.`, hint: "Bu bölüm değerlendirmede puanlanıyor; boş bırakma." }] }),
  }));
}
