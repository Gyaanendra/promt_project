/**
 * LLMs often wrap JSON in prose, code fences, or reasoning blocks (<think>...</think>).
 * Pull out the first balanced JSON object or array, repair minor syntax quirks (e.g. trailing commas),
 * and parse it safely.
 */
export function extractJson<T = unknown>(text: string): T {
  const stripped = text
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/```(?:json)?/gi, "")
    .trim();

  const starts = [stripped.indexOf("{"), stripped.indexOf("[")].filter((i) => i >= 0);
  if (starts.length === 0) throw new Error("No JSON found in model output");
  const start = Math.min(...starts);
  const open = stripped[start];
  const close = open === "{" ? "}" : "]";

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < stripped.length; i++) {
    const ch = stripped[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === open) depth++;
    else if (ch === close) {
      depth--;
      if (depth === 0) {
        let candidate = stripped.slice(start, i + 1);
        // Repair trailing commas before closing brackets/braces that LLMs occasionally output
        candidate = candidate.replace(/,\s*([}\]])/g, "$1");
        return JSON.parse(candidate) as T;
      }
    }
  }
  throw new Error("Unbalanced JSON in model output");
}
