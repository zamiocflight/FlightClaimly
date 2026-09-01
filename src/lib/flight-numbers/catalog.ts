import { flightNumbers } from "@/data/master/flightNumbers";
import { isFlightNumberPublishable } from "@/data/flight-numbers/publication";

export const publishableFlightNumbers = flightNumbers.filter(
  isFlightNumberPublishable
);

export type FlightNumberAirlineGroup = {
  airlineSlug: string;
  airlineName: string;
  airlineIata: string;
  flightNumbers: typeof publishableFlightNumbers;
};

export const flightNumberAirlineGroups: FlightNumberAirlineGroup[] = [
  ...publishableFlightNumbers
    .reduce((groups, flightNumber) => {
      const existing = groups.get(flightNumber.airline);

      if (existing) {
        existing.flightNumbers.push(flightNumber);
        return groups;
      }

      groups.set(flightNumber.airline, {
        airlineSlug: flightNumber.airline,
        airlineName: flightNumber.airlineName,
        airlineIata: flightNumber.airlineIata,
        flightNumbers: [flightNumber],
      });

      return groups;
    }, new Map<string, FlightNumberAirlineGroup>())
    .values(),
].sort((a, b) => a.airlineName.localeCompare(b.airlineName));

for (const group of flightNumberAirlineGroups) {
  group.flightNumbers.sort((a, b) =>
    a.flightNumber.localeCompare(b.flightNumber, "en", {
      numeric: true,
      sensitivity: "base",
    })
  );
}

export function getFlightNumberAirlineGroup(
  airlineSlug: string
): FlightNumberAirlineGroup | undefined {
  return flightNumberAirlineGroups.find(
    (group) => group.airlineSlug === airlineSlug
  );
}
