import { standardClaimProcess } from "./shared/claimProcess";
import { standardCommonIssues } from "./shared/commonIssues";
import { standardFAQ } from "./shared/faq";
import type { Airline } from "./shared/types";

export type { Airline } from "./shared/types";

export const airlines: Airline[] = [
  
{
  slug: "norwegian",
  name: "Norwegian",
  iata: "DY",
  icao: "NOZ",

  country: "Norway",

  headquarters: "Fornebu, Norway",
  founded: 1993,
  parentCompany: "Norwegian Air Shuttle ASA",

  mainHub: "Oslo Airport (OSL)",
  hubs: [
    "Oslo Airport (OSL)",
    "Bergen Airport (BGO)",
    "Trondheim Airport (TRD)",
  ],

  fleetSize: 89,
  destinations: 120,
  alliance: null,

  title: "Norwegian flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Norwegian flight under EU261.",
  intro:
    "If your Norwegian flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",

  claimProcess: standardClaimProcess,
  commonIssues: standardCommonIssues,
  faq: standardFAQ,
},
    {
    slug: "sas",
    name: "SAS",
    iata: "SK",
    country: "Denmark, Norway and Sweden",
    title: "SAS flight compensation",
    description:
      "Find out if you can claim compensation for a delayed or cancelled SAS flight under EU261.",
    intro:
      "If your SAS flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
    claimProcess: standardClaimProcess,
    commonIssues: standardCommonIssues,
    faq: standardFAQ,
  },
  {
    slug: "ryanair",
    name: "Ryanair",
    iata: "FR",
    country: "Ireland",
    title: "Ryanair flight compensation",
    description:
      "Find out if you can claim compensation for a delayed or cancelled Ryanair flight under EU261.",
    intro:
      "If your Ryanair flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
    claimProcess: standardClaimProcess,
    commonIssues: standardCommonIssues,
    faq: standardFAQ,
  },
  {
    slug: "lufthansa",
    name: "Lufthansa",
    iata: "LH",
    country: "Germany",
    title: "Lufthansa flight compensation",
    description:
      "Find out if you can claim compensation for a delayed or cancelled Lufthansa flight under EU261.",
    intro:
      "If your Lufthansa flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
    claimProcess: standardClaimProcess,
    commonIssues: standardCommonIssues,
    faq: standardFAQ,
  },
];

export function getAirlineBySlug(slug: string) {
  return airlines.find((airline) => airline.slug === slug);
}