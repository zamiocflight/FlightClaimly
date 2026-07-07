import { standardClaimProcess } from "./shared/claimProcess";
import { standardCommonIssues } from "./shared/commonIssues";
import { standardFAQ } from "./shared/faq";
import type {
  CompensationAmount,
  FAQ,
  Statistic,
  TimelineStep,
} from "./shared/types";

export type Airport = {
  slug: string;
  name: string;
  iata: string;
  city: string;
  country: string;
  mainAirlines?: string[];

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

type AirportSeed = {
  slug: string;
  name: string;
  iata: string;
  city: string;
  country: string;
  regionDescription: string;
  mainAirlines?: string[];
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

const airportSeeds: AirportSeed[] = [
  {
    slug: "copenhagen-airport",
    name: "Copenhagen Airport",
    iata: "CPH",
    city: "Copenhagen",
    country: "Denmark",
    regionDescription: "the main international airport in Denmark",
    mainAirlines: [
  "sas",
  "norwegian",
  "ryanair",
  "easyjet",
  "lufthansa",
  "klm",
  "air-france",
  "british-airways",
  "wizz-air",
  "lot",
  "iberia",
],
  },
  {
    slug: "stockholm-arlanda-airport",
    name: "Stockholm Arlanda Airport",
    iata: "ARN",
    city: "Stockholm",
    country: "Sweden",
    regionDescription: "Sweden's largest international airport",
  },
  {
    slug: "oslo-airport",
    name: "Oslo Airport",
    iata: "OSL",
    city: "Oslo",
    country: "Norway",
    regionDescription: "Norway's main international airport",
  },
  {
    slug: "helsinki-airport",
    name: "Helsinki Airport",
    iata: "HEL",
    city: "Helsinki",
    country: "Finland",
    regionDescription: "Finland's main international airport",
  },
  {
    slug: "frankfurt-airport",
    name: "Frankfurt Airport",
    iata: "FRA",
    city: "Frankfurt",
    country: "Germany",
    regionDescription: "one of Europe's busiest international airports",
  },
  {
    slug: "munich-airport",
    name: "Munich Airport",
    iata: "MUC",
    city: "Munich",
    country: "Germany",
    regionDescription: "a major international airport in southern Germany",
  },
  {
    slug: "amsterdam-schiphol-airport",
    name: "Amsterdam Schiphol Airport",
    iata: "AMS",
    city: "Amsterdam",
    country: "Netherlands",
    regionDescription: "one of Europe's largest international airport hubs",
  },
  {
    slug: "paris-charles-de-gaulle-airport",
    name: "Paris Charles de Gaulle Airport",
    iata: "CDG",
    city: "Paris",
    country: "France",
    regionDescription: "France's largest international airport",
  },
  {
    slug: "london-heathrow-airport",
    name: "London Heathrow Airport",
    iata: "LHR",
    city: "London",
    country: "United Kingdom",
    regionDescription: "one of the busiest airports in Europe",
  },
  {
    slug: "malaga-airport",
    name: "Malaga Airport",
    iata: "AGP",
    city: "Malaga",
    country: "Spain",
    regionDescription: "a major airport serving southern Spain and the Costa del Sol",
  },
];

function createAirport(seed: AirportSeed): Airport {
  return {
    ...seed,

    title: `${seed.name} flight compensation`,

    description: `Find out if you can claim compensation for a delayed, cancelled or disrupted flight from ${seed.name} under EU261.`,

    intro: `If your flight from ${seed.name} was delayed, cancelled or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.`,

    overview: `${seed.name} is ${seed.regionDescription}. Many European flights departing from ${seed.name} may be covered by EU261, which means passengers may be entitled to compensation when flights are delayed, cancelled or disrupted.`,

    passengerRights: `Under EU261, passengers departing from ${seed.name} may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, as long as the disruption was within the airline's control.`,

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

export const airports: Airport[] = airportSeeds.map(createAirport);

export function getAirportBySlug(slug: string) {
  return airports.find((airport) => airport.slug === slug);
}