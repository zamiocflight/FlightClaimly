import { getAirportCoordinates } from "./airportCoordinates";
import type { FlightNumberSeed } from "../../data/flight-numbers/types";

type DistanceBand = FlightNumberSeed["distanceBand"];

const EARTH_RADIUS_KM = 6371;

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function calculateGreatCircleDistanceKm(
  originIata: string,
  destinationIata: string
): number | null {
  const origin = getAirportCoordinates(originIata);
  const destination = getAirportCoordinates(destinationIata);

  if (!origin || !destination) {
    return null;
  }

  const originLatitude = degreesToRadians(origin.latitude);
  const destinationLatitude = degreesToRadians(destination.latitude);

  const latitudeDifference = degreesToRadians(
    destination.latitude - origin.latitude
  );

  const longitudeDifference = degreesToRadians(
    destination.longitude - origin.longitude
  );

  const haversine =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(originLatitude) *
      Math.cos(destinationLatitude) *
      Math.sin(longitudeDifference / 2) ** 2;

  const angularDistance =
    2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

  return Math.round(EARTH_RADIUS_KM * angularDistance);
}

export function getDistanceBand(distanceKm: number): DistanceBand {
  if (distanceKm <= 1500) {
    return "short";
  }

  if (distanceKm <= 3500) {
    return "medium";
  }

  return "long";
}