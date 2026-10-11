export type Severity = "bad" | "warn" | "tip";
export type SectionKey =
  | "ozet" | "bilimsel" | "amac" | "yontem" | "takvim"
  | "risk" | "olanak" | "etki" | "kaynak";
export type TextKey = Exclude<SectionKey, "takvim">;

export interface WorkPackage {
  name: string;
  start: number | "";
  end: number | "";
  crit: string;
  pct: number | "";
}

export interface DraftState {
  text: Record<TextKey, string>;
  wp: WorkPackage[];
}

export interface Issue {
  msg: string;
  hint?: string;
  sec?: SectionKey;
}

export interface RuleResult {
  applies: boolean;
  issues: Issue[];
}

export interface Limit {
  unit: "kelime" | "karakter";
  min: number;
  max?: number;
}

export interface ProgramRules {
  program: "2209a";
  version: "2026";
  verifiedOn: string;
  deadline: string;
  callOpened: string;
  sources: { name: string; url: string }[];
  sections: Record<SectionKey, string>;
  limits: Partial<Record<TextKey, Limit>>;
  maxMonths: number;
  contributionTotal: number;
  nearLimitMargin: number;
}

export interface Rule {
  id: string;
  sec: SectionKey | null;
  sev: Exclude<Severity, "tip">;
  title: string;
  source?: string;
  run(state: DraftState, rules: ProgramRules): RuleResult;
}

export interface RuleOutcome {
  rule: Rule;
  pass: boolean;
  applies: boolean;
  issues: Issue[];
}

export interface Evaluation {
  results: RuleOutcome[];
  tips: Issue[];
  score: { passed: number; applicable: number };
}

export interface Finding {
  sev: Severity;
  sec: SectionKey | null;
  msg: string;
  hint?: string;
  ruleId: string;
}

export interface Summary {
  passed: number;
  applicable: number;
  bad: number;
  warn: number;
  tip: number;
  findings: Finding[];
  passedTitles: string[];
}
