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

type Fact = {
  label: string;
  value: string | number;
};

type KnowledgePageTemplateProps = {
  entity: any;
  checkUrl: string;
  facts: Fact[];
};

export default function KnowledgePageTemplate({
  entity,
  checkUrl,
  facts,
}: KnowledgePageTemplateProps) {
  return (
    <>
      <Hero airline={entity} checkUrl={checkUrl} />

      <section className="px-6 pt-12">
        <div className="mx-auto max-w-5xl">
          <QuickFacts facts={facts} />
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <Overview title={`About ${entity.name}`} body={entity.overview} />
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <CompensationAmounts
            title="How much compensation can you receive?"
            intro={entity.compensationIntro}
            amounts={entity.compensationAmounts}
          />
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <PassengerRights
            title="Passenger rights under EU261"
            body={entity.passengerRights}
          />
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <CompensationRules
            title="When are you entitled to compensation?"
            body={entity.compensationRules}
          />
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <Statistics
            title={`${entity.name} compensation statistics`}
            intro={entity.statisticsIntro}
            statistics={entity.statistics}
          />
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <Timeline
            title="What happens after you submit your claim?"
            intro={entity.timelineIntro}
            steps={entity.timeline}
          />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <ClaimProcess steps={entity.claimProcess} />
          <CommonIssues
            airlineName={entity.name}
            issues={entity.commonIssues}
          />
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