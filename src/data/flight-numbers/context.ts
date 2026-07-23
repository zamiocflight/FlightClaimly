import type { Airline } from "@/data/seo/shared/types";

type FlightRoute =
  (typeof import("@/data/seo/routes").routes)[number];

export type FlightNumberBuildContext = {
  airline: Airline;
  route: FlightRoute;

  flightNumber: string;
  routeLabel: string;

  eu261Eligible: boolean;
};