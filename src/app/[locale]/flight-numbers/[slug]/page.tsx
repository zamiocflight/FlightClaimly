import { notFound } from "next/navigation";

import KnowledgePageTemplate from "@/components/seo/KnowledgePageTemplate";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import InternalLinks from "@/components/seo/InternalLinks";

import { flightNumbers } from "@/data/flight-numbers/flightNumbers";
import { getFlightNumberBySlug } from "@/lib/flight-numbers";
import { buildFlightNumberMetadata } from "@/lib/flight-numbers/metadata";
import { getInternalLinkSections } from "@/lib/seo/internalLinks";
import { resolveAuthority } from "@/lib/authority";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return flightNumbers.flatMap((flightNumber) =>
    ["sv", "en"].map((locale) => ({
      locale,
      slug: flightNumber.slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;

  const flightNumber = getFlightNumberBySlug(slug);

  if (!flightNumber) return {};

  return buildFlightNumberMetadata(flightNumber, locale);
}

export default async function FlightNumberPage({
  params,
}: PageProps) {
  const { locale, slug } = await params;

  const flightNumber = getFlightNumberBySlug(slug);

  if (!flightNumber) notFound();

  const checkUrl = `/${locale}/check/direct-or-layover`;

  const authoritySources = resolveAuthority({
    entityType: "flight-number",
    slug: flightNumber.slug,
    entity: flightNumber,
  });

  const internalLinkSections = getInternalLinkSections(
    "flight-number",
    flightNumber.slug,
    locale
  );

  const knowledgeEntity = {
    ...flightNumber,
    name: flightNumber.flightNumber,
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <FAQSchema items={flightNumber.faq} />

      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            url: `https://www.flightclaimly.com/${locale}`,
          },
          {
            name: "Flight numbers",
            url: `https://www.flightclaimly.com/${locale}/flight-numbers`,
          },
          {
            name: flightNumber.flightNumber,
            url: `https://www.flightclaimly.com/${locale}/flight-numbers/${flightNumber.slug}`,
          },
        ]}
      />

      <KnowledgePageTemplate
        entity={knowledgeEntity}
        checkUrl={checkUrl}
        locale={locale}
        authoritySources={authoritySources}
        facts={[
          {
            label: "Flight number",
            value: flightNumber.flightNumber,
          },
          {
            label: "Airline",
            value: flightNumber.airlineIata,
          },
          {
            label: "ICAO airline code",
            value: flightNumber.airlineIcao,
          },
          {
            label: "Origin airport",
            value: flightNumber.originAirport,
          },
          {
            label: "Destination airport",
            value: flightNumber.destinationAirport,
          },
          {
            label: "Distance category",
            value: flightNumber.distanceBand,
          },
          {
            label: "EU261 protection",
            value: flightNumber.eu261Eligible ? "Yes" : "No",
          },
          ...(flightNumber.aircraft
            ? [
                {
                  label: "Aircraft",
                  value: flightNumber.aircraft,
                },
              ]
            : []),
          ...(flightNumber.schedule
            ? [
                {
                  label: "Schedule",
                  value: flightNumber.schedule,
                },
              ]
            : []),
        ]}
      />

      <InternalLinks sections={internalLinkSections} />
    </main>
  );
}