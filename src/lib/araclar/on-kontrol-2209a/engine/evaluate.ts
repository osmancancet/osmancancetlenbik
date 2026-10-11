import type { DraftState, Evaluation, ProgramRules, Rule } from "./types";
import { lengthRules } from "./checks/lengths";
import { workPackageRules } from "./checks/workPackages";
import { sectionRules } from "./checks/sections";
import { referenceRules } from "./checks/references";
import { languageRules } from "./checks/language";
import { tips } from "./checks/tips";

const cache = new WeakMap<ProgramRules, Rule[]>();

/** Kural sırası rapordaki sırayı belirler; v1 ile aynıdır. */
export function buildRules(rules: ProgramRules): Rule[] {
  let r = cache.get(rules);
  if (!r) {
    r = [...lengthRules(rules), ...workPackageRules(rules), ...sectionRules(rules), ...referenceRules(), ...languageRules(rules)];
    cache.set(rules, r);
  }
  return r;
}

/** Saf ve deterministik: aynı girdi her zaman aynı çıktıyı verir. */
export function evaluate(state: DraftState, rules: ProgramRules): Evaluation {
  const results = buildRules(rules).map((rule) => {
    const out = rule.run(state, rules);
    const applies = out.applies !== false;
    return { rule, applies, pass: applies && out.issues.length === 0, issues: out.issues };
  });
  const applicable = results.filter((r) => r.applies);
  return {
    results,
    tips: tips(state, rules),
    score: { passed: applicable.filter((r) => r.pass).length, applicable: applicable.length },
  };
}
