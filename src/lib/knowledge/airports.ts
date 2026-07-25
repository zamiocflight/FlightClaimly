import {
  airports,
  getAirportBySlug,
} from "@/data/seo/airports";
import {
  airportRegistry,
  type AirportRegistryEntry,
} from "@/data/master/airportRegistry";

export type AirportIdentity = {
  slug: string;
  name: string;
  iata: string;
  city: string;
  country: string;
};

export function getAirportByIata(iata: string) {
  return airports.find(
    (airport) =>
      airport.iata.toUpperCase() === iata.toUpperCase()
  );
}

export function getAirportIdentityBySlug(
  slug: string
): AirportIdentity | undefined {
  const seoAirport = getAirportBySlug(slug);

  if (seoAirport) {
    return {
      slug: seoAirport.slug,
      name: seoAirport.name,
      iata: seoAirport.iata,
      city: seoAirport.city,
      country: seoAirport.country,
    };
  }

  const registryAirport: AirportRegistryEntry | undefined =
    airportRegistry.find((airport) => airport.slug === slug);

  if (!registryAirport) {
    return undefined;
  }

  return {
    slug: registryAirport.slug,
    name: registryAirport.name,
    iata: registryAirport.iata,
    city: registryAirport.city,
    country: registryAirport.country,
  };
}