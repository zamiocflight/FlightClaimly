import { notFound } from "next/navigation";
import KnowledgePageTemplate from "@/components/seo/KnowledgePageTemplate";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { airports, getAirportBySlug } from "@/data/seo/airports";
import { buildMetadata } from "@/lib/seo/metadata";
import { airportSeoLocales } from "@/lib/seo/alternates";
import InternalLinks from "@/components/seo/InternalLinks";
import { getInternalLinkSections } from "@/lib/seo/internalLinks";
import { buildSwedishAirportLocalization, swedishCityName, swedishCountryName } from "@/lib/localization/knowledge-sv";
import { buildDanishAirportLocalization, danishCityName, danishCountryName } from "@/lib/localization/knowledge-da";
import { applyKnowledgeLocalization } from "@/lib/localization/entity";
import { getLocaleDefinition } from "@/lib/localization/locales";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return airports.flatMap((airport) => airportSeoLocales.map((locale) => ({ locale, slug: airport.slug })));
}

function localizeAirport(airport: NonNullable<ReturnType<typeof getAirportBySlug>>, locale: string) {
  if (locale === "sv") return applyKnowledgeLocalization(airport, buildSwedishAirportLocalization(airport));
  if (locale === "da") return applyKnowledgeLocalization(airport, buildDanishAirportLocalization(airport));
  return airport;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!airportSeoLocales.includes(locale as (typeof airportSeoLocales)[number])) return {};
  const airport = getAirportBySlug(slug);
  if (!airport) return {};
  return buildMetadata({ entity: localizeAirport(airport, locale), locale, pathPrefix: "airports", availableLocales: airportSeoLocales });
}

export default async function AirportPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!airportSeoLocales.includes(locale as (typeof airportSeoLocales)[number])) notFound();
  const airport = getAirportBySlug(slug);
  if (!airport) notFound();

  const entity = localizeAirport(airport, locale);
  const labels = getLocaleDefinition(locale as (typeof airportSeoLocales)[number]).labels;
  const city = locale === "sv" ? swedishCityName(airport.city) : locale === "da" ? danishCityName(airport.city) : airport.city;
  const country = locale === "sv" ? swedishCountryName(airport.country) : locale === "da" ? danishCountryName(airport.country) : airport.country;
  const internalLinkSections = getInternalLinkSections("airport", airport.slug, locale);
  const facts = locale === "sv"
    ? [
        { label: "Flygplats", value: airport.name }, { label: "IATA-kod", value: airport.iata },
        { label: "Stad", value: city }, { label: "Land", value: country },
      ]
    : locale === "da"
      ? [
          { label: "Lufthavn", value: airport.name }, { label: "IATA-kode", value: airport.iata },
          { label: "By", value: city }, { label: "Land", value: country },
        ]
      : [
          { label: "Airport", value: airport.name }, { label: "IATA code", value: airport.iata },
          { label: "City", value: airport.city }, { label: "Country", value: airport.country },
        ];

  return (
    <main className="min-h-screen bg-slate-50">
      <FAQSchema items={entity.faq} />
      <BreadcrumbSchema items={[
        { name: labels.home, url: `https://www.flightclaimly.com/${locale}` },
        { name: locale === "sv" ? "Flygplatser" : locale === "da" ? "Lufthavne" : "Airports", url: `https://www.flightclaimly.com/${locale}/airports` },
        { name: airport.name, url: `https://www.flightclaimly.com/${locale}/airports/${airport.slug}` },
      ]} />
      <KnowledgePageTemplate entity={entity} checkUrl={`/${locale}/check/direct-or-layover`} locale={locale} facts={facts} labels={labels} />
      <InternalLinks sections={internalLinkSections} />
    </main>
  );
}
