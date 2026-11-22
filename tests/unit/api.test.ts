import test from "node:test";
import assert from "node:assert/strict";
import { str, int, strList, oneOf, LIMITS } from "../../src/lib/api.ts";

test("api validation - str helper", () => {
  assert.equal(str({ name: "hello" }, "name", 100), "hello");
  assert.throws(() => str({ name: "too long" }, "name", 4), /too long/);
  assert.throws(() => str({}, "missing", 100, true), /is required/);
  assert.equal(str({}, "optional", 100, false), "");
});

test("api validation - int helper", () => {
  assert.equal(int({ count: 5 }, "count", 1, 10, 1), 5);
  assert.equal(int({}, "count", 1, 10, 3), 3);
  assert.throws(() => int({ count: 20 }, "count", 1, 10, 1), /between 1 and 10/);
});

test("api validation - strList helper", () => {
  assert.deepEqual(strList({ items: ["a", "b"] }, "items", 5, 10), ["a", "b"]);
  assert.deepEqual(strList({}, "missing", 5, 10), []);
  assert.throws(() => strList({ items: ["too-long-string"] }, "items", 5, 5), /at most/);
});

test("api validation - oneOf helper", () => {
  const allowed = ["train", "heldout"] as const;
  assert.equal(oneOf({ variant: "train" }, "variant", allowed), "train");
  assert.throws(() => oneOf({ variant: "invalid" }, "variant", allowed), /must be one of/);
});
