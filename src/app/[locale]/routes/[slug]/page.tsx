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
import { buildDanishRouteLocalization, danishCityName, danishCountryName } from "@/lib/localization/knowledge-da";
import { buildPolishRouteLocalization, polishCityName, polishCountryName } from "@/lib/localization/knowledge-pl";
import { applyKnowledgeLocalization } from "@/lib/localization/entity";
import { getLocaleDefinition } from "@/lib/localization/locales";
const PREVIEW_STATIC_SAMPLE_SIZE = 24; export const dynamicParams = true;
type Props = { params: Promise<{ locale: string; slug: string }> };
function getRoutesForStaticBuild() { return process.env.VERCEL_ENV === "preview" ? routes.slice(0, PREVIEW_STATIC_SAMPLE_SIZE) : routes; }
export function generateStaticParams() { return getRoutesForStaticBuild().flatMap((route) => routeSeoLocales.map((locale) => ({ locale, slug: route.slug }))); }
function localizeRoute(route: FlightRoute, locale: string) { if (locale === "sv") return applyKnowledgeLocalization(route, buildSwedishRouteLocalization(route)); if (locale === "da") return applyKnowledgeLocalization(route, buildDanishRouteLocalization(route)); if (locale === "pl") return applyKnowledgeLocalization(route, buildPolishRouteLocalization(route)); return route; }
function cityName(value: string, locale: string) { if (locale === "sv") return swedishCityName(value); if (locale === "da") return danishCityName(value); if (locale === "pl") return polishCityName(value); return value; }
function countryName(value: string, locale: string) { if (locale === "sv") return swedishCountryName(value); if (locale === "da") return danishCountryName(value); if (locale === "pl") return polishCountryName(value); return value; }
export async function generateMetadata({ params }: Props) { const { locale, slug } = await params; if (!routeSeoLocales.includes(locale as (typeof routeSeoLocales)[number])) return {}; const route = getRouteBySlug(slug); if (!route) return {}; return buildMetadata({ entity: localizeRoute(route, locale), locale, pathPrefix: "routes", availableLocales: routeSeoLocales }); }
export default async function RoutePage({ params }: Props) {
  const { locale, slug } = await params; if (!routeSeoLocales.includes(locale as (typeof routeSeoLocales)[number])) notFound(); const route = getRouteBySlug(slug); if (!route) notFound();
  const localizedRoute = localizeRoute(route, locale); const labels = getLocaleDefinition(locale as (typeof routeSeoLocales)[number]).labels; const originCity = cityName(route.origin.city, locale), destinationCity = cityName(route.destination.city, locale), originCountry = countryName(route.origin.country, locale), destinationCountry = countryName(route.destination.country, locale);
  const authoritySources = resolveAuthority<FlightRoute>({ entityType: "route", slug: route.slug, entity: route });
  const facts = locale === "sv" ? [{ label: "Flygsträcka", value: `${originCity} → ${destinationCity}` }, { label: "Avgångsflygplats", value: `${route.origin.name} (${route.origin.iata})` }, { label: "Destinationsflygplats", value: `${route.destination.name} (${route.destination.iata})` }, { label: "Länder", value: `${originCountry} → ${destinationCountry}` }]
    : locale === "da" ? [{ label: "Rute", value: `${originCity} → ${destinationCity}` }, { label: "Afgangslufthavn", value: `${route.origin.name} (${route.origin.iata})` }, { label: "Destinationslufthavn", value: `${route.destination.name} (${route.destination.iata})` }, { label: "Lande", value: `${originCountry} → ${destinationCountry}` }]
    : locale === "pl" ? [{ label: "Trasa", value: `${originCity} → ${destinationCity}` }, { label: "Lotnisko wylotu", value: `${route.origin.name} (${route.origin.iata})` }, { label: "Lotnisko docelowe", value: `${route.destination.name} (${route.destination.iata})` }, { label: "Kraje", value: `${originCountry} → ${destinationCountry}` }]
    : [{ label: "Route", value: `${route.origin.city} → ${route.destination.city}` }, { label: "Origin airport", value: `${route.origin.name} (${route.origin.iata})` }, { label: "Destination airport", value: `${route.destination.name} (${route.destination.iata})` }, { label: "Countries", value: `${route.origin.country} → ${route.destination.country}` }];
  const relatedRoutes = getRelatedRoutes(route), internalLinkSections = getInternalLinkSections("route", route.slug, locale);
  const breadcrumbItems = [{ name: labels.home, url: `https://www.flightclaimly.com/${locale}` }, { name: locale === "sv" ? "Flygsträckor" : locale === "da" ? "Flyruter" : locale === "pl" ? "Trasy lotów" : "Routes", url: `https://www.flightclaimly.com/${locale}/routes` }, { name: `${originCity}–${destinationCity}`, url: `https://www.flightclaimly.com/${locale}/routes/${route.slug}` }];
  return <><BreadcrumbSchema items={breadcrumbItems} /><FAQSchema items={localizedRoute.faq} /><KnowledgePageTemplate entity={localizedRoute} checkUrl={`/${locale}/check`} facts={facts} locale={locale} authoritySources={authoritySources} labels={labels} /><InternalLinks sections={internalLinkSections} /><RelatedRoutes title={locale === "sv" ? `Fler flygsträckor från ${originCity}` : locale === "da" ? `Flere flyruter fra ${originCity}` : locale === "pl" ? `Więcej tras z ${originCity}` : `More routes from ${route.origin.city}`} routes={relatedRoutes} locale={locale} /></>;
}
