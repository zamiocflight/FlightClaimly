import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { Claim, ClaimStatus, Attachment } from './claimTypes';

const dataDir = path.join(process.cwd(), 'src', 'data');
const dataFile = path.join(dataDir, 'claims.json');

async function ensureDataFile() {
  await fs.mkdir(dataDir, { recursive: true });
  try { await fs.access(dataFile); }
  catch { await fs.writeFile(dataFile, '[]\n', 'utf-8'); }
}

export async function getClaims(): Promise<Claim[]> {
  await ensureDataFile();
  const raw = await fs.readFile(dataFile, 'utf-8');
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed)) return parsed as Claim[];
  if (parsed?.claims && Array.isArray(parsed.claims)) return parsed.claims as Claim[];
  return [];
}

export async function saveClaims(claims: Claim[]) {
  await ensureDataFile();
  const tmp = dataFile + '.tmp';
  await fs.writeFile(tmp, JSON.stringify(claims, null, 2) + '\n', 'utf-8');
  await fs.rename(tmp, dataFile);
}

export async function updateClaimStatus(id: string, status: ClaimStatus): Promise<Claim> {
  const claims = await getClaims();
  const idx = claims.findIndex(c => c.receivedAt === id || (c as any).id === id);
  if (idx === -1) throw new Error('NOT_FOUND');
  const updated: Claim = { ...claims[idx], status, updatedAt: new Date().toISOString() };
  claims[idx] = updated;
  await saveClaims(claims);
  return updated;
}

export async function addClaim(input: {
  flightNumber: string; date: string; from: string; to: string;
  name: string; email: string; bookingNumber: string;
}): Promise<Claim> {
  const claims = await getClaims();
  const claim: Claim = {
    ...input,
    receivedAt: randomUUID(),
    status: 'new',
    updatedAt: new Date().toISOString(),
    attachments: [],
  };
  claims.unshift(claim);
  await saveClaims(claims);
  return claim;
}

export async function addAttachmentToClaim(id: string, meta: Attachment): Promise<Claim> {
  const claims = await getClaims();
  const idx = claims.findIndex(c => c.receivedAt === id || (c as any).id === id);
  if (idx === -1) throw new Error('NOT_FOUND');
  const cur = claims[idx];
  const attachments = Array.isArray(cur.attachments) ? cur.attachments : [];
  attachments.push(meta);
  const updated: Claim = { ...cur, attachments, updatedAt: new Date().toISOString() };
  claims[idx] = updated;
  await saveClaims(claims);
  return updated;
}
