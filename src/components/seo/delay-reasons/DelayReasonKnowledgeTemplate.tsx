import DelayReasonHero from "@/components/seo/delay-reasons/DelayReasonHero";
import DelayReasonOverview from "@/components/seo/delay-reasons/DelayReasonOverview";
import ExtraordinaryCircumstances from "@/components/seo/delay-reasons/ExtraordinaryCircumstances";
import PassengerRights from "@/components/seo/delay-reasons/PassengerRights";
import CompensationRules from "@/components/seo/delay-reasons/CompensationRules";
import Statistics from "@/components/seo/delay-reasons/Statistics";
import Timeline from "@/components/seo/delay-reasons/Timeline";
import FAQ from "@/components/seo/delay-reasons/FAQ";
import RelatedKnowledge from "@/components/seo/delay-reasons/RelatedKnowledge";

import type { DelayReason } from "@/data/delay-reasons/types";

type DelayReasonKnowledgeTemplateProps = {
  delayReason: DelayReason;
};

export default function DelayReasonKnowledgeTemplate({
  delayReason,
}: DelayReasonKnowledgeTemplateProps) {
  return (
    <>
      <DelayReasonHero delayReason={delayReason} />

      <DelayReasonOverview delayReason={delayReason} />

      <ExtraordinaryCircumstances delayReason={delayReason} />

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