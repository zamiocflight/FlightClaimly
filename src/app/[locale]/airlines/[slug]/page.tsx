import { notFound } from "next/navigation";

import KnowledgePageTemplate from "@/components/seo/KnowledgePageTemplate";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import InternalLinks from "@/components/seo/InternalLinks";
import { getInternalLinkSections } from "@/lib/seo/internalLinks";

import { getAirlineBySlug, airlines } from "@/data/seo/airlines";
import { buildMetadata } from "@/lib/seo/metadata";
import { resolveAuthority } from "@/lib/authority";


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

  return buildMetadata({
    entity: airline,
    locale,
    pathPrefix: "airlines",
  });
}

export default async function AirlinePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const airline = getAirlineBySlug(slug);

  if (!airline) notFound();

const checkUrl = `/${locale}/check/direct-or-layover`;

const authoritySources = resolveAuthority({
  entityType: "airline",
  slug: airline.slug,
});

const internalLinkSections = getInternalLinkSections(
  "airline",
  airline.slug,
  locale
);

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
        locale={locale}
        authoritySources={authoritySources}
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
<InternalLinks sections={internalLinkSections} />

    </main>
  );
}