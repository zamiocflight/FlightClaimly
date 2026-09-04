import Link from "next/link";
import { getClaimById } from "@/lib/claims";
import {
  claimToRightsAssessmentInput,
} from "@/lib/claim-rights";
import { assessClaimWithResearchEvidence } from "@/lib/research-evidence";

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
  const research = assessClaimWithResearchEvidence(assessmentInput);
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
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">Article 8</div>
            <div className="mt-1 font-semibold text-slate-900">
              {assessment.reroutingOrRefund.potentiallyEngaged ? "Potentially engaged" : "Not established"}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">Article 9</div>
            <div className="mt-1 font-semibold text-slate-900">
              {assessment.care.potentiallyEngaged ? "Potentially engaged" : "Not established"}
            </div>
          </div>
        </div>

        {assessment.delayReason && (
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">Delay reason assessment</div>
            <div className="mt-1 font-semibold text-slate-900">{label(assessment.delayReason.slug)}</div>
            <p className="mt-1 text-sm text-slate-600">{assessment.delayReason.summary}</p>
            <p className="mt-2 text-sm text-slate-700"><strong>Baseline:</strong> {label(assessment.delayReason.liabilityBaseline)}</p>
            <p className="mt-1 text-sm text-slate-700"><strong>Next:</strong> {assessment.delayReason.nextStep}</p>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-slate-900">Evidence / investigation targets</h3>
            {assessment.evidenceTargets.length ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {assessment.evidenceTargets.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : <p className="mt-2 text-sm text-slate-500">No additional targets generated yet.</p>}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Questions to resolve</h3>
            {assessment.assessmentQuestions.length ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {assessment.assessmentQuestions.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : <p className="mt-2 text-sm text-slate-500">No assessment questions generated yet.</p>}
          </div>
        </div>

        <details className="rounded-lg border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer font-semibold text-slate-900">Legal engine detail</summary>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <p><strong>Matched rules:</strong> {assessment.rules.matched.length}</p>
            <p><strong>Unresolved rules:</strong> {assessment.rules.unresolved.length}</p>
            <p><strong>Not matched rules:</strong> {assessment.rules.notMatched.length}</p>
            <p><strong>Passenger rights:</strong> {assessment.passengerRightIds.join(", ") || "—"}</p>
            <p><strong>Authorities:</strong> {assessment.authorityIds.join(", ") || "—"}</p>
            <p><strong>Legal references:</strong> {assessment.legalReferenceIds.join(", ") || "—"}</p>
          </div>
        </details>
      </section>

      <section className="rounded-xl border border-sky-200 bg-sky-50 p-5 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Internal investigation</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">Research &amp; Evidence</h2>
            <p className="mt-1 text-sm text-slate-600">
              Research Planner converts unresolved claim facts into traceable evidence questions. External providers are not connected in v1 yet.
            </p>
          </div>
          <span className="rounded-full border border-sky-200 bg-white px-3 py-1 text-sm font-medium text-sky-800">
            {researchResolved}/{research.plan.questions.length} resolved
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">Resolved</div>
            <div className="mt-1 text-xl font-semibold text-emerald-700">{researchResolved}</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">Open</div>
            <div className="mt-1 text-xl font-semibold text-amber-700">{researchOpen}</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">Conflicting</div>
            <div className="mt-1 text-xl font-semibold text-rose-700">{researchConflicting}</div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">Research plan</h3>
          {research.plan.questions.length ? (
            <div className="mt-3 space-y-3">
              {research.plan.questions.map((item) => {
                const isResolved = research.resolution.resolvedQuestionIds.includes(item.id);
                const isConflicting = research.resolution.conflictingQuestionIds.includes(item.id);
                const status = isConflicting ? "conflicting" : isResolved ? "resolved" : "open";
                return (
                  <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="font-medium text-slate-900">{item.question}</div>
                        <div className="mt-1 text-xs text-slate-500">
                          {label(item.kind)}{item.factKey ? ` · ${label(item.factKey)}` : ""} · priority {item.priority}
                        </div>
                      </div>
                      <span className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-semibold uppercase text-slate-600">
                        {status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : <p className="mt-2 text-sm text-slate-500">No research questions generated.</p>}
        </div>

        {research.evidence.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-900">Evidence chain</h3>
            <div className="mt-3 space-y-3">
              {research.evidence.map((item) => (
                <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
                  <div className="font-medium text-slate-900">{item.normalizedFinding || item.rawFinding}</div>
                  <div className="mt-2">Source: {item.sourceName} · {label(item.sourceType)}</div>
                  <div>Confidence: {item.confidence} · Verification: {label(item.verificationStatus)}</div>
                  <div className="mt-1 text-xs text-slate-500">Question: {researchQuestionById.get(item.questionId)?.question || item.questionId}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <div>
        <h2 className="font-semibold text-lg mb-2">Contact</h2>
        <p><strong>Name:</strong> {claim.name}</p><p><strong>Email:</strong> {claim.email}</p><p><strong>Phone:</strong> {claim.phone || "—"}</p>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-2">Passengers</h2>
        <p><strong>Claim owner:</strong> {claim.name}</p><p><strong>Passenger count:</strong> {claim.passengerCount ?? 1}</p>
        {pax.length > 0 ? <div className="mt-2"><p><strong>Additional passengers:</strong></p><ul className="list-disc pl-6">
          {pax.map((p: any, i: number) => <li key={i}>{[p.firstName, p.lastName].filter(Boolean).join(" ") || "—"}{p.email ? ` — ${p.email}` : ""}{p.under18 ? " — under 18" : ""}</li>)}
        </ul></div> : <p><strong>Additional passengers:</strong> —</p>}
      </div>

      <div><h2 className="font-semibold text-lg mb-2">Address</h2><p><strong>Address:</strong> {claim.address || "—"}</p><p><strong>City:</strong> {claim.city || "—"}</p><p><strong>Postal code:</strong> {claim.postalCode || "—"}</p><p><strong>Country:</strong> {claim.country || "—"}</p></div>
      <div><h2 className="font-semibold text-lg mb-2">Flight</h2><p><strong>Flight:</strong> {claim.flightNumber}</p><p><strong>Route:</strong> {[claim.from, ...layovers, claim.to].filter(Boolean).join(" → ")}</p><p><strong>Date:</strong> {claim.date || "—"}</p></div>
      <div><h2 className="font-semibold text-lg mb-2">Booking</h2><p><strong>Booking ref:</strong> {claim.bookingNumber || "—"}</p></div>
      <div><h2 className="font-semibold text-lg mb-2">Status</h2><p>{claim.status}</p></div>

      <div>
        <h2 className="font-semibold text-lg mb-2">Documents</h2>
        {claim.attachments && claim.attachments.length > 0 ? <ul className="space-y-3">{claim.attachments.map((att: any, i: number) => {
          const isPassengerAuthority = att.type === "passenger_authority";
          const isMainAuthority = att.type === "authority";
          let documentLabel = att.filename || att.path;
          if (isMainAuthority) documentLabel = `Authority document — ${claim.name}`;
          if (isPassengerAuthority) documentLabel = `Passenger authority — ${att.passengerName || "Additional passenger"}`;
          return <li key={i} className="rounded-lg border border-slate-200 bg-white px-4 py-3"><div className="flex items-center justify-between gap-4"><div><div className="font-medium text-slate-900">{documentLabel}</div>{isPassengerAuthority && <div className="mt-1 text-sm text-emerald-700">Signed</div>}</div><a href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/attachments/${att.path}`} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">View document</a></div></li>;
        })}</ul> : <p>—</p>}
      </div>

      <div className="pt-6"><Link href="/admin" className="text-sky-600 hover:underline">← Back to admin</Link></div>
    </div>
  );
}