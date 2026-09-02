import DelayReasonHero from "@/components/seo/delay-reasons/DelayReasonHero";
import DelayReasonOverview from "@/components/seo/delay-reasons/DelayReasonOverview";
import ExtraordinaryCircumstances from "@/components/seo/delay-reasons/ExtraordinaryCircumstances";
import PassengerRights from "@/components/seo/delay-reasons/PassengerRights";
import CompensationRules from "@/components/seo/delay-reasons/CompensationRules";
import Statistics from "@/components/seo/delay-reasons/Statistics";
import Timeline from "@/components/seo/delay-reasons/Timeline";
import FAQ from "@/components/seo/delay-reasons/FAQ";
import RelatedKnowledge from "@/components/seo/delay-reasons/RelatedKnowledge";
import ClaimAssessment from "@/components/seo/delay-reasons/ClaimAssessment";

import type { DelayReason } from "@/data/delay-reasons/types";
import { getDelayReasonAssessment } from "@/lib/delay-reasons/assessment";

type DelayReasonKnowledgeTemplateProps = {
  delayReason: DelayReason;
};

export default function DelayReasonKnowledgeTemplate({
  delayReason,
}: DelayReasonKnowledgeTemplateProps) {
  const assessment = getDelayReasonAssessment(delayReason.slug);

  return (
    <>
      <DelayReasonHero delayReason={delayReason} />

      <DelayReasonOverview delayReason={delayReason} />

      <ExtraordinaryCircumstances delayReason={delayReason} />

      <ClaimAssessment assessment={assessment} />

      <PassengerRights passengerRights={delayReason.passengerRights} />

      <CompensationRules
        compensationRules={delayReason.compensationRules}
      />

      <Statistics
        statisticsIntro={delayReason.statisticsIntro}
        statistics={delayReason.statistics ?? []}
      />

      <Timeline
        timelineIntro={delayReason.timelineIntro}
        timeline={delayReason.timeline ?? []}
      />

      <FAQ faq={delayReason.faq ?? []} />

      <RelatedKnowledge delayReasonTitle={delayReason.title} />
    </>
  );
}
