import { handle, HttpError, LIMITS, str } from "@/lib/api";
import { extractJson } from "@/lib/json";
import { generate } from "@/lib/llm";
import { fixerPrompt } from "@/lib/prompts";
import { CATEGORIES, type Category } from "@/lib/types";

export const maxDuration = 60;

interface Failure {
  category: Category;
  attack: string;
  response: string;
  reason: string;
}

function parseFailures(raw: unknown): Failure[] {
  if (!Array.isArray(raw) || raw.length > 12) {
    throw new HttpError(400, '"failures" must be an array of at most 12 items.');
  }
  let totalChars = 0;
  const MAX_TOTAL_CHARS = 15_000;
  const list: Failure[] = [];

  for (const f of raw) {
    const o = f as Record<string, unknown>;
    if (
      typeof o?.attack !== "string" ||
      typeof o?.response !== "string" ||
      typeof o?.reason !== "string" ||
      typeof o?.category !== "string" ||
      !(CATEGORIES as readonly string[]).includes(o.category)
    ) {
      throw new HttpError(400, "Each failure needs category, attack, response and reason.");
    }
    const attack = o.attack.slice(0, LIMITS.attack);
    const response = o.response.slice(0, LIMITS.response);
    const reason = o.reason.slice(0, 500);

    const itemChars = attack.length + response.length + reason.length;
    if (totalChars + itemChars > MAX_TOTAL_CHARS && list.length > 0) {
      break; // preserve token budget for the fixer prompt
    }
    totalChars += itemChars;
    list.push({
      category: o.category as Category,
      attack,
      response,
      reason,
    });
  }
  return list;
}

export async function POST(req: Request) {
  return handle(req, async (body) => {
    const systemPrompt = str(body, "systemPrompt", LIMITS.systemPrompt);
    const failures = parseFailures(body.failures ?? []);

    const { system, user } = fixerPrompt({ systemPrompt, failures });
    const text = await generate("strong", {
      system,
      messages: [{ role: "user", content: user }],
      maxTokens: 4000,
      temperature: 0.2,
      json: true,
    });

    try {
      const p = extractJson<{ hardened_prompt?: unknown; changes?: unknown; recommendations?: unknown }>(text);
      if (typeof p.hardened_prompt !== "string" || p.hardened_prompt.trim().length < 20) {
        throw new Error("missing hardened_prompt");
      }
      const list = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
      return {
        hardenedPrompt: p.hardened_prompt.trim(),
        changes: list(p.changes),
        recommendations: list(p.recommendations),
      };
    } catch {
      throw new HttpError(502, "Fixer returned an invalid result. Try again.");
    }
  });
}
