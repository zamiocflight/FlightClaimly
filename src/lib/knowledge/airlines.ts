import { airlines } from "@/data/seo/airlines";

export function getAirlineByIata(iata: string) {
  return airlines.find(
    (airline) => airline.iata.toUpperCase() === iata.toUpperCase()
  );
}

export function getAirlinesBySlugs(slugs: string[]) {
  return airlines.filter((airline) => slugs.includes(airline.slug));
}