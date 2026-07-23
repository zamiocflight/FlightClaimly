export type FlightNumber = {
  slug: string;

  flightNumber: string;

  airline: string;
  airlineName: string;
  airlineCountry: string;
  airlineCountrySlugs?: string[];
  airlineIata: string;
  airlineIcao: string;

  originAirport: string;
  destinationAirport: string;

  route: string;

  originCountry: string;
  destinationCountry: string;

  distanceBand: "short" | "medium" | "long";

  eu261Eligible: boolean;

  title: string;
  description: string;

  intro: string;
  overview: string;
  passengerRights: string;

  compensationIntro: string;

  compensationAmounts: {
    label: string;
    distance: string;
    amount: string;
  }[];

  compensationRules: string;

  statisticsIntro: string;

  statistics: {
    label: string;
    value: string;
    description: string;
  }[];

  timelineIntro: string;

  timeline: {
    title: string;
    description: string;
  }[];

  claimProcess: string[];
  commonIssues: string[];

  faq: {
    question: string;
    answer: string;
  }[];

  aircraft?: string;
  schedule?: string;
};
export type FlightNumberSeed = {
  flightNumber: string;

  airline: string;

  originIata: string;
  destinationIata: string;

  distanceBand: FlightNumber["distanceBand"];
  eu261Eligible: boolean;

  aircraft?: string;
  schedule?: string;
};