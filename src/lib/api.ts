import { timingSafeEqual } from "node:crypto";
import { ConfigError } from "./config.ts";
import { LLMError } from "./llm.ts";

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type Body = Record<string, unknown>;

function checkAccess(req: Request) {
  const code = process.env.APP_ACCESS_CODE?.trim();
  if (!code) return; // access code not configured: open (fine for local dev)
  const got = req.headers.get("x-access-code") ?? "";
  const a = Buffer.from(got);
  const b = Buffer.from(code);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw new HttpError(401, "Invalid or missing access code.");
  }
}

/** Shared wrapper: access check, JSON body parsing, uniform error responses. */
export async function handle(req: Request, fn: (body: Body) => Promise<unknown>): Promise<Response> {
  try {
    checkAccess(req);
    let body: Body;
    try {
      body = (await req.json()) as Body;
    } catch {
      throw new HttpError(400, "Request body must be valid JSON.");
    }
    return Response.json(await fn(body));
  } catch (e) {
    if (e instanceof HttpError) return Response.json({ error: e.message }, { status: e.status });
    if (e instanceof ConfigError) return Response.json({ error: e.message }, { status: 503 });
    if (e instanceof LLMError) return Response.json({ error: e.message }, { status: e.status });
    console.error(e);
    return Response.json({ error: "Unexpected server error." }, { status: 500 });
  }
}

export function str(body: Body, key: string, max: number, required = true): string {
  const v = body[key];
  if (v === undefined || v === null || v === "") {
    if (required) throw new HttpError(400, `"${key}" is required.`);
    return "";
  }
  if (typeof v !== "string") throw new HttpError(400, `"${key}" must be a string.`);
  if (v.length > max) throw new HttpError(400, `"${key}" is too long (max ${max} characters).`);
  return v;
}

export function int(body: Body, key: string, min: number, max: number, fallback: number): number {
  const v = body[key];
  if (v === undefined) return fallback;
  if (typeof v !== "number" || !Number.isInteger(v) || v < min || v > max) {
    throw new HttpError(400, `"${key}" must be an integer between ${min} and ${max}.`);
  }
  return v;
}

export function strList(body: Body, key: string, maxItems: number, maxLen: number): string[] {
  const v = body[key];
  if (v === undefined) return [];
  if (!Array.isArray(v) || v.length > maxItems || v.some((x) => typeof x !== "string" || x.length > maxLen)) {
    throw new HttpError(400, `"${key}" must be an array of at most ${maxItems} strings (max ${maxLen} chars each).`);
  }
  return v as string[];
}

export function oneOf<T extends string>(body: Body, key: string, allowed: readonly T[]): T {
  const v = body[key];
  if (typeof v !== "string" || !(allowed as readonly string[]).includes(v)) {
    throw new HttpError(400, `"${key}" must be one of: ${allowed.join(", ")}.`);
  }
  return v as T;
}

export const LIMITS = {
  systemPrompt: 8000,
  attack: 3000,
  response: 6000,
};
