import { notFound } from "next/navigation";
import { getRouteBySlug, routes, } from "@/data/seo/routes";
import KnowledgePageTemplate from "@/components/seo/KnowledgePageTemplate";
import RelatedRoutes from "@/components/seo/RelatedRoutes";
import RelatedAirports from "@/components/seo/RelatedAirports";
import RelatedAirlines from "@/components/seo/RelatedAirlines";
import { getRelatedRoutes } from "@/lib/knowledge/routes";
import { getRouteMetadata } from "@/lib/seo/routes";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return routes.map((route) => ({
    slug: route.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const route = getRouteBySlug(slug);

  if (!route) {
    return {};
  }

  return getRouteMetadata(route);
}

export default async function RoutePage({ params }: Props) {
  const { locale, slug } = await params;

  const route = getRouteBySlug(slug);

  if (!route) {
    notFound();
  }

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

return (
  <>
    <KnowledgePageTemplate
      entity={route}
      checkUrl={`/${locale}/check`}
      facts={facts}
      locale={locale}
    />

<RelatedAirports
  title="Airports on this route"
  airports={[route.origin, route.destination]}
  locale={locale}
/>

<section className="px-6 py-16">
  <div className="mx-auto max-w-5xl">
    <RelatedAirlines
      currentSlug=""
      airlines={route.airlines}
      locale={locale}
    />
  </div>
</section>

    <RelatedRoutes
      title={`More routes from ${route.origin.city}`}
      routes={relatedRoutes}
      locale={locale}
    />
  </>
);
}