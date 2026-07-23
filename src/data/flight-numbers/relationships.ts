export interface FlightNumberRelationship {
  slug: string;

  airline: string;

  route: string;

  originAirport: string;
  destinationAirport: string;

  originCountry: string;
  destinationCountry: string;

  delayReasons?: string[];

  authorities?: string[];

  regulations?: string[];
}

export const flightNumberRelationships: FlightNumberRelationship[] = [
  {
    slug: "sk1427",

    airline: "sas",

    route: "copenhagen-stockholm",

    originAirport: "copenhagen-airport",
    destinationAirport: "stockholm-arlanda",

    originCountry: "denmark",
    destinationCountry: "sweden",

    delayReasons: [
      "technical-problems",
    ],

    authorities: [
      "eu261-guidelines",
    ],

    regulations: [
      "eu261",
    ],
  },
];