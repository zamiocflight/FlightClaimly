import { standardClaimProcess } from "./shared/claimProcess";
import { standardCommonIssues } from "./shared/commonIssues";
import { standardFAQ } from "./shared/faq";

import type {
  CompensationAmount,
  FAQ,
  Statistic,
  TimelineStep,
} from "./shared/types";

export type Country = {
  slug: string;
  name: string;

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

type CountrySeed = {
  slug: string;
  name: string;
  descriptionText: string;
};
function createCountry(seed: CountrySeed): Country {
  return {
    slug: seed.slug,
    name: seed.name,

    title: `${seed.name} Flight Compensation`,
    description: `Learn everything about flight compensation in ${seed.name}.`,
    intro: `Claim compensation for delayed, cancelled and overbooked flights in ${seed.name}.`,
    overview: seed.descriptionText,

    passengerRights:
      "Passengers travelling under EU261 may be entitled to compensation depending on the circumstances of the disruption.",

    compensationIntro:
      "Compensation depends on the flight distance and the nature of the disruption.",

    compensationAmounts: [
  {
    label: "Short haul",
    distance: "Up to 1,500 km",
    amount: "€250",
  },
  {
    label: "Medium haul",
    distance: "1,500–3,500 km",
    amount: "€400",
  },
  {
    label: "Long haul",
    distance: "Over 3,500 km",
    amount: "€600",
  },
],

    compensationRules:
      "Compensation may apply when the disruption was within the airline's control and the arrival delay exceeded three hours.",

    statisticsIntro:
      "Passenger disruptions vary throughout the year depending on weather, traffic and operational factors.",

    statistics: [
  {
    label: "Coverage",
    value: "EU261",
    description: "Applicable to eligible flights.",
  },
  {
    label: "Maximum compensation",
    value: "€600",
    description: "Maximum compensation under EU261.",
  },
],

    timelineIntro:
      "The process from claim submission to payout usually follows these steps.",

    timeline: [
      {
        title: "Claim submitted",
        description: "We review your case.",
      },
      {
        title: "Airline contacted",
        description: "The airline receives your claim.",
      },
      {
        title: "Compensation paid",
        description: "You receive your money after a successful claim.",
      },
    ],

    claimProcess: standardClaimProcess,
    commonIssues: standardCommonIssues,
    faq: standardFAQ,
  };
}
const countrySeeds: CountrySeed[] = [
  {
    slug: "sweden",
    name: "Sweden",
    descriptionText:
      "Sweden has one of Europe's busiest aviation markets with millions of passengers travelling every year.",
  },
  {
    slug: "denmark",
    name: "Denmark",
    descriptionText:
      "Denmark is a major Scandinavian aviation hub with Copenhagen Airport serving as one of Northern Europe's largest airports.",
  },
  {
    slug: "norway",
    name: "Norway",
    descriptionText:
      "Norway has an extensive domestic and international flight network connecting cities across Europe.",
  },
  {
    slug: "finland",
    name: "Finland",
    descriptionText:
      "Finland connects Europe and Asia through Helsinki Airport and a strong international route network.",
  },
];
export const countries = countrySeeds.map(createCountry);

export function getCountryBySlug(slug: string) {
  return countries.find((country) => country.slug === slug);
}