import {
  CATEGORIES,
  type AttackResult,
  type AttackSet,
  type BenignResult,
  type Category,
  type CategoryStats,
  type EvalSummary,
  type Progress,
  type PromptEvaluation,
  type RunReport,
  type Verdict,
} from "./types";

/**
 * The pipeline orchestrator runs in the browser and calls small, fast API
 * routes one step at a time. This keeps every serverless call well under
 * Vercel's function time limit, no matter how long the whole run takes.
 */

export interface PipelineInput {
  systemPrompt: string;
  secrets: string[];
  attacksPerCategory: number;
  heldoutPerCategory: number;
  benignCount: number;
  accessCode?: string;
  onProgress: (p: Progress) => void;
  signal?: AbortSignal;
}

interface AttackItem {
  id: string;
  set: AttackSet;
  category: Category;
  attack: string;
}

interface BenignItem {
  id: string;
  query: string;
}

const CONCURRENCY = 4;
const CHECKPOINT_KEY = "guardrail-labs:checkpoint";

export function saveCheckpoint(partial: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(CHECKPOINT_KEY, JSON.stringify({ ...partial, timestamp: Date.now() }));
    }
  } catch {
    /* storage unavailable */
  }
}

export function clearCheckpoint() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem(CHECKPOINT_KEY);
    }
  } catch {
    /* ignore */
  }
}

