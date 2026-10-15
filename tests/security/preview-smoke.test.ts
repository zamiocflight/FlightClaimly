import test from "node:test";
import assert from "node:assert/strict";

const base = process.env.FLIGHTCLAIMLY_PREVIEW_URL?.replace(/\/$/, "");
const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const headers = {
  "content-type": "application/json",
  ...(bypass ? { "x-vercel-protection-bypass": bypass } : {}),
};

async function post(path: string, body: unknown) {
  assert.ok(base, "FLIGHTCLAIMLY_PREVIEW_URL must be configured");
  const res = await fetch(new URL(path, base), {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    redirect: "manual",
    signal: AbortSignal.timeout(20000),
  });
  assert.notEqual(res.status, 307, "Unexpected redirect; verify deployment protection");
  assert.notEqual(res.status, 308, "Unexpected redirect; verify deployment protection");
  assert.notEqual(res.status, 401, "Preview may be protected; configure bypass secret");
  const text = await res.text();
  return { status: res.status, text };
}

test("Signing endpoint rejects missing required fields without creating a PDF", async () => {
  const result = await post("/api/authority/generate", {});
  assert.equal(result.status, 400, result.text.slice(0, 250));
});

test("Attachment presign rejects invalid claim ID without creating upload URL", async () => {
  const result = await post("/api/claims/not-a-uuid/attachments/presign", { filename: "test.pdf", viewerToken: "invalid" });
  assert.equal(result.status, 400, result.text.slice(0, 250));
});

test("Attachment metadata endpoint rejects invalid claim/token without writing", async () => {
  const result = await post("/api/claims/00000000-0000-0000-0000-000000000000/attachments", { files: [] });
  assert.equal(result.status, 403, result.text.slice(0, 250));
});
