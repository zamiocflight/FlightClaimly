import type { Metadata } from "next";
import type { Airline } from "@/data/seo/airlines";

const SITE_URL = "https://www.flightclaimly.com";

export function buildAirlineMetadata(
  airline: Airline,
  locale: string
): Metadata {
  const url = `${SITE_URL}/${locale}/airlines/${airline.slug}`;
  const title = `${airline.name} flight compensation | FlightClaimly`;

  return {
    title,
    description: airline.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: airline.description,
      url,
      siteName: "FlightClaimly",
      type: "article",
    },
  };
}