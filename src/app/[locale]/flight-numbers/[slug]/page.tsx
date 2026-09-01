import { notFound } from "next/navigation";

import KnowledgePageTemplate from "@/components/seo/KnowledgePageTemplate";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import InternalLinks from "@/components/seo/InternalLinks";

import { publishableFlightNumbers } from "@/lib/flight-numbers/catalog";
import { getFlightNumberBySlug } from "@/lib/flight-numbers";
import { buildFlightNumberMetadata } from "@/lib/flight-numbers/metadata";
import { getInternalLinkSections } from "@/lib/seo/internalLinks";
import { resolveAuthority } from "@/lib/authority";
import { getAirportIdentityBySlug } from "@/lib/knowledge/airports";
import { flightNumberSeoLocales } from "@/lib/seo/alternates";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return publishableFlightNumbers.flatMap((flightNumber) =>
    flightNumberSeoLocales.map((locale) => ({
      locale,
      slug: flightNumber.slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;

  if (
    !flightNumberSeoLocales.includes(
      locale as (typeof flightNumberSeoLocales)[number]
    )
  ) {
    return {};
  }

  const flightNumber = getFlightNumberBySlug(slug);

  if (!flightNumber) return {};

  return buildFlightNumberMetadata(flightNumber, locale);
}

export default async function FlightNumberPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (
    !flightNumberSeoLocales.includes(
      locale as (typeof flightNumberSeoLocales)[number]
    )
  ) {
    notFound();
  }

  const flightNumber = getFlightNumberBySlug(slug);
  if (!flightNumber) notFound();

  const originAirport = getAirportIdentityBySlug(
    flightNumber.originAirportSlug
  );

  const destinationAirport = getAirportIdentityBySlug(
    flightNumber.destinationAirportSlug
  );

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
            name: flightNumber.airlineName,
            url: `https://www.flightclaimly.com/${locale}/flight-numbers/airline/${flightNumber.airline}`,
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
            value:
              originAirport?.name ?? flightNumber.originAirportSlug,
          },
          {
            label: "Destination airport",
            value:
              destinationAirport?.name ?? flightNumber.destinationAirportSlug,
          },
          {
            label: "Distance category",
            value: flightNumber.distanceBand,
          },
          {
            label: "EU261 protection",
            value: flightNumber.eu261Eligible ? "Yes" : "No",
          },
          {
            label: "UK261 protection",
            value: flightNumber.uk261Eligible ? "Yes" : "No",
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
                  label: "Schedule snapshot",
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