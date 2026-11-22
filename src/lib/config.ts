export type Provider = "anthropic" | "gemini" | "openai-compatible";
export type Role = "strong" | "target";

export interface ModelConfig {
  provider: Provider;
  model: string;
  apiKey: string;
  baseUrl?: string;
}

export class ConfigError extends Error {}

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

function parseProvider(value: string | undefined, fallback: Provider): Provider {
  const v = (value ?? fallback).toLowerCase();
  if (v === "anthropic" || v === "gemini" || v === "openai-compatible") return v;
  throw new ConfigError(
    `Unknown provider "${value}". Use anthropic, gemini or openai-compatible.`,
  );
}

const DEFAULT_MODELS: Record<Provider, string> = {
  anthropic: "claude-sonnet-5-5",
  gemini: "gemini-2.5-flash",
  "openai-compatible": "llama-3.1-8b-instant",
};

const PROVIDER_KEY_ENV: Record<Provider, string> = {
  anthropic: "ANTHROPIC_API_KEY",
  gemini: "GEMINI_API_KEY",
  "openai-compatible": "",
};

function build(prefix: "STRONG" | "TARGET", fallbackProvider: Provider): ModelConfig {
  const provider = parseProvider(env(`${prefix}_PROVIDER`), fallbackProvider);
  const model = env(`${prefix}_MODEL`) ?? DEFAULT_MODELS[provider];

  const keyNames = [`${prefix}_API_KEY`, PROVIDER_KEY_ENV[provider]].filter(Boolean);
  const apiKey = keyNames.map(env).find(Boolean);
  if (!apiKey) {
    throw new ConfigError(
      `Missing API key for the ${prefix.toLowerCase()} model. Set ${keyNames.join(" or ")} in your environment variables.`,
    );
  }

  let baseUrl: string | undefined;
  if (provider === "openai-compatible") {
    baseUrl = env(`${prefix}_BASE_URL`);
    if (!baseUrl) {
      throw new ConfigError(
        `Missing ${prefix}_BASE_URL (for example https://api.groq.com/openai/v1).`,
      );
    }
    baseUrl = baseUrl.replace(/\/+$/, "");
  }

  return { provider, model, apiKey, baseUrl };
}

export function getModelConfig(role: Role): ModelConfig {
  return role === "strong" ? build("STRONG", "anthropic") : build("TARGET", "openai-compatible");
}

/** Safe summary for the health endpoint: never includes key values. */
export function describeConfig() {
  const out: Record<string, { configured: boolean; provider?: string; model?: string; error?: string }> = {};
  for (const role of ["strong", "target"] as const) {
    try {
      const c = getModelConfig(role);
      out[role] = { configured: true, provider: c.provider, model: c.model };
    } catch (e) {
      out[role] = { configured: false, error: e instanceof Error ? e.message : String(e) };
    }
  }
  return out;
}

export function maxAttacksPerCall(): number {
  const n = Number(env("MAX_ATTACKS_PER_CALL") ?? 10);
  return Number.isFinite(n) && n > 0 ? Math.min(Math.floor(n), 20) : 10;
}
