import { flightNumbers } from "@/data/master/flightNumbers";

export function getFlightNumberBySlug(slug: string) {
  return flightNumbers.find(
    (flightNumber) => flightNumber.slug === slug,
  );
}

export function getFlightNumberByNumber(flightNumber: string) {
  return flightNumbers.find(
    (item) =>
      item.flightNumber.toLowerCase() === flightNumber.toLowerCase(),
  );
}

export function getAllFlightNumbers() {
  return flightNumbers;
}