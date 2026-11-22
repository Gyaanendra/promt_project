import test from "node:test";
import assert from "node:assert/strict";
import { extractJson } from "../../src/lib/json.ts";

test("extractJson - clean JSON", () => {
  const result = extractJson<{ success: boolean }>('{"success": true}');
  assert.deepEqual(result, { success: true });
});

test("extractJson - wrapped in markdown code fences", () => {
  const input = "Here is the response:\n```json\n{\n  \"attacks\": [\"attack 1\", \"attack 2\"]\n}\n```\nHope this helps!";
  const result = extractJson<{ attacks: string[] }>(input);
  assert.deepEqual(result, { attacks: ["attack 1", "attack 2"] });
});

test("extractJson - strips reasoning think blocks", () => {
  const input = "<think>\nLet me analyze the request and generate attacks.\n</think>\n{\"attacks\": [\"test\"]}";
  const result = extractJson<{ attacks: string[] }>(input);
  assert.deepEqual(result, { attacks: ["test"] });
});

test("extractJson - parses JSON arrays", () => {
  const input = "Result: [\"item1\", \"item2\"]";
  const result = extractJson<string[]>(input);
  assert.deepEqual(result, ["item1", "item2"]);
});

test("extractJson - throws on invalid output", () => {
  assert.throws(() => extractJson("No JSON present anywhere here"), /No JSON found/);
});
