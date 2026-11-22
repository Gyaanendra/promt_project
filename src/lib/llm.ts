import { getModelConfig, type ModelConfig, type Role } from "./config";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface GenerateOptions {
  system?: string;
  messages: ChatMessage[];
  maxTokens?: number;
  temperature?: number;
  /** Ask the provider for JSON output where it supports it. */
  json?: boolean;
}

export class LLMError extends Error {
  constructor(
    message: string,
    public status = 502,
  ) {
    super(message);
  }
}

const REQUEST_TIMEOUT_MS = 25_000;
const RETRY_STATUS = new Set([429, 500, 502, 503, 504, 529]);

async function post(url: string, headers: Record<string, string>, body: unknown): Promise<unknown> {
  let lastError: LLMError | undefined;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json", ...headers },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (res.ok) return await res.json();

      const text = (await res.text()).slice(0, 300);
      lastError = new LLMError(`Model API returned ${res.status}: ${text}`, res.status >= 500 ? 502 : res.status);
      if (!RETRY_STATUS.has(res.status)) throw lastError;

      const retryAfter = res.headers.get("retry-after");
      const retryMs = retryAfter && !isNaN(Number(retryAfter))
        ? Math.min(Number(retryAfter) * 1000, 10_000)
        : 600 * 2 ** attempt + Math.floor(Math.random() * 200);
      await new Promise((r) => setTimeout(r, retryMs));
    } catch (e) {
      if (e instanceof LLMError && !RETRY_STATUS.has(e.status)) throw e;
      if (!(e instanceof LLMError)) {
        const msg = e instanceof Error ? e.message : String(e);
        lastError = new LLMError(`Model API request failed: ${msg}`, 504);
      }
      if (attempt < 2) {
        await new Promise((r) => setTimeout(r, 600 * 2 ** attempt + Math.floor(Math.random() * 200)));
      }
    }
  }
  throw lastError ?? new LLMError("Model API request failed");
}

async function callAnthropic(c: ModelConfig, o: GenerateOptions): Promise<string> {
  const data = (await post(
    "https://api.anthropic.com/v1/messages",
    { "x-api-key": c.apiKey, "anthropic-version": "2023-06-01" },
    {
      model: c.model,
      max_tokens: o.maxTokens ?? 1500,
      ...(o.system ? { system: o.system } : {}),
      ...(o.temperature !== undefined ? { temperature: o.temperature } : {}),
      messages: o.messages,
    },
  )) as { content?: { type: string; text?: string }[] };
  return (data.content ?? [])
    .filter((b) => b.type === "text")
    .map((b) => b.text ?? "")
    .join("");
}

async function callGemini(c: ModelConfig, o: GenerateOptions): Promise<string> {
  const data = (await post(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(c.model)}:generateContent`,
    { "x-goog-api-key": c.apiKey },
    {
      ...(o.system ? { systemInstruction: { parts: [{ text: o.system }] } } : {}),
      contents: o.messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: o.maxTokens ?? 1500,
        ...(o.temperature !== undefined ? { temperature: o.temperature } : {}),
        ...(o.json ? { responseMimeType: "application/json" } : {}),
      },
    },
  )) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
  return (data.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? "").join("");
}

async function callOpenAICompatible(c: ModelConfig, o: GenerateOptions): Promise<string> {
  const data = (await post(
    `${c.baseUrl}/chat/completions`,
    { authorization: `Bearer ${c.apiKey}` },
    {
      model: c.model,
      max_tokens: o.maxTokens ?? 1500,
      ...(o.temperature !== undefined ? { temperature: o.temperature } : {}),
      ...(o.json ? { response_format: { type: "json_object" } } : {}),
      messages: [...(o.system ? [{ role: "system", content: o.system }] : []), ...o.messages],
    },
  )) as { choices?: { message?: { content?: string | null } }[] };
  return data.choices?.[0]?.message?.content ?? "";
}

/** Single entry point for every model call in the app. */
export async function generate(role: Role, options: GenerateOptions): Promise<string> {
  const config = getModelConfig(role);
  switch (config.provider) {
    case "anthropic":
      return callAnthropic(config, options);
    case "gemini":
      return callGemini(config, options);
    case "openai-compatible":
      return callOpenAICompatible(config, options);
  }
}
