import type { Issue, ProgramRules, Rule } from "../types";
import { GENERIC } from "../../rules/dictionaries";
import { findPii } from "../pii";
import { BODY_KEYS, lower } from "../text";

const PII_LABEL = { tckn: "olası TC kimlik numarası", telefon: "olası telefon numarası", eposta: "e-posta adresi" } as const;

export function languageRules(rules: ProgramRules): Rule[] {
  return [
    {
      id: "generic", sec: null, sev: "warn", title: "Genel, içi boş ifade yok", source: "İyi uygulama",
      run: (s) => {
        const issues: Issue[] = [];
        for (const key of BODY_KEYS) {
          const t = lower(s.text[key]);
          for (const [rx, hint] of GENERIC) {
            const m = t.match(rx);
            if (m && m.index !== undefined) issues.push({ sec: key, msg: `${rules.sections[key]}: “${s.text[key].substr(m.index, m[0].length)}”.`, hint });
          }
        }
        return { applies: true, issues };
      },
    },
    {
      id: "pii", sec: null, sev: "bad", title: "Metinde kişisel veri izi yok", source: "İyi uygulama · KVKK",
      run: (s) => {
        const issues: Issue[] = [];
        for (const key of BODY_KEYS) {
          for (const h of findPii(s.text[key])) issues.push({ sec: key, msg: `${rules.sections[key]}: ${PII_LABEL[h.kind]} (${h.masked}).`, hint: "Kişisel verileri başvuru metninden çıkar." });
        }
        return { applies: true, issues };
      },
    },
  ];
}
