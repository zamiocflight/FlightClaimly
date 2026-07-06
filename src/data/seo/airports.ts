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

export const airports: Airport[] = [
  {
    slug: "copenhagen-airport",
    name: "Copenhagen Airport",
    iata: "CPH",
    city: "Copenhagen",
    country: "Denmark",

    title: "Copenhagen Airport flight compensation",
    description:
      "Find out if you can claim compensation for a delayed, cancelled or disrupted flight from Copenhagen Airport under EU261.",
    intro:
      "If your flight from Copenhagen Airport was delayed, cancelled or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",

    overview:
      "Copenhagen Airport is the main international airport in Denmark and one of the busiest airports in Scandinavia. Many European flights departing from Copenhagen Airport are covered by EU261, which means passengers may be entitled to compensation when flights are delayed, cancelled or disrupted.",

    passengerRights:
      "Under EU261, passengers departing from Copenhagen Airport may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, as long as the disruption was within the airline's control.",

    compensationIntro:
      "The amount of compensation under EU261 depends on the flight distance and the length of the delay at arrival. Eligible passengers may receive between €250 and €600.",
    compensationAmounts: [
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
    ],

    compensationRules:
      "To qualify for compensation, the flight disruption must normally be within the airline's control. Delays caused by technical issues, operational problems or crew shortages may qualify, while extraordinary circumstances such as severe weather or airport restrictions may not.",

    statisticsIntro:
      "The statistics below provide an overview of passenger compensation under EU261 and help explain when compensation may apply.",
    statistics: [
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
    ],

    timelineIntro:
      "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with the airline throughout the process.",
    timeline: [
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
    ],

    claimProcess: standardClaimProcess,
    commonIssues: standardCommonIssues,
    faq: standardFAQ,
  },
];

export function getAirportBySlug(slug: string) {
  return airports.find((airport) => airport.slug === slug);
}