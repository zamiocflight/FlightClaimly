import Link from "next/link";
import { getClaimById } from "@/lib/claims";
import {
  claimToRightsAssessmentInput,
} from "@/lib/claim-rights";
import {
  assessClaimWithResearchEvidence,
  createEvidenceRegistry,
  createSupabaseEvidenceRegistryRepository,
} from "@/lib/research-evidence";

function label(value: string) {
  return value.replaceAll("-", " ");
}

export default async function ClaimDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const claim = await getClaimById(id);

  if (!claim) return <div className="p-6">Claim not found</div>;

  const assessmentInput = claimToRightsAssessmentInput(claim);
  const evidenceRegistry = createEvidenceRegistry(
    createSupabaseEvidenceRegistryRepository(),
  );
  const persistedEvidence = await evidenceRegistry.list(claim.id);
  const research = assessClaimWithResearchEvidence(
    assessmentInput,
    persistedEvidence,
  );
  const assessment = research.enrichedAssessment;
  const researchQuestionById = new Map(research.plan.questions.map((item) => [item.id, item]));
  const researchResolved = research.resolution.resolvedQuestionIds.length;
  const researchConflicting = research.resolution.conflictingQuestionIds.length;
  const researchOpen = research.resolution.unresolvedQuestionIds.length;

  const pax = (() => {
    if (Array.isArray(claim.pax)) return claim.pax;
    if (typeof claim.pax === "string") {
      try {
        const parsed = JSON.parse(claim.pax);
        return Array.isArray(parsed) ? parsed : [];
      } catch { return []; }
    }
    return [];
  })();

  const layovers = (() => {
    if (Array.isArray(claim.layovers)) return claim.layovers;
    if (typeof claim.layovers === "string") {
      try {
        const parsed = JSON.parse(claim.layovers);
        return Array.isArray(parsed) ? parsed : [];
      } catch { return []; }
    }
    return [];
  })();

  const deepResearchRecommended =
    assessment.status !== "ready-for-legal-review" ||
    assessment.rules.unresolved.length > 0 ||
    assessment.extraordinaryCircumstances.requiresReview;

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 space-y-8">
      <h1 className="text-2xl font-semibold">Claim details</h1>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Internal assessment</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">Claim Rights Assessment</h2>
          </div>
          <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-700">
            {label(assessment.status)}
          </span>
        </div>

        {deepResearchRecommended && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
            <div className="font-semibold text-amber-900">Deeper investigation recommended</div>
            <p className="mt-1 text-sm text-amber-800">
              The current structured claim does not establish every material fact. Research / Evidence Engine has converted the gaps into an investigation plan below.
            </p>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">EU261</div>
            <div className="mt-1 font-semibold text-slate-900">{label(assessment.legalRegime.eu261)}</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">Compensation</div>
            <div className="mt-1 font-semibold text-slate-900">{label(assessment.compensation.status)}</div>
            {assessment.compensation.amountEur && <div className="mt-1 text-sm text-slate-600">€{assessment.compensation.amountEur}</div>}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">Article 8</div>
            <div className="mt-1 text-sm font-medium text-slate-900">
              {assessment.reroutingOrRefund.potentiallyEngaged ? "Potentially engaged" : "Not established"}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">Article 9</div>
            <div className="mt-1 text-sm font-medium text-slate-900">
              {assessment.care.potentiallyEngaged ? "Potentially engaged" : "Not established"}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">Airline defence</div>
            <div className="mt-1 text-sm font-medium text-slate-900">
              {assessment.extraordinaryCircumstances.requiresReview ? "Review required" : "No review flag"}
            </div>
          </div>
        </div>

        {assessment.knownFacts.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-900">Known facts</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {assessment.knownFacts.map((fact) => <li key={fact}>{fact}</li>)}
            </ul>
          </div>
        )}

        {assessment.missingFacts.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-900">Missing facts</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {assessment.missingFacts.map((fact) => <li key={fact}>{fact}</li>)}
            </ul>
          </div>
        )}

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-xs font-semibold uppercase text-slate-500">Delay reason</div>
          <div className="mt-1 font-medium text-slate-900">{assessment.delayReason.label}</div>
          <div className="mt-1 text-sm text-slate-600">{assessment.delayReason.summary}</div>
        </div>
      </section>

      <section className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-5 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Investigation layer</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">Research &amp; Evidence</h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              The planner converts unresolved legal and factual gaps into evidence tasks. Persisted evidence is loaded from the Evidence Registry and only sufficiently verified facts are promoted back into the deterministic Legal Engine.
            </p>
          </div>
          <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm font-medium text-indigo-700">
            {researchResolved}/{research.plan.questions.length} resolved
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-emerald-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase text-emerald-700">Resolved</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">{researchResolved}</div>
          </div>
          <div className="rounded-lg border border-amber-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase text-amber-700">Open</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">{researchOpen}</div>
          </div>
          <div className="rounded-lg border border-rose-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase text-rose-700">Conflicting</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">{researchConflicting}</div>
          </div>
        </div>

        {research.plan.questions.length > 0 ? (
          <div>
            <h3 className="font-semibold text-slate-900">Research Planner</h3>
            <div className="mt-2 space-y-2">
              {research.plan.questions.map((question) => {
                const isResolved = research.resolution.resolvedQuestionIds.includes(question.id);
                const isConflicting = research.resolution.conflictingQuestionIds.includes(question.id);
                const status = isConflicting ? "conflicting" : isResolved ? "resolved" : "open";
                return (
                  <div key={question.id} className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <span>{label(question.kind)}</span>
                      {question.factKey && <span>· {label(question.factKey)}</span>}
                      <span>· {question.priority}</span>
                      <span>· {status}</span>
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-900">{question.question}</div>
                    {question.target && <div className="mt-1 text-xs text-slate-500">Target: {question.target}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            No unresolved research questions were generated for the current structured facts.
          </div>
        )}

        <div>
          <h3 className="font-semibold text-slate-900">Evidence Registry</h3>
          {research.evidence.length > 0 ? (
            <div className="mt-2 space-y-2">
              {research.evidence.map((evidence) => {
                const question = researchQuestionById.get(evidence.questionId);
                return (
                  <div key={evidence.id} className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
                    <div className="font-medium text-slate-900">{evidence.normalizedFinding ?? evidence.rawFinding}</div>
                    <div className="mt-1 text-xs text-slate-500">
                      {evidence.sourceName} · {label(evidence.sourceType)} · {evidence.confidence} confidence · {label(evidence.verificationStatus)}
                    </div>
                    {question && <div className="mt-1 text-xs text-slate-500">Question: {question.question}</div>}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-2 rounded-lg border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600">
              No persisted evidence yet. Provider output will enter this registry as unverified and must be corroborated or verified before it can become a legal fact.
            </div>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Claim data</h2>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700 space-y-2">
          <div><strong>Flight:</strong> {claim.flightNumber}</div>
          <div><strong>Date:</strong> {claim.date ?? "—"}</div>
          <div><strong>Route:</strong> {claim.from} → {claim.to}</div>
          <div><strong>Passenger:</strong> {claim.name}</div>
          <div><strong>Email:</strong> {claim.email}</div>
          <div><strong>Booking:</strong> {claim.bookingNumber}</div>
          <div><strong>Status:</strong> {claim.status}</div>
          {pax.length > 0 && <div><strong>Passengers:</strong> {pax.length}</div>}
          {layovers.length > 0 && <div><strong>Layovers:</strong> {layovers.length}</div>}
        </div>
      </section>

      <div>
        <Link href="/admin" className="text-sm font-medium text-indigo-700 hover:underline">← Back to Claims Desk</Link>
      </div>
    </div>
  );
}
