import { notFound } from "next/navigation";
import { getRouteBySlug, routes } from "@/data/seo/routes";
import KnowledgePageTemplate from "@/components/seo/KnowledgePageTemplate";
import RelatedRoutes from "@/components/seo/RelatedRoutes";
import InternalLinks from "@/components/seo/InternalLinks";
import { getInternalLinkSections } from "@/lib/seo/internalLinks";
import { getRelatedRoutes } from "@/lib/knowledge/routes";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import { resolveAuthority } from "@/lib/authority/resolver";
import type { FlightRoute } from "@/data/seo/routes";
import { routeSeoLocales } from "@/lib/seo/alternates";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildSwedishRouteLocalization, swedishCityName, swedishCountryName } from "@/lib/localization/knowledge-sv";
import { applyKnowledgeLocalization } from "@/lib/localization/entity";
import { getLocaleDefinition } from "@/lib/localization/locales";

const PREVIEW_STATIC_SAMPLE_SIZE = 24;
export const dynamicParams = true;

type Props = { params: Promise<{ locale: string; slug: string }> };

function getRoutesForStaticBuild() {
  return process.env.VERCEL_ENV === "preview" ? routes.slice(0, PREVIEW_STATIC_SAMPLE_SIZE) : routes;
}

export function generateStaticParams() {
  return getRoutesForStaticBuild().flatMap((route) =>
    routeSeoLocales.map((locale) => ({ locale, slug: route.slug })),
  );
}

function localizeRoute(route: FlightRoute, locale: string) {
  return locale === "sv" ? applyKnowledgeLocalization(route, buildSwedishRouteLocalization(route)) : route;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (!routeSeoLocales.includes(locale as (typeof routeSeoLocales)[number])) return {};
  const route = getRouteBySlug(slug);
  if (!route) return {};
  return buildMetadata({ entity: localizeRoute(route, locale), locale, pathPrefix: "routes", availableLocales: routeSeoLocales });
}

export default async function RoutePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!routeSeoLocales.includes(locale as (typeof routeSeoLocales)[number])) notFound();
  const route = getRouteBySlug(slug);
  if (!route) notFound();

  const localizedRoute = localizeRoute(route, locale);
  const labels = getLocaleDefinition(locale as (typeof routeSeoLocales)[number]).labels;
  const originCity = locale === "sv" ? swedishCityName(route.origin.city) : route.origin.city;
  const destinationCity = locale === "sv" ? swedishCityName(route.destination.city) : route.destination.city;
  const originCountry = locale === "sv" ? swedishCountryName(route.origin.country) : route.origin.country;
  const destinationCountry = locale === "sv" ? swedishCountryName(route.destination.country) : route.destination.country;

  const authoritySources = resolveAuthority<FlightRoute>({ entityType: "route", slug: route.slug, entity: route });
  const facts = locale === "sv"
    ? [
        { label: "Flygsträcka", value: `${originCity} → ${destinationCity}` },
        { label: "Avgångsflygplats", value: `${route.origin.name} (${route.origin.iata})` },
        { label: "Destinationsflygplats", value: `${route.destination.name} (${route.destination.iata})` },
        { label: "Länder", value: `${originCountry} → ${destinationCountry}` },
      ]
    : [
        { label: "Route", value: `${route.origin.city} → ${route.destination.city}` },
        { label: "Origin airport", value: `${route.origin.name} (${route.origin.iata})` },
        { label: "Destination airport", value: `${route.destination.name} (${route.destination.iata})` },
        { label: "Countries", value: `${route.origin.country} → ${route.destination.country}` },
      ];

  const relatedRoutes = getRelatedRoutes(route);
  const internalLinkSections = getInternalLinkSections("route", route.slug, locale);
  const breadcrumbItems = [
    { name: labels.home, url: `https://www.flightclaimly.com/${locale}` },
    { name: locale === "sv" ? "Flygsträckor" : "Routes", url: `https://www.flightclaimly.com/${locale}/routes` },
    { name: `${originCity}–${destinationCity}`, url: `https://www.flightclaimly.com/${locale}/routes/${route.slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema items={localizedRoute.faq} />
      <KnowledgePageTemplate entity={localizedRoute} checkUrl={`/${locale}/check`} facts={facts} locale={locale} authoritySources={authoritySources} labels={labels} />
      <InternalLinks sections={internalLinkSections} />
      <RelatedRoutes title={locale === "sv" ? `Fler flygsträckor från ${originCity}` : `More routes from ${route.origin.city}`} routes={relatedRoutes} locale={locale} />
    </>
  );
}
