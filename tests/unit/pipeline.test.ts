import test from "node:test";
import assert from "node:assert/strict";
import { summarize } from "../../src/lib/pipeline.ts";
import type { AttackResult } from "../../src/lib/types.ts";

test("pipeline summarize - empty results", () => {
  const summary = summarize([]);
  assert.equal(summary.total, 0);
  assert.equal(summary.successes, 0);
  assert.equal(summary.asr, 0);
});

test("pipeline summarize - calculating ASR and category breakdown", () => {
  const results: AttackResult[] = [
    {
      id: "1",
      category: "injection",
      set: "train",
      attack: "attack 1",
      response: "response 1",
      verdict: { success: true, severity: 2, violatedRule: "rule", reason: "leaked" },
    },
    {
      id: "2",
      category: "injection",
      set: "train",
      attack: "attack 2",
      response: "response 2",
      verdict: { success: false, severity: 0, violatedRule: null, reason: "refused" },
    },
    {
      id: "3",
      category: "extraction",
      set: "train",
      attack: "attack 3",
      response: "response 3",
      verdict: { success: false, severity: 0, violatedRule: null, reason: "refused" },
    },
  ];

  const summary = summarize(results);
  assert.equal(summary.total, 3);
  assert.equal(summary.successes, 1);
  assert.equal(Math.round(summary.asr * 100), 33);
  assert.equal(summary.byCategory.injection.total, 2);
  assert.equal(summary.byCategory.injection.successes, 1);
  assert.equal(summary.byCategory.injection.asr, 0.5);
  assert.equal(summary.byCategory.extraction.total, 1);
  assert.equal(summary.byCategory.extraction.successes, 0);
});
