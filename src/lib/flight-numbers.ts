import { publishableFlightNumbers } from "@/lib/flight-numbers/catalog";

export function getFlightNumberBySlug(slug: string) {
  return publishableFlightNumbers.find(
    (flightNumber) => flightNumber.slug === slug,
  );
}

export function getFlightNumberByNumber(flightNumber: string) {
  return publishableFlightNumbers.find(
    (item) =>
      item.flightNumber.toLowerCase() === flightNumber.toLowerCase(),
  );
}

export function getAllFlightNumbers() {
  return publishableFlightNumbers;
}