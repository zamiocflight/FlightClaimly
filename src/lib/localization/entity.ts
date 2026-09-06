import type { KnowledgeLocalization, LocalizedKnowledgeContent } from "./types";

type KnowledgeEntity = {
  title: string;
  description: string;
  intro: string;
  overview: string;
  passengerRights: string;
  compensationIntro: string;
  compensationAmounts: Array<{ label: string; distance: string; amount: string }>;
  compensationRules: string;
  statisticsIntro: string;
  statistics: Array<{ label: string; value: string; description: string }>;
  timelineIntro: string;
  timeline: Array<{ title: string; description: string }>;
  claimProcess: string[];
  commonIssues: string[];
  faq: Array<{ question: string; answer: string }>;
};

export function applyKnowledgeLocalization<T extends KnowledgeEntity>(
  canonical: T,
  localization?: KnowledgeLocalization,
): T {
  if (!localization || localization.status !== "publishable") return canonical;
  const content: LocalizedKnowledgeContent = localization.content ?? {};
  return {
    ...canonical,
    title: localization.metadata.title,
    description: localization.metadata.description,
    intro: content.intro ?? canonical.intro,
    overview: content.overview ?? canonical.overview,
    passengerRights: content.passengerRights ?? canonical.passengerRights,
    compensationIntro: content.compensationIntro ?? canonical.compensationIntro,
    compensationAmounts: content.compensationAmounts ?? canonical.compensationAmounts,
    compensationRules: content.compensationRules ?? canonical.compensationRules,
    statisticsIntro: content.statisticsIntro ?? canonical.statisticsIntro,
    statistics: content.statistics ?? canonical.statistics,
    timelineIntro: content.timelineIntro ?? canonical.timelineIntro,
    timeline: content.timeline ?? canonical.timeline,
    claimProcess: content.claimProcess ?? canonical.claimProcess,
    commonIssues: content.commonIssues ?? canonical.commonIssues,
    faq: content.faq ?? canonical.faq,
  };
}
