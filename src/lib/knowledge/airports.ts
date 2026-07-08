import { airports } from "@/data/seo/airports";

export function getAirportByIata(iata: string) {
  return airports.find(
    (airport) => airport.iata.toUpperCase() === iata.toUpperCase()
  );
}