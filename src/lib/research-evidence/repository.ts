import type { ResearchEvidence } from "./types";

export interface EvidenceRegistryRepository {
  listByClaimId(claimId: string): Promise<ResearchEvidence[]>;
  findByContentHash(claimId: string, contentHash: string): Promise<ResearchEvidence | null>;
  insert(claimId: string, evidence: ResearchEvidence): Promise<ResearchEvidence>;
}

/** Lightweight repository for audits and deterministic local tests. */
export class InMemoryEvidenceRegistryRepository implements EvidenceRegistryRepository {
  private readonly rows = new Map<string, ResearchEvidence[]>();

  async listByClaimId(claimId: string): Promise<ResearchEvidence[]> {
    return [...(this.rows.get(claimId) ?? [])];
  }

  async findByContentHash(claimId: string, contentHash: string): Promise<ResearchEvidence | null> {
    return (
      (this.rows.get(claimId) ?? []).find((item) => item.contentHash === contentHash) ?? null
    );
  }

  async insert(claimId: string, evidence: ResearchEvidence): Promise<ResearchEvidence> {
    const existing = await this.findByContentHash(claimId, evidence.contentHash ?? "");
    if (existing && evidence.contentHash) return existing;

    const rows = this.rows.get(claimId) ?? [];
    rows.push(evidence);
    this.rows.set(claimId, rows);
    return evidence;
  }
}
