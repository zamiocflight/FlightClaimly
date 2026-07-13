import type { Airline } from "@/data/seo/shared/types";
import type { EntityTraits } from "@/lib/knowledge/relevance";

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