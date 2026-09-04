import type { EvidenceReview } from "./verification";

export interface EvidenceReviewRepository {
  listByClaimId(claimId: string): Promise<EvidenceReview[]>;
  insert(review: EvidenceReview): Promise<EvidenceReview>;
}

/** Lightweight append-only review repository for audits and local tests. */
export class InMemoryEvidenceReviewRepository implements EvidenceReviewRepository {
  private readonly rows = new Map<string, EvidenceReview[]>();

  async listByClaimId(claimId: string): Promise<EvidenceReview[]> {
    return [...(this.rows.get(claimId) ?? [])];
  }

  async insert(review: EvidenceReview): Promise<EvidenceReview> {
    const rows = this.rows.get(review.claimId) ?? [];
    rows.push(review);
    this.rows.set(review.claimId, rows);
    return review;
  }
}
