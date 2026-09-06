import { notFound } from "next/navigation";
import KnowledgePageTemplate from "@/components/seo/KnowledgePageTemplate";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { countries, getCountryBySlug } from "@/data/seo/countries";
import { buildMetadata } from "@/lib/seo/metadata";
import { countrySeoLocales } from "@/lib/seo/alternates";
import InternalLinks from "@/components/seo/InternalLinks";
import { getInternalLinkSections } from "@/lib/seo/internalLinks";
import { buildSwedishCountryLocalization, swedishCountryName } from "@/lib/localization/knowledge-sv";
import { applyKnowledgeLocalization } from "@/lib/localization/entity";
import { getLocaleDefinition } from "@/lib/localization/locales";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return countries.flatMap((country) => countrySeoLocales.map((locale) => ({ locale, slug: country.slug })));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!countrySeoLocales.includes(locale as (typeof countrySeoLocales)[number])) return {};
  const country = getCountryBySlug(slug);
  if (!country) return {};
  const entity = locale === "sv" ? applyKnowledgeLocalization(country, buildSwedishCountryLocalization(country)) : country;
  return buildMetadata({ entity, locale, pathPrefix: "countries", availableLocales: countrySeoLocales });
}

export default async function CountryPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!countrySeoLocales.includes(locale as (typeof countrySeoLocales)[number])) notFound();
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const entity = locale === "sv" ? applyKnowledgeLocalization(country, buildSwedishCountryLocalization(country)) : country;
  const labels = getLocaleDefinition(locale as (typeof countrySeoLocales)[number]).labels;
  const name = locale === "sv" ? swedishCountryName(country.name) : country.name;
  const internalLinkSections = getInternalLinkSections("country", country.slug, locale);
  const facts = locale === "sv"
    ? [{ label: "Land", value: name }, { label: "Regelverk", value: "EU261 när tillämpligt" }, { label: "Högsta standardersättning", value: "€600" }]
    : [{ label: "Country", value: country.name }, { label: "Regulation", value: "EU261" }, { label: "Maximum compensation", value: "€600" }];

  return (
    <main className="min-h-screen bg-slate-50">
      <FAQSchema items={entity.faq} />
      <BreadcrumbSchema items={[
        { name: labels.home, url: `https://www.flightclaimly.com/${locale}` },
        { name: locale === "sv" ? "Länder" : "Countries", url: `https://www.flightclaimly.com/${locale}/countries` },
        { name, url: `https://www.flightclaimly.com/${locale}/countries/${country.slug}` },
      ]} />
      <KnowledgePageTemplate entity={entity} checkUrl={`/${locale}/check/direct-or-layover`} locale={locale} facts={facts} labels={labels} />
      <InternalLinks sections={internalLinkSections} />
    </main>
  );
}
