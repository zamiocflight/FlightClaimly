import type { Metadata } from "next";
import type { MetadataRoute } from "next";
import type { FlightRoute } from "@/data/seo/routes";

export function getRouteMetadata(route: FlightRoute): Metadata {
  return {
    title: route.title,
    description: route.description,

    openGraph: {
      title: route.title,
      description: route.description,
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
    },
  };
}

export function getRouteCanonical(
  route: FlightRoute,
  locale: string,
  siteUrl: string
) {
  return `${siteUrl}/${locale}/routes/${route.slug}`;
}

export function getRouteBreadcrumbs(
  route: FlightRoute,
  locale: string
) {
  return [
    {
      label: "Routes",
      href: `/${locale}/routes`,
    },
    {
      label: `${route.origin.city} → ${route.destination.city}`,
      href: `/${locale}/routes/${route.slug}`,
    },
  ];
}

export function getRouteSitemapEntry(
  route: FlightRoute,
  locale: string,
  siteUrl: string
): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteUrl}/${locale}/routes/${route.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  };
}