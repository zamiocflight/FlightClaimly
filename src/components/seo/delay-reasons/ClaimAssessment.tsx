import type { DelayReasonAssessmentProfile } from "@/lib/delay-reasons/assessment";

type Props = {
  assessment: DelayReasonAssessmentProfile;
};

const baselineLabel: Record<
  DelayReasonAssessmentProfile["liabilityBaseline"],
  string
> = {
  "usually-compensable": "Compensation often remains possible",
  "usually-extraordinary": "Often capable of being extraordinary",
  "fact-specific": "Root-cause review required",
};

export default function ClaimAssessment({ assessment }: Props) {
  return (
    <section className="mt-12 rounded-2xl border bg-white p-8 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            FlightClaimly claim assessment
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">
            What should be investigated?
          </h2>
        </div>

        <div className="rounded-full border bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800">
          {baselineLabel[assessment.liabilityBaseline]}
        </div>
      </div>

      <p className="mt-6 max-w-4xl leading-8 text-slate-700">
        {assessment.summary}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold text-slate-950">
            Evidence to verify
          </h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            {assessment.evidenceTargets.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-950">
            Questions for the airline
          </h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            {assessment.airlineQuestions.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-slate-50 p-6">
        <h3 className="text-lg font-semibold text-slate-950">
          Signals that deserve a closer look
        </h3>
        <ul className="mt-4 space-y-2 text-slate-700">
          {assessment.claimantSignals.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 font-medium text-slate-900">
          Next step: {assessment.nextStep}
        </p>
      </div>
    </section>
  );
}
