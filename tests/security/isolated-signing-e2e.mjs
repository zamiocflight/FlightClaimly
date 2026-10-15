import assert from "node:assert/strict";
import { createHash } from "node:crypto";

const base = "https://flightclaimly-signing-isolated-e2e-4nbet05cy.vercel.app";
const claimId = "a1111111-1111-4111-8111-111111111111";
const payload = {
  claimId,
  fullName: "Synthetic Test Passenger",
  bookingReference: "E2ETEST1",
  viewerToken: "synthetic-preview-only-token-20261015",
  signatureDataUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/uXcAAAAASUVORK5CYII=",
};
async function sign(body) {
  const response = await fetch(base + "/api/authority/generate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(90000),
  });
  const bytes = Buffer.from(await response.arrayBuffer());
  return { status: response.status, bytes };
}
const invalid = await sign({ ...payload, viewerToken: "invalid-test-token" });
assert.equal(invalid.status, 403, "Incorrect viewer token must be rejected");
const first = await sign(payload);
assert.equal(first.status, 200, "Synthetic signing must succeed: " + first.bytes.toString("utf8").slice(0, 300));
assert.equal(first.bytes.subarray(0, 5).toString(), "%PDF-", "Signed response must be PDF");
const second = await sign(payload);
assert.equal(second.status, 200, "Retry must return stored PDF");
assert.deepEqual(second.bytes, first.bytes, "Retry must return exactly the original PDF bytes");
const digest = createHash("sha256").update(first.bytes).digest("hex");
console.log(JSON.stringify({ test: "synthetic-signing", result: "PASS", claimId, pdfBytes: first.bytes.length, sha256: digest, retry: "byte-identical", wrongToken: "403" }));
