import { handle, HttpError, int, LIMITS, oneOf, str, strList } from "@/lib/api";
import { maxAttacksPerCall } from "@/lib/config";
import { extractJson } from "@/lib/json";
import { generate } from "@/lib/llm";
import { attackerPrompt } from "@/lib/prompts";
import { CATEGORIES } from "@/lib/types";

export const maxDuration = 60;

export async function POST(req: Request) {
  return handle(req, async (body) => {
    const systemPrompt = str(body, "systemPrompt", LIMITS.systemPrompt);
    const category = oneOf(body, "category", CATEGORIES);
    const variant = oneOf(body, "variant", ["train", "heldout"] as const);
    const count = int(body, "count", 1, maxAttacksPerCall(), 5);
    const avoid = strList(body, "avoid", 40, LIMITS.attack);

    const { system, user } = attackerPrompt({ systemPrompt, category, count, variant, avoid });
    const text = await generate("strong", {
      system,
      messages: [{ role: "user", content: user }],
      maxTokens: 2500,
      temperature: 1,
      json: true,
    });

    let attacks: string[] = [];
    try {
      const parsed = extractJson<{ attacks?: unknown }>(text);
      if (Array.isArray(parsed.attacks)) {
        attacks = parsed.attacks.filter((a): a is string => typeof a === "string" && a.trim().length > 0);
      }
    } catch {
      // fall through to the error below
    }
    if (attacks.length === 0) {
      throw new HttpError(502, "Attacker model returned no usable attacks. Try again.");
    }
    return { attacks: attacks.slice(0, count).map((a) => a.trim()) };
  });
}
