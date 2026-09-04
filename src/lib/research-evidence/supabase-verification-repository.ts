import { supabaseAdmin } from "@/lib/supabase";
import type { EvidenceReviewRepository } from "./verification-repository";
import type { EvidenceReview } from "./verification";

type ReviewRow = {
  id: string;
  evidence_id: string;
  claim_id: string;
  status: EvidenceReview["status"];
  reviewed_at: string;
  reviewer_type: EvidenceReview["reviewerType"];
  reviewer_id: string | null;
  method: EvidenceReview["method"];
  note: string | null;
};

function fromRow(row: ReviewRow): EvidenceReview {
  return {
    id: row.id,
    evidenceId: row.evidence_id,
    claimId: row.claim_id,
    status: row.status,
    reviewedAt: row.reviewed_at,
    reviewerType: row.reviewer_type,
    reviewerId: row.reviewer_id ?? undefined,
    method: row.method,
    note: row.note ?? undefined,
  };
}

export function createSupabaseEvidenceReviewRepository(): EvidenceReviewRepository {
  const db = supabaseAdmin();

  return {
    async listByClaimId(claimId) {
      const { data, error } = await db
        .from("claim_research_evidence_reviews")
        .select("*")
        .eq("claim_id", claimId)
        .order("reviewed_at", { ascending: true });

      if (error) throw new Error(`Failed to load evidence reviews: ${error.message}`);
      return ((data ?? []) as ReviewRow[]).map(fromRow);
    },

    async insert(review) {
      const { data, error } = await db
        .from("claim_research_evidence_reviews")
        .insert({
          id: review.id,
          evidence_id: review.evidenceId,
          claim_id: review.claimId,
          status: review.status,
          reviewed_at: review.reviewedAt,
          reviewer_type: review.reviewerType,
          reviewer_id: review.reviewerId ?? null,
          method: review.method,
          note: review.note ?? null,
        })
        .select("*")
        .single();

      if (error) throw new Error(`Failed to persist evidence review: ${error.message}`);
      return fromRow(data as ReviewRow);
    },
  };
}
