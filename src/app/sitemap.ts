// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { routes as flightRoutes } from "@/data/seo/routes";
import {
  publishableFlightNumbers,
  flightNumberAirlineGroups,
} from "@/lib/flight-numbers/catalog";
import { airports } from "@/data/seo/airports";
import { airlines } from "@/data/seo/airlines";
import { countries } from "@/data/seo/countries";
import { delayReasons } from "@/data/delay-reasons/delayReasons";
import { getRouteSitemapEntry } from "@/lib/seo/routes";
import {
  routeSeoLocales,
  airportSeoLocales,
  airlineSeoLocales,
  countrySeoLocales,
  delayReasonSeoLocales,
  flightNumberSeoLocales,
} from "@/lib/seo/alternates";

function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    "http://localhost:3000";

  return raw.replace(/\/+$/, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const staticRoutes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "daily", priority: 1.0 },
    { path: "delays", changeFrequency: "weekly", priority: 0.9 },
    { path: "cancellations", changeFrequency: "weekly", priority: 0.9 },
    { path: "rights", changeFrequency: "weekly", priority: 0.9 },
    { path: "faq", changeFrequency: "monthly", priority: 0.7 },
    { path: "about", changeFrequency: "monthly", priority: 0.6 },
    { path: "contact", changeFrequency: "monthly", priority: 0.6 },
    { path: "privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => {
      const url =
        route.path === ""
          ? `${siteUrl}/${locale}`
          : `${siteUrl}/${locale}/${route.path}`;

      return {
        url,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      };
    }),
  );

  const routeIndexEntries = routeSeoLocales.map((locale) => ({
    url: `${siteUrl}/${locale}/routes`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const routeEntries = routeSeoLocales.flatMap((locale) =>
    flightRoutes.map((route) => getRouteSitemapEntry(route, locale, siteUrl)),
  );

  const airportIndexEntries = airportSeoLocales.map((locale) => ({
    url: `${siteUrl}/${locale}/airports`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const airportEntries = airportSeoLocales.flatMap((locale) =>
    airports.map((airport) => ({
      url: `${siteUrl}/${locale}/airports/${airport.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  const airlineIndexEntries = airlineSeoLocales.map((locale) => ({
    url: `${siteUrl}/${locale}/airlines`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const airlineEntries = airlineSeoLocales.flatMap((locale) =>
    airlines.map((airline) => ({
      url: `${siteUrl}/${locale}/airlines/${airline.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  const countryIndexEntries = countrySeoLocales.map((locale) => ({
    url: `${siteUrl}/${locale}/countries`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const countryEntries = countrySeoLocales.flatMap((locale) =>
    countries.map((country) => ({
      url: `${siteUrl}/${locale}/countries/${country.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  const delayReasonIndexEntries = delayReasonSeoLocales.map((locale) => ({
    url: `${siteUrl}/${locale}/delay-reasons`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const delayReasonEntries = delayReasonSeoLocales.flatMap((locale) =>
    delayReasons.map((reason) => ({
      url: `${siteUrl}/${locale}/delay-reasons/${reason.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  const flightNumberIndexEntries = flightNumberSeoLocales.map((locale) => ({
    url: `${siteUrl}/${locale}/flight-numbers`,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const flightNumberAirlineIndexEntries = flightNumberSeoLocales.flatMap(
    (locale) =>
      flightNumberAirlineGroups.map((group) => ({
        url: `${siteUrl}/${locale}/flight-numbers/airline/${group.airlineSlug}`,
        changeFrequency: "daily" as const,
        priority: 0.8,
      }))
  );

  const flightNumberEntries = flightNumberSeoLocales.flatMap((locale) =>
    publishableFlightNumbers.map((flightNumber) => ({
      url: `${siteUrl}/${locale}/flight-numbers/${flightNumber.slug}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  );

  return [
    ...staticEntries,
    ...routeIndexEntries,
    ...routeEntries,
    ...airportIndexEntries,
    ...airportEntries,
    ...airlineIndexEntries,
    ...airlineEntries,
    ...countryIndexEntries,
    ...countryEntries,
    ...delayReasonIndexEntries,
    ...delayReasonEntries,
    ...flightNumberIndexEntries,
    ...flightNumberAirlineIndexEntries,
    ...flightNumberEntries,
  ];
}
