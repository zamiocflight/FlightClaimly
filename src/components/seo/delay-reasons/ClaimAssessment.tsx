import type { DelayReasonAssessmentProfile } from "@/lib/delay-reasons/assessment";

type Props = {
  assessment: DelayReasonAssessmentProfile;
  locale: string;
};

const baselineLabel: Record<
  DelayReasonAssessmentProfile["liabilityBaseline"],
  string
> = {
  "usually-compensable": "Compensation often remains possible",
  "usually-extraordinary": "Often capable of being extraordinary",
  "fact-specific": "Root-cause review required",
};

export default function ClaimAssessment({ assessment, locale }: Props) {
  const localizedBaselineLabel =
    locale === "sv"
      ? {
          "usually-compensable": "Ersättning är ofta fortfarande möjlig",
          "usually-extraordinary": "Kan ofta vara extraordinär",
          "fact-specific": "Grundorsaken måste granskas",
        }[assessment.liabilityBaseline]
      : baselineLabel[assessment.liabilityBaseline];
  return (
    <section className="mt-12 rounded-2xl border bg-white p-8 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            {locale === "sv" ? "FlightClaimlys kravbedömning" : "FlightClaimly claim assessment"}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">
            {locale === "sv" ? "Vad behöver utredas?" : "What should be investigated?"}
          </h2>
        </div>

        <div className="rounded-full border bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800">
          {localizedBaselineLabel}
        </div>
      </div>

      <p className="mt-6 max-w-4xl leading-8 text-slate-700">
        {assessment.summary}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold text-slate-950">
            {locale === "sv" ? "Underlag att verifiera" : "Evidence to verify"}
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
            {locale === "sv" ? "Frågor till flygbolaget" : "Questions for the airline"}
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
          {locale === "sv" ? "Signaler som bör granskas närmare" : "Signals that deserve a closer look"}
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
          {locale === "sv" ? "Nästa steg:" : "Next step:"} {assessment.nextStep}
        </p>
      </div>
    </section>
  );
}
