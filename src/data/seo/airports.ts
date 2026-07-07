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
  mainAirlines?: string[];

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

type AirportSeed = {
  slug: string;
  name: string;
  iata: string;
  city: string;
  country: string;
  regionDescription: string;
  mainAirlines?: string[];
};

const standardCompensationAmounts: CompensationAmount[] = [
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
];

const standardStatistics: Statistic[] = [
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
];

const standardTimeline: TimelineStep[] = [
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
];

const airportSeeds: AirportSeed[] = [
  {
    slug: "copenhagen-airport",
    name: "Copenhagen Airport",
    iata: "CPH",
    city: "Copenhagen",
    country: "Denmark",
    regionDescription: "the main international airport in Denmark",
    mainAirlines: [
  "sas",
  "norwegian",
  "ryanair",
  "easyjet",
  "lufthansa",
  "klm",
  "air-france",
  "british-airways",
  "wizz-air",
  "lot",
  "iberia",
],
  },
  {
    slug: "stockholm-arlanda-airport",
    name: "Stockholm Arlanda Airport",
    iata: "ARN",
    city: "Stockholm",
    country: "Sweden",
    regionDescription: "Sweden's largest international airport",
  },
  {
    slug: "oslo-airport",
    name: "Oslo Airport",
    iata: "OSL",
    city: "Oslo",
    country: "Norway",
    regionDescription: "Norway's main international airport",
  },
  {
    slug: "helsinki-airport",
    name: "Helsinki Airport",
    iata: "HEL",
    city: "Helsinki",
    country: "Finland",
    regionDescription: "Finland's main international airport",
  },
  {
    slug: "frankfurt-airport",
    name: "Frankfurt Airport",
    iata: "FRA",
    city: "Frankfurt",
    country: "Germany",
    regionDescription: "one of Europe's busiest international airports",
  },
  {
    slug: "munich-airport",
    name: "Munich Airport",
    iata: "MUC",
    city: "Munich",
    country: "Germany",
    regionDescription: "a major international airport in southern Germany",
  },
  {
    slug: "amsterdam-schiphol-airport",
    name: "Amsterdam Schiphol Airport",
    iata: "AMS",
    city: "Amsterdam",
    country: "Netherlands",
    regionDescription: "one of Europe's largest international airport hubs",
  },
  {
    slug: "paris-charles-de-gaulle-airport",
    name: "Paris Charles de Gaulle Airport",
    iata: "CDG",
    city: "Paris",
    country: "France",
    regionDescription: "France's largest international airport",
  },
  {
    slug: "london-heathrow-airport",
    name: "London Heathrow Airport",
    iata: "LHR",
    city: "London",
    country: "United Kingdom",
    regionDescription: "one of the busiest airports in Europe",
  },
  {
    slug: "malaga-airport",
    name: "Malaga Airport",
    iata: "AGP",
    city: "Malaga",
    country: "Spain",
    regionDescription: "a major airport serving southern Spain and the Costa del Sol",
  },
  {
  slug: "barcelona-el-prat-airport",
  name: "Barcelona El Prat Airport",
  iata: "BCN",
  city: "Barcelona",
  country: "Spain",
  regionDescription: "one of Spain's busiest international airports",
  mainAirlines: ["iberia", "vueling", "ryanair", "easyjet", "lufthansa", "klm"],
},
{
  slug: "madrid-barajas-airport",
  name: "Madrid Barajas Airport",
  iata: "MAD",
  city: "Madrid",
  country: "Spain",
  regionDescription: "Spain's largest international airport",
  mainAirlines: ["iberia", "ryanair", "air-france", "klm", "lufthansa", "british-airways"],
},
{
  slug: "rome-fiumicino-airport",
  name: "Rome Fiumicino Airport",
  iata: "FCO",
  city: "Rome",
  country: "Italy",
  regionDescription: "Italy's busiest international airport",
  mainAirlines: ["ita-airways", "ryanair", "easyjet", "lufthansa", "klm", "air-france"],
},
{
  slug: "milan-malpensa-airport",
  name: "Milan Malpensa Airport",
  iata: "MXP",
  city: "Milan",
  country: "Italy",
  regionDescription: "a major international airport serving northern Italy",
  mainAirlines: ["easyjet", "ryanair", "lufthansa", "klm", "air-france", "british-airways"],
},
{
  slug: "vienna-airport",
  name: "Vienna Airport",
  iata: "VIE",
  city: "Vienna",
  country: "Austria",
  regionDescription: "Austria's main international airport",
  mainAirlines: ["austrian-airlines", "ryanair", "lufthansa", "wizz-air", "klm", "air-france"],
},
{
  slug: "zurich-airport",
  name: "Zurich Airport",
  iata: "ZRH",
  city: "Zurich",
  country: "Switzerland",
  regionDescription: "Switzerland's largest international airport",
  mainAirlines: ["swiss", "lufthansa", "klm", "air-france", "british-airways", "easyjet"],
},
{
  slug: "brussels-airport",
  name: "Brussels Airport",
  iata: "BRU",
  city: "Brussels",
  country: "Belgium",
  regionDescription: "Belgium's main international airport",
  mainAirlines: ["brussels-airlines", "ryanair", "lufthansa", "klm", "air-france", "british-airways"],
},
{
  slug: "lisbon-airport",
  name: "Lisbon Airport",
  iata: "LIS",
  city: "Lisbon",
  country: "Portugal",
  regionDescription: "Portugal's busiest international airport",
  mainAirlines: ["tap-air-portugal", "ryanair", "easyjet", "iberia", "lufthansa", "klm"],
},
{
  slug: "warsaw-chopin-airport",
  name: "Warsaw Chopin Airport",
  iata: "WAW",
  city: "Warsaw",
  country: "Poland",
  regionDescription: "Poland's largest international airport",
  mainAirlines: ["lot", "wizz-air", "ryanair", "lufthansa", "klm", "air-france"],
},
{
  slug: "dublin-airport",
  name: "Dublin Airport",
  iata: "DUB",
  city: "Dublin",
  country: "Ireland",
  regionDescription: "Ireland's busiest international airport",
  mainAirlines: ["ryanair", "aer-lingus", "british-airways", "lufthansa", "klm", "air-france"],
},
{
  slug: "manchester-airport",
  name: "Manchester Airport",
  iata: "MAN",
  city: "Manchester",
  country: "United Kingdom",
  regionDescription: "the largest airport outside London",
  mainAirlines: ["ryanair", "easyjet", "british-airways", "lufthansa", "klm", "air-france"],
},
{
  slug: "london-gatwick-airport",
  name: "London Gatwick Airport",
  iata: "LGW",
  city: "London",
  country: "United Kingdom",
  regionDescription: "the UK's second busiest airport",
  mainAirlines: ["easyjet", "british-airways", "ryanair", "norwegian", "vueling", "wizz-air"],
},
{
  slug: "london-stansted-airport",
  name: "London Stansted Airport",
  iata: "STN",
  city: "London",
  country: "United Kingdom",
  regionDescription: "one of Europe's largest low-cost airline hubs",
  mainAirlines: ["ryanair", "jet2", "easyjet", "wizz-air"],
},
{
  slug: "birmingham-airport",
  name: "Birmingham Airport",
  iata: "BHX",
  city: "Birmingham",
  country: "United Kingdom",
  regionDescription: "a major airport serving central England",
  mainAirlines: ["ryanair", "easyjet", "lufthansa", "klm"],
},
{
  slug: "edinburgh-airport",
  name: "Edinburgh Airport",
  iata: "EDI",
  city: "Edinburgh",
  country: "United Kingdom",
  regionDescription: "Scotland's busiest airport",
  mainAirlines: ["ryanair", "easyjet", "british-airways", "klm"],
},
{
  slug: "palma-de-mallorca-airport",
  name: "Palma de Mallorca Airport",
  iata: "PMI",
  city: "Palma",
  country: "Spain",
  regionDescription: "one of Europe's busiest leisure airports",
  mainAirlines: ["ryanair", "easyjet", "vueling", "iberia"],
},
{
  slug: "alicante-airport",
  name: "Alicante Airport",
  iata: "ALC",
  city: "Alicante",
  country: "Spain",
  regionDescription: "a major airport on Spain's Costa Blanca",
  mainAirlines: ["ryanair", "easyjet", "vueling", "norwegian"],
},
{
  slug: "valencia-airport",
  name: "Valencia Airport",
  iata: "VLC",
  city: "Valencia",
  country: "Spain",
  regionDescription: "the main airport serving Valencia",
  mainAirlines: ["iberia", "ryanair", "vueling", "lufthansa"],
},
{
  slug: "nice-cote-dazur-airport",
  name: "Nice Côte d'Azur Airport",
  iata: "NCE",
  city: "Nice",
  country: "France",
  regionDescription: "France's third busiest airport",
  mainAirlines: ["air-france", "easyjet", "lufthansa", "british-airways"],
},
{
  slug: "marseille-airport",
  name: "Marseille Provence Airport",
  iata: "MRS",
  city: "Marseille",
  country: "France",
  regionDescription: "the main airport serving southern France",
  mainAirlines: ["ryanair", "air-france", "lufthansa", "klm"],
},
{
  slug: "lyon-airport",
  name: "Lyon-Saint Exupéry Airport",
  iata: "LYS",
  city: "Lyon",
  country: "France",
  regionDescription: "one of France's largest regional airports",
  mainAirlines: ["air-france", "easyjet", "lufthansa", "klm"],
},
{
  slug: "hamburg-airport",
  name: "Hamburg Airport",
  iata: "HAM",
  city: "Hamburg",
  country: "Germany",
  regionDescription: "Germany's oldest international airport",
  mainAirlines: ["lufthansa", "eurowings", "ryanair", "easyjet"],
},
{
  slug: "dusseldorf-airport",
  name: "Düsseldorf Airport",
  iata: "DUS",
  city: "Düsseldorf",
  country: "Germany",
  regionDescription: "one of Germany's busiest airports",
  mainAirlines: ["lufthansa", "eurowings", "klm", "air-france"],
},
{
  slug: "berlin-brandenburg-airport",
  name: "Berlin Brandenburg Airport",
  iata: "BER",
  city: "Berlin",
  country: "Germany",
  regionDescription: "Germany's capital airport",
  mainAirlines: ["lufthansa", "ryanair", "easyjet", "eurowings"],
},
{
  slug: "cologne-bonn-airport",
  name: "Cologne Bonn Airport",
  iata: "CGN",
  city: "Cologne",
  country: "Germany",
  regionDescription: "a major airport in western Germany",
  mainAirlines: ["eurowings", "ryanair", "lufthansa"],
},
{
  slug: "geneva-airport",
  name: "Geneva Airport",
  iata: "GVA",
  city: "Geneva",
  country: "Switzerland",
  regionDescription: "Switzerland's second busiest airport",
  mainAirlines: ["swiss", "easyjet", "lufthansa", "air-france"],
},
{
  slug: "basel-airport",
  name: "EuroAirport Basel Mulhouse Freiburg",
  iata: "BSL",
  city: "Basel",
  country: "Switzerland",
  regionDescription: "a unique tri-national international airport",
  mainAirlines: ["easyjet", "lufthansa", "air-france"],
},
{
  slug: "prague-airport",
  name: "Václav Havel Airport Prague",
  iata: "PRG",
  city: "Prague",
  country: "Czech Republic",
  regionDescription: "the largest airport in the Czech Republic",
  mainAirlines: ["smartwings", "ryanair", "lufthansa", "klm"],
},
{
  slug: "budapest-airport",
  name: "Budapest Ferenc Liszt Airport",
  iata: "BUD",
  city: "Budapest",
  country: "Hungary",
  regionDescription: "Hungary's busiest international airport",
  mainAirlines: ["wizz-air", "ryanair", "lufthansa"],
},
{
  slug: "krakow-airport",
  name: "Kraków Airport",
  iata: "KRK",
  city: "Kraków",
  country: "Poland",
  regionDescription: "one of Poland's busiest airports",
  mainAirlines: ["ryanair", "lot", "wizz-air", "lufthansa"],
},
{
  slug: "athens-airport",
  name: "Athens International Airport",
  iata: "ATH",
  city: "Athens",
  country: "Greece",
  regionDescription: "Greece's largest international airport",
  mainAirlines: ["aegean-airlines", "ryanair", "easyjet", "lufthansa", "sky-express"],
},
{
  slug: "thessaloniki-airport",
  name: "Thessaloniki Airport",
  iata: "SKG",
  city: "Thessaloniki",
  country: "Greece",
  regionDescription: "northern Greece's busiest airport",
  mainAirlines: ["aegean-airlines", "ryanair", "easyjet", "wizz-air"],
},
{
  slug: "reykjavik-keflavik-airport",
  name: "Keflavík International Airport",
  iata: "KEF",
  city: "Reykjavik",
  country: "Iceland",
  regionDescription: "Iceland's main international airport",
  mainAirlines: ["icelandair", "play", "easyjet", "lufthansa"],
},
{
  slug: "riga-airport",
  name: "Riga International Airport",
  iata: "RIX",
  city: "Riga",
  country: "Latvia",
  regionDescription: "the largest airport in the Baltic states",
  mainAirlines: ["airbaltic", "ryanair", "lufthansa", "wizz-air"],
},
{
  slug: "tallinn-airport",
  name: "Tallinn Airport",
  iata: "TLL",
  city: "Tallinn",
  country: "Estonia",
  regionDescription: "Estonia's main international airport",
  mainAirlines: ["airbaltic", "ryanair", "lufthansa", "finnair"],
},
{
  slug: "vilnius-airport",
  name: "Vilnius Airport",
  iata: "VNO",
  city: "Vilnius",
  country: "Lithuania",
  regionDescription: "Lithuania's busiest airport",
  mainAirlines: ["ryanair", "wizz-air", "airbaltic", "lot"],
},
{
  slug: "luxembourg-airport",
  name: "Luxembourg Airport",
  iata: "LUX",
  city: "Luxembourg",
  country: "Luxembourg",
  regionDescription: "Luxembourg's only international airport",
  mainAirlines: ["luxair", "lufthansa", "klm", "air-france"],
},
{
  slug: "zagreb-airport",
  name: "Zagreb Airport",
  iata: "ZAG",
  city: "Zagreb",
  country: "Croatia",
  regionDescription: "Croatia's busiest airport",
  mainAirlines: ["croatia-airlines", "ryanair", "lufthansa"],
},
{
  slug: "split-airport",
  name: "Split Airport",
  iata: "SPU",
  city: "Split",
  country: "Croatia",
  regionDescription: "a major Adriatic tourist airport",
  mainAirlines: ["croatia-airlines", "easyjet", "ryanair"],
},
{
  slug: "dubrovnik-airport",
  name: "Dubrovnik Airport",
  iata: "DBV",
  city: "Dubrovnik",
  country: "Croatia",
  regionDescription: "one of Croatia's busiest seasonal airports",
  mainAirlines: ["croatia-airlines", "easyjet", "ryanair"],
},
{
  slug: "bucharest-airport",
  name: "Henri Coandă International Airport",
  iata: "OTP",
  city: "Bucharest",
  country: "Romania",
  regionDescription: "Romania's largest airport",
  mainAirlines: ["tarom", "wizz-air", "ryanair", "lufthansa"],
},
{
  slug: "sofia-airport",
  name: "Sofia Airport",
  iata: "SOF",
  city: "Sofia",
  country: "Bulgaria",
  regionDescription: "Bulgaria's busiest airport",
  mainAirlines: ["wizz-air", "ryanair", "bulgaria-air", "lufthansa"],
},
{
  slug: "belgrade-airport",
  name: "Belgrade Nikola Tesla Airport",
  iata: "BEG",
  city: "Belgrade",
  country: "Serbia",
  regionDescription: "Serbia's largest airport",
  mainAirlines: ["air-serbia", "wizz-air", "lufthansa"],
},
{
  slug: "tirana-airport",
  name: "Tirana International Airport",
  iata: "TIA",
  city: "Tirana",
  country: "Albania",
  regionDescription: "Albania's primary international airport",
  mainAirlines: ["wizz-air", "ryanair", "air-albania"],
},
{
  slug: "malta-airport",
  name: "Malta International Airport",
  iata: "MLA",
  city: "Luqa",
  country: "Malta",
  regionDescription: "Malta's only international airport",
  mainAirlines: ["ryanair", "easyjet", "air-malta"],
},
{
  slug: "larnaca-airport",
  name: "Larnaca International Airport",
  iata: "LCA",
  city: "Larnaca",
  country: "Cyprus",
  regionDescription: "Cyprus' largest international airport",
  mainAirlines: ["cyprus-airways", "ryanair", "wizz-air", "aegean-airlines"],
},
{
  slug: "paphos-airport",
  name: "Paphos International Airport",
  iata: "PFO",
  city: "Paphos",
  country: "Cyprus",
  regionDescription: "western Cyprus' main international airport",
  mainAirlines: ["ryanair", "easyjet", "tui-airways"],
},
{
  slug: "ljubljana-airport",
  name: "Ljubljana Jože Pučnik Airport",
  iata: "LJU",
  city: "Ljubljana",
  country: "Slovenia",
  regionDescription: "Slovenia's main international airport",
  mainAirlines: ["lufthansa", "air-serbia", "turkish-airlines"],
},
{
  slug: "skopje-airport",
  name: "Skopje International Airport",
  iata: "SKP",
  city: "Skopje",
  country: "North Macedonia",
  regionDescription: "North Macedonia's busiest airport",
  mainAirlines: ["wizz-air", "turkish-airlines", "austrian-airlines"],
},
{
  slug: "chisinau-airport",
  name: "Chișinău International Airport",
  iata: "RMO",
  city: "Chișinău",
  country: "Moldova",
  regionDescription: "Moldova's main international airport",
  mainAirlines: ["flyone", "wizz-air", "turkish-airlines"],
},
{
  slug: "bristol-airport",
  name: "Bristol Airport",
  iata: "BRS",
  city: "Bristol",
  country: "United Kingdom",
  regionDescription: "a major regional airport in southwest England",
  mainAirlines: ["easyjet", "ryanair", "jet2", "klm"],
},
{
  slug: "newcastle-airport",
  name: "Newcastle International Airport",
  iata: "NCL",
  city: "Newcastle",
  country: "United Kingdom",
  regionDescription: "the main airport serving northeast England",
  mainAirlines: ["easyjet", "ryanair", "jet2", "british-airways", "klm"],
},
{
  slug: "glasgow-airport",
  name: "Glasgow Airport",
  iata: "GLA",
  city: "Glasgow",
  country: "United Kingdom",
  regionDescription: "one of Scotland's busiest airports",
  mainAirlines: ["easyjet", "british-airways", "klm", "ryanair"],
},
{
  slug: "cork-airport",
  name: "Cork Airport",
  iata: "ORK",
  city: "Cork",
  country: "Ireland",
  regionDescription: "Ireland's second busiest airport",
  mainAirlines: ["ryanair", "aer-lingus", "klm"],
},
{
  slug: "bologna-airport",
  name: "Bologna Guglielmo Marconi Airport",
  iata: "BLQ",
  city: "Bologna",
  country: "Italy",
  regionDescription: "a major airport serving northern Italy",
  mainAirlines: ["ryanair", "ita-airways", "lufthansa", "klm"],
},
{
  slug: "venice-marco-polo-airport",
  name: "Venice Marco Polo Airport",
  iata: "VCE",
  city: "Venice",
  country: "Italy",
  regionDescription: "the main international airport serving Venice",
  mainAirlines: ["ryanair", "easyjet", "ita-airways", "lufthansa", "klm"],
},
{
  slug: "naples-airport",
  name: "Naples International Airport",
  iata: "NAP",
  city: "Naples",
  country: "Italy",
  regionDescription: "southern Italy's busiest airport",
  mainAirlines: ["ryanair", "easyjet", "ita-airways", "lufthansa"],
},
{
  slug: "turin-airport",
  name: "Turin Airport",
  iata: "TRN",
  city: "Turin",
  country: "Italy",
  regionDescription: "a key airport serving northwest Italy",
  mainAirlines: ["ryanair", "ita-airways", "lufthansa", "klm"],
},
{
  slug: "pisa-airport",
  name: "Pisa International Airport",
  iata: "PSA",
  city: "Pisa",
  country: "Italy",
  regionDescription: "a major airport serving Tuscany",
  mainAirlines: ["ryanair", "easyjet", "lufthansa"],
},
{
  slug: "catania-airport",
  name: "Catania Fontanarossa Airport",
  iata: "CTA",
  city: "Catania",
  country: "Italy",
  regionDescription: "Sicily's busiest airport",
  mainAirlines: ["ryanair", "easyjet", "ita-airways", "wizz-air"],
},
{
  slug: "seville-airport",
  name: "Seville Airport",
  iata: "SVQ",
  city: "Seville",
  country: "Spain",
  regionDescription: "a major airport in southern Spain",
  mainAirlines: ["ryanair", "vueling", "iberia", "easyjet"],
},
{
  slug: "bilbao-airport",
  name: "Bilbao Airport",
  iata: "BIO",
  city: "Bilbao",
  country: "Spain",
  regionDescription: "the main airport serving the Basque Country",
  mainAirlines: ["iberia", "vueling", "lufthansa", "klm"],
},
{
  slug: "porto-airport",
  name: "Porto Airport",
  iata: "OPO",
  city: "Porto",
  country: "Portugal",
  regionDescription: "northern Portugal's busiest airport",
  mainAirlines: ["tap-air-portugal", "ryanair", "easyjet", "iberia", "lufthansa"],
},
{
  slug: "faro-airport",
  name: "Faro Airport",
  iata: "FAO",
  city: "Faro",
  country: "Portugal",
  regionDescription: "the main airport serving Portugal's Algarve region",
  mainAirlines: ["ryanair", "easyjet", "jet2", "british-airways"],
},
{
  slug: "stuttgart-airport",
  name: "Stuttgart Airport",
  iata: "STR",
  city: "Stuttgart",
  country: "Germany",
  regionDescription: "a major airport in southwest Germany",
  mainAirlines: ["lufthansa", "eurowings", "klm", "air-france"],
},
{
  slug: "hannover-airport",
  name: "Hannover Airport",
  iata: "HAJ",
  city: "Hannover",
  country: "Germany",
  regionDescription: "a key airport serving northern Germany",
  mainAirlines: ["lufthansa", "eurowings", "klm", "air-france"],
},
{
  slug: "bremen-airport",
  name: "Bremen Airport",
  iata: "BRE",
  city: "Bremen",
  country: "Germany",
  regionDescription: "an international airport serving northwest Germany",
  mainAirlines: ["lufthansa", "klm", "ryanair"],
},
{
  slug: "nuremberg-airport",
  name: "Nuremberg Airport",
  iata: "NUE",
  city: "Nuremberg",
  country: "Germany",
  regionDescription: "a major regional airport in Bavaria",
  mainAirlines: ["lufthansa", "ryanair", "klm", "air-france"],
},
{
  slug: "leipzig-halle-airport",
  name: "Leipzig/Halle Airport",
  iata: "LEJ",
  city: "Leipzig",
  country: "Germany",
  regionDescription: "a major airport serving eastern Germany",
  mainAirlines: ["lufthansa", "eurowings", "ryanair"],
},
{
  slug: "dresden-airport",
  name: "Dresden Airport",
  iata: "DRS",
  city: "Dresden",
  country: "Germany",
  regionDescription: "an international airport serving Saxony",
  mainAirlines: ["lufthansa", "eurowings", "klm"],
},
];

