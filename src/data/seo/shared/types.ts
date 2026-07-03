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

  claimProcess: string[];
  commonIssues: string[];
  faq: FAQ[];
};