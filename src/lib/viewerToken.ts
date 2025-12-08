// src/lib/viewerToken.ts
import crypto from "crypto";

export function generateViewerToken(length = 32): string {
  // 32 bytes → 64 tecken hex
  return crypto.randomBytes(length).toString("hex");
}
