// src/lib/paths.ts
import path from 'path';

export function dataRoot() {
  // På Vercel: skriv till /tmp (ephemeral men skrivbart)
  return process.env.VERCEL ? '/tmp/flightclaimly' : path.join(process.cwd(), 'src', 'data');
}

export function uploadsRoot() {
  return path.join(dataRoot(), 'uploads');
}

export function claimsFile() {
  return path.join(dataRoot(), 'claims.json');
}
