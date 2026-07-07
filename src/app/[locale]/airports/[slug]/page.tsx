import { notFound } from "next/navigation";

import KnowledgePageTemplate from "@/components/seo/KnowledgePageTemplate";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

import { airports, getAirportBySlug } from "@/data/seo/airports";
import { buildMetadata } from "@/lib/seo/metadata";
import RelatedKnowledge from "@/components/seo/RelatedKnowledge";
import { getRelatedKnowledge } from "@/lib/seo/relationships";

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

  const relatedKnowledge = getRelatedKnowledge(
  airport.slug,
  locale,
  ["airline", "law", "article"]
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
      <section className="px-6 py-12">
  <div className="mx-auto max-w-5xl">
    <RelatedKnowledge
      title="Related airlines and guides"
      items={relatedKnowledge}
    />
  </div>
</section>
    </main>
  );
}