const enc = new TextEncoder();
export async function signAdminSession(secret: string) {
  const expiry = String(Math.floor(Date.now() / 1000) + 43200);
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(expiry)));
  return expiry + "." + Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
}
export async function validAdminSession(cookie: string | undefined, secret: string | undefined) {
  if (!cookie || !secret) return false;
  const parts = cookie.split(".");
  if (parts.length !== 2 || !/^\d{10,}$/.test(parts[0]) || !/^[a-f0-9]{64}$/.test(parts[1])) return false;
  const now = Math.floor(Date.now() / 1000);
  const expiry = Number(parts[0]);
  if (!Number.isSafeInteger(expiry) || expiry <= now || expiry > now + 43200) return false;
  const expected = await signForExpiry(parts[0], secret);
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ parts[1].charCodeAt(i);
  return diff === 0;
}
async function signForExpiry(expiry: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(expiry)));
  return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
}
