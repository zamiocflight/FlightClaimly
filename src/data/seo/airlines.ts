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
  countrySlugs: ["denmark", "norway", "sweden"],

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
  {
  slug: "easyjet",
  name: "easyJet",
  iata: "U2",
  icao: "EZY",

  country: "United Kingdom",

  headquarters: "Luton, United Kingdom",
  founded: 1995,
  parentCompany: "easyJet plc",

  mainHub: "London Luton Airport (LTN)",

  fleetSize: 340,
  destinations: 160,
  alliance: null,

  title: "easyJet flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled easyJet flight under EU261.",
  intro:
    "If your easyJet flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261.",
  overview:
    "easyJet is one of Europe's largest low-cost airlines, operating an extensive network across Europe.",
  passengerRights:
    "Passengers may be entitled to compensation under EU261 when eligible flights are significantly delayed or cancelled.",
  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the route.",

  compensationAmounts: [
    { label: "Up to 1,500 km", distance: "Short-haul flights", amount: "€250" },
    { label: "1,500–3,500 km", distance: "Medium-haul flights", amount: "€400" },
    { label: "Over 3,500 km", distance: "Long-haul flights", amount: "€600" },
  ],

  compensationRules:
    "Compensation depends on EU261 eligibility and the cause of the disruption.",

  statisticsIntro:
    "EU261 compensation overview.",

  statistics: [
    {
      label: "Maximum compensation",
      value: "€600",
      description: "Per passenger.",
    },
    {
      label: "Delay threshold",
      value: "3h+",
      description: "Normally required.",
    },
    {
      label: "Coverage",
      value: "EU261",
      description: "Eligible European flights.",
    },
  ],

  timelineIntro:
    "After submitting your claim we handle the process with the airline.",

  timeline: [
    {
      title: "Claim submitted",
      description: "Your case is created.",
    },
    {
      title: "Airline contacted",
      description: "We contact the airline.",
    },
    {
      title: "Decision",
      description: "The airline responds.",
    },
    {
      title: "Payout",
      description: "Compensation is paid if successful.",
    },
  ],

  claimProcess: standardClaimProcess,
  commonIssues: standardCommonIssues,
  faq: standardFAQ,
},
{
  slug: "air-france",
  name: "Air France",
  iata: "AF",
  icao: "AFR",

  country: "France",

  headquarters: "Tremblay-en-France, France",
  founded: 1933,
  parentCompany: "Air France–KLM Group",

  mainHub: "Paris Charles de Gaulle Airport (CDG)",
  hubs: [
    "Paris Charles de Gaulle Airport (CDG)",
    "Paris Orly Airport (ORY)",
  ],

  fleetSize: 230,
  destinations: 200,
  alliance: "SkyTeam",

  title: "Air France flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Air France flight under EU261.",
  intro:
    "If your Air France flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Air France is France's flag carrier and one of Europe's largest full-service airlines. Operating from its hubs in Paris, the airline connects passengers to destinations across Europe, the Americas, Africa, Asia and the Middle East. If your Air France flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",
  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",
  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within the airline's control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Air France throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Air France reviews the claim and may approve, reject or request additional information.",
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
  slug: "klm",
  name: "KLM",
  iata: "KL",
  icao: "KLM",

  country: "Netherlands",

  headquarters: "Amstelveen, Netherlands",
  founded: 1919,
  parentCompany: "Air France–KLM Group",

  mainHub: "Amsterdam Airport Schiphol (AMS)",
  hubs: [
    "Amsterdam Airport Schiphol (AMS)",
  ],

  fleetSize: 120,
  destinations: 165,
  alliance: "SkyTeam",

  title: "KLM flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled KLM flight under EU261.",
  intro:
    "If your KLM flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "KLM Royal Dutch Airlines is the flag carrier of the Netherlands and the world's oldest airline still operating under its original name. From Amsterdam Schiphol Airport, KLM serves destinations across Europe, the Americas, Africa, Asia and the Middle East. If your KLM flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",
  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",
  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within the airline's control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with KLM throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "KLM reviews the claim and may approve, reject or request additional information.",
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
  slug: "british-airways",
  name: "British Airways",
  iata: "BA",
  icao: "BAW",

  country: "United Kingdom",

  headquarters: "London, United Kingdom",
  founded: 1974,
  parentCompany: "International Airlines Group (IAG)",

  mainHub: "London Heathrow Airport (LHR)",
  hubs: [
    "London Heathrow Airport (LHR)",
    "London Gatwick Airport (LGW)",
  ],

  fleetSize: 280,
  destinations: 200,
  alliance: "oneworld",

  title: "British Airways flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled British Airways flight under EU261.",
  intro:
    "If your British Airways flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "British Airways is the United Kingdom's flag carrier and one of Europe's largest full-service airlines. Operating primarily from London Heathrow, the airline serves destinations across Europe, North America, South America, Africa, Asia and the Middle East. If your British Airways flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",
  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",
  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within the airline's control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with British Airways throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "British Airways reviews the claim and may approve, reject or request additional information.",
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
  slug: "iberia",
  name: "Iberia",
  iata: "IB",
  icao: "IBE",

  country: "Spain",

  headquarters: "Madrid, Spain",
  founded: 1927,
  parentCompany: "International Airlines Group (IAG)",

  mainHub: "Adolfo Suárez Madrid–Barajas Airport (MAD)",
  hubs: [
    "Adolfo Suárez Madrid–Barajas Airport (MAD)",
  ],

  fleetSize: 90,
  destinations: 140,
  alliance: "oneworld",

  title: "Iberia flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Iberia flight under EU261.",
  intro:
    "If your Iberia flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Iberia is Spain's flag carrier and one of Europe's leading full-service airlines. Operating primarily from Madrid-Barajas Airport, Iberia connects Spain with destinations throughout Europe, North America, Latin America, Africa and the Middle East. If your Iberia flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",
  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within the airline's control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Iberia throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Iberia reviews the claim and may approve, reject or request additional information.",
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
  slug: "vueling",
  name: "Vueling",
  iata: "VY",
  icao: "VLG",

  country: "Spain",

  headquarters: "El Prat de Llobregat, Barcelona, Spain",
  founded: 2004,
  parentCompany: "International Airlines Group (IAG)",

  mainHub: "Barcelona–El Prat Airport (BCN)",
  hubs: [
    "Barcelona–El Prat Airport (BCN)",
    "Rome Fiumicino Airport (FCO)",
    "Paris Orly Airport (ORY)",
  ],

  fleetSize: 140,
  destinations: 150,
  alliance: null,

  title: "Vueling flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Vueling flight under EU261.",
  intro:
    "If your Vueling flight was delayed, cancelled or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Vueling is one of Europe's largest low-cost airlines and Spain's second-largest carrier. Operating primarily from Barcelona, the airline serves an extensive network of destinations across Europe, North Africa and the Mediterranean. Eligible passengers may claim compensation under EU261 when flights are significantly delayed, cancelled or otherwise disrupted.",

  passengerRights:
    "Under EU261, passengers may be entitled to compensation when a qualifying flight arrives more than three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive compensation between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "Compensation is generally available when the disruption was within Vueling's control. Extraordinary circumstances such as severe weather or air traffic control restrictions normally do not qualify.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
      description: "Eligible European flights.",
    },
  ],

  timelineIntro:
    "After your claim is submitted, FlightClaimly handles the process with Vueling on your behalf.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "Provide your flight details and supporting documentation.",
    },
    {
      title: "We review your case",
      description:
        "FlightClaimly validates your eligibility and prepares the claim.",
    },
    {
      title: "Vueling reviews the claim",
      description:
        "The airline evaluates the claim and may request additional information.",
    },
    {
      title: "Receive your compensation",
      description:
        "If approved, FlightClaimly helps complete the payout process.",
    },
  ],

  claimProcess: standardClaimProcess,
  commonIssues: standardCommonIssues,
  faq: standardFAQ,
},
{
  slug: "wizz-air",
  name: "Wizz Air",
  iata: "W6",
  icao: "WZZ",

  country: "Hungary",

  headquarters: "Budapest, Hungary",
  founded: 2003,
  parentCompany: "Wizz Air Holdings Plc",

  mainHub: "Budapest Ferenc Liszt International Airport (BUD)",
  hubs: [
    "Budapest Ferenc Liszt International Airport (BUD)",
    "London Luton Airport (LTN)",
    "Warsaw Chopin Airport (WAW)",
    "Bucharest Henri Coandă Airport (OTP)",
  ],

  fleetSize: 230,
  destinations: 190,
  alliance: null,

  title: "Wizz Air flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Wizz Air flight under EU261.",
  intro:
    "If your Wizz Air flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Wizz Air is one of Europe's fastest-growing ultra low-cost airlines, operating an extensive network across Central and Eastern Europe as well as destinations throughout Western Europe and the Middle East. If your Wizz Air flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within Wizz Air's control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Wizz Air throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Wizz Air reviews the claim and may approve, reject or request additional information.",
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
  slug: "austrian-airlines",
  name: "Austrian Airlines",
  iata: "OS",
  icao: "AUA",

  country: "Austria",

  headquarters: "Vienna, Austria",
  founded: 1957,
  parentCompany: "Lufthansa Group",

  mainHub: "Vienna International Airport (VIE)",
  hubs: [
    "Vienna International Airport (VIE)",
  ],

  fleetSize: 65,
  destinations: 120,
  alliance: "Star Alliance",

  title: "Austrian Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Austrian Airlines flight under EU261.",
  intro:
    "If your Austrian Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Austrian Airlines is Austria's flag carrier and a member of the Lufthansa Group. Operating primarily from Vienna International Airport, the airline serves destinations across Europe, North America, the Middle East and Asia. If your Austrian Airlines flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within the airline's control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Austrian Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Austrian Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "swiss",
  name: "SWISS",
  iata: "LX",
  icao: "SWR",

  country: "Switzerland",

  headquarters: "Basel, Switzerland",
  founded: 2002,
  parentCompany: "Lufthansa Group",

  mainHub: "Zurich Airport (ZRH)",
  hubs: [
    "Zurich Airport (ZRH)",
    "Geneva Airport (GVA)",
  ],

  fleetSize: 95,
  destinations: 100,
  alliance: "Star Alliance",

  title: "SWISS flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled SWISS flight under EU261.",
  intro:
    "If your SWISS flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "SWISS International Air Lines is Switzerland's flag carrier and a member of the Lufthansa Group. Operating primarily from Zurich and Geneva, SWISS connects passengers across Europe as well as to North America, South America, Africa and Asia. If your SWISS flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within SWISS's control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with SWISS throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "SWISS reviews the claim and may approve, reject or request additional information.",
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
  slug: "brussels-airlines",
  name: "Brussels Airlines",
  iata: "SN",
  icao: "BEL",

  country: "Belgium",

  headquarters: "Diegem, Belgium",
  founded: 2006,
  parentCompany: "Lufthansa Group",

  mainHub: "Brussels Airport (BRU)",
  hubs: [
    "Brussels Airport (BRU)",
  ],

  fleetSize: 45,
  destinations: 95,
  alliance: "Star Alliance",

  title: "Brussels Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Brussels Airlines flight under EU261.",
  intro:
    "If your Brussels Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Brussels Airlines is Belgium's flag carrier and a member of the Lufthansa Group. Operating from Brussels Airport, the airline serves destinations across Europe, North America and Africa, with a particularly strong network to Central and West Africa. If your Brussels Airlines flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within Brussels Airlines' control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Brussels Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Brussels Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "tap-air-portugal",
  name: "TAP Air Portugal",
  iata: "TP",
  icao: "TAP",

  country: "Portugal",

  headquarters: "Lisbon, Portugal",
  founded: 1945,
  parentCompany: "TAP Group",

  mainHub: "Humberto Delgado Airport (LIS)",
  hubs: [
    "Humberto Delgado Airport (LIS)",
    "Francisco Sá Carneiro Airport (OPO)",
  ],

  fleetSize: 100,
  destinations: 90,
  alliance: "Star Alliance",

  title: "TAP Air Portugal flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled TAP Air Portugal flight under EU261.",
  intro:
    "If your TAP Air Portugal flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "TAP Air Portugal is Portugal's flag carrier and a member of Star Alliance. Operating primarily from Lisbon and Porto, the airline serves destinations across Europe, North and South America, Africa and the Atlantic islands. If your TAP Air Portugal flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within TAP Air Portugal's control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with TAP Air Portugal throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "TAP Air Portugal reviews the claim and may approve, reject or request additional information.",
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
  slug: "ita-airways",
  name: "ITA Airways",
  iata: "AZ",
  icao: "ITY",

  country: "Italy",

  headquarters: "Rome, Italy",
  founded: 2021,
  parentCompany: "Lufthansa Group",

  mainHub: "Leonardo da Vinci–Fiumicino Airport (FCO)",
  hubs: [
    "Leonardo da Vinci–Fiumicino Airport (FCO)",
    "Milan Linate Airport (LIN)",
  ],

  fleetSize: 100,
  destinations: 70,
  alliance: "Star Alliance",

  title: "ITA Airways flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled ITA Airways flight under EU261.",
  intro:
    "If your ITA Airways flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "ITA Airways is Italy's national airline and operates primarily from Rome Fiumicino Airport. The airline serves destinations across Europe, North America, South America, Africa and Asia. As a member of the Lufthansa Group, ITA Airways continues to expand its European and intercontinental network. If your ITA Airways flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within ITA Airways' control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with ITA Airways throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "ITA Airways reviews the claim and may approve, reject or request additional information.",
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
  slug: "lot-polish-airlines",
  name: "LOT Polish Airlines",
  iata: "LO",
  icao: "LOT",

  country: "Poland",

  headquarters: "Warsaw, Poland",
  founded: 1929,
  parentCompany: "Polish Aviation Group",

  mainHub: "Warsaw Chopin Airport (WAW)",
  hubs: [
    "Warsaw Chopin Airport (WAW)",
  ],

  fleetSize: 85,
  destinations: 100,
  alliance: "Star Alliance",

  title: "LOT Polish Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled LOT Polish Airlines flight under EU261.",
  intro:
    "If your LOT Polish Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "LOT Polish Airlines is Poland's flag carrier and one of the world's oldest continuously operating airlines. Operating primarily from Warsaw Chopin Airport, LOT connects passengers across Europe, North America, Asia and the Middle East. If your LOT Polish Airlines flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within LOT Polish Airlines' control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with LOT Polish Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "LOT Polish Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "aegean-airlines",
  name: "Aegean Airlines",
  iata: "A3",
  icao: "AEE",

  country: "Greece",

  headquarters: "Kifisia, Athens, Greece",
  founded: 1999,
  parentCompany: "Aegean Airlines S.A.",

  mainHub: "Athens International Airport (ATH)",
  hubs: [
    "Athens International Airport (ATH)",
    "Thessaloniki Airport (SKG)",
  ],

  fleetSize: 80,
  destinations: 160,
  alliance: "Star Alliance",

  title: "Aegean Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Aegean Airlines flight under EU261.",
  intro:
    "If your Aegean Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Aegean Airlines is Greece's flag carrier and the country's largest airline. Operating primarily from Athens and Thessaloniki, Aegean serves an extensive network across Europe, the Mediterranean and the Middle East. If your Aegean Airlines flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within Aegean Airlines' control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Aegean Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Aegean Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "finnair",
  name: "Finnair",
  iata: "AY",
  icao: "FIN",

  country: "Finland",

  headquarters: "Vantaa, Finland",
  founded: 1923,
  parentCompany: "Finnair Plc",

  mainHub: "Helsinki Airport (HEL)",
  hubs: [
    "Helsinki Airport (HEL)",
  ],

  fleetSize: 85,
  destinations: 100,
  alliance: "oneworld",

  title: "Finnair flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Finnair flight under EU261.",
  intro:
    "If your Finnair flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Finnair is Finland's flag carrier and one of Europe's oldest airlines. Operating primarily from Helsinki Airport, Finnair connects Northern Europe with destinations across Europe, Asia and North America. If your Finnair flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within Finnair's control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Finnair throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Finnair reviews the claim and may approve, reject or request additional information.",
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
  slug: "eurowings",
  name: "Eurowings",
  iata: "EW",
  icao: "EWG",

  country: "Germany",

  headquarters: "Düsseldorf, Germany",
  founded: 1993,
  parentCompany: "Lufthansa Group",

  mainHub: "Düsseldorf Airport (DUS)",
  hubs: [
    "Düsseldorf Airport (DUS)",
    "Cologne Bonn Airport (CGN)",
    "Hamburg Airport (HAM)",
    "Stuttgart Airport (STR)",
    "Prague Airport (PRG)",
  ],

  fleetSize: 100,
  destinations: 150,
  alliance: null,

  title: "Eurowings flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Eurowings flight under EU261.",
  intro:
    "If your Eurowings flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Eurowings is Lufthansa Group's low-cost airline, operating an extensive network of domestic and international flights across Europe. Based primarily in Germany, Eurowings serves both leisure and business travellers from several major airports. If your Eurowings flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within Eurowings' control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Eurowings throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Eurowings reviews the claim and may approve, reject or request additional information.",
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
  slug: "jet2",
  name: "Jet2",
  iata: "LS",
  icao: "EXS",

  country: "United Kingdom",

  headquarters: "Leeds, United Kingdom",
  founded: 2002,
  parentCompany: "Jet2 plc",

  mainHub: "Leeds Bradford Airport (LBA)",
  hubs: [
    "Leeds Bradford Airport (LBA)",
    "Manchester Airport (MAN)",
    "Birmingham Airport (BHX)",
    "London Stansted Airport (STN)",
    "Glasgow Airport (GLA)",
  ],

  fleetSize: 135,
  destinations: 80,
  alliance: null,

  title: "Jet2 flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Jet2 flight under EU261.",
  intro:
    "If your Jet2 flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Jet2 is one of the United Kingdom's largest leisure airlines, operating scheduled and charter flights from multiple UK airports to destinations across Europe, the Mediterranean and the Canary Islands. If your Jet2 flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within Jet2's control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Jet2 throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Jet2 reviews the claim and may approve, reject or request additional information.",
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
  slug: "aer-lingus",
  name: "Aer Lingus",
  iata: "EI",
  icao: "EIN",

  country: "Ireland",

  headquarters: "Dublin, Ireland",
  founded: 1936,
  parentCompany: "International Airlines Group (IAG)",

  mainHub: "Dublin Airport (DUB)",
  hubs: [
    "Dublin Airport (DUB)",
    "Cork Airport (ORK)",
    "Shannon Airport (SNN)",
  ],

  fleetSize: 70,
  destinations: 100,
  alliance: null,

  title: "Aer Lingus flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Aer Lingus flight under EU261.",
  intro:
    "If your Aer Lingus flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Aer Lingus is Ireland's national airline and part of International Airlines Group (IAG). Operating primarily from Dublin Airport, the airline serves destinations across Europe and North America. If your Aer Lingus flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within Aer Lingus' control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Aer Lingus throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Aer Lingus reviews the claim and may approve, reject or request additional information.",
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
  slug: "air-serbia",
  name: "Air Serbia",
  iata: "JU",
  icao: "ASL",

  country: "Serbia",

  headquarters: "Belgrade, Serbia",
  founded: 2013,
  parentCompany: "Government of Serbia",

  mainHub: "Belgrade Nikola Tesla Airport (BEG)",
  hubs: [
    "Belgrade Nikola Tesla Airport (BEG)",
  ],

  fleetSize: 30,
  destinations: 90,
  alliance: null,

  title: "Air Serbia flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Air Serbia flight under EU261.",
  intro:
    "If your Air Serbia flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Air Serbia is the national airline of Serbia, operating from Belgrade Nikola Tesla Airport. The airline serves destinations across Europe, the Mediterranean, the Middle East, North America and Asia. If your Air Serbia flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within Air Serbia's control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Air Serbia throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Air Serbia reviews the claim and may approve, reject or request additional information.",
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
  slug: "croatia-airlines",
  name: "Croatia Airlines",
  iata: "OU",
  icao: "CTN",

  country: "Croatia",

  headquarters: "Zagreb, Croatia",
  founded: 1989,
  parentCompany: "Croatia Airlines d.d.",

  mainHub: "Zagreb Airport (ZAG)",
  hubs: [
    "Zagreb Airport (ZAG)",
  ],

  fleetSize: 15,
  destinations: 40,
  alliance: "Star Alliance",

  title: "Croatia Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Croatia Airlines flight under EU261.",
  intro:
    "If your Croatia Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Croatia Airlines is Croatia's national airline and a member of Star Alliance. Operating primarily from Zagreb Airport, the airline connects Croatia with major destinations across Europe. If your Croatia Airlines flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within Croatia Airlines' control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Croatia Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Croatia Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "airbaltic",
  name: "airBaltic",
  iata: "BT",
  icao: "BTI",

  country: "Latvia",

  headquarters: "Riga, Latvia",
  founded: 1995,
  parentCompany: "Government of Latvia",

  mainHub: "Riga International Airport (RIX)",
  hubs: [
    "Riga International Airport (RIX)",
    "Tallinn Airport (TLL)",
    "Vilnius Airport (VNO)",
  ],

  fleetSize: 50,
  destinations: 80,
  alliance: null,

  title: "airBaltic flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled airBaltic flight under EU261.",
  intro:
    "If your airBaltic flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "airBaltic is Latvia's national airline and the largest carrier in the Baltic region. Operating primarily from Riga, Tallinn and Vilnius, the airline serves destinations across Europe, the Middle East and the Caucasus. If your airBaltic flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within airBaltic's control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with airBaltic throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "airBaltic reviews the claim and may approve, reject or request additional information.",
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
  slug: "luxair",
  name: "Luxair",
  iata: "LG",
  icao: "LGL",

  country: "Luxembourg",

  headquarters: "Luxembourg City, Luxembourg",
  founded: 1961,
  parentCompany: "Luxair S.A.",

  mainHub: "Luxembourg Airport (LUX)",
  hubs: [
    "Luxembourg Airport (LUX)",
  ],

  fleetSize: 20,
  destinations: 90,
  alliance: null,

  title: "Luxair flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Luxair flight under EU261.",
  intro:
    "If your Luxair flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Luxair is the national airline of Luxembourg, operating scheduled flights across Europe from Luxembourg Airport. The airline primarily serves business and leisure destinations throughout the continent. If your Luxair flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within Luxair's control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Luxair throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Luxair reviews the claim and may approve, reject or request additional information.",
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
  slug: "icelandair",
  name: "Icelandair",
  iata: "FI",
  icao: "ICE",

  country: "Iceland",

  headquarters: "Reykjavík, Iceland",
  founded: 1937,
  parentCompany: "Icelandair Group",

  mainHub: "Keflavík International Airport (KEF)",
  hubs: [
    "Keflavík International Airport (KEF)",
  ],

  fleetSize: 50,
  destinations: 60,
  alliance: null,

  title: "Icelandair flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Icelandair flight under EU261.",
  intro:
    "If your Icelandair flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Icelandair is Iceland's flag carrier, connecting Europe and North America through its hub at Keflavík International Airport. The airline operates an extensive transatlantic network alongside flights across Europe. If your Icelandair flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within Icelandair's control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Icelandair throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Icelandair reviews the claim and may approve, reject or request additional information.",
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
  slug: "tarom",
  name: "TAROM",
  iata: "RO",
  icao: "ROT",

  country: "Romania",

  headquarters: "Otopeni, Romania",
  founded: 1954,
  parentCompany: "Government of Romania",

  mainHub: "Henri Coandă International Airport (OTP)",
  hubs: [
    "Henri Coandă International Airport (OTP)",
  ],

  fleetSize: 20,
  destinations: 50,
  alliance: "SkyTeam",

  title: "TAROM flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled TAROM flight under EU261.",
  intro:
    "If your TAROM flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "TAROM is Romania's national airline, operating primarily from Bucharest Henri Coandă International Airport. The airline serves destinations across Europe and the Middle East. If your TAROM flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within TAROM's control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with TAROM throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "TAROM reviews the claim and may approve, reject or request additional information.",
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
  slug: "smartwings",
  name: "Smartwings",
  iata: "QS",
  icao: "TVS",

  country: "Czech Republic",

  headquarters: "Prague, Czech Republic",
  founded: 1997,
  parentCompany: "Smartwings Group",

  mainHub: "Václav Havel Airport Prague (PRG)",
  hubs: [
    "Václav Havel Airport Prague (PRG)",
  ],

  fleetSize: 45,
  destinations: 100,
  alliance: null,

  title: "Smartwings flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Smartwings flight under EU261.",
  intro:
    "If your Smartwings flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Smartwings is the Czech Republic's largest airline, operating scheduled and charter flights throughout Europe, the Mediterranean, North Africa and the Middle East. Based at Prague Airport, the airline serves both leisure and business travellers. If your Smartwings flight was delayed, cancelled or disrupted, you may be entitled to compensation under EU261 depending on the circumstances.",

  passengerRights:
    "Under EU261, passengers may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "The amount of compensation under EU261 depends on the flight distance and the arrival delay. Eligible passengers may receive between €250 and €600.",

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
    "To qualify for compensation, the disruption must normally have been within Smartwings' control. Operational issues and technical faults may qualify, while extraordinary circumstances such as severe weather or air traffic restrictions generally do not.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Smartwings throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Smartwings reviews the claim and may approve, reject or request additional information.",
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
  slug: "turkish-airlines",
  name: "Turkish Airlines",
  iata: "TK",
  icao: "THY",

  country: "Turkey",

  headquarters: "Istanbul, Turkey",
  founded: 1933,
  parentCompany: "Turkish Airlines A.O.",

  mainHub: "Istanbul Airport (IST)",
  hubs: [
    "Istanbul Airport (IST)",
  ],

  fleetSize: 480,
  destinations: 350,
  alliance: "Star Alliance",

  title: "Turkish Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Turkish Airlines flight under EU261.",
  intro:
    "If your Turkish Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Turkish Airlines is the national airline of Türkiye and one of the world's largest international carriers, serving more countries than any other airline. Operating from Istanbul Airport, the airline connects Europe, Asia, Africa, North America, South America and the Middle East. Flights departing from EU or EEA airports may be covered by EU261, meaning eligible passengers could claim compensation for qualifying delays and cancellations.",

  passengerRights:
    "Passengers departing from EU or EEA airports may have rights under EU261 when their Turkish Airlines flight is significantly delayed, cancelled or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies to Turkish Airlines flights departing from EU or EEA airports. Flights departing from Türkiye to the EU are generally not covered unless operated by an EU carrier.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
      value: "EU261 (eligible flights)",
      description: "Flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Turkish Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Turkish Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "tui-airways",
  name: "TUI Airways",
  iata: "BY",
  icao: "TOM",

  country: "United Kingdom",

  headquarters: "Luton, United Kingdom",
  founded: 1962,
  parentCompany: "TUI Group",

  mainHub: "Manchester Airport (MAN)",
  hubs: [
    "Manchester Airport (MAN)",
    "London Gatwick Airport (LGW)",
    "Birmingham Airport (BHX)",
    "Bristol Airport (BRS)",
  ],

  fleetSize: 70,
  destinations: 90,
  alliance: null,

  title: "TUI Airways flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled TUI Airways flight under EU261.",
  intro:
    "If your TUI Airways flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "TUI Airways is the United Kingdom's largest leisure airline and part of the TUI Group. Operating from several major UK airports, the airline serves holiday destinations across Europe, North Africa, the Caribbean and North America. Depending on the route and departure airport, eligible passengers may be entitled to compensation under EU261.",

  passengerRights:
    "Passengers departing from EU or EEA airports may have rights under EU261 when their TUI Airways flight is significantly delayed, cancelled or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies to flights departing from EU or EEA airports. Coverage for flights departing from the United Kingdom depends on the applicable passenger rights legislation and route.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
      value: "EU261 (eligible flights)",
      description: "Depends on departure airport and route.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with TUI Airways throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "TUI Airways reviews the claim and may approve, reject or request additional information.",
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
  slug: "tui-fly-belgium",
  name: "TUI fly Belgium",
  iata: "TB",
  icao: "JAF",

  country: "Belgium",

  headquarters: "Zaventem, Belgium",
  founded: 2003,
  parentCompany: "TUI Group",

  mainHub: "Brussels Airport (BRU)",
  hubs: [
    "Brussels Airport (BRU)",
    "Antwerp International Airport (ANR)",
    "Ostend-Bruges International Airport (OST)",
  ],

  fleetSize: 20,
  destinations: 130,
  alliance: null,

  title: "TUI fly Belgium flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled TUI fly Belgium flight under EU261.",
  intro:
    "If your TUI fly Belgium flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "TUI fly Belgium is the Belgian airline of the TUI Group, operating scheduled and charter flights from Brussels and other Belgian airports to destinations across Europe, North Africa, the Canary Islands and the Mediterranean. Eligible passengers may claim compensation under EU261 for qualifying disruptions.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when their TUI fly Belgium flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies when the flight departs from an EU or EEA airport. Compensation depends on the cause of the disruption and whether it was within the airline's control.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with TUI fly Belgium throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "TUI fly Belgium reviews the claim and may approve, reject or request additional information.",
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
  slug: "tui-fly-netherlands",
  name: "TUI fly Netherlands",
  iata: "OR",
  icao: "TFL",

  country: "Netherlands",

  headquarters: "Haarlemmermeer, Netherlands",
  founded: 2005,
  parentCompany: "TUI Group",

  mainHub: "Amsterdam Airport Schiphol (AMS)",
  hubs: [
    "Amsterdam Airport Schiphol (AMS)",
    "Rotterdam The Hague Airport (RTM)",
    "Eindhoven Airport (EIN)",
  ],

  fleetSize: 35,
  destinations: 90,
  alliance: null,

  title: "TUI fly Netherlands flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled TUI fly Netherlands flight under EU261.",
  intro:
    "If your TUI fly Netherlands flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "TUI fly Netherlands is the Dutch airline of the TUI Group, operating scheduled and charter flights from Amsterdam and other Dutch airports to destinations across Europe, North Africa, the Canary Islands, the Caribbean and beyond. Eligible passengers may claim compensation under EU261 for qualifying disruptions.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when their TUI fly Netherlands flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies when the flight departs from an EU or EEA airport. Compensation depends on the cause of the disruption and whether it was within the airline's control.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with TUI fly Netherlands throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "TUI fly Netherlands reviews the claim and may approve, reject or request additional information.",
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
  slug: "tui-fly-germany",
  name: "TUI fly Germany",
  iata: "X3",
  icao: "TUI",

  country: "Germany",

  headquarters: "Langenhagen, Germany",
  founded: 1972,
  parentCompany: "TUI Group",

  mainHub: "Hannover Airport (HAJ)",
  hubs: [
    "Hannover Airport (HAJ)",
    "Frankfurt Airport (FRA)",
    "Munich Airport (MUC)",
    "Düsseldorf Airport (DUS)",
  ],

  fleetSize: 25,
  destinations: 80,
  alliance: null,

  title: "TUI fly Germany flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled TUI fly Germany flight under EU261.",
  intro:
    "If your TUI fly Germany flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "TUI fly Germany is the German airline of the TUI Group, operating scheduled and charter flights from major German airports to destinations across Europe, North Africa, the Canary Islands and other popular holiday regions. Eligible passengers may claim compensation under EU261 for qualifying disruptions.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when their TUI fly Germany flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies when the flight departs from an EU or EEA airport. Compensation depends on the cause of the disruption and whether it was within the airline's control.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with TUI fly Germany throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "TUI fly Germany reviews the claim and may approve, reject or request additional information.",
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
  slug: "condor",
  name: "Condor",
  iata: "DE",
  icao: "CFG",

  country: "Germany",

  headquarters: "Neu-Isenburg, Germany",
  founded: 1955,
  parentCompany: "Attestor Capital",

  mainHub: "Frankfurt Airport (FRA)",
  hubs: [
    "Frankfurt Airport (FRA)",
    "Munich Airport (MUC)",
    "Düsseldorf Airport (DUS)",
  ],

  fleetSize: 60,
  destinations: 90,
  alliance: null,

  title: "Condor flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Condor flight under EU261.",
  intro:
    "If your Condor flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Condor is one of Germany's largest leisure airlines, operating flights from Frankfurt and other German airports to destinations across Europe, North America, the Caribbean, Africa and Asia. As a German airline, eligible Condor flights are covered by EU261, meaning passengers may claim compensation for qualifying delays and cancellations.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when their Condor flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to Condor flights departing from the EU or EEA, as well as eligible Condor-operated flights arriving in the EU from third countries because Condor is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Condor throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Condor reviews the claim and may approve, reject or request additional information.",
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
  slug: "air-europa",
  name: "Air Europa",
  iata: "UX",
  icao: "AEA",

  country: "Spain",

  headquarters: "Llucmajor, Mallorca, Spain",
  founded: 1986,
  parentCompany: "Globalia",

  mainHub: "Adolfo Suárez Madrid–Barajas Airport (MAD)",
  hubs: [
    "Adolfo Suárez Madrid–Barajas Airport (MAD)",
  ],

  fleetSize: 55,
  destinations: 55,
  alliance: "SkyTeam",

  title: "Air Europa flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Air Europa flight under EU261.",
  intro:
    "If your Air Europa flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Air Europa is one of Spain's largest airlines, operating from Madrid-Barajas Airport to destinations across Europe, North America, South America, the Caribbean and Africa. As a Spanish airline, eligible Air Europa flights are covered by EU261, allowing passengers to claim compensation for qualifying delays and cancellations.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when their Air Europa flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to Air Europa flights departing from the EU or EEA, as well as eligible Air Europa-operated flights arriving in the EU from third countries because Air Europa is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Air Europa throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Air Europa reviews the claim and may approve, reject or request additional information.",
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
  slug: "pegasus-airlines",
  name: "Pegasus Airlines",
  iata: "PC",
  icao: "PGT",

  country: "Turkey",

  headquarters: "Istanbul, Turkey",
  founded: 1990,
  parentCompany: "Pegasus Hava Taşımacılığı A.Ş.",

  mainHub: "Sabiha Gökçen International Airport (SAW)",
  hubs: [
    "Sabiha Gökçen International Airport (SAW)",
    "Antalya Airport (AYT)",
  ],

  fleetSize: 120,
  destinations: 150,
  alliance: null,

  title: "Pegasus Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Pegasus Airlines flight under EU261.",
  intro:
    "If your Pegasus Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Pegasus Airlines is one of Türkiye's largest low-cost airlines, operating an extensive network across Europe, the Middle East, Central Asia and North Africa. Based at Istanbul Sabiha Gökçen Airport, Pegasus carries millions of passengers every year. Flights departing from EU or EEA airports may be covered by EU261, allowing eligible passengers to claim compensation for qualifying delays and cancellations.",

  passengerRights:
    "Passengers departing from EU or EEA airports may have rights under EU261 when their Pegasus Airlines flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies to Pegasus Airlines flights departing from EU or EEA airports. Flights departing from Türkiye to the EU are generally not covered unless operated by an EU carrier.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
      value: "EU261 (eligible flights)",
      description: "Flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Pegasus Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Pegasus Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "sunexpress",
  name: "SunExpress",
  iata: "XQ",
  icao: "SXS",

  country: "Turkey",

  headquarters: "Antalya, Turkey",
  founded: 1989,
  parentCompany: "Turkish Airlines & Lufthansa",

  mainHub: "Antalya Airport (AYT)",
  hubs: [
    "Antalya Airport (AYT)",
    "Izmir Adnan Menderes Airport (ADB)",
  ],

  fleetSize: 85,
  destinations: 90,
  alliance: null,

  title: "SunExpress flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled SunExpress flight under EU261.",
  intro:
    "If your SunExpress flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "SunExpress is a joint venture between Turkish Airlines and Lufthansa, operating scheduled and leisure flights between Türkiye and Europe. With major bases in Antalya and Izmir, the airline serves millions of passengers each year. Flights departing from EU or EEA airports may be covered by EU261, allowing eligible passengers to claim compensation for qualifying delays and cancellations.",

  passengerRights:
    "Passengers departing from EU or EEA airports may have rights under EU261 when their SunExpress flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies to SunExpress flights departing from EU or EEA airports. Flights departing from Türkiye to the EU are generally not covered unless operated by an EU carrier.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
      value: "EU261 (eligible flights)",
      description: "Flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with SunExpress throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "SunExpress reviews the claim and may approve, reject or request additional information.",
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
  slug: "edelweiss-air",
  name: "Edelweiss Air",
  iata: "WK",
  icao: "EDW",

  country: "Switzerland",

  headquarters: "Kloten, Switzerland",
  founded: 1995,
  parentCompany: "Lufthansa Group",

  mainHub: "Zurich Airport (ZRH)",
  hubs: [
    "Zurich Airport (ZRH)",
  ],

  fleetSize: 22,
  destinations: 100,
  alliance: null,

  title: "Edelweiss Air flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Edelweiss Air flight under EU261.",
  intro:
    "If your Edelweiss Air flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Edelweiss Air is Switzerland's leading leisure airline and a sister company of SWISS within the Lufthansa Group. Operating primarily from Zurich Airport, the airline serves holiday destinations across Europe, North America, Africa, Asia and the Indian Ocean. Eligible Edelweiss Air flights are covered by EU261, allowing passengers to claim compensation for qualifying delays and cancellations.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when their Edelweiss Air flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to eligible Edelweiss Air flights departing from the EU or EEA, as well as qualifying Edelweiss Air-operated flights arriving in the EU from third countries because the airline is established within the EU/EEA aviation framework.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Edelweiss Air throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Edelweiss Air reviews the claim and may approve, reject or request additional information.",
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
  slug: "discover-airlines",
  name: "Discover Airlines",
  iata: "4Y",
  icao: "OCN",

  country: "Germany",

  headquarters: "Frankfurt, Germany",
  founded: 2021,
  parentCompany: "Lufthansa Group",

  mainHub: "Frankfurt Airport (FRA)",
  hubs: [
    "Frankfurt Airport (FRA)",
    "Munich Airport (MUC)",
  ],

  fleetSize: 30,
  destinations: 62,
  alliance: null,

  title: "Discover Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Discover Airlines flight under EU261.",
  intro:
    "If your Discover Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Discover Airlines is the Lufthansa Group's leisure airline, operating flights from Frankfurt and Munich to holiday destinations across Europe, North America, Africa and the Caribbean. As a German airline, eligible Discover Airlines flights are covered by EU261, allowing passengers to claim compensation for qualifying delays and cancellations.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when their Discover Airlines flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to Discover Airlines flights departing from the EU or EEA, as well as eligible Discover Airlines-operated flights arriving in the EU from third countries because Discover Airlines is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Discover Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Discover Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "transavia",
  name: "Transavia",
  iata: "HV",
  icao: "TRA",

  country: "Netherlands",

  headquarters: "Haarlemmermeer, Netherlands",
  founded: 1965,
  parentCompany: "Air France–KLM Group",

  mainHub: "Amsterdam Airport Schiphol (AMS)",
  hubs: [
    "Amsterdam Airport Schiphol (AMS)",
    "Rotterdam The Hague Airport (RTM)",
    "Eindhoven Airport (EIN)",
  ],

  fleetSize: 50,
  destinations: 150,
  alliance: null,

  title: "Transavia flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Transavia flight under EU261.",
  intro:
    "If your Transavia flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Transavia is the Dutch low-cost airline within the Air France–KLM Group. Operating primarily from Amsterdam Schiphol, Rotterdam and Eindhoven, the airline serves destinations across Europe, North Africa and the Mediterranean. As a Dutch airline, eligible Transavia flights are covered by EU261, allowing passengers to claim compensation for qualifying delays and cancellations.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when their Transavia flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to Transavia flights departing from the EU or EEA, as well as eligible Transavia-operated flights arriving in the EU from third countries because Transavia is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Transavia throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Transavia reviews the claim and may approve, reject or request additional information.",
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
  slug: "volotea",
  name: "Volotea",
  iata: "V7",
  icao: "VOE",

  country: "Spain",

  headquarters: "Barcelona, Spain",
  founded: 2011,
  parentCompany: "Volotea S.L.",

  mainHub: "Asturias Airport (OVD)",
  hubs: [
    "Asturias Airport (OVD)",
    "Venice Marco Polo Airport (VCE)",
    "Nantes Atlantique Airport (NTE)",
    "Bordeaux Airport (BOD)",
  ],

  fleetSize: 41,
  destinations: 110,
  alliance: null,

  title: "Volotea flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Volotea flight under EU261.",
  intro:
    "If your Volotea flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Volotea is a Spanish low-cost airline founded in 2011, specializing in direct flights between small and medium-sized European cities. The airline operates an extensive network across Southern and Western Europe and, as an EU airline, eligible Volotea flights are covered by EU261, allowing passengers to claim compensation for qualifying delays and cancellations.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when their Volotea flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to Volotea flights departing from the EU or EEA, as well as eligible Volotea-operated flights arriving in the EU from third countries because Volotea is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Volotea throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Volotea reviews the claim and may approve, reject or request additional information.",
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
  slug: "play",
  name: "PLAY",
  iata: "OG",
  icao: "FPY",

  country: "Iceland",

  headquarters: "Reykjavík, Iceland",
  founded: 2019,
  parentCompany: "Fly Play hf.",

  mainHub: "Keflavík International Airport (KEF)",
  hubs: [
    "Keflavík International Airport (KEF)",
  ],

  fleetSize: 10,
  destinations: 40,
  alliance: null,

  title: "PLAY flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled PLAY flight under EU261.",
  intro:
    "If your PLAY flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "PLAY is an Icelandic low-cost airline based at Keflavík International Airport. The airline connects Europe with North America via Iceland using a modern Airbus A320neo-family fleet. Because Iceland is part of the EEA, eligible PLAY flights are covered by EU261, allowing passengers to claim compensation for qualifying delays and cancellations.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when their PLAY flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to PLAY flights departing from the EU or EEA, as well as eligible PLAY-operated flights arriving in the EU from third countries because PLAY is an EEA airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with PLAY throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "PLAY reviews the claim and may approve, reject or request additional information.",
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
  slug: "wideroe",
  name: "Widerøe",
  iata: "WF",
  icao: "WIF",

  country: "Norway",

  headquarters: "Bodø, Norway",
  founded: 1934,
  parentCompany: "Norwegian Group",

  mainHub: "Bodø Airport (BOO)",
  hubs: [
    "Bodø Airport (BOO)",
    "Bergen Airport (BGO)",
    "Tromsø Airport (TOS)",
  ],

  fleetSize: 50,
  destinations: 50,
  alliance: null,

  title: "Widerøe flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Widerøe flight under EU261.",
  intro:
    "If your Widerøe flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Widerøe is Norway's largest regional airline, operating an extensive domestic network together with international routes across Northern Europe. As a Norwegian airline based within the EEA, eligible Widerøe flights are covered by EU261, allowing passengers to claim compensation for qualifying delays and cancellations.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when their Widerøe flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to Widerøe flights departing from the EU or EEA, as well as eligible Widerøe-operated flights arriving in the EU from third countries because Widerøe is an EEA airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Widerøe throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Widerøe reviews the claim and may approve, reject or request additional information.",
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
  slug: "emirates",
  name: "Emirates",
  iata: "EK",
  icao: "UAE",

  country: "United Arab Emirates",

  headquarters: "Dubai, United Arab Emirates",
  founded: 1985,
  parentCompany: "The Emirates Group",

  mainHub: "Dubai International Airport (DXB)",
  hubs: [
    "Dubai International Airport (DXB)",
  ],

  fleetSize: 260,
  destinations: 140,
  alliance: null,

  title: "Emirates flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Emirates flight under EU261.",
  intro:
    "If your Emirates flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Emirates is one of the world's largest international airlines, operating an extensive long-haul network from its hub at Dubai International Airport. The airline serves destinations across Europe, Asia, Africa, Oceania and the Americas. Although Emirates is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when an Emirates flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Emirates flights departing from EU or EEA airports. Flights departing from Dubai or other non-EU countries to the EU are generally not covered because Emirates is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Emirates flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Emirates throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Emirates reviews the claim and may approve, reject or request additional information.",
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
  slug: "qatar-airways",
  name: "Qatar Airways",
  iata: "QR",
  icao: "QTR",

  country: "Qatar",

  headquarters: "Doha, Qatar",
  founded: 1993,
  parentCompany: "Qatar Airways Group",

  mainHub: "Hamad International Airport (DOH)",
  hubs: [
    "Hamad International Airport (DOH)",
  ],

  fleetSize: 250,
  destinations: 170,
  alliance: "oneworld",

  title: "Qatar Airways flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Qatar Airways flight under EU261.",
  intro:
    "If your Qatar Airways flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Qatar Airways is one of the world's leading international airlines, operating an extensive global network from Hamad International Airport in Doha. The airline serves destinations across Europe, Asia, Africa, Oceania and the Americas. Although Qatar Airways is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Qatar Airways flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Qatar Airways flights departing from EU or EEA airports. Flights departing from Qatar or other non-EU countries to the EU are generally not covered because Qatar Airways is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Qatar Airways flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Qatar Airways throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Qatar Airways reviews the claim and may approve, reject or request additional information.",
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
  slug: "delta-air-lines",
  name: "Delta Air Lines",
  iata: "DL",
  icao: "DAL",

  country: "United States",

  headquarters: "Atlanta, Georgia, United States",
  founded: 1925,
  parentCompany: "Delta Air Lines, Inc.",

  mainHub: "Hartsfield–Jackson Atlanta International Airport (ATL)",
  hubs: [
    "Hartsfield–Jackson Atlanta International Airport (ATL)",
    "Detroit Metropolitan Airport (DTW)",
    "Minneapolis–Saint Paul International Airport (MSP)",
    "Salt Lake City International Airport (SLC)",
    "John F. Kennedy International Airport (JFK)",
    "Los Angeles International Airport (LAX)",
  ],

  fleetSize: 1000,
  destinations: 290,
  alliance: "SkyTeam",

  title: "Delta Air Lines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Delta Air Lines flight under EU261.",
  intro:
    "If your Delta Air Lines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Delta Air Lines is one of the world's largest airlines, operating an extensive global network from the United States to Europe, Asia, Africa, Latin America and Oceania. Although Delta is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Delta Air Lines flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Delta Air Lines flights departing from EU or EEA airports. Flights departing from the United States or other non-EU countries to the EU are generally not covered because Delta is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Delta Air Lines flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Delta Air Lines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Delta Air Lines reviews the claim and may approve, reject or request additional information.",
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
  slug: "singapore-airlines",
  name: "Singapore Airlines",
  iata: "SQ",
  icao: "SIA",

  country: "Singapore",

  headquarters: "Singapore",
  founded: 1972,
  parentCompany: "Singapore Airlines Group",

  mainHub: "Singapore Changi Airport (SIN)",
  hubs: [
    "Singapore Changi Airport (SIN)",
  ],

  fleetSize: 160,
  destinations: 130,
  alliance: "Star Alliance",

  title: "Singapore Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Singapore Airlines flight under EU261.",
  intro:
    "If your Singapore Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Singapore Airlines is one of the world's leading premium airlines, operating long-haul flights between Europe, Asia, Oceania and North America through its hub at Singapore Changi Airport. Although Singapore Airlines is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Singapore Airlines flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Singapore Airlines flights departing from EU or EEA airports. Flights departing from Singapore or other non-EU countries to the EU are generally not covered because Singapore Airlines is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Singapore Airlines flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Singapore Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Singapore Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "united-airlines",
  name: "United Airlines",
  iata: "UA",
  icao: "UAL",

  country: "United States",

  headquarters: "Chicago, Illinois, United States",
  founded: 1926,
  parentCompany: "United Airlines Holdings",

  mainHub: "Chicago O'Hare International Airport (ORD)",
  hubs: [
    "Chicago O'Hare International Airport (ORD)",
    "Denver International Airport (DEN)",
    "George Bush Intercontinental Airport (IAH)",
    "Newark Liberty International Airport (EWR)",
    "San Francisco International Airport (SFO)",
    "Washington Dulles International Airport (IAD)",
  ],

  fleetSize: 1000,
  destinations: 350,
  alliance: "Star Alliance",

  title: "United Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled United Airlines flight under EU261.",
  intro:
    "If your United Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "United Airlines is one of the world's largest airlines, operating a major global network from the United States to Europe, Asia, Latin America, Africa and Oceania. Although United Airlines is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a United Airlines flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to United Airlines flights departing from EU or EEA airports. Flights departing from the United States or other non-EU countries to the EU are generally not covered because United Airlines is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible United Airlines flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with United Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "United Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "american-airlines",
  name: "American Airlines",
  iata: "AA",
  icao: "AAL",

  country: "United States",

  headquarters: "Fort Worth, Texas, United States",
  founded: 1930,
  parentCompany: "American Airlines Group",

  mainHub: "Dallas Fort Worth International Airport (DFW)",
  hubs: [
    "Dallas Fort Worth International Airport (DFW)",
    "Charlotte Douglas International Airport (CLT)",
    "Chicago O'Hare International Airport (ORD)",
    "Miami International Airport (MIA)",
    "John F. Kennedy International Airport (JFK)",
    "Los Angeles International Airport (LAX)",
    "Philadelphia International Airport (PHL)",
    "Phoenix Sky Harbor International Airport (PHX)",
  ],

  fleetSize: 970,
  destinations: 350,
  alliance: "oneworld",

  title: "American Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled American Airlines flight under EU261.",
  intro:
    "If your American Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "American Airlines is one of the world's largest airlines, operating a major global network from the United States to Europe, Asia, Latin America and the Caribbean. Although American Airlines is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when an American Airlines flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to American Airlines flights departing from EU or EEA airports. Flights departing from the United States or other non-EU countries to the EU are generally not covered because American Airlines is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible American Airlines flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with American Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "American Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "air-canada",
  name: "Air Canada",
  iata: "AC",
  icao: "ACA",

  country: "Canada",

  headquarters: "Montreal, Quebec, Canada",
  founded: 1937,
  parentCompany: "Air Canada",

  mainHub: "Toronto Pearson International Airport (YYZ)",
  hubs: [
    "Toronto Pearson International Airport (YYZ)",
    "Montréal–Trudeau International Airport (YUL)",
    "Vancouver International Airport (YVR)",
    "Calgary International Airport (YYC)",
  ],

  fleetSize: 360,
  destinations: 190,
  alliance: "Star Alliance",

  title: "Air Canada flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Air Canada flight under EU261.",
  intro:
    "If your Air Canada flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Air Canada is Canada's largest airline, operating an extensive international network between North America, Europe, Asia, South America and Oceania. Although Air Canada is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when an Air Canada flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Air Canada flights departing from EU or EEA airports. Flights departing from Canada or other non-EU countries to the EU are generally not covered because Air Canada is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Air Canada flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Air Canada throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Air Canada reviews the claim and may approve, reject or request additional information.",
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
  slug: "air-india",
  name: "Air India",
  iata: "AI",
  icao: "AIC",

  country: "India",

  headquarters: "Gurugram, Haryana, India",
  founded: 1932,
  parentCompany: "Tata Group",

  mainHub: "Indira Gandhi International Airport (DEL)",
  hubs: [
    "Indira Gandhi International Airport (DEL)",
    "Chhatrapati Shivaji Maharaj International Airport (BOM)",
    "Kempegowda International Airport (BLR)",
  ],

  fleetSize: 200,
  destinations: 100,
  alliance: "Star Alliance",

  title: "Air India flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Air India flight under EU261.",
  intro:
    "If your Air India flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Air India is India's national airline and a member of Star Alliance, operating an extensive international network across Europe, North America, Asia and Australia. Although Air India is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when an Air India flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Air India flights departing from EU or EEA airports. Flights departing from India or other non-EU countries to the EU are generally not covered because Air India is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Air India flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Air India throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Air India reviews the claim and may approve, reject or request additional information.",
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
  slug: "etihad-airways",
  name: "Etihad Airways",
  iata: "EY",
  icao: "ETD",

  country: "United Arab Emirates",

  headquarters: "Abu Dhabi, United Arab Emirates",
  founded: 2003,
  parentCompany: "Etihad Aviation Group",

  mainHub: "Zayed International Airport (AUH)",
  hubs: [
    "Zayed International Airport (AUH)",
  ],

  fleetSize: 100,
  destinations: 90,
  alliance: null,

  title: "Etihad Airways flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Etihad Airways flight under EU261.",
  intro:
    "If your Etihad Airways flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Etihad Airways is the national airline of the United Arab Emirates, operating long-haul flights from Abu Dhabi to Europe, Asia, Africa, Australia and North America. Although Etihad Airways is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when an Etihad Airways flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Etihad Airways flights departing from EU or EEA airports. Flights departing from the United Arab Emirates or other non-EU countries to the EU are generally not covered because Etihad Airways is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Etihad Airways flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Etihad Airways throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Etihad Airways reviews the claim and may approve, reject or request additional information.",
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
  slug: "virgin-atlantic",
  name: "Virgin Atlantic",
  iata: "VS",
  icao: "VIR",

  country: "United Kingdom",

  headquarters: "Crawley, England, United Kingdom",
  founded: 1984,
  parentCompany: "Virgin Atlantic Limited",

  mainHub: "London Heathrow Airport (LHR)",
  hubs: [
    "London Heathrow Airport (LHR)",
    "Manchester Airport (MAN)",
  ],

  fleetSize: 45,
  destinations: 35,
  alliance: "SkyTeam",

  title: "Virgin Atlantic flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Virgin Atlantic flight under EU261.",
  intro:
    "If your Virgin Atlantic flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Virgin Atlantic is a British long-haul airline operating flights from the United Kingdom to North America, the Caribbean, Africa, Asia and the Middle East. Although based outside the EU, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Virgin Atlantic flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Virgin Atlantic flights departing from EU or EEA airports. Flights departing from the United Kingdom or other non-EU countries to the EU are generally not covered under EU261 because Virgin Atlantic is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Virgin Atlantic flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Virgin Atlantic throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Virgin Atlantic reviews the claim and may approve, reject or request additional information.",
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
  slug: "thai-airways",
  name: "Thai Airways",
  iata: "TG",
  icao: "THA",

  country: "Thailand",

  headquarters: "Bangkok, Thailand",
  founded: 1960,
  parentCompany: "Thai Airways International PCL",

  mainHub: "Suvarnabhumi Airport (BKK)",
  hubs: [
    "Suvarnabhumi Airport (BKK)",
  ],

  fleetSize: 80,
  destinations: 65,
  alliance: "Star Alliance",

  title: "Thai Airways flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Thai Airways flight under EU261.",
  intro:
    "If your Thai Airways flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Thai Airways is Thailand's national airline and a member of Star Alliance, operating long-haul flights between Asia, Europe and Australia from its hub at Bangkok Suvarnabhumi Airport. Although Thai Airways is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Thai Airways flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Thai Airways flights departing from EU or EEA airports. Flights departing from Thailand or other non-EU countries to the EU are generally not covered because Thai Airways is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Thai Airways flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Thai Airways throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Thai Airways reviews the claim and may approve, reject or request additional information.",
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
  slug: "cathay-pacific",
  name: "Cathay Pacific",
  iata: "CX",
  icao: "CPA",

  country: "Hong Kong",

  headquarters: "Hong Kong",
  founded: 1946,
  parentCompany: "Cathay Group",

  mainHub: "Hong Kong International Airport (HKG)",
  hubs: [
    "Hong Kong International Airport (HKG)",
  ],

  fleetSize: 180,
  destinations: 90,
  alliance: "oneworld",

  title: "Cathay Pacific flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Cathay Pacific flight under EU261.",
  intro:
    "If your Cathay Pacific flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Cathay Pacific is Hong Kong's flag carrier and one of Asia's leading international airlines. Operating an extensive long-haul network from Hong Kong International Airport, the airline serves destinations across Europe, North America, Asia, Australia and the Middle East. Although Cathay Pacific is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Cathay Pacific flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Cathay Pacific flights departing from EU or EEA airports. Flights departing from Hong Kong or other non-EU countries to the EU are generally not covered because Cathay Pacific is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Cathay Pacific flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Cathay Pacific throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Cathay Pacific reviews the claim and may approve, reject or request additional information.",
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
  slug: "eva-air",
  name: "EVA Air",
  iata: "BR",
  icao: "EVA",

  country: "Taiwan",

  headquarters: "Taoyuan City, Taiwan",
  founded: 1989,
  parentCompany: "Evergreen Group",

  mainHub: "Taiwan Taoyuan International Airport (TPE)",
  hubs: [
    "Taiwan Taoyuan International Airport (TPE)",
  ],

  fleetSize: 90,
  destinations: 65,
  alliance: "Star Alliance",

  title: "EVA Air flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled EVA Air flight under EU261.",
  intro:
    "If your EVA Air flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "EVA Air is one of Asia's leading international airlines and a member of Star Alliance. Operating from Taiwan Taoyuan International Airport, the airline serves destinations across Europe, North America, Asia and Oceania. Although EVA Air is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when an EVA Air flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to EVA Air flights departing from EU or EEA airports. Flights departing from Taiwan or other non-EU countries to the EU are generally not covered because EVA Air is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible EVA Air flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with EVA Air throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "EVA Air reviews the claim and may approve, reject or request additional information.",
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
  slug: "korean-air",
  name: "Korean Air",
  iata: "KE",
  icao: "KAL",

  country: "South Korea",

  headquarters: "Seoul, South Korea",
  founded: 1969,
  parentCompany: "Korean Air",

  mainHub: "Incheon International Airport (ICN)",
  hubs: [
    "Incheon International Airport (ICN)",
    "Gimpo International Airport (GMP)",
  ],

  fleetSize: 160,
  destinations: 120,
  alliance: "SkyTeam",

  title: "Korean Air flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Korean Air flight under EU261.",
  intro:
    "If your Korean Air flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Korean Air is South Korea's flag carrier and one of Asia's largest international airlines. Operating from Incheon International Airport, the airline serves destinations across Europe, North America, Asia, Oceania and the Middle East. Although Korean Air is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Korean Air flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Korean Air flights departing from EU or EEA airports. Flights departing from South Korea or other non-EU countries to the EU are generally not covered because Korean Air is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Korean Air flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Korean Air throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Korean Air reviews the claim and may approve, reject or request additional information.",
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
  slug: "japan-airlines",
  name: "Japan Airlines",
  iata: "JL",
  icao: "JAL",

  country: "Japan",

  headquarters: "Tokyo, Japan",
  founded: 1951,
  parentCompany: "Japan Airlines Co., Ltd.",

  mainHub: "Tokyo Haneda Airport (HND)",
  hubs: [
    "Tokyo Haneda Airport (HND)",
    "Tokyo Narita International Airport (NRT)",
    "Osaka Kansai International Airport (KIX)",
  ],

  fleetSize: 230,
  destinations: 95,
  alliance: "oneworld",

  title: "Japan Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Japan Airlines flight under EU261.",
  intro:
    "If your Japan Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Japan Airlines is Japan's flag carrier and a member of the oneworld alliance. Operating from Tokyo Haneda and Narita airports, the airline serves destinations across Asia, Europe, North America and Oceania. Although Japan Airlines is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Japan Airlines flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Japan Airlines flights departing from EU or EEA airports. Flights departing from Japan or other non-EU countries to the EU are generally not covered because Japan Airlines is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Japan Airlines flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Japan Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Japan Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "ana",
  name: "ANA",
  iata: "NH",
  icao: "ANA",

  country: "Japan",

  headquarters: "Tokyo, Japan",
  founded: 1952,
  parentCompany: "ANA Holdings",

  mainHub: "Tokyo Haneda Airport (HND)",
  hubs: [
    "Tokyo Haneda Airport (HND)",
    "Tokyo Narita International Airport (NRT)",
    "Osaka Kansai International Airport (KIX)",
  ],

  fleetSize: 240,
  destinations: 90,
  alliance: "Star Alliance",

  title: "ANA flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled ANA flight under EU261.",
  intro:
    "If your ANA flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "ANA, All Nippon Airways, is one of Japan's largest airlines and a member of Star Alliance. Operating from Tokyo Haneda and Narita airports, ANA serves destinations across Asia, Europe, North America and Oceania. Although ANA is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when an ANA flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to ANA flights departing from EU or EEA airports. Flights departing from Japan or other non-EU countries to the EU are generally not covered because ANA is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible ANA flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with ANA throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "ANA reviews the claim and may approve, reject or request additional information.",
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
  slug: "malaysia-airlines",
  name: "Malaysia Airlines",
  iata: "MH",
  icao: "MAS",

  country: "Malaysia",

  headquarters: "Sepang, Malaysia",
  founded: 1972,
  parentCompany: "Malaysia Aviation Group",

  mainHub: "Kuala Lumpur International Airport (KUL)",
  hubs: [
    "Kuala Lumpur International Airport (KUL)",
  ],

  fleetSize: 80,
  destinations: 60,
  alliance: "oneworld",

  title: "Malaysia Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Malaysia Airlines flight under EU261.",
  intro:
    "If your Malaysia Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Malaysia Airlines is the national airline of Malaysia and a member of the oneworld alliance. Operating from Kuala Lumpur International Airport, the airline serves destinations across Asia, Europe, Australia and the Middle East. Although Malaysia Airlines is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Malaysia Airlines flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Malaysia Airlines flights departing from EU or EEA airports. Flights departing from Malaysia or other non-EU countries to the EU are generally not covered because Malaysia Airlines is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Malaysia Airlines flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Malaysia Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Malaysia Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "vietnam-airlines",
  name: "Vietnam Airlines",
  iata: "VN",
  icao: "HVN",

  country: "Vietnam",

  headquarters: "Hanoi, Vietnam",
  founded: 1956,
  parentCompany: "Vietnam Airlines Corporation",

  mainHub: "Noi Bai International Airport (HAN)",
  hubs: [
    "Noi Bai International Airport (HAN)",
    "Tan Son Nhat International Airport (SGN)",
  ],

  fleetSize: 100,
  destinations: 65,
  alliance: "SkyTeam",

  title: "Vietnam Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Vietnam Airlines flight under EU261.",
  intro:
    "If your Vietnam Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Vietnam Airlines is the national airline of Vietnam and a member of the SkyTeam alliance. Operating from Hanoi and Ho Chi Minh City, the airline serves destinations across Asia, Europe and Australia. Although Vietnam Airlines is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Vietnam Airlines flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Vietnam Airlines flights departing from EU or EEA airports. Flights departing from Vietnam or other non-EU countries to the EU are generally not covered because Vietnam Airlines is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Vietnam Airlines flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Vietnam Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Vietnam Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "garuda-indonesia",
  name: "Garuda Indonesia",
  iata: "GA",
  icao: "GIA",

  country: "Indonesia",

  headquarters: "Tangerang, Indonesia",
  founded: 1949,
  parentCompany: "PT Garuda Indonesia (Persero) Tbk",

  mainHub: "Soekarno–Hatta International Airport (CGK)",
  hubs: [
    "Soekarno–Hatta International Airport (CGK)",
    "Ngurah Rai International Airport (DPS)",
  ],

  fleetSize: 75,
  destinations: 65,
  alliance: "SkyTeam",

  title: "Garuda Indonesia flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Garuda Indonesia flight under EU261.",
  intro:
    "If your Garuda Indonesia flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Garuda Indonesia is the national airline of Indonesia and a member of the SkyTeam alliance. Operating from Jakarta and Bali, the airline serves destinations across Asia, Australia and selected routes to Europe. Although Garuda Indonesia is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Garuda Indonesia flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Garuda Indonesia flights departing from EU or EEA airports. Flights departing from Indonesia or other non-EU countries to the EU are generally not covered because Garuda Indonesia is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Garuda Indonesia flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Garuda Indonesia throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Garuda Indonesia reviews the claim and may approve, reject or request additional information.",
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
  slug: "royal-air-maroc",
  name: "Royal Air Maroc",
  iata: "AT",
  icao: "RAM",

  country: "Morocco",

  headquarters: "Casablanca, Morocco",
  founded: 1957,
  parentCompany: "Royal Air Maroc Group",

  mainHub: "Mohammed V International Airport (CMN)",
  hubs: [
    "Mohammed V International Airport (CMN)",
  ],

  fleetSize: 55,
  destinations: 90,
  alliance: "oneworld",

  title: "Royal Air Maroc flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Royal Air Maroc flight under EU261.",
  intro:
    "If your Royal Air Maroc flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Royal Air Maroc is the national airline of Morocco and a member of the oneworld alliance. Operating from Casablanca, the airline serves destinations across Europe, Africa, North America and the Middle East. Although Royal Air Maroc is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Royal Air Maroc flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Royal Air Maroc flights departing from EU or EEA airports. Flights departing from Morocco or other non-EU countries to the EU are generally not covered because Royal Air Maroc is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Royal Air Maroc flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Royal Air Maroc throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Royal Air Maroc reviews the claim and may approve, reject or request additional information.",
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
  slug: "egyptair",
  name: "EgyptAir",
  iata: "MS",
  icao: "MSR",

  country: "Egypt",

  headquarters: "Cairo, Egypt",
  founded: 1932,
  parentCompany: "EgyptAir Holding Company",

  mainHub: "Cairo International Airport (CAI)",
  hubs: [
    "Cairo International Airport (CAI)",
  ],

  fleetSize: 70,
  destinations: 75,
  alliance: "Star Alliance",

  title: "EgyptAir flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled EgyptAir flight under EU261.",
  intro:
    "If your EgyptAir flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "EgyptAir is Egypt's national airline and a member of Star Alliance. Operating from Cairo International Airport, the airline serves destinations across Africa, Europe, the Middle East, Asia and North America. Although EgyptAir is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when an EgyptAir flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to EgyptAir flights departing from EU or EEA airports. Flights departing from Egypt or other non-EU countries to the EU are generally not covered because EgyptAir is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible EgyptAir flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with EgyptAir throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "EgyptAir reviews the claim and may approve, reject or request additional information.",
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
  slug: "el-al",
  name: "EL AL",
  iata: "LY",
  icao: "ELY",

  country: "Israel",

  headquarters: "Tel Aviv, Israel",
  founded: 1948,
  parentCompany: "EL AL Israel Airlines Ltd.",

  mainHub: "Ben Gurion Airport (TLV)",
  hubs: [
    "Ben Gurion Airport (TLV)",
  ],

  fleetSize: 45,
  destinations: 50,
  alliance: null,

  title: "EL AL flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled EL AL flight under EU261.",
  intro:
    "If your EL AL flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "EL AL is Israel's national airline, operating scheduled flights between Tel Aviv and destinations across Europe, North America, Asia and Africa. Although EL AL is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when an EL AL flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to EL AL flights departing from EU or EEA airports. Flights departing from Israel or other non-EU countries to the EU are generally not covered because EL AL is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible EL AL flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with EL AL throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "EL AL reviews the claim and may approve, reject or request additional information.",
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
  slug: "saudia",
  name: "Saudia",
  iata: "SV",
  icao: "SVA",

  country: "Saudi Arabia",

  headquarters: "Jeddah, Saudi Arabia",
  founded: 1945,
  parentCompany: "Saudia Group",

  mainHub: "King Abdulaziz International Airport (JED)",
  hubs: [
    "King Abdulaziz International Airport (JED)",
    "King Khalid International Airport (RUH)",
  ],

  fleetSize: 145,
  destinations: 100,
  alliance: "SkyTeam",

  title: "Saudia flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Saudia flight under EU261.",
  intro:
    "If your Saudia flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Saudia is the national airline of Saudi Arabia and a member of the SkyTeam alliance. Operating from Jeddah and Riyadh, the airline serves destinations across Europe, Asia, Africa and North America. Although Saudia is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Saudia flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Saudia flights departing from EU or EEA airports. Flights departing from Saudi Arabia or other non-EU countries to the EU are generally not covered because Saudia is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Saudia flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Saudia throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Saudia reviews the claim and may approve, reject or request additional information.",
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
  slug: "oman-air",
  name: "Oman Air",
  iata: "WY",
  icao: "OMA",

  country: "Oman",

  headquarters: "Muscat, Oman",
  founded: 1993,
  parentCompany: "Oman Air",

  mainHub: "Muscat International Airport (MCT)",
  hubs: [
    "Muscat International Airport (MCT)",
  ],

  fleetSize: 40,
  destinations: 45,
  alliance: "oneworld",

  title: "Oman Air flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Oman Air flight under EU261.",
  intro:
    "If your Oman Air flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Oman Air is the national airline of the Sultanate of Oman, operating international flights from Muscat to destinations across Europe, Asia, Africa and the Middle East. Although Oman Air is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when an Oman Air flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Oman Air flights departing from EU or EEA airports. Flights departing from Oman or other non-EU countries to the EU are generally not covered because Oman Air is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Oman Air flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Oman Air throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Oman Air reviews the claim and may approve, reject or request additional information.",
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
  slug: "ryanair-uk",
  name: "Ryanair UK",
  iata: "RK",
  icao: "RUK",

  country: "United Kingdom",

  headquarters: "Stansted, England, United Kingdom",
  founded: 2017,
  parentCompany: "Ryanair Holdings",

  mainHub: "London Stansted Airport (STN)",
  hubs: [
    "London Stansted Airport (STN)",
  ],

  fleetSize: 40,
  destinations: 100,
  alliance: null,

  title: "Ryanair UK flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Ryanair UK flight under EU261.",
  intro:
    "If your Ryanair UK flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Ryanair UK is the United Kingdom-based subsidiary of Ryanair Holdings, operating flights primarily between the UK and destinations across Europe. Although Ryanair UK is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Ryanair UK flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Ryanair UK flights departing from EU or EEA airports. Flights departing from the United Kingdom or other non-EU countries to the EU are generally not covered under EU261 because Ryanair UK is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Ryanair UK flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Ryanair UK throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Ryanair UK reviews the claim and may approve, reject or request additional information.",
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
  slug: "easyjet-europe",
  name: "easyJet Europe",
  iata: "EC",
  icao: "EJU",

  country: "Austria",

  headquarters: "Vienna, Austria",
  founded: 2017,
  parentCompany: "easyJet plc",

  mainHub: "Vienna International Airport (VIE)",
  hubs: [
    "Vienna International Airport (VIE)",
    "Berlin Brandenburg Airport (BER)",
    "Milan Malpensa Airport (MXP)",
    "Lisbon Airport (LIS)",
  ],

  fleetSize: 170,
  destinations: 140,
  alliance: null,

  title: "easyJet Europe flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled easyJet Europe flight under EU261.",
  intro:
    "If your easyJet Europe flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "easyJet Europe is the Austrian subsidiary of easyJet plc, created to maintain EU operating rights after Brexit. As an EU airline, easyJet Europe operates flights across Europe and passengers may be entitled to compensation under EU261 on eligible flights.",

  passengerRights:
    "Passengers may have rights under EU261 when an easyJet Europe flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control. As an EU airline, EU261 may also apply to flights arriving in the EU from outside the EU when operated by easyJet Europe.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to all easyJet Europe flights departing from the EU or EEA. Because easyJet Europe is an EU airline, the regulation also applies to eligible flights arriving in the EU or EEA from countries outside the EU.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible easyJet Europe flights.",

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
      description: "Applies on eligible departures and arrivals.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with easyJet Europe throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "easyJet Europe reviews the claim and may approve, reject or request additional information.",
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
  slug: "easyjet-switzerland",
  name: "easyJet Switzerland",
  iata: "DS",
  icao: "EZS",

  country: "Switzerland",

  headquarters: "Meyrin, Geneva, Switzerland",
  founded: 1999,
  parentCompany: "easyJet plc",

  mainHub: "Geneva Airport (GVA)",
  hubs: [
    "Geneva Airport (GVA)",
    "EuroAirport Basel Mulhouse Freiburg (BSL)",
  ],

  fleetSize: 30,
  destinations: 80,
  alliance: null,

  title: "easyJet Switzerland flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled easyJet Switzerland flight under EU261.",
  intro:
    "If your easyJet Switzerland flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "easyJet Switzerland is the Swiss subsidiary of easyJet plc, operating flights from Geneva and Basel to destinations across Europe. Switzerland participates in the EU261 framework, meaning passengers may be entitled to compensation on eligible flights operated by easyJet Switzerland.",

  passengerRights:
    "Passengers may have rights under EU261 when an easyJet Switzerland flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control. As a carrier established within the EU261 framework, eligible flights to and from the EU or EEA may be covered.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to all eligible easyJet Switzerland flights departing from the EU, EEA or Switzerland. As an airline established within the EU261 framework, eligible inbound flights from outside the EU/EEA may also be covered.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible easyJet Switzerland flights.",

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
      description: "Applies on eligible departures and arrivals.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with easyJet Switzerland throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "easyJet Switzerland reviews the claim and may approve, reject or request additional information.",
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
  slug: "air-dolomiti",
  name: "Air Dolomiti",
  iata: "EN",
  icao: "DLA",

  country: "Italy",

  headquarters: "Verona, Italy",
  founded: 1991,
  parentCompany: "Lufthansa Group",

  mainHub: "Munich Airport (MUC)",
  hubs: [
    "Munich Airport (MUC)",
    "Frankfurt Airport (FRA)",
  ],

  fleetSize: 25,
  destinations: 25,
  alliance: null,

  title: "Air Dolomiti flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Air Dolomiti flight under EU261.",
  intro:
    "If your Air Dolomiti flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Air Dolomiti is an Italian regional airline within the Lufthansa Group, operating flights mainly between Italian cities and Lufthansa hubs in Germany. As an EU airline, eligible Air Dolomiti flights are covered by EU261, allowing passengers to claim compensation for qualifying delays and cancellations.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when their Air Dolomiti flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to Air Dolomiti flights departing from the EU or EEA, as well as eligible Air Dolomiti-operated flights arriving in the EU from third countries because Air Dolomiti is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Air Dolomiti flights.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Air Dolomiti throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Air Dolomiti reviews the claim and may approve, reject or request additional information.",
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
  slug: "bra",
  name: "BRA",
  iata: "TF",
  icao: "BRX",

  country: "Sweden",

  headquarters: "Stockholm, Sweden",
  founded: 2016,
  parentCompany: "Braathens Regional Airlines AB",

  mainHub: "Stockholm Bromma Airport (BMA)",
  hubs: [
    "Stockholm Bromma Airport (BMA)",
    "Stockholm Arlanda Airport (ARN)",
  ],

  fleetSize: 20,
  destinations: 20,
  alliance: null,

  title: "BRA flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled BRA flight under EU261.",
  intro:
    "If your BRA flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "BRA (Braathens Regional Airlines) is a Swedish airline operating domestic and regional flights, as well as selected ACMI services for other airlines. As an EU airline, eligible BRA flights are covered by EU261, giving passengers the right to compensation for qualifying disruptions.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when a BRA flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to BRA flights departing from the EU or EEA, as well as eligible BRA-operated flights arriving in the EU from third countries because BRA is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible BRA flights.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with BRA throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "BRA reviews the claim and may approve, reject or request additional information.",
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
  slug: "dat",
  name: "DAT",
  iata: "DX",
  icao: "DTR",

  country: "Denmark",

  headquarters: "Vamdrup, Denmark",
  founded: 1988,
  parentCompany: "Danish Air Transport Holding A/S",

  mainHub: "Billund Airport (BLL)",
  hubs: [
    "Billund Airport (BLL)",
    "Bornholm Airport (RNN)",
  ],

  fleetSize: 25,
  destinations: 20,
  alliance: null,

  title: "DAT flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled DAT flight under EU261.",
  intro:
    "If your DAT flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "DAT (Danish Air Transport) is a Danish regional airline operating scheduled and charter services across Denmark and Europe, including the well-known route between Copenhagen and Bornholm. As an EU airline, eligible DAT flights are covered by EU261.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when a DAT flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to DAT flights departing from the EU or EEA, as well as eligible DAT-operated flights arriving in the EU from third countries because DAT is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible DAT flights.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with DAT throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "DAT reviews the claim and may approve, reject or request additional information.",
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
  slug: "helvetic-airways",
  name: "Helvetic Airways",
  iata: "2L",
  icao: "OAW",

  country: "Switzerland",

  headquarters: "Kloten, Switzerland",
  founded: 2003,
  parentCompany: "Helvetic Airways AG",

  mainHub: "Zurich Airport (ZRH)",
  hubs: [
    "Zurich Airport (ZRH)",
    "Bern Airport (BRN)",
  ],

  fleetSize: 20,
  destinations: 30,
  alliance: null,

  title: "Helvetic Airways flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Helvetic Airways flight under EU261.",
  intro:
    "If your Helvetic Airways flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Helvetic Airways is a Swiss regional airline operating scheduled, charter and wet-lease services across Europe, primarily from Zurich Airport. Switzerland participates in the EU261 framework, meaning eligible Helvetic Airways flights may qualify for compensation.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when a Helvetic Airways flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to eligible Helvetic Airways flights departing from the EU, EEA or Switzerland. Eligible inbound flights operated by Helvetic Airways may also be covered under the regulation.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Helvetic Airways flights.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Helvetic Airways throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Helvetic Airways reviews the claim and may approve, reject or request additional information.",
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
  slug: "air-montenegro",
  name: "Air Montenegro",
  iata: "4O",
  icao: "MNE",

  country: "Montenegro",

  headquarters: "Podgorica, Montenegro",
  founded: 2021,
  parentCompany: "Government of Montenegro",

  mainHub: "Podgorica Airport (TGD)",
  hubs: [
    "Podgorica Airport (TGD)",
    "Tivat Airport (TIV)",
  ],

  fleetSize: 5,
  destinations: 20,
  alliance: null,

  title: "Air Montenegro flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Air Montenegro flight under EU261.",
  intro:
    "If your Air Montenegro flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Air Montenegro is the national airline of Montenegro, operating scheduled flights between Montenegro and destinations across Europe. Although Montenegro is not an EU member, the country participates in the European Common Aviation Area (ECAA), meaning eligible Air Montenegro flights are generally covered by EU261.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when an Air Montenegro flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to eligible Air Montenegro flights departing from the EU, EEA or ECAA countries. Eligible inbound Air Montenegro-operated flights may also be covered under the regulation.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Air Montenegro flights.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Air Montenegro throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Air Montenegro reviews the claim and may approve, reject or request additional information.",
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
  slug: "corendon-airlines",
  name: "Corendon Airlines",
  iata: "XC",
  icao: "CAI",

  country: "Turkey",

  headquarters: "Antalya, Turkey",
  founded: 2004,
  parentCompany: "Corendon Tourism Group",

  mainHub: "Antalya Airport (AYT)",
  hubs: [
    "Antalya Airport (AYT)",
    "Izmir Adnan Menderes Airport (ADB)",
  ],

  fleetSize: 35,
  destinations: 100,
  alliance: null,

  title: "Corendon Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Corendon Airlines flight under EU261.",
  intro:
    "If your Corendon Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Corendon Airlines is a Turkish leisure airline operating flights between Turkey and holiday destinations across Europe. Although Corendon Airlines is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Corendon Airlines flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Corendon Airlines flights departing from EU or EEA airports. Flights departing from Turkey or other non-EU countries to the EU are generally not covered because Corendon Airlines is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Corendon Airlines flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Corendon Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Corendon Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "corendon-dutch-airlines",
  name: "Corendon Dutch Airlines",
  iata: "CD",
  icao: "CND",

  country: "Netherlands",

  headquarters: "Lijnden, Netherlands",
  founded: 2011,
  parentCompany: "Corendon Tourism Group",

  mainHub: "Amsterdam Airport Schiphol (AMS)",
  hubs: [
    "Amsterdam Airport Schiphol (AMS)",
  ],

  fleetSize: 10,
  destinations: 60,
  alliance: null,

  title: "Corendon Dutch Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Corendon Dutch Airlines flight under EU261.",
  intro:
    "If your Corendon Dutch Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Corendon Dutch Airlines is the Dutch subsidiary of Corendon Tourism Group, operating leisure flights from the Netherlands to destinations across Europe, North Africa and the Mediterranean. As an EU airline, eligible Corendon Dutch Airlines flights are covered by EU261.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when a Corendon Dutch Airlines flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to Corendon Dutch Airlines flights departing from the EU or EEA, as well as eligible Corendon Dutch Airlines-operated flights arriving in the EU from third countries because Corendon Dutch Airlines is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Corendon Dutch Airlines flights.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Corendon Dutch Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Corendon Dutch Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "corendon-europe",
  name: "Corendon Europe",
  iata: "XR",
  icao: "CXI",

  country: "Malta",

  headquarters: "Luqa, Malta",
  founded: 2017,
  parentCompany: "Corendon Tourism Group",

  mainHub: "Malta International Airport (MLA)",
  hubs: [
    "Malta International Airport (MLA)",
  ],

  fleetSize: 15,
  destinations: 80,
  alliance: null,

  title: "Corendon Europe flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Corendon Europe flight under EU261.",
  intro:
    "If your Corendon Europe flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Corendon Europe is the Maltese subsidiary of Corendon Tourism Group, operating leisure flights across Europe on behalf of Corendon and other tour operators. As a Malta-based EU airline, eligible Corendon Europe flights are covered by EU261.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when a Corendon Europe flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to Corendon Europe flights departing from the EU or EEA, as well as eligible Corendon Europe-operated flights arriving in the EU from third countries because Corendon Europe is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Corendon Europe flights.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Corendon Europe throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Corendon Europe reviews the claim and may approve, reject or request additional information.",
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
  slug: "freebird-airlines",
  name: "Freebird Airlines",
  iata: "FH",
  icao: "FHY",

  country: "Turkey",

  headquarters: "Antalya, Turkey",
  founded: 2000,
  parentCompany: "Gözen Holding",

  mainHub: "Antalya Airport (AYT)",
  hubs: [
    "Antalya Airport (AYT)",
  ],

  fleetSize: 15,
  destinations: 60,
  alliance: null,

  title: "Freebird Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Freebird Airlines flight under EU261.",
  intro:
    "If your Freebird Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Freebird Airlines is a Turkish leisure airline operating charter and scheduled flights between Turkey and destinations across Europe. Although Freebird Airlines is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Freebird Airlines flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Freebird Airlines flights departing from EU or EEA airports. Flights departing from Turkey or other non-EU countries to the EU are generally not covered because Freebird Airlines is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Freebird Airlines flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Freebird Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Freebird Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "freebird-europe",
  name: "Freebird Europe",
  iata: "MI",
  icao: "FHM",

  country: "Malta",

  headquarters: "Luqa, Malta",
  founded: 2022,
  parentCompany: "Gözen Holding",

  mainHub: "Malta International Airport (MLA)",
  hubs: [
    "Malta International Airport (MLA)",
  ],

  fleetSize: 10,
  destinations: 50,
  alliance: null,

  title: "Freebird Europe flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Freebird Europe flight under EU261.",
  intro:
    "If your Freebird Europe flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Freebird Europe is the Maltese subsidiary of Freebird Airlines, operating leisure flights throughout Europe on behalf of tour operators and airlines. As a Malta-based EU airline, eligible Freebird Europe flights are covered by EU261.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when a Freebird Europe flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to Freebird Europe flights departing from the EU or EEA, as well as eligible Freebird Europe-operated flights arriving in the EU from third countries because Freebird Europe is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Freebird Europe flights.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Freebird Europe throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Freebird Europe reviews the claim and may approve, reject or request additional information.",
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
  slug: "enter-air",
  name: "Enter Air",
  iata: "E4",
  icao: "ENT",

  country: "Poland",

  headquarters: "Warsaw, Poland",
  founded: 2009,
  parentCompany: "Enter Air S.A.",

  mainHub: "Warsaw Chopin Airport (WAW)",
  hubs: [
    "Warsaw Chopin Airport (WAW)",
    "Katowice Airport (KTW)",
  ],

  fleetSize: 30,
  destinations: 100,
  alliance: null,

  title: "Enter Air flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Enter Air flight under EU261.",
  intro:
    "If your Enter Air flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Enter Air is Poland's largest charter airline, operating flights for tour operators across Europe, North Africa and the Middle East. As a Polish airline, Enter Air is an EU carrier, meaning eligible flights are covered by EU261.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when an Enter Air flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to Enter Air flights departing from the EU or EEA, as well as eligible Enter Air-operated flights arriving in the EU from third countries because Enter Air is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Enter Air flights.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Enter Air throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Enter Air reviews the claim and may approve, reject or request additional information.",
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
  slug: "smartlynx-airlines",
  name: "SmartLynx Airlines",
  iata: "6Y",
  icao: "ART",

  country: "Latvia",

  headquarters: "Riga, Latvia",
  founded: 1992,
  parentCompany: "Avia Solutions Group",

  mainHub: "Riga International Airport (RIX)",
  hubs: [
    "Riga International Airport (RIX)",
  ],

  fleetSize: 70,
  destinations: 100,
  alliance: null,

  title: "SmartLynx Airlines flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled SmartLynx Airlines flight under EU261.",
  intro:
    "If your SmartLynx Airlines flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "SmartLynx Airlines is a Latvian ACMI, charter and leisure airline within Avia Solutions Group. The airline operates flights across Europe for tour operators and other airlines. As a Latvian carrier, SmartLynx Airlines is an EU airline, meaning eligible flights are covered by EU261.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when a SmartLynx Airlines flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to SmartLynx Airlines flights departing from the EU or EEA, as well as eligible SmartLynx Airlines-operated flights arriving in the EU from third countries because SmartLynx Airlines is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible SmartLynx Airlines flights.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with SmartLynx Airlines throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "SmartLynx Airlines reviews the claim and may approve, reject or request additional information.",
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
  slug: "hisky",
  name: "HiSky",
  iata: "H4",
  icao: "HYS",

  country: "Romania",

  headquarters: "Bucharest, Romania",
  founded: 2020,
  parentCompany: "HiSky Europe",

  mainHub: "Henri Coandă International Airport (OTP)",
  hubs: [
    "Henri Coandă International Airport (OTP)",
    "Chișinău International Airport (RMO)",
  ],

  fleetSize: 10,
  destinations: 30,
  alliance: null,

  title: "HiSky flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled HiSky flight under EU261.",
  intro:
    "If your HiSky flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "HiSky is a Romanian airline operating scheduled and charter flights across Europe and the Middle East. As an EU airline, eligible HiSky flights are covered by EU261, allowing passengers to claim compensation for qualifying delays and cancellations.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when a HiSky flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to HiSky flights departing from the EU or EEA, as well as eligible HiSky-operated flights arriving in the EU from third countries because HiSky is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible HiSky flights.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with HiSky throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "HiSky reviews the claim and may approve, reject or request additional information.",
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
  slug: "nouvelair",
  name: "Nouvelair",
  iata: "BJ",
  icao: "LBT",

  country: "Tunisia",

  headquarters: "Monastir, Tunisia",
  founded: 1989,
  parentCompany: "Nouvelair Tunisie",

  mainHub: "Monastir Habib Bourguiba International Airport (MIR)",
  hubs: [
    "Monastir Habib Bourguiba International Airport (MIR)",
    "Tunis–Carthage International Airport (TUN)",
  ],

  fleetSize: 15,
  destinations: 40,
  alliance: null,

  title: "Nouvelair flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Nouvelair flight under EU261.",
  intro:
    "If your Nouvelair flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Nouvelair is Tunisia's largest private airline, operating leisure and charter flights between Tunisia and destinations across Europe. Although Nouvelair is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Nouvelair flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Nouvelair flights departing from EU or EEA airports. Flights departing from Tunisia or other non-EU countries to the EU are generally not covered because Nouvelair is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Nouvelair flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Nouvelair throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Nouvelair reviews the claim and may approve, reject or request additional information.",
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
  slug: "air-corsica",
  name: "Air Corsica",
  iata: "XK",
  icao: "CCM",

  country: "France",

  headquarters: "Ajaccio, Corsica, France",
  founded: 1989,
  parentCompany: "Collectivité de Corse",

  mainHub: "Ajaccio Napoleon Bonaparte Airport (AJA)",
  hubs: [
    "Ajaccio Napoleon Bonaparte Airport (AJA)",
    "Bastia Poretta Airport (BIA)",
    "Figari–Sud Corse Airport (FSC)",
    "Calvi Sainte-Catherine Airport (CLY)",
  ],

  fleetSize: 12,
  destinations: 20,
  alliance: null,

  title: "Air Corsica flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Air Corsica flight under EU261.",
  intro:
    "If your Air Corsica flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Air Corsica is the regional airline of Corsica, operating domestic French routes and flights to several European destinations. As a French airline, Air Corsica is an EU carrier, meaning eligible flights are covered by EU261.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when an Air Corsica flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to Air Corsica flights departing from the EU or EEA, as well as eligible Air Corsica-operated flights arriving in the EU from third countries because Air Corsica is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Air Corsica flights.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Air Corsica throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Air Corsica reviews the claim and may approve, reject or request additional information.",
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
  slug: "loganair",
  name: "Loganair",
  iata: "LM",
  icao: "LOG",

  country: "United Kingdom",

  headquarters: "Paisley, Scotland, United Kingdom",
  founded: 1962,
  parentCompany: "Loganair Ltd.",

  mainHub: "Glasgow Airport (GLA)",
  hubs: [
    "Glasgow Airport (GLA)",
    "Edinburgh Airport (EDI)",
    "Aberdeen Airport (ABZ)",
    "Inverness Airport (INV)",
  ],

  fleetSize: 35,
  destinations: 45,
  alliance: null,

  title: "Loganair flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Loganair flight under EU261.",
  intro:
    "If your Loganair flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Loganair is the largest regional airline in the United Kingdom, operating domestic UK routes as well as flights to Ireland, Scandinavia and mainland Europe. Although Loganair is not an EU airline, passengers may still be entitled to compensation under EU261 on qualifying flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when a Loganair flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Loganair flights departing from EU or EEA airports. Flights departing from the United Kingdom or other non-EU countries to the EU are generally not covered because Loganair is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Loganair flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Loganair throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Loganair reviews the claim and may approve, reject or request additional information.",
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
  slug: "binter-canarias",
  name: "Binter Canarias",
  iata: "NT",
  icao: "IBB",

  country: "Spain",

  headquarters: "Gran Canaria, Spain",
  founded: 1989,
  parentCompany: "Binter Canarias S.A.",

  mainHub: "Gran Canaria Airport (LPA)",
  hubs: [
    "Gran Canaria Airport (LPA)",
    "Tenerife North Airport (TFN)",
  ],

  fleetSize: 40,
  destinations: 35,
  alliance: null,

  title: "Binter Canarias flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Binter Canarias flight under EU261.",
  intro:
    "If your Binter Canarias flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Binter Canarias is a Spanish regional airline operating flights throughout the Canary Islands, mainland Spain, Portugal, Morocco and West Africa. As a Spanish airline, Binter Canarias is an EU carrier, meaning eligible flights are covered by EU261.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when a Binter Canarias flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to Binter Canarias flights departing from the EU or EEA, as well as eligible Binter Canarias-operated flights arriving in the EU from third countries because Binter Canarias is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Binter Canarias flights.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Binter Canarias throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Binter Canarias reviews the claim and may approve, reject or request additional information.",
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
  slug: "canaryfly",
  name: "Canaryfly",
  iata: "PM",
  icao: "CNF",

  country: "Spain",

  headquarters: "Gran Canaria, Spain",
  founded: 2008,
  parentCompany: "Canaryfly S.L.",

  mainHub: "Gran Canaria Airport (LPA)",
  hubs: [
    "Gran Canaria Airport (LPA)",
  ],

  fleetSize: 8,
  destinations: 7,
  alliance: null,

  title: "Canaryfly flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Canaryfly flight under EU261.",
  intro:
    "If your Canaryfly flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Canaryfly is a Spanish regional airline operating scheduled flights between the Canary Islands. As a Spanish airline, Canaryfly is an EU carrier, meaning eligible flights are covered by EU261.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when a Canaryfly flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to Canaryfly flights departing from the EU or EEA, as well as eligible Canaryfly-operated flights arriving in the EU from third countries because Canaryfly is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Canaryfly flights.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Canaryfly throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Canaryfly reviews the claim and may approve, reject or request additional information.",
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
  slug: "air-greenland",
  name: "Air Greenland",
  iata: "GL",
  icao: "GRL",

  country: "Greenland",

  headquarters: "Nuuk, Greenland",
  founded: 1960,
  parentCompany: "Air Greenland A/S",

  mainHub: "Nuuk Airport (GOH)",
  hubs: [
    "Nuuk Airport (GOH)",
    "Kangerlussuaq Airport (SFJ)",
  ],

  fleetSize: 30,
  destinations: 60,
  alliance: null,

  title: "Air Greenland flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Air Greenland flight under EU261.",
  intro:
    "If your Air Greenland flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261 on eligible flights. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Air Greenland is Greenland's national airline, operating domestic services throughout Greenland as well as international flights to Denmark, Iceland and Canada. Although Greenland is outside the EU, passengers may still be entitled to compensation under EU261 on eligible flights departing from the EU or EEA.",

  passengerRights:
    "Passengers may have rights under EU261 when an Air Greenland flight departs from an EU or EEA airport and arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 generally applies only to Air Greenland flights departing from EU or EEA airports. Flights departing from Greenland or other non-EU countries to the EU are generally not covered because Air Greenland is not an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Air Greenland flights.",

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
      value: "EU261 (eligible flights)",
      description: "Primarily flights departing from the EU/EEA.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Air Greenland throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Air Greenland reviews the claim and may approve, reject or request additional information.",
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
  slug: "trade-air",
  name: "Trade Air",
  iata: "C3",
  icao: "TDR",

  country: "Croatia",

  headquarters: "Zagreb, Croatia",
  founded: 1994,
  parentCompany: "Trade Air d.o.o.",

  mainHub: "Zagreb Airport (ZAG)",
  hubs: [
    "Zagreb Airport (ZAG)",
  ],

  fleetSize: 8,
  destinations: 20,
  alliance: null,

  title: "Trade Air flight compensation",
  description:
    "Find out if you can claim compensation for a delayed or cancelled Trade Air flight under EU261.",
  intro:
    "If your Trade Air flight was delayed, cancelled, or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.",
  overview:
    "Trade Air is a Croatian airline operating scheduled, charter and ACMI services across Europe. As a Croatian airline, Trade Air is an EU carrier, meaning eligible flights are covered by EU261.",

  passengerRights:
    "Passengers may have the right to compensation under EU261 when a Trade Air flight arrives at least three hours late, is cancelled at short notice or results in a missed connection, provided the disruption was within the airline's control.",

  compensationIntro:
    "Eligible passengers may receive between €250 and €600 depending on the flight distance and the circumstances of the disruption.",

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
    "EU261 applies to Trade Air flights departing from the EU or EEA, as well as eligible Trade Air-operated flights arriving in the EU from third countries because Trade Air is an EU airline.",

  statisticsIntro:
    "The statistics below provide an overview of passenger compensation under EU261 for eligible Trade Air flights.",

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
      description: "Applies on eligible flights.",
    },
  ],

  timelineIntro:
    "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with Trade Air throughout the process.",

  timeline: [
    {
      title: "Submit your claim",
      description:
        "You check your flight, add your passenger details and upload the required documents.",
    },
    {
      title: "FlightClaimly reviews the case",
      description:
        "We review the information and prepare the claim before contacting the airline.",
    },
    {
      title: "The airline responds",
      description:
        "Trade Air reviews the claim and may approve, reject or request additional information.",
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