function createAirport(seed: AirportSeed): Airport {
  return {
    ...seed,

    title: `${seed.name} flight compensation`,

    description: `Find out if you can claim compensation for a delayed, cancelled or disrupted flight from ${seed.name} under EU261.`,

    intro: `If your flight from ${seed.name} was delayed, cancelled or caused you to miss a connection, you may be entitled to compensation under EU261. FlightClaimly helps you check your case and handle the claim process.`,

    overview: `${seed.name} is ${seed.regionDescription}. Many European flights departing from ${seed.name} may be covered by EU261, which means passengers may be entitled to compensation when flights are delayed, cancelled or disrupted.`,

    passengerRights: `Under EU261, passengers departing from ${seed.name} may have the right to compensation when a flight arrives at least three hours late, is cancelled at short notice, or causes a missed connection, as long as the disruption was within the airline's control.`,

    compensationIntro:
      "The amount of compensation under EU261 depends on the flight distance and the length of the delay at arrival. Eligible passengers may receive between €250 and €600.",

    compensationAmounts: standardCompensationAmounts,

    compensationRules:
      "To qualify for compensation, the flight disruption must normally be within the airline's control. Delays caused by technical issues, operational problems or crew shortages may qualify, while extraordinary circumstances such as severe weather or airport restrictions may not.",

    statisticsIntro:
      "The statistics below provide an overview of passenger compensation under EU261 and help explain when compensation may apply.",

    statistics: standardStatistics,

    timelineIntro:
      "After you submit your claim, FlightClaimly reviews your information, prepares the claim and follows up with the airline throughout the process.",

    timeline: standardTimeline,

    claimProcess: standardClaimProcess,
    commonIssues: standardCommonIssues,
    faq: standardFAQ,
  };
}

export const airports: Airport[] = airportSeeds.map(createAirport);

export function getAirportBySlug(slug: string) {
  return airports.find((airport) => airport.slug === slug);
}