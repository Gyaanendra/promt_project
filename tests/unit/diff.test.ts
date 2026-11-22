import test from "node:test";
import assert from "node:assert/strict";
import { diffLines } from "../../src/lib/diff.ts";

test("diffLines - identical text returns all same", () => {
  const text = "line 1\nline 2\nline 3";
  const diff = diffLines(text, text);
  assert.equal(diff.length, 3);
  assert.ok(diff.every((l) => l.type === "same"));
});

test("diffLines - added lines", () => {
  const before = "line 1\nline 3";
  const after = "line 1\nline 2\nline 3";
  const diff = diffLines(before, after);
  assert.equal(diff.some((l) => l.type === "add" && l.text === "line 2"), true);
});

test("diffLines - removed lines", () => {
  const before = "line 1\nline 2\nline 3";
  const after = "line 1\nline 3";
  const diff = diffLines(before, after);
  assert.equal(diff.some((l) => l.type === "remove" && l.text === "line 2"), true);
});
