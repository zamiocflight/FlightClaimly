export type FAQ = {
  question: string;
  answer: string;
};

export type AirportRef = {
  iata: string;
  name: string;
};

export type CountryRef = {
  code: string;
  name: string;
};

export type CompensationAmount = {
  label: string;
  distance: string;
  amount: string;
};

export type Statistic = {
  label: string;
  value: string;
  description: string;
};

export type TimelineStep = {
  title: string;
  description: string;
};

export type Airline = {
  slug: string;
  name: string;
  iata: string;
  icao?: string;

  country: string;

  headquarters?: string;
  founded?: number;
  parentCompany?: string;

  mainHub?: string;
  hubs?: string[];

  fleetSize?: number;
  destinations?: number;
  alliance?: string | null;

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