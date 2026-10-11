import type { Evaluation, Finding, ProgramRules, Severity, Summary } from "./types";

export const SEVERITY_LABEL: Record<Severity, string> = { bad: "Düzelt", warn: "Gözden geçir", tip: "İpucu" };

export function summarize(ev: Evaluation): Summary {
  const failing = (sev: "bad" | "warn") => ev.results.filter((r) => !r.pass && r.applies && r.rule.sev === sev);
  const findings: Finding[] = [];
  for (const sev of ["bad", "warn"] as const) {
    for (const r of failing(sev)) {
      for (const is of r.issues) findings.push({ sev, sec: is.sec ?? r.rule.sec, msg: is.msg, hint: is.hint, ruleId: r.rule.id });
    }
  }
  for (const t of ev.tips) if (t.msg) findings.push({ sev: "tip", sec: t.sec ?? null, msg: t.msg, hint: t.hint, ruleId: "tip" });
  const count = (sev: "bad" | "warn") => failing(sev).reduce((a, r) => a + r.issues.length, 0);
  return {
    passed: ev.score.passed,
    applicable: ev.score.applicable,
    bad: count("bad"),
    warn: count("warn"),
    tip: ev.tips.length,
    findings,
    passedTitles: ev.results.filter((r) => r.pass).map((r) => r.rule.title),
  };
}

/** Danışmana gönderilecek düz metin rapor. */
export function formatReport(ev: Evaluation, rules: ProgramRules): string {
  const s = summarize(ev);
  const lines = [`2209-A Ön Kontrol: ${s.passed}/${s.applicable} kural tamam`, ""];
  for (const sev of ["bad", "warn", "tip"] as const) {
    const group = s.findings.filter((f) => f.sev === sev);
    if (!group.length) continue;
    lines.push(`${SEVERITY_LABEL[sev]}:`);
    for (const f of group) lines.push(`- ${f.sec ? rules.sections[f.sec] + ": " : ""}${f.msg}`);
    lines.push("");
  }
  return lines.join("\n").trim();
}

export type ScoreBand = "0-6" | "7-12" | "13-17" | "18";
export const scoreBand = (passed: number): ScoreBand =>
  passed >= 18 ? "18" : passed >= 13 ? "13-17" : passed >= 7 ? "7-12" : "0-6";

export function reportFileName(date: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `2209-A Ön Kontrol Raporu ${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}.txt`;
}
