// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { routes as flightRoutes } from "@/data/seo/routes";
import { flightNumbers } from "@/data/master/flightNumbers";
import { getRouteSitemapEntry } from "@/lib/seo/routes";

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
    { path: "routes", changeFrequency: "weekly", priority: 0.9 },
    { path: "delays", changeFrequency: "weekly", priority: 0.9 },
    { path: "cancellations", changeFrequency: "weekly", priority: 0.9 },
    { path: "rights", changeFrequency: "weekly", priority: 0.9 },
    { path: "faq", changeFrequency: "monthly", priority: 0.7 },
    { path: "about", changeFrequency: "monthly", priority: 0.6 },
    { path: "contact", changeFrequency: "monthly", priority: 0.6 },
    { path: "privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  const flightNumberLocales = ["sv", "en"];

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
    })
  );

  const routeEntries = locales.flatMap((locale) =>
    flightRoutes.map((route) => getRouteSitemapEntry(route, locale, siteUrl))
  );

const flightNumberEntries = flightNumberLocales.flatMap((locale) =>
  flightNumbers.map((flightNumber) => ({
    url: `${siteUrl}/${locale}/flight-numbers/${flightNumber.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))
);

  return [
  ...staticEntries,
  ...routeEntries,
  ...flightNumberEntries,
];
}