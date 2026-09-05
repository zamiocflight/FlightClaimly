import { supabaseAdmin } from "@/lib/supabase";
import type { EvidenceRegistryRepository } from "./repository";
import type { ResearchEvidence } from "./types";

type EvidenceRow = {
  id: string;
  claim_id: string;
  question_id: string;
  provider_id: string | null;
  source_type: ResearchEvidence["sourceType"];
  source_name: string;
  source_url: string | null;
  source_record_id: string | null;
  observed_at: string | null;
  retrieved_at: string;
  raw_finding: string;
  normalized_finding: string | null;
  fact_key: ResearchEvidence["factKey"] | null;
  fact_value: string | number | boolean | null;
  confidence: ResearchEvidence["confidence"];
  verification_status: ResearchEvidence["verificationStatus"];
  content_hash: string;
  metadata: ResearchEvidence["metadata"] | null;
  notes: string | null;
};

function fromRow(row: EvidenceRow): ResearchEvidence {
  return {
    id: row.id,
    questionId: row.question_id,
    providerId: row.provider_id ?? undefined,
    sourceType: row.source_type,
    sourceName: row.source_name,
    sourceUrl: row.source_url ?? undefined,
    sourceRecordId: row.source_record_id ?? undefined,
    observedAt: row.observed_at ?? undefined,
    retrievedAt: row.retrieved_at,
    rawFinding: row.raw_finding,
    normalizedFinding: row.normalized_finding ?? undefined,
    factKey: row.fact_key ?? undefined,
    factValue: row.fact_value ?? undefined,
    confidence: row.confidence,
    verificationStatus: row.verification_status,
    contentHash: row.content_hash,
    metadata: row.metadata ?? undefined,
    notes: row.notes ?? undefined,
  };
}

function toRow(claimId: string, evidence: ResearchEvidence): EvidenceRow {
  if (!evidence.contentHash) {
    throw new Error("Research evidence must have a content hash before persistence.");
  }

  return {
    id: evidence.id,
    claim_id: claimId,
    question_id: evidence.questionId,
    provider_id: evidence.providerId ?? null,
    source_type: evidence.sourceType,
    source_name: evidence.sourceName,
    source_url: evidence.sourceUrl ?? null,
    source_record_id: evidence.sourceRecordId ?? null,
    observed_at: evidence.observedAt ?? null,
    retrieved_at: evidence.retrievedAt,
    raw_finding: evidence.rawFinding,
    normalized_finding: evidence.normalizedFinding ?? null,
    fact_key: evidence.factKey ?? null,
    fact_value: evidence.factValue ?? null,
    confidence: evidence.confidence,
    verification_status: evidence.verificationStatus,
    content_hash: evidence.contentHash,
    metadata: evidence.metadata ?? null,
    notes: evidence.notes ?? null,
  };
}

export function createSupabaseEvidenceRegistryRepository(): EvidenceRegistryRepository {
  const db = supabaseAdmin();

  return {
    async listByClaimId(claimId) {
      const { data, error } = await db
        .from("claim_research_evidence")
        .select("*")
        .eq("claim_id", claimId)
        .order("retrieved_at", { ascending: true });

      if (error) throw new Error(`Failed to load research evidence: ${error.message}`);
      return ((data ?? []) as EvidenceRow[]).map(fromRow);
    },

    async findByContentHash(claimId, contentHash) {
      const { data, error } = await db
        .from("claim_research_evidence")
        .select("*")
        .eq("claim_id", claimId)
        .eq("content_hash", contentHash)
        .maybeSingle();

      if (error) throw new Error(`Failed to find research evidence: ${error.message}`);
      return data ? fromRow(data as EvidenceRow) : null;
    },

    async insert(claimId, evidence) {
      const row = toRow(claimId, evidence);
      const { data, error } = await db
        .from("claim_research_evidence")
        .insert(row)
        .select("*")
        .single();

      if (error) {
        // A concurrent run may have inserted the same fingerprint first.
        if (error.code === "23505") {
          const existing = await this.findByContentHash(claimId, row.content_hash);
          if (existing) return existing;
        }
        throw new Error(`Failed to persist research evidence: ${error.message}`);
      }

      return fromRow(data as EvidenceRow);
    },
  };
}
