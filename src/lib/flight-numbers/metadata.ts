import type { Metadata } from "next";
import type { FlightNumber } from "@/data/flight-numbers/types";
import { buildMetadata } from "@/lib/seo/metadata";

export function buildFlightNumberMetadata(
  flightNumber: FlightNumber,
  locale: string,
): Metadata {
  return buildMetadata({
    entity: {
      slug: flightNumber.slug,
      name: flightNumber.flightNumber,
      description: flightNumber.description,
    },
    locale,
    pathPrefix: "flight-numbers",
    titleSuffix: "flight compensation",
  });
}