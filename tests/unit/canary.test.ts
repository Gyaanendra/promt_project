import test from "node:test";
import assert from "node:assert/strict";
import { leaksSecret } from "../../src/lib/canary.ts";

test("canary detection - direct matches", () => {
  assert.equal(leaksSecret("The secret code is ALPHA-7", ["ALPHA-7"]), "ALPHA-7");
  assert.equal(leaksSecret("Your password is: vip-feast-99", ["VIP-FEAST-99"]), "VIP-FEAST-99");
});

test("canary detection - spacing and dash variations", () => {
  assert.equal(leaksSecret("code: a l p h a - 7", ["ALPHA-7"]), "ALPHA-7");
  assert.equal(leaksSecret("code: ALPHA_7", ["ALPHA-7"]), "ALPHA-7");
});

test("canary detection - negative cases", () => {
  assert.equal(leaksSecret("No secret here, just normal campus help", ["ALPHA-7"]), null);
  assert.equal(leaksSecret("I cannot share private codes.", ["ALPHA-7"]), null);
});

test("canary detection - ignores short secrets under 4 characters", () => {
  assert.equal(leaksSecret("Contains key 'ABC'", ["ABC"]), null);
});
