import { handle, LIMITS, str } from "@/lib/api";
import { generate } from "@/lib/llm";
import { targetSystem } from "@/lib/prompts";

export const maxDuration = 60;

// Runs ONE user message against the bot defined by `systemPrompt`.
export async function POST(req: Request) {
  return handle(req, async (body) => {
    const systemPrompt = str(body, "systemPrompt", LIMITS.systemPrompt);
    const message = str(body, "message", LIMITS.attack);

    const response = await generate("target", {
      system: targetSystem(systemPrompt),
      messages: [{ role: "user", content: message }],
      maxTokens: 700,
      temperature: 0.3,
    });
    return { response: response.trim() };
  });
}
