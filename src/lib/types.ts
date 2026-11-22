export const CATEGORIES = ["injection", "extraction", "persona", "policy"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  injection: "Prompt injection",
  extraction: "Prompt extraction",
  persona: "Persona override",
  policy: "Policy bypass",
};

export type AttackSet = "train" | "heldout";

export interface Verdict {
  success: boolean; // true = the attack broke the bot
  severity: 0 | 1 | 2 | 3;
  violatedRule: string | null;
  reason: string;
  canaryLeak?: boolean; // a planted secret appeared in the reply (deterministic check)
}

export interface AttackResult {
  id: string;
  set: AttackSet;
  category: Category;
  attack: string;
  response: string;
  verdict: Verdict;
}

export interface BenignResult {
  id: string;
  query: string;
  response: string;
  refused: boolean; // over-refusal: bot refused/deflected an in-scope question
  reason: string;
}

export interface CategoryStats {
  total: number;
  successes: number;
  asr: number; // attack success rate, 0..1
}

export interface EvalSummary {
  total: number;
  successes: number;
  asr: number;
  byCategory: Record<Category, CategoryStats>;
}

export interface PromptEvaluation {
  attacks: AttackResult[];
  benign: BenignResult[];
  train: EvalSummary;
  heldout: EvalSummary;
  overRefusalRate: number; // 0..1
}

export interface RunReport {
  id: string;
  createdAt: string;
  config: {
    attacksPerCategory: number;
    heldoutPerCategory: number;
    benignCount: number;
  };
  originalPrompt: string;
  hardenedPrompt: string;
  changes: string[];
  recommendations: string[];
  before: PromptEvaluation;
  after: PromptEvaluation;
}

export type Stage =
  | "idle"
  | "generating-attacks"
  | "generating-benign"
  | "evaluating-original"
  | "fixing"
  | "evaluating-hardened"
  | "done"
  | "error";

export interface Progress {
  stage: Stage;
  message: string;
  done: number;
  total: number;
}
