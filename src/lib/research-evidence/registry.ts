import { createHash, randomUUID } from "node:crypto";
import type { ClaimRightsAssessmentInput } from "@/lib/claim-rights";
import type { ResearchEvidenceProvider } from "./provider";
import type { EvidenceRegistryRepository } from "./repository";
import type { ResearchEvidence, ResearchQuestion } from "./types";

export interface CollectEvidenceRequest {
  claimId: string;
  question: ResearchQuestion;
  claimInput: ClaimRightsAssessmentInput;
  provider: ResearchEvidenceProvider;
}

export interface EvidenceRegistry {
  list(claimId: string): Promise<ResearchEvidence[]>;
  collect(request: CollectEvidenceRequest): Promise<ResearchEvidence[]>;
}

function stableValue(value: string | number | boolean | undefined): string {
  if (value === undefined) return "undefined";
  return `${typeof value}:${String(value)}`;
}

function evidenceFingerprint(input: {
  claimId: string;
  questionId: string;
  providerId: string;
  sourceRecordId?: string;
  sourceUrl?: string;
  factKey?: string;
  factValue?: string | number | boolean;
  rawFinding: string;
}): string {
  return createHash("sha256")
    .update(
      [
        input.claimId,
        input.questionId,
        input.providerId,
        input.sourceRecordId ?? "",
        input.sourceUrl ?? "",
        input.factKey ?? "",
        stableValue(input.factValue),
        input.rawFinding.trim(),
      ].join("\u001f"),
    )
    .digest("hex");
}

export function createEvidenceRegistry(
  repository: EvidenceRegistryRepository,
): EvidenceRegistry {
  return {
    list(claimId) {
      return repository.listByClaimId(claimId);
    },

    async collect({ claimId, question, claimInput, provider }) {
      if (!provider.supports(question)) return [];

      const findings = await provider.research({ claimId, question, claimInput });
      const collected: ResearchEvidence[] = [];

      for (const finding of findings) {
        const contentHash = evidenceFingerprint({
          claimId,
          questionId: question.id,
          providerId: provider.id,
          sourceRecordId: finding.sourceRecordId,
          sourceUrl: finding.sourceUrl,
          factKey: finding.factKey,
          factValue: finding.factValue,
          rawFinding: finding.rawFinding,
        });

        const existing = await repository.findByContentHash(claimId, contentHash);
        if (existing) {
          collected.push(existing);
          continue;
        }

        const evidence: ResearchEvidence = {
          id: randomUUID(),
          questionId: question.id,
          providerId: provider.id,
          sourceType: finding.sourceType,
          sourceName: finding.sourceName || provider.name,
          sourceUrl: finding.sourceUrl,
          sourceRecordId: finding.sourceRecordId,
          observedAt: finding.observedAt,
          retrievedAt: new Date().toISOString(),
          rawFinding: finding.rawFinding,
          normalizedFinding: finding.normalizedFinding,
          factKey: finding.factKey ?? question.factKey,
          factValue: finding.factValue,
          confidence: finding.confidence,
          // Provider output enters the registry as unverified by design.
          // Separate corroboration / operator review promotes evidence later.
          verificationStatus: "unverified",
          contentHash,
          metadata: finding.metadata,
        };

        collected.push(await repository.insert(claimId, evidence));
      }

      return collected;
    },
  };
}
