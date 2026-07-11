import { notFound } from "next/navigation";

import KnowledgePageTemplate from "@/components/seo/KnowledgePageTemplate";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

import { airports, getAirportBySlug } from "@/data/seo/airports";
import { buildMetadata } from "@/lib/seo/metadata";
import InternalLinks from "@/components/seo/InternalLinks";
import { getInternalLinkSections } from "@/lib/seo/internalLinks";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return airports.flatMap((airport) =>
    ["sv", "en"].map((locale) => ({
      locale,
      slug: airport.slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;

  const airport = getAirportBySlug(slug);

  if (!airport) return {};

  return buildMetadata({
    entity: airport,
    locale,
    pathPrefix: "airports",
  });
}

export default async function AirportPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const airport = getAirportBySlug(slug);

  if (!airport) notFound();

  const checkUrl = `/${locale}/check/direct-or-layover`;

const internalLinkSections = getInternalLinkSections(
  "airport",
  airport.slug,
  locale
);

  return (
    <main className="min-h-screen bg-slate-50">
      <FAQSchema items={airport.faq} />

      <BreadcrumbSchema
        items={[
          { name: "Home", url: `https://www.flightclaimly.com/${locale}` },
          {
            name: "Airports",
            url: `https://www.flightclaimly.com/${locale}/airports`,
          },
          {
            name: airport.name,
            url: `https://www.flightclaimly.com/${locale}/airports/${airport.slug}`,
          },
        ]}
      />

      <KnowledgePageTemplate
        entity={airport}
        checkUrl={checkUrl}
        locale={locale}
        facts={[
          { label: "Airport", value: airport.name },
          { label: "IATA code", value: airport.iata },
          { label: "City", value: airport.city },
          { label: "Country", value: airport.country },
        ]}
      />
<InternalLinks sections={internalLinkSections} />
    </main>
  );
}