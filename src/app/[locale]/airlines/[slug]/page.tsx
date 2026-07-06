import { notFound } from "next/navigation";

import KnowledgePageTemplate from "@/components/seo/KnowledgePageTemplate";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import RelatedKnowledge from "@/components/seo/RelatedKnowledge";
import RelatedAirlines from "@/components/seo/RelatedAirlines";

import { getAirlineBySlug, airlines } from "@/data/seo/airlines";
import { buildAirlineMetadata } from "@/lib/seo/metadata";
import { getRelatedKnowledge } from "@/lib/seo/relationships";

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

  const relatedKnowledge = getRelatedKnowledge(airline.slug, locale, [
    "airport",
    "law",
    "article",
  ]);

  return (
    <main className="min-h-screen bg-slate-50">
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

      <KnowledgePageTemplate
        entity={airline}
        checkUrl={checkUrl}
        facts={[
          { label: "Airline", value: airline.name },
          { label: "IATA code", value: airline.iata },
          ...(airline.icao
            ? [{ label: "ICAO code", value: airline.icao }]
            : []),
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

      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <RelatedKnowledge
            title="Related guides and destinations"
            items={relatedKnowledge}
          />
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