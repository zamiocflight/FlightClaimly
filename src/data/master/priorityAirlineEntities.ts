import { standardClaimProcess } from "../seo/shared/claimProcess";
import { standardCommonIssues } from "../seo/shared/commonIssues";
import { standardFAQ } from "../seo/shared/faq";
import type { Airline } from "../seo/shared/types";

const compensationAmounts = [
  { label: "Up to 1,500 km", distance: "Short-haul flights", amount: "€250" },
  { label: "1,500–3,500 km", distance: "Medium-haul flights", amount: "€400" },
  { label: "Over 3,500 km", distance: "Long-haul flights", amount: "€600" },
];

const statistics = [
  { label: "Maximum compensation", value: "€600", description: "Per passenger under EU261." },
  { label: "Delay threshold", value: "3h+", description: "Arrival delay normally required." },
  { label: "Coverage", value: "EU261", description: "Applies on eligible European flights." },
];

const timeline = [
  { title: "Submit your claim", description: "You check your flight, add your passenger details and upload the documents needed to start the case." },
  { title: "FlightClaimly reviews the case", description: "We review the information and prepare the claim before contacting the airline." },
  { title: "The airline responds", description: "The airline reviews the claim and may approve, reject or request additional information." },
  { title: "You receive your payout", description: "If the claim is successful, FlightClaimly helps complete the payout process." },
];

function createPriorityAirlineEntity(input: {
  slug: string;
  name: string;
  iata: string;
  icao: string;
  country: string;
}): Airline {
  return {
    ...input,
    title: `${input.name} flight compensation`,
    description: `Find out if you can claim compensation for a delayed or cancelled ${input.name} flight under EU261.`,
    intro: `If your ${input.name} flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.`,
    overview: `${input.name} operates international passenger services. If an eligible flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the route and circumstances.`,
    passengerRights: "Under EU261, passengers may have the right to compensation when an eligible flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, subject to the applicable legal conditions.",
    compensationIntro: "The amount of compensation under EU261 depends on the flight distance and the length of the delay at arrival. Eligible passengers may receive between €250 and €600.",
    compensationAmounts,
    compensationRules: "Eligibility depends on the route, the disruption and whether extraordinary circumstances apply. FlightClaimly reviews the flight and available evidence before pursuing compensation.",
    statisticsIntro: "The statistics below provide an overview of passenger compensation under EU261 and help explain when compensation may apply.",
    statistics,
    timelineIntro: "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with the airline throughout the process.",
    timeline,
    claimProcess: standardClaimProcess,
    commonIssues: standardCommonIssues,
    faq: standardFAQ,
  };
}

export const priorityAirlineEntities: Airline[] = [
  createPriorityAirlineEntity({
    slug: "iberia-express",
    name: "Iberia Express",
    iata: "I2",
    icao: "IBS",
    country: "Spain",
  }),
  createPriorityAirlineEntity({
    slug: "china-airlines",
    name: "China Airlines",
    iata: "CI",
    icao: "CAL",
    country: "Taiwan",
  }),
  createPriorityAirlineEntity({
    slug: "hainan-airlines",
    name: "Hainan Airlines",
    iata: "HU",
    icao: "CHH",
    country: "China",
  }),
];

export function getPriorityAirlineEntityBySlug(slug: string): Airline | undefined {
  return priorityAirlineEntities.find((airline) => airline.slug === slug);
}

export function getPriorityAirlineEntityByIata(iata: string): Airline | undefined {
  const normalized = iata.trim().toUpperCase();
  return priorityAirlineEntities.find(
    (airline) => airline.iata.trim().toUpperCase() === normalized
  );
}
