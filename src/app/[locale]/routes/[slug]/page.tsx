import { notFound } from "next/navigation";
import { getRouteBySlug, routes } from "@/data/seo/routes";
import KnowledgePageTemplate from "@/components/seo/KnowledgePageTemplate";
import RelatedRoutes from "@/components/seo/RelatedRoutes";
import InternalLinks from "@/components/seo/InternalLinks";
import { getInternalLinkSections } from "@/lib/seo/internalLinks";
import { getRelatedRoutes } from "@/lib/knowledge/routes";
import { getRouteBreadcrumbs, getRouteMetadata } from "@/lib/seo/routes";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import { resolveAuthority } from "@/lib/authority/resolver";
import type { FlightRoute } from "@/data/seo/routes";

const PREVIEW_STATIC_SAMPLE_SIZE = 24;

export const dynamicParams = true;

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function getRoutesForStaticBuild() {
  if (process.env.VERCEL_ENV === "preview") {
    return routes.slice(0, PREVIEW_STATIC_SAMPLE_SIZE);
  }

  return routes;
}

export function generateStaticParams() {
  return getRoutesForStaticBuild().map((route) => ({
    locale: "en",
    slug: route.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;

  if (locale !== "en") {
    return {};
  }

  const route = getRouteBySlug(slug);

  if (!route) {
    return {};
  }

  return getRouteMetadata(route, locale);
}

export default async function RoutePage({ params }: Props) {
  const { locale, slug } = await params;

  if (locale !== "en") {
    notFound();
  }

  const route = getRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  const authoritySources = resolveAuthority<FlightRoute>({
    entityType: "route",
    slug: route.slug,
    entity: route,
  });

  const facts = [
    {
      label: "Route",
      value: `${route.origin.city} → ${route.destination.city}`,
    },
    {
      label: "Origin airport",
      value: `${route.origin.name} (${route.origin.iata})`,
    },
    {
      label: "Destination airport",
      value: `${route.destination.name} (${route.destination.iata})`,
    },
    {
      label: "Countries",
      value: `${route.origin.country} → ${route.destination.country}`,
    },
  ];

  const relatedRoutes = getRelatedRoutes(route);

  const internalLinkSections = getInternalLinkSections(
    "route",
    route.slug,
    locale,
  );

  const breadcrumbItems = getRouteBreadcrumbs(route, locale).map((item) => ({
    name: item.label,
    url: item.href,
  }));

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema items={route.faq} />

      <KnowledgePageTemplate
        entity={route}
        checkUrl={`/${locale}/check`}
        facts={facts}
        locale={locale}
        authoritySources={authoritySources}
      />

      <InternalLinks sections={internalLinkSections} />

      <RelatedRoutes
        title={`More routes from ${route.origin.city}`}
        routes={relatedRoutes}
        locale={locale}
      />
    </>
  );
}
