import { notFound } from "next/navigation";
import KnowledgePageTemplate from "@/components/seo/KnowledgePageTemplate";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import InternalLinks from "@/components/seo/InternalLinks";
import { getInternalLinkSections } from "@/lib/seo/internalLinks";
import { getAirlineBySlug, airlines } from "@/data/seo/airlines";
import { buildMetadata } from "@/lib/seo/metadata";
import { airlineSeoLocales } from "@/lib/seo/alternates";
import { resolveAuthority } from "@/lib/authority";
import { buildSwedishAirlineLocalization, swedishCountryName } from "@/lib/localization/knowledge-sv";
import { buildDanishAirlineLocalization, danishCountryName } from "@/lib/localization/knowledge-da";
import { applyKnowledgeLocalization } from "@/lib/localization/entity";
import { getLocaleDefinition } from "@/lib/localization/locales";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return airlines.flatMap((airline) => airlineSeoLocales.map((locale) => ({ locale, slug: airline.slug })));
}

function localizeAirline(airline: NonNullable<ReturnType<typeof getAirlineBySlug>>, locale: string) {
  if (locale === "sv") return applyKnowledgeLocalization(airline, buildSwedishAirlineLocalization(airline));
  if (locale === "da") return applyKnowledgeLocalization(airline, buildDanishAirlineLocalization(airline));
  return airline;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!airlineSeoLocales.includes(locale as (typeof airlineSeoLocales)[number])) return {};
  const airline = getAirlineBySlug(slug);
  if (!airline) return {};
  return buildMetadata({ entity: localizeAirline(airline, locale), locale, pathPrefix: "airlines", availableLocales: airlineSeoLocales });
}

export default async function AirlinePage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!airlineSeoLocales.includes(locale as (typeof airlineSeoLocales)[number])) notFound();
  const airline = getAirlineBySlug(slug);
  if (!airline) notFound();

  const entity = localizeAirline(airline, locale);
  const labels = getLocaleDefinition(locale as (typeof airlineSeoLocales)[number]).labels;
  const country = locale === "sv" ? swedishCountryName(airline.country) : locale === "da" ? danishCountryName(airline.country) : airline.country;
  const authoritySources = resolveAuthority({ entityType: "airline", slug: airline.slug });
  const internalLinkSections = getInternalLinkSections("airline", airline.slug, locale);
  const facts = [
    { label: locale === "sv" ? "Flygbolag" : locale === "da" ? "Flyselskab" : "Airline", value: airline.name },
    { label: locale === "da" ? "IATA-kode" : "IATA-kod", value: airline.iata },
    ...(airline.icao ? [{ label: locale === "da" ? "ICAO-kode" : "ICAO-kod", value: airline.icao }] : []),
    { label: locale === "sv" ? "Land" : locale === "da" ? "Land" : "Country", value: country },
    ...(airline.headquarters ? [{ label: locale === "sv" ? "Huvudkontor" : locale === "da" ? "Hovedkontor" : "Headquarters", value: airline.headquarters }] : []),
    ...(airline.founded ? [{ label: locale === "sv" ? "Grundat" : locale === "da" ? "Grundlagt" : "Founded", value: airline.founded }] : []),
    ...(airline.mainHub ? [{ label: locale === "sv" ? "Huvudnav" : locale === "da" ? "Primær hub" : "Main hub", value: airline.mainHub }] : []),
    ...(airline.fleetSize ? [{ label: locale === "sv" ? "Flottstorlek" : locale === "da" ? "Flådestørrelse" : "Fleet size", value: airline.fleetSize }] : []),
    ...(airline.destinations ? [{ label: locale === "sv" ? "Destinationer" : locale === "da" ? "Destinationer" : "Destinations", value: airline.destinations }] : []),
    ...(airline.alliance ? [{ label: "Alliance", value: airline.alliance }] : []),
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <FAQSchema items={entity.faq} />
      <BreadcrumbSchema items={[
        { name: labels.home, url: `https://www.flightclaimly.com/${locale}` },
        { name: locale === "sv" ? "Flygbolag" : locale === "da" ? "Flyselskaber" : "Airlines", url: `https://www.flightclaimly.com/${locale}/airlines` },
        { name: airline.name, url: `https://www.flightclaimly.com/${locale}/airlines/${airline.slug}` },
      ]} />
      <KnowledgePageTemplate entity={entity} checkUrl={`/${locale}/check/direct-or-layover`} locale={locale} authoritySources={authoritySources} facts={facts} labels={labels} />
      <InternalLinks sections={internalLinkSections} />
    </main>
  );
}
