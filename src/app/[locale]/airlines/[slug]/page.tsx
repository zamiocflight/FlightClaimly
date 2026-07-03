import { notFound } from "next/navigation";
import { getAirlineBySlug, airlines } from "@/data/seo/airlines";
import Hero from "@/components/seo/Hero";
import ClaimProcess from "@/components/seo/ClaimProcess";
import CommonIssues from "@/components/seo/CommonIssues";
import FAQ from "@/components/seo/FAQ";
import QuickFacts from "@/components/seo/QuickFacts";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import RelatedAirlines from "@/components/seo/RelatedAirlines";
import Overview from "@/components/seo/Overview";
import PassengerRights from "@/components/seo/PassengerRights";
import CompensationRules from "@/components/seo/CompensationRules";
import CompensationAmounts from "@/components/seo/CompensationAmounts";
import Statistics from "@/components/seo/Statistics";
import Timeline from "@/components/seo/Timeline";
import { buildAirlineMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return airlines.flatMap((airline) =>
    ["sv", "en"].map((locale) => ({
      locale,
      slug: airline.slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const airline = getAirlineBySlug(slug);

  if (!airline) return {};

  return buildAirlineMetadata(airline, locale);
}

export default async function AirlinePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const airline = getAirlineBySlug(slug);

  if (!airline) notFound();

  const checkUrl = `/${locale}/check/direct-or-layover`;

  return (
    <main className="min-h-screen bg-slate-50">
      <Hero airline={airline} checkUrl={checkUrl} />
      <FAQSchema items={airline.faq} />

      <BreadcrumbSchema
  items={[
    {
      name: "Home",
      url: `https://www.flightclaimly.com/${locale}`,
    },
    {
      name: "Airlines",
      url: `https://www.flightclaimly.com/${locale}/airlines`,
    },
    {
      name: airline.name,
      url: `https://www.flightclaimly.com/${locale}/airlines/${airline.slug}`,
    },
  ]}
/>
      

      <section className="px-6 pt-12">
  <div className="mx-auto max-w-5xl">
    <QuickFacts
      facts={[
        { label: "Airline", value: airline.name },
        { label: "IATA code", value: airline.iata },
        ...(airline.icao ? [{ label: "ICAO code", value: airline.icao }] : []),
        { label: "Country", value: airline.country },
        ...(airline.headquarters
          ? [{ label: "Headquarters", value: airline.headquarters }]
          : []),
        ...(airline.founded
          ? [{ label: "Founded", value: airline.founded }]
          : []),
        ...(airline.mainHub
          ? [{ label: "Main hub", value: airline.mainHub }]
          : []),
        ...(airline.fleetSize
          ? [{ label: "Fleet size", value: airline.fleetSize }]
          : []),
        ...(airline.destinations
          ? [{ label: "Destinations", value: airline.destinations }]
          : []),
        ...(airline.alliance
          ? [{ label: "Alliance", value: airline.alliance }]
          : []),
      ]}
    />
  </div>
</section>

<section className="px-6 py-12">
  <div className="mx-auto max-w-5xl">
    <Overview
      title={`About ${airline.name}`}
      body={airline.overview}
    />
  </div>
</section>

<section className="px-6 py-12">
  <div className="mx-auto max-w-5xl">
    <CompensationAmounts
      title="How much compensation can you receive?"
      intro={airline.compensationIntro}
      amounts={airline.compensationAmounts}
    />
  </div>
</section>

<section className="px-6 py-12">
  <div className="mx-auto max-w-5xl">
    <PassengerRights
      title="Passenger rights under EU261"
      body={airline.passengerRights}
    />
  </div>
</section>

<section className="px-6 py-12">
  <div className="mx-auto max-w-5xl">
    <CompensationRules
      title="When are you entitled to compensation?"
      body={airline.compensationRules}
    />
  </div>
</section>

<section className="px-6 py-12">
  <div className="mx-auto max-w-5xl">
    <Statistics
      title={`${airline.name} compensation statistics`}
      intro={airline.statisticsIntro}
      statistics={airline.statistics}
    />
  </div>
</section>

<section className="px-6 py-12">
  <div className="mx-auto max-w-5xl">
    <Timeline
      title="What happens after you submit your claim?"
      intro={airline.timelineIntro}
      steps={airline.timeline}
    />
  </div>
</section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <ClaimProcess steps={airline.claimProcess} />

          <CommonIssues
            airlineName={airline.name}
            issues={airline.commonIssues}
          />
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <FAQ items={airline.faq} />
        </div>
      </section>
      <section className="px-6 pb-20">
  <div className="mx-auto max-w-5xl">
    <RelatedAirlines
      currentSlug={airline.slug}
      airlines={airlines}
      locale={locale}
    />
  </div>
</section>
    </main>
  );
}