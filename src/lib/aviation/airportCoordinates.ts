import {
  airportCoordinates,
  type AirportCoordinates,
} from "../../data/master/airportCoordinates";

export function getAirportCoordinates(
  iata: string
): AirportCoordinates | null {
  const normalizedIata = iata.trim().toUpperCase();

  if (!/^[A-Z]{3}$/.test(normalizedIata)) {
    return null;
  }

  return airportCoordinates[normalizedIata] ?? null;
}