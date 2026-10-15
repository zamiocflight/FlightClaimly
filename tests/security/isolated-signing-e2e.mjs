import assert from "node:assert/strict";
import { createHash, createHmac } from "node:crypto";
import { PDFDocument } from "pdf-lib";

const base = "https://flightclaimly-signing-isolated-e2e-miqdds2bp.vercel.app";
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
const parsed = await PDFDocument.load(first.bytes);
assert.equal(parsed.getPageCount(), 2, "Signed PDF must contain exactly two pages");
const second = await sign(payload);
assert.equal(second.status, 200, "Retry must return stored PDF");
assert.deepEqual(second.bytes, first.bytes, "Retry must return exactly the original PDF bytes");
const digest = createHash("sha256").update(first.bytes).digest("hex");
console.log(JSON.stringify({ test: "synthetic-signing", result: "PASS", claimId, pdfBytes: first.bytes.length, sha256: digest, retry: "byte-identical", pdfPages: parsed.getPageCount(), wrongToken: "403" }));

const verifier = base + "/api/admin/authority-verify?claimId=" + claimId;
const unauthorized = await fetch(verifier);
assert.equal(unauthorized.status, 401, "Admin verifier must reject missing session");
const expiry = String(Math.floor(Date.now()/1000) + 3600);
const mac = createHmac("sha256", process.env.TEST_ADMIN_PASSWORD).update(expiry).digest("hex");
const verifiedResponse = await fetch(verifier, {headers:{cookie:"admin_session="+expiry+"."+mac}});
const verifiedBody = await verifiedResponse.text();
assert.equal(verifiedResponse.status, 200, "Authenticated admin verification must succeed: " + verifiedBody.slice(0,300));
const verify = JSON.parse(verifiedBody);
assert.equal(verify.status, "verified");
assert.equal(verify.actualSha256, digest);
assert.equal(verify.storedSha256, digest);
assert.equal(verify.pdfSizeBytes, first.bytes.length);
console.log(JSON.stringify({test:"admin-integrity-verifier",result:"PASS",status:verify.status}));
