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
  {
  slug: "germany",
  name: "Germany",
  descriptionText:
    "Germany is one of Europe's largest aviation markets, with major airports such as Frankfurt, Munich, Berlin and Düsseldorf serving millions of passengers every year.",
},
{
  slug: "netherlands",
  name: "Netherlands",
  descriptionText:
    "The Netherlands is a major European aviation hub, with Amsterdam Schiphol Airport connecting passengers across Europe and the rest of the world.",
},
{
  slug: "france",
  name: "France",
  descriptionText:
    "France has one of Europe's busiest aviation networks, with major airports in Paris, Nice, Lyon and Marseille.",
},
{
  slug: "spain",
  name: "Spain",
  descriptionText:
    "Spain is one of Europe's largest travel markets, with major airports in Madrid, Barcelona, Malaga, Alicante, Palma and Valencia.",
},
{
  slug: "italy",
  name: "Italy",
  descriptionText:
    "Italy has a large and diverse aviation network, with major airports in Rome, Milan, Venice, Naples, Bologna and Sicily.",
},
{
  slug: "united-kingdom",
  name: "United Kingdom",
  descriptionText:
    "The United Kingdom has one of Europe's busiest aviation markets, with major airports in London, Manchester, Birmingham, Edinburgh and Glasgow.",
},
{
  slug: "ireland",
  name: "Ireland",
  descriptionText:
    "Ireland has an important aviation network, with Dublin Airport serving as the country's largest international gateway.",
},
{
  slug: "portugal",
  name: "Portugal",
  descriptionText:
    "Portugal connects millions of passengers through Lisbon, Porto and Faro, serving both business and leisure travel across Europe.",
},
{
  slug: "poland",
  name: "Poland",
  descriptionText:
    "Poland has a growing aviation market, with Warsaw Chopin Airport and Kraków Airport among its most important international gateways.",
},
{
  slug: "austria",
  name: "Austria",
  descriptionText:
    "Austria's aviation network is centred around Vienna Airport, with connections across Europe and beyond.",
},
{
  slug: "switzerland",
  name: "Switzerland",
  descriptionText:
    "Switzerland is home to major airports in Zurich, Geneva and Basel, serving both European and long-haul passengers.",
},
{
  slug: "belgium",
  name: "Belgium",
  descriptionText:
    "Belgium's aviation market is centred around Brussels Airport, with strong connections across Europe.",
},
{
  slug: "greece",
  name: "Greece",
  descriptionText:
    "Greece has a large seasonal and international aviation network, with major airports in Athens, Thessaloniki and many island destinations.",
},
{
  slug: "cyprus",
  name: "Cyprus",
  descriptionText:
    "Cyprus is served by major airports in Larnaca and Paphos, connecting passengers to destinations across Europe and the Mediterranean.",
},
{
  slug: "croatia",
  name: "Croatia",
  descriptionText:
    "Croatia has an important seasonal aviation market, with airports in Zagreb, Split and Dubrovnik serving millions of travellers.",
},
{
  slug: "czech-republic",
  name: "Czech Republic",
  descriptionText:
    "The Czech Republic's aviation market is centred around Prague Airport, one of Central Europe's major international airports.",
},
{
  slug: "hungary",
  name: "Hungary",
  descriptionText:
    "Hungary's international air traffic is mainly served by Budapest Ferenc Liszt Airport, a key hub in Central Europe.",
},
{
  slug: "romania",
  name: "Romania",
  descriptionText:
    "Romania has a growing aviation network, with Bucharest Airport serving as the country's largest international airport.",
},
{
  slug: "bulgaria",
  name: "Bulgaria",
  descriptionText:
    "Bulgaria is served by major airports including Sofia Airport and seasonal coastal airports used by leisure travellers.",
},
{
  slug: "serbia",
  name: "Serbia",
  descriptionText:
    "Serbia's aviation network is centred around Belgrade Nikola Tesla Airport, the country's main international gateway.",
},
];
export const countries = countrySeeds.map(createCountry);

export function getCountryBySlug(slug: string) {
  return countries.find((country) => country.slug === slug);
}