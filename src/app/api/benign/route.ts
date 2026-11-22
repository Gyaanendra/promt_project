import { handle, HttpError, int, LIMITS, str } from "@/lib/api";
import { extractJson } from "@/lib/json";
import { generate } from "@/lib/llm";
import { benignGeneratorPrompt } from "@/lib/prompts";

export const maxDuration = 60;

// Generates harmless in-scope questions used to detect over-refusal after hardening.
export async function POST(req: Request) {
  return handle(req, async (body) => {
    const systemPrompt = str(body, "systemPrompt", LIMITS.systemPrompt);
    const count = int(body, "count", 1, 20, 8);

    const { system, user } = benignGeneratorPrompt({ systemPrompt, count });
    const text = await generate("strong", {
      system,
      messages: [{ role: "user", content: user }],
      maxTokens: 1500,
      temperature: 0.8,
      json: true,
    });

    let queries: string[] = [];
    try {
      const p = extractJson<{ queries?: unknown }>(text);
      if (Array.isArray(p.queries)) {
        queries = p.queries.filter((q): q is string => typeof q === "string" && q.trim().length > 0);
      }
    } catch {
      // handled below
    }
    if (queries.length === 0) throw new HttpError(502, "Could not generate benign test questions. Try again.");
    return { queries: queries.slice(0, count).map((q) => q.trim()) };
  });
}
