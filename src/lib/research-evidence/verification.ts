import { randomUUID } from "node:crypto";
import type { EvidenceVerificationStatus, ResearchEvidence } from "./types";
import type { EvidenceReviewRepository } from "./verification-repository";

export type EvidenceReviewerType = "operator" | "system" | "policy";
export type EvidenceReviewMethod =
  | "manual"
  | "corroboration-policy"
  | "trusted-provider-policy";

export interface EvidenceReview {
  id: string;
  evidenceId: string;
  claimId: string;
  status: EvidenceVerificationStatus;
  reviewedAt: string;
  reviewerType: EvidenceReviewerType;
  reviewerId?: string;
  method: EvidenceReviewMethod;
  note?: string;
}

export interface RecordEvidenceReviewRequest {
  claimId: string;
  evidenceId: string;
  status: EvidenceVerificationStatus;
  reviewerType: EvidenceReviewerType;
  reviewerId?: string;
  method: EvidenceReviewMethod;
  note?: string;
}

export interface EvidenceReviewService {
  list(claimId: string): Promise<EvidenceReview[]>;
  record(request: RecordEvidenceReviewRequest): Promise<EvidenceReview>;
}

export function createEvidenceReviewService(
  repository: EvidenceReviewRepository,
): EvidenceReviewService {
  return {
    list(claimId) {
      return repository.listByClaimId(claimId);
    },
    record(request) {
      return repository.insert({
        id: randomUUID(),
        ...request,
        reviewedAt: new Date().toISOString(),
      });
    },
  };
}

/**
 * Evidence rows remain immutable. The latest append-only review determines the
 * effective verification status consumed by the resolver / Legal Engine.
 */
export function applyLatestEvidenceReviews(
  evidence: ResearchEvidence[],
  reviews: EvidenceReview[],
): ResearchEvidence[] {
  const latestByEvidenceId = new Map<string, EvidenceReview>();

  for (const review of reviews) {
    const current = latestByEvidenceId.get(review.evidenceId);
    if (!current || review.reviewedAt > current.reviewedAt) {
      latestByEvidenceId.set(review.evidenceId, review);
    }
  }

  return evidence.map((item) => {
    const latest = latestByEvidenceId.get(item.id);
    return latest
      ? { ...item, verificationStatus: latest.status }
      : item;
  });
}