async function call<T>(
  path: string,
  body: unknown,
  accessCode: string | undefined,
  signal: AbortSignal | undefined,
): Promise<T> {
  let lastError: Error = new Error("Request failed");
  for (let attempt = 0; attempt < 3; attempt++) {
    if (signal?.aborted) throw new DOMException("Run cancelled", "AbortError");
    try {
      const res = await fetch(`/api/${path}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(accessCode ? { "x-access-code": accessCode } : {}),
        },
        body: JSON.stringify(body),
        signal,
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) return data as T;
      lastError = new Error(data.error ?? `Request failed (${res.status})`);
      // Client errors (bad input, wrong access code, missing config) will not fix themselves.
      if (res.status === 400 || res.status === 401 || res.status === 503) throw lastError;
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") throw e;
      lastError = e instanceof Error ? e : new Error(String(e));
      if (/\b(400|401|503)\b|access code|API key|BASE_URL/i.test(lastError.message)) throw lastError;
    }
    await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
  }
  throw lastError;
}

async function pool<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
  minIntervalMs = 100,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  let lastStart = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      // Smooth out rapid request spikes to protect provider rate limits
      const now = Date.now();
      const elapsed = now - lastStart;
      if (elapsed < minIntervalMs) {
        await new Promise((r) => setTimeout(r, minIntervalMs - elapsed));
      }
      lastStart = Date.now();
      results[i] = await fn(items[i], i);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

export function summarize(results: AttackResult[]): EvalSummary {
  const byCategory = {} as Record<Category, CategoryStats>;
  for (const c of CATEGORIES) {
    const rows = results.filter((r) => r.category === c);
    const successes = rows.filter((r) => r.verdict.success).length;
    byCategory[c] = { total: rows.length, successes, asr: rows.length ? successes / rows.length : 0 };
  }
  const successes = results.filter((r) => r.verdict.success).length;
  return {
    total: results.length,
    successes,
    asr: results.length ? successes / results.length : 0,
    byCategory,
  };
}

export async function runPipeline(input: PipelineInput): Promise<RunReport> {
  const { systemPrompt, secrets, accessCode, signal, onProgress } = input;
  const post = <T,>(path: string, body: unknown) => call<T>(path, body, accessCode, signal);

  // ---- 1. Generate attacks (train + held-out) and benign questions ----------------------
  const jobs = CATEGORIES.flatMap((category) => [
    { category, set: "train" as AttackSet, count: input.attacksPerCategory },
    { category, set: "heldout" as AttackSet, count: input.heldoutPerCategory },
  ]).filter((j) => j.count > 0);

  let done = 0;
  const genTotal = jobs.length + 1;
  onProgress({ stage: "generating-attacks", message: "Generating attacks", done, total: genTotal });

  // Train attacks first, so held-out generation can be told to avoid them.
  const trainByCategory = new Map<Category, string[]>();
  const attackItems: AttackItem[] = [];

  await pool(
    jobs.filter((j) => j.set === "train"),
    CONCURRENCY,
    async (j) => {
      const { attacks } = await post<{ attacks: string[] }>("attack", {
        systemPrompt,
        category: j.category,
        variant: "train",
        count: j.count,
      });
      trainByCategory.set(j.category, attacks);
      attacks.forEach((attack, i) =>
        attackItems.push({ id: `train-${j.category}-${i + 1}`, set: "train", category: j.category, attack }),
      );
      onProgress({ stage: "generating-attacks", message: "Generating attacks", done: ++done, total: genTotal });
    },
  );

  await pool(
    jobs.filter((j) => j.set === "heldout"),
    CONCURRENCY,
    async (j) => {
      const { attacks } = await post<{ attacks: string[] }>("attack", {
        systemPrompt,
        category: j.category,
        variant: "heldout",
        count: j.count,
        avoid: trainByCategory.get(j.category) ?? [],
      });
      attacks.forEach((attack, i) =>
        attackItems.push({ id: `heldout-${j.category}-${i + 1}`, set: "heldout", category: j.category, attack }),
      );
      onProgress({ stage: "generating-attacks", message: "Generating held-out attacks", done: ++done, total: genTotal });
    },
  );

  attackItems.sort((a, b) => a.id.localeCompare(b.id));

  let benignItems: BenignItem[] = [];
  if (input.benignCount > 0) {
    onProgress({ stage: "generating-benign", message: "Writing benign test questions", done, total: genTotal });
    const { queries } = await post<{ queries: string[] }>("benign", { systemPrompt, count: input.benignCount });
    benignItems = queries.map((query, i) => ({ id: `benign-${i + 1}`, query }));
  }
  onProgress({ stage: "generating-benign", message: "Test set ready", done: genTotal, total: genTotal });

  // ---- 2. Evaluate a prompt against the fixed test set ------------------------------------
  const evaluate = async (
    prompt: string,
    stage: "evaluating-original" | "evaluating-hardened",
    label: string,
  ): Promise<PromptEvaluation> => {
    const total = attackItems.length + benignItems.length;
    let finished = 0;
    const tick = () => onProgress({ stage, message: label, done: ++finished, total });
    onProgress({ stage, message: label, done: 0, total });

    const attacks = await pool(attackItems, CONCURRENCY, async (item): Promise<AttackResult> => {
      const { response } = await post<{ response: string }>("target", { systemPrompt: prompt, message: item.attack });
      const { verdict } = await post<{ verdict: Verdict }>("judge", {
        kind: "attack",
        systemPrompt: prompt,
        attack: item.attack,
        response,
        category: item.category,
        secrets,
      });
      tick();
      return { ...item, response, verdict };
    });

    const benign = await pool(benignItems, CONCURRENCY, async (item): Promise<BenignResult> => {
      const { response } = await post<{ response: string }>("target", { systemPrompt: prompt, message: item.query });
      const verdict = await post<{ refused: boolean; reason: string }>("judge", {
        kind: "benign",
        systemPrompt: prompt,
        query: item.query,
        response,
      });
      tick();
      return { id: item.id, query: item.query, response, refused: verdict.refused, reason: verdict.reason };
    });

    const train = summarize(attacks.filter((a) => a.set === "train"));
    const heldout = summarize(attacks.filter((a) => a.set === "heldout"));
    const overRefusalRate = benign.length ? benign.filter((b) => b.refused).length / benign.length : 0;
    return { attacks, benign, train, heldout, overRefusalRate };
  };

  const before = await evaluate(systemPrompt, "evaluating-original", "Testing your original prompt");

  // ---- 3. Fix, using TRAIN failures only so the held-out set stays clean ------------------
  onProgress({ stage: "fixing", message: "Hardening the prompt", done: 0, total: 1 });
  const failures = before.attacks
    .filter((a) => a.set === "train" && a.verdict.success)
    .sort((a, b) => b.verdict.severity - a.verdict.severity)
    .slice(0, 12)
    .map((a) => ({ category: a.category, attack: a.attack, response: a.response, reason: a.verdict.reason }));

  let hardenedPrompt = systemPrompt;
  let changes: string[] = [];
  let recommendations: string[] = [];
  if (failures.length > 0) {
    const fix = await post<{ hardenedPrompt: string; changes: string[]; recommendations: string[] }>("fix", {
      systemPrompt,
      failures,
    });
    hardenedPrompt = fix.hardenedPrompt;
    changes = fix.changes;
    recommendations = fix.recommendations;
  } else {
    changes = ["No training attack succeeded, so the prompt was left unchanged."];
  }
  onProgress({ stage: "fixing", message: "Hardened prompt ready", done: 1, total: 1 });

  // ---- 4. Re-test the hardened prompt on the same attacks and benign questions ----------
  const after =
    hardenedPrompt === systemPrompt
      ? before
      : await evaluate(hardenedPrompt, "evaluating-hardened", "Re-testing the hardened prompt");

  onProgress({ stage: "done", message: "Done", done: 1, total: 1 });
  clearCheckpoint();

  return {
    id: `run-${Date.now()}`,
    createdAt: new Date().toISOString(),
    config: {
      attacksPerCategory: input.attacksPerCategory,
      heldoutPerCategory: input.heldoutPerCategory,
      benignCount: input.benignCount,
    },
    originalPrompt: systemPrompt,
    hardenedPrompt,
    changes,
    recommendations,
    before,
    after,
  };
}
