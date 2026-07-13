import type { Airline } from "@/data/seo/shared/types";
import type { EntityTraits } from "@/lib/knowledge/relevance";
import type { Airport } from "@/data/seo/airports";

export function deriveAirlineTraits(
  airline: Airline
): EntityTraits {
  const derivedTraits: EntityTraits = {
    hub:
      Boolean(airline.mainHub) ||
      Boolean(airline.hubs?.length),

    popular:
      (airline.destinations ?? 0) >= 100 ||
      (airline.fleetSize ?? 0) >= 100,
  };

  return {
    ...derivedTraits,
    ...airline.traits,
  };
}
export function deriveAirportTraits(
  airport: Airport
): EntityTraits {
  const airlineCount = airport.mainAirlines?.length ?? 0;

  return {
    hub: airlineCount >= 5,
    popular: airlineCount >= 8,
    international: airlineCount > 0,
  };
}