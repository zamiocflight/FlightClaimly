import type { FlightRoute } from "@/data/seo/routes";
import { authorityRules } from "@/data/authority/rules";
import { getAuthoritySources } from "./registry";

const EU_COUNTRIES = new Set([
  "Austria",
  "Belgium",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Ireland",
  "Italy",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Netherlands",
  "Poland",
  "Portugal",
  "Romania",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
]);

function isEUCountry(country: string) {
  return EU_COUNTRIES.has(country);
}

export function getRouteAuthority(route: FlightRoute) {
  if (
    isEUCountry(route.origin.country) &&
    isEUCountry(route.destination.country)
  ) {
    const rule = authorityRules.find((rule) => rule.id === "eu-to-eu");

    if (rule) {
      return getAuthoritySources(rule.authorityIds);
    }
  }

  return [];
}