import type { Metadata } from "next";
import type { MetadataRoute } from "next";
import type { FlightRoute } from "@/data/seo/routes";

export function getRouteMetadata(
  route: FlightRoute,
  locale = "en",
  siteUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    "https://www.flightclaimly.com"
): Metadata {
  const canonical = getRouteCanonical(
    route,
    locale,
    siteUrl.replace(/\/+$/, "")
  );

  return {
    title: route.title,
    description: route.description,

    alternates: {
      canonical,
    },

    openGraph: {
      title: route.title,
      description: route.description,
      url: canonical,
      siteName: "FlightClaimly",
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