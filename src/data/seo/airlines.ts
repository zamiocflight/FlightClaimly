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
overview:
  "Norwegian is one of Europe's largest low-cost airlines, serving millions of passengers every year across Scandinavia and the rest of Europe. If your Norwegian flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",
  passengerRights:
  "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, as long as the disruption was within the airline's control.",
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
    overview:
  "SAS is one of Scandinavia's most established airlines, operating flights across Denmark, Norway, Sweden and the rest of Europe. If your SAS flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",
      passengerRights:
  "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, as long as the disruption was within the airline's control.",
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
    overview:
  "SAS is one of Scandinavia's most established airlines, operating flights across Denmark, Norway, Sweden and the rest of Europe. If your SAS flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",
     passengerRights:
  "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, as long as the disruption was within the airline's control.", 
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
    overview:
  "Lufthansa is one of Europe's largest network airlines and operates flights through major hubs such as Frankfurt and Munich. If your Lufthansa flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",
  passengerRights:
  "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, as long as the disruption was within the airline's control.",    
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

export function getAirlineBySlug(slug: string) {
  return airlines.find((airline) => airline.slug === slug);
}