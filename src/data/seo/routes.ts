import { standardClaimProcess } from "./shared/claimProcess";
import { standardCommonIssues } from "./shared/commonIssues";
import { standardFAQ } from "./shared/faq";
import type {
  CompensationAmount,
  FAQ,
  Statistic,
  TimelineStep,
  Airline,
} from "./shared/types";
import { getAirportByIata } from "@/lib/knowledge/airports";
import { getAirlinesBySlugs } from "@/lib/knowledge/airlines";

export type RouteGroupSeed = {
  origin: string;
  destinations: string[];
  airlines?: string[];
};

export type FlightRoute = {
  slug: string;
  name: string;

  origin: {
    slug: string;
    name: string;
    iata: string;
    city: string;
    country: string;
  };

  destination: {
    slug: string;
    name: string;
    iata: string;
    city: string;
    country: string;
  };

  airlines: Airline[];

  title: string;
  description: string;
  intro: string;
  overview: string;

  passengerRights: string;

  compensationIntro: string;
  compensationAmounts: CompensationAmount[];
  compensationRules: string;

  statisticsIntro: string;
  statistics: Statistic[];

  timelineIntro: string;
  timeline: TimelineStep[];

  claimProcess: string[];
  commonIssues: string[];
  faq: FAQ[];
};

const standardCompensationAmounts: CompensationAmount[] = [
  {
    label: "Up to 1,500 km",
    distance: "Short-haul flights",
    amount: "€250",
  },
  {
    label: "1,500–3,500 km",
    distance: "Medium-haul flights",
    amount: "€400",
  },
  {
    label: "Over 3,500 km",
    distance: "Long-haul flights",
    amount: "€600",
  },
];

const standardStatistics: Statistic[] = [
  {
    label: "Maximum compensation",
    value: "€600",
    description: "Per passenger under EU261.",
  },
  {
    label: "Delay threshold",
    value: "3h+",
    description: "Arrival delay normally required.",
  },
  {
    label: "Coverage",
    value: "EU261",
    description: "Applies on eligible European flights.",
  },
];

const standardTimeline: TimelineStep[] = [
  {
    title: "Submit your claim",
    description:
      "You check your flight, add your passenger details and upload the documents needed to start the case.",
  },
  {
    title: "FlightClaimly reviews the case",
    description:
      "We review the information and prepare the claim before contacting the airline.",
  },
  {
    title: "The airline responds",
    description:
      "The airline reviews the claim and may approve, reject or request additional information.",
  },
  {
    title: "You receive your payout",
    description:
      "If the claim is successful, FlightClaimly helps complete the payout process.",
  },
];

const routeGroupSeeds: RouteGroupSeed[] = [
  {
    origin: "CPH",
    destinations: ["ARN", "OSL"],
    airlines: ["sas", "norwegian"],
  },
  {
    origin: "ARN",
    destinations: ["CPH", "OSL"],
    airlines: ["sas", "norwegian"],
  },
  {
    origin: "OSL",
    destinations: ["CPH", "ARN"],
    airlines: ["sas", "norwegian"],
  },
];

function createSlug(originCity: string, destinationCity: string) {
  return `${originCity.toLowerCase().replaceAll(" ", "-")}-to-${destinationCity
    .toLowerCase()
    .replaceAll(" ", "-")}`;
}

function createRoute(
  originIata: string,
  destinationIata: string,
  airlineSlugs?: string[]
): FlightRoute {
  const origin = getAirportByIata(originIata);
  const destination = getAirportByIata(destinationIata);

  if (!origin) {
    throw new Error(`Route origin airport not found: ${originIata}`);
  }

  if (!destination) {
    throw new Error(`Route destination airport not found: ${destinationIata}`);
  }

  const routeAirlines = airlineSlugs ? getAirlinesBySlugs(airlineSlugs) : [];

  const routeName = `${origin.city} to ${destination.city}`;
  const slug = createSlug(origin.city, destination.city);

  return {
    slug,
    name: routeName,

    origin: {
      slug: origin.slug,
      name: origin.name,
      iata: origin.iata,
      city: origin.city,
      country: origin.country,
    },

    destination: {
      slug: destination.slug,
      name: destination.name,
      iata: destination.iata,
      city: destination.city,
      country: destination.country,
    },

    airlines: routeAirlines,

    title: `${routeName} flight compensation`,

    description: `Find out if you can claim compensation for a delayed or cancelled flight from ${origin.city} to ${destination.city} under EU261.`,

    intro: `If your flight from ${origin.city} to ${destination.city} was delayed, cancelled or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.`,

    overview: `Flights from ${origin.city} to ${destination.city} connect ${origin.country} with ${destination.country}. Depending on the airline, route and reason for the disruption, passengers may be protected by EU261 when flights are delayed, cancelled or disrupted.`,

    passengerRights: `Under EU261, passengers flying from ${origin.name} to ${destination.name} may have the right to compensation when the flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, as long as the disruption was within the airline's control.`,

    compensationIntro:
      "The amount of compensation under EU261 depends on the flight distance and the length of the delay at arrival. Eligible passengers may receive between €250 and €600.",

    compensationAmounts: standardCompensationAmounts,

    compensationRules:
      "To qualify for compensation, the flight disruption must normally be within the airline's control. Delays caused by technical issues, operational problems or crew shortages may qualify, while extraordinary circumstances such as severe weather or airport restrictions may not.",

    statisticsIntro:
      "The statistics below provide an overview of passenger compensation under EU261 and help explain when compensation may apply.",

    statistics: standardStatistics,

    timelineIntro:
      "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with the airline throughout the process.",

    timeline: standardTimeline,

    claimProcess: standardClaimProcess,
    commonIssues: standardCommonIssues,
    faq: standardFAQ,
  };
}

function createRoutes(seed: RouteGroupSeed): FlightRoute[] {
  return seed.destinations.map((destination) =>
    createRoute(seed.origin, destination, seed.airlines)
  );
}

export const routes: FlightRoute[] = routeGroupSeeds.flatMap(createRoutes);

export function getRouteBySlug(slug: string) {
  return routes.find((route) => route.slug === slug);
}

export function getRoutesByAirportIata(iata: string) {
  return routes.filter(
    (route) =>
      route.origin.iata.toUpperCase() === iata.toUpperCase() ||
      route.destination.iata.toUpperCase() === iata.toUpperCase()
  );
}

export function getRoutesFromAirportIata(iata: string) {
  return routes.filter(
    (route) => route.origin.iata.toUpperCase() === iata.toUpperCase()
  );
}

export function getRoutesToAirportIata(iata: string) {
  return routes.filter(
    (route) => route.destination.iata.toUpperCase() === iata.toUpperCase()
  );
}