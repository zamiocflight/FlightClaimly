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
import { localizeDelayReasonAssessmentSv } from "@/lib/localization/delay-reason-assessment-sv";
import { localizeDelayReasonAssessmentDa } from "@/lib/localization/delay-reason-assessment-da";
import { localizeDelayReasonAssessmentPl } from "@/lib/localization/delay-reason-assessment-pl";

type DelayReasonKnowledgeTemplateProps = { delayReason: DelayReason; locale: string };

export default function DelayReasonKnowledgeTemplate({ delayReason, locale }: DelayReasonKnowledgeTemplateProps) {
  const canonicalAssessment = getDelayReasonAssessment(delayReason.slug);
  const assessment = locale === "sv" ? localizeDelayReasonAssessmentSv(canonicalAssessment)
    : locale === "da" ? localizeDelayReasonAssessmentDa(canonicalAssessment)
    : locale === "pl" ? localizeDelayReasonAssessmentPl(canonicalAssessment)
    : canonicalAssessment;

  return <>
    <DelayReasonHero delayReason={delayReason} />
    <DelayReasonOverview delayReason={delayReason} locale={locale} />
    <ExtraordinaryCircumstances delayReason={delayReason} locale={locale} />
    <ClaimAssessment assessment={assessment} locale={locale} />
    <PassengerRights passengerRights={delayReason.passengerRights} locale={locale} />
    <CompensationRules compensationRules={delayReason.compensationRules} locale={locale} />
    <Statistics statisticsIntro={delayReason.statisticsIntro} statistics={delayReason.statistics ?? []} locale={locale} />
    <Timeline timelineIntro={delayReason.timelineIntro} timeline={delayReason.timeline ?? []} locale={locale} />
    <FAQ faq={delayReason.faq ?? []} locale={locale} />
    <RelatedKnowledge delayReasonTitle={delayReason.title} locale={locale} />
  </>;
}
