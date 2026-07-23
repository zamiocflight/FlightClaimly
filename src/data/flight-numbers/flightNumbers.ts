import type { FlightNumber } from "./types";
import { createFlightNumber } from "./createFlightNumber";
import { flightNumberSeeds } from "./seeds";

export const flightNumbers: FlightNumber[] =
  flightNumberSeeds.map(createFlightNumber);