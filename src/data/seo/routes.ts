import { standardClaimProcess } from "./shared/claimProcess";
import { standardCommonIssues } from "./shared/commonIssues";

import type {
  CompensationAmount,
  FAQ,
  Statistic,
  TimelineStep,
  Airline,
} from "./shared/types";
import { getAirportByIata } from "@/lib/knowledge/airports";
import { getAirlinesBySlugs } from "@/lib/knowledge/airlines";

export type RouteSeed = {
  origin: string;
  destination: string;
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
    value: "EU261 / UK261",
    description: "Applies on eligible European and UK flights.",
  },
];

function createRouteStatistics(
  origin: FlightRoute["origin"],
  destination: FlightRoute["destination"]
): Statistic[] {
  return [
    {
      label: "Route",
      value: `${origin.iata} → ${destination.iata}`,
      description: `${origin.name} to ${destination.name}.`,
    },
    {
      label: "Maximum compensation",
      value: "€600",
      description:
        "Per passenger when the route and disruption qualify under EU261 or UK261.",
    },
    {
      label: "Delay threshold",
      value: "3h+",
      description:
        "Compensation normally requires an arrival delay of at least three hours.",
    },
  ];
}

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

function createRouteFAQ(
  origin: FlightRoute["origin"],
  destination: FlightRoute["destination"]
): FAQ[] {
  const routeLabel = `${origin.city} to ${destination.city}`;

  return [
    {
      question: `Can I claim compensation for a delayed flight from ${origin.city} to ${destination.city}?`,
      answer: `You may be entitled to compensation if your flight from ${origin.name} to ${destination.name} arrived at least three hours late and the disruption was within the airline's control. Eligibility depends on the operating airline, the reason for the delay and whether EU261 or UK261 applies.`,
    },
    {
      question: `How much compensation can I receive for the ${routeLabel} route?`,
      answer: `Eligible passengers may receive between €250 and €600. The final amount depends primarily on the flight distance, the arrival delay and the rules that apply to the journey.`,
    },
    {
      question: `Does EU261 apply to flights from ${origin.country} to ${destination.country}?`,
      answer: `EU261 may apply depending on where the flight departed, where it arrived and which airline operated the flight. FlightClaimly checks the route and operating airline when assessing your case.`,
    },
    {
      question: `Can I claim if my ${routeLabel} flight was cancelled?`,
      answer: `You may have a claim if the airline cancelled the flight at short notice and the cancellation was not caused by extraordinary circumstances. The alternative transport and notice provided by the airline can also affect eligibility.`,
    },
    {
      question: `What documents do I need for a ${routeLabel} compensation claim?`,
      answer: `You should normally keep your booking confirmation, flight details, passenger information and any messages received from the airline about the disruption. Additional documents may be requested while the claim is reviewed.`,
    },
  ];
}

const coreAirportNetwork = [
  "CPH",
  "ARN",
  "OSL",
  "HEL",
  "FRA",
  "MUC",
  "AMS",
  "CDG",
  "LHR",
  "LGW",
  "STN",
  "MAN",
  "BCN",
  "MAD",
  "AGP",
  "ALC",
  "PMI",
  "FCO",
  "MXP",
  "VIE",
  "ZRH",
  "BRU",
  "LIS",
  "OPO",
  "WAW",
  "DUB",
  "EDI",
  "NCE",
  "MRS",
  "LYS",
  "HAM",
  "DUS",
  "BER",
  "GVA",
  "PRG",
  "BUD",
  "ATH",
  "RIX",
  "LCA",
  "MLA",
];

function createRouteSeedsFromNetwork(iatas: string[]): RouteSeed[] {
  return iatas.flatMap((origin) =>
    iatas
      .filter((destination) => destination !== origin)
      .map((destination) => ({
        origin,
        destination,
      }))
  );
}

function createRouteSlug(originSlug: string, destinationSlug: string) {
  return `${originSlug}-to-${destinationSlug}`;
}

function getRouteAirlines(originAirlines?: string[], destinationAirlines?: string[]) {
  const origin = originAirlines ?? [];
  const destination = destinationAirlines ?? [];

  const shared = origin.filter((airline) => destination.includes(airline));

  const fallback = [...origin, ...destination];

  const unique = Array.from(new Set(shared.length > 0 ? shared : fallback));

  return getAirlinesBySlugs(unique).slice(0, 6);
}

function createRoute(seed: RouteSeed): FlightRoute {
  const origin = getAirportByIata(seed.origin);
  const destination = getAirportByIata(seed.destination);

  if (!origin) {
    throw new Error(`Route origin airport not found: ${seed.origin}`);
  }

  if (!destination) {
    throw new Error(`Route destination airport not found: ${seed.destination}`);
  }

  const routeAirlines = getRouteAirlines(
    origin.mainAirlines,
    destination.mainAirlines
  );

  const routeName = `${origin.city} to ${destination.city}`;
  const slug = createRouteSlug(origin.slug, destination.slug);

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

    description: `Find out if you can claim compensation for a delayed or cancelled flight from ${origin.city} to ${destination.city} under EU261 or UK261.`,

    intro: `If your flight from ${origin.city} to ${destination.city} was delayed, cancelled or caused you to miss a connection, you may be entitled to compensation. FlightClaimly helps you check your case and handle the claim process.`,

    overview: `Flights from ${origin.city} to ${destination.city} connect ${origin.name} in ${origin.country} with ${destination.name} in ${destination.country}. Depending on the airline, route, delay length and reason for the disruption, passengers may be protected by EU261 or UK261 when flights are delayed, cancelled or disrupted.`,

    passengerRights: `Passengers flying from ${origin.name} to ${destination.name} may have the right to compensation when the flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, as long as the disruption was within the airline's control.`,

    compensationIntro:
      "The amount of compensation depends on the flight distance and the length of the delay at arrival. Eligible passengers may receive between €250 and €600.",

    compensationAmounts: standardCompensationAmounts,

    compensationRules:
      "To qualify for compensation, the flight disruption must normally be within the airline's control. Delays caused by technical issues, operational problems or crew shortages may qualify, while extraordinary circumstances such as severe weather, airport restrictions or air traffic control decisions may not.",

    statisticsIntro:
      "The statistics below provide an overview of passenger compensation rules and help explain when compensation may apply.",

    statistics: createRouteStatistics(
  {
    slug: origin.slug,
    name: origin.name,
    iata: origin.iata,
    city: origin.city,
    country: origin.country,
  },
  {
    slug: destination.slug,
    name: destination.name,
    iata: destination.iata,
    city: destination.city,
    country: destination.country,
  }
),

    timelineIntro:
      "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with the airline throughout the process.",

    timeline: standardTimeline,

    claimProcess: standardClaimProcess,
    commonIssues: standardCommonIssues,
    faq: createRouteFAQ(
  {
    slug: origin.slug,
    name: origin.name,
    iata: origin.iata,
    city: origin.city,
    country: origin.country,
  },
  {
    slug: destination.slug,
    name: destination.name,
    iata: destination.iata,
    city: destination.city,
    country: destination.country,
  }
),
  };
}

const routeSeeds = createRouteSeedsFromNetwork(coreAirportNetwork);

export const routes: FlightRoute[] = routeSeeds.map(createRoute);

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