import test from "node:test";
import assert from "node:assert/strict";
// @ts-ignore Node.js 22 strip-types requires explicit .ts extension in this test.
import { decideStoredAuthority } from "../../src/lib/authority/evidenceDecision.ts";

const cases = [
  [false, false, false, "manual_review"],
  [false, false, true, "manual_review"],
  [false, true, false, "legacy"],
  [false, true, true, "legacy"],
  [true, false, false, "integrity_mismatch"],
  [true, false, true, "recover_reference"],
  [true, true, false, "integrity_mismatch"],
  [true, true, true, "verified"],
] as const;

for (const [evidence, reference, hashMatches, expected] of cases) {
  test(`evidence=${evidence}, reference=${reference}, hashMatches=${hashMatches}`, () => {
    assert.equal(decideStoredAuthority(evidence, reference, hashMatches), expected);
  });
}
