export type PriorityAirline = {
  name: string;
  iata: string;
  icao: string;
  region: "europe" | "global";
};

/**
 * Authoritative minimum airline coverage target for the Flight Number
 * Knowledge Engine. This file contains airline identity/master data only;
 * SEO copy remains in src/data/seo/airlines.ts.
 */
export const priorityAirlines: PriorityAirline[] = [
  { name: "Scandinavian Airlines (SAS)", iata: "SK", icao: "SAS", region: "europe" },
  { name: "Lufthansa", iata: "LH", icao: "DLH", region: "europe" },
  { name: "Swiss International Air Lines", iata: "LX", icao: "SWR", region: "europe" },
  { name: "Austrian Airlines", iata: "OS", icao: "AUA", region: "europe" },
  { name: "British Airways", iata: "BA", icao: "BAW", region: "europe" },
  { name: "Brussels Airlines", iata: "SN", icao: "BEL", region: "europe" },
  { name: "Air France", iata: "AF", icao: "AFR", region: "europe" },
  { name: "KLM", iata: "KL", icao: "KLM", region: "europe" },
  { name: "Iberia", iata: "IB", icao: "IBE", region: "europe" },
  { name: "TAP Air Portugal", iata: "TP", icao: "TAP", region: "europe" },
  { name: "Finnair", iata: "AY", icao: "FIN", region: "europe" },
  { name: "LOT Polish Airlines", iata: "LO", icao: "LOT", region: "europe" },
  { name: "ITA Airways", iata: "AZ", icao: "ITY", region: "europe" },
  { name: "Vueling", iata: "VY", icao: "VLG", region: "europe" },
  { name: "easyJet", iata: "U2", icao: "EZY", region: "europe" },
  { name: "Ryanair", iata: "FR", icao: "RYR", region: "europe" },
  { name: "Wizz Air", iata: "W6", icao: "WZZ", region: "europe" },
  { name: "Turkish Airlines", iata: "TK", icao: "THY", region: "europe" },
  { name: "Aegean Airlines", iata: "A3", icao: "AEE", region: "europe" },
  { name: "Air Europa", iata: "UX", icao: "AEA", region: "europe" },
  { name: "Icelandair", iata: "FI", icao: "ICE", region: "europe" },
  { name: "Aer Lingus", iata: "EI", icao: "EIN", region: "europe" },
  { name: "Virgin Atlantic", iata: "VS", icao: "VIR", region: "europe" },
  { name: "Jet2.com", iata: "LS", icao: "EXS", region: "europe" },
  { name: "Norwegian Air Shuttle", iata: "DY", icao: "NOZ", region: "europe" },
  { name: "Eurowings", iata: "EW", icao: "EWG", region: "europe" },
  { name: "Transavia", iata: "HV", icao: "TRA", region: "europe" },
  { name: "airBaltic", iata: "BT", icao: "BTI", region: "europe" },
  { name: "Iberia Express", iata: "I2", icao: "IBS", region: "europe" },
  { name: "Delta Air Lines", iata: "DL", icao: "DAL", region: "global" },
  { name: "American Airlines", iata: "AA", icao: "AAL", region: "global" },
  { name: "United Airlines", iata: "UA", icao: "UAL", region: "global" },
  { name: "Air Canada", iata: "AC", icao: "ACA", region: "global" },
  { name: "Emirates", iata: "EK", icao: "UAE", region: "global" },
  { name: "Qatar Airways", iata: "QR", icao: "QTR", region: "global" },
  { name: "Etihad Airways", iata: "EY", icao: "ETD", region: "global" },
  { name: "Singapore Airlines", iata: "SQ", icao: "SIA", region: "global" },
  { name: "Thai Airways", iata: "TG", icao: "THA", region: "global" },
  { name: "ANA All Nippon Airways", iata: "NH", icao: "ANA", region: "global" },
  { name: "Japan Airlines", iata: "JL", icao: "JAL", region: "global" },
  { name: "Cathay Pacific", iata: "CX", icao: "CPA", region: "global" },
  { name: "Korean Air", iata: "KE", icao: "KAL", region: "global" },
  { name: "EVA Air", iata: "BR", icao: "EVA", region: "global" },
  { name: "China Airlines", iata: "CI", icao: "CAL", region: "global" },
  { name: "Hainan Airlines", iata: "HU", icao: "CHH", region: "global" },
];

export const europeExpandedAirlines = priorityAirlines
  .filter((airline) => airline.region === "europe")
  .map((airline) => airline.iata);

export const intercontinentalCoreAirlines = priorityAirlines
  .filter((airline) => airline.region === "global")
  .map((airline) => airline.iata);

export const globalCoreAirlines = priorityAirlines.map((airline) => airline.iata);

export function getPriorityAirlineByIata(iata: string): PriorityAirline | null {
  const normalized = iata.trim().toUpperCase();
  return priorityAirlines.find((airline) => airline.iata === normalized) ?? null;
}
