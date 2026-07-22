import Hero from "@/components/seo/Hero";
import QuickFacts from "@/components/seo/QuickFacts";
import Overview from "@/components/seo/Overview";
import PassengerRights from "@/components/seo/PassengerRights";
import CompensationAmounts from "@/components/seo/CompensationAmounts";
import CompensationRules from "@/components/seo/CompensationRules";
import Statistics from "@/components/seo/Statistics";
import Timeline from "@/components/seo/Timeline";
import ClaimProcess from "@/components/seo/ClaimProcess";
import CommonIssues from "@/components/seo/CommonIssues";
import FAQ from "@/components/seo/FAQ";
import MajorAirlines from "@/components/seo/MajorAirlines";
import AuthoritySection from "@/components/authority/AuthoritySection";
import type { AuthoritySource } from "@/data/authority/shared/types";
import KnowledgeSection from "@/components/seo/KnowledgeSection";

type Fact = {
  label: string;
  value: string | number;
};

type KnowledgeEntity = {
  name: string;
  intro: string;
  overview: string;
  passengerRights: string;

  compensationIntro: string;
  compensationAmounts: {
    label: string;
    distance: string;
    amount: string;
  }[];

  compensationRules: string;

  statisticsIntro: string;
  statistics: {
    label: string;
    value: string;
    description: string;
  }[];

  timelineIntro: string;
  timeline: {
    title: string;
    description: string;
  }[];

  claimProcess: string[];
  commonIssues: string[];
  faq: {
    question: string;
    answer: string;
  }[];

  mainAirlines?: string[];
};

type KnowledgePageTemplateProps = {
  entity: KnowledgeEntity;
  checkUrl: string;
  facts: Fact[];
  locale: string;
  authoritySources?: AuthoritySource[];
};

export default function KnowledgePageTemplate({
  entity,
  checkUrl,
  facts,
  locale,
  authoritySources = [],
}: KnowledgePageTemplateProps) {
  return (
    <>
      <Hero entity={entity} checkUrl={checkUrl} />

      <KnowledgeSection className="pt-12 pb-0">
     <QuickFacts facts={facts} />
     </KnowledgeSection>

      {entity.mainAirlines && entity.mainAirlines.length > 0 && (
        <MajorAirlines
          title={`Major airlines for ${entity.name}`}
          airlineSlugs={entity.mainAirlines}
          locale={locale}
        />
      )}

      <KnowledgeSection>
      <Overview title={`About ${entity.name}`} body={entity.overview} />
      </KnowledgeSection>

  <KnowledgeSection>
  <CompensationAmounts
    title="How much compensation can you receive?"
    intro={entity.compensationIntro}
    amounts={entity.compensationAmounts}
  />
</KnowledgeSection>

<KnowledgeSection>
  <PassengerRights
    title="Passenger rights under EU261"
    body={entity.passengerRights}
  />
</KnowledgeSection>

<AuthoritySection
  title="Official sources"
  sources={authoritySources}
/>

<KnowledgeSection>
  <CompensationRules
    title="When are you entitled to compensation?"
    body={entity.compensationRules}
  />
</KnowledgeSection>

<KnowledgeSection>
  <Statistics
    title={`${entity.name} compensation statistics`}
    intro={entity.statisticsIntro}
    statistics={entity.statistics}
  />
</KnowledgeSection>

<KnowledgeSection>
  <Timeline
    title="What happens after you submit your claim?"
    intro={entity.timelineIntro}
    steps={entity.timeline}
  />
</KnowledgeSection>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <ClaimProcess steps={entity.claimProcess} />
          <CommonIssues airlineName={entity.name} issues={entity.commonIssues} />
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <FAQ items={entity.faq} />
        </div>
      </section>
    </>
  );
}