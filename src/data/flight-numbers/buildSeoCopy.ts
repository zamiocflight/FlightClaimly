import type { FlightNumberBuildContext } from "./context";
import type { FlightNumber } from "./types";

type FlightNumberSeo = Pick<
  FlightNumber,
  | "title"
  | "description"
  | "intro"
  | "overview"
  | "passengerRights"
  | "compensationIntro"
  | "compensationRules"
  | "statisticsIntro"
  | "timelineIntro"
>;

export function buildFlightNumberSeoCopy({
  airline,
  flightNumber,
  route,
  routeLabel,
  eu261Eligible,
  uk261Eligible,
}: FlightNumberBuildContext): FlightNumberSeo {
  const regulationLabel = eu261Eligible && uk261Eligible
    ? "EU261 or UK261"
    : eu261Eligible
      ? "EU261"
      : uk261Eligible
        ? "UK261"
        : "applicable passenger-rights rules";

  return {
    title: `${airline.name} ${flightNumber} Flight Compensation`,

    description: `Claim compensation for delayed or cancelled ${airline.name} flight ${flightNumber} from ${route.origin.city} to ${route.destination.city} under ${regulationLabel}.`,

    intro: `${airline.name} flight ${flightNumber} is a scheduled service operating from ${route.origin.name} to ${route.destination.name}.`,

    overview: `Passengers travelling on ${airline.name} flight ${flightNumber} between ${route.origin.city} and ${route.destination.city} may be entitled to compensation if the flight was delayed, cancelled or heavily disrupted.`,

    passengerRights:
      eu261Eligible || uk261Eligible
        ? `Passengers on ${flightNumber} may be protected by ${regulationLabel} when the flight is delayed, cancelled or disrupted.`
        : `Passenger-rights protection for ${flightNumber} depends on the departure airport, destination, operating airline and circumstances of the disruption.`,

    compensationIntro: `Passengers on ${flightNumber} may be entitled to compensation depending on the route, disruption and final arrival delay.`,

    compensationRules: `Eligible passengers travelling on ${flightNumber} may receive compensation when the disruption was within the airline's control and the legal requirements for the ${routeLabel} route are met.`,

    statisticsIntro: `The statistics below summarise the passenger-rights framework that may apply to ${flightNumber}.`,

    timelineIntro: `Once your ${flightNumber} claim has been submitted, FlightClaimly guides you through the compensation process.`,
  };
}
