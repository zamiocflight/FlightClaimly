import { standardClaimProcess } from "./shared/claimProcess";
import { standardCommonIssues } from "./shared/commonIssues";
import { standardFAQ, type FAQ } from "./shared/faq";

export type Airline = {
  slug: string;
  name: string;
  iata: string;
  country: string;
  title: string;
  description: string;
  intro: string;
  claimProcess: string[];
  commonIssues: string[];
  faq: FAQ[];
};

export const airlines: Airline[] = [
  {
    slug: "norwegian",
    name: "Norwegian",
    iata: "DY",
    country: "Norway",
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