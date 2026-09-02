import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse/sync";

type AirportCsvRow = {
  type?: string;
  name?: string;
  latitude_deg?: string;
  longitude_deg?: string;
  continent?: string;
  iso_country?: string;
  municipality?: string;
  scheduled_service?: string;
  icao_code?: string;
  iata_code?: string;
};

type AirportRegistryEntry = {
  slug: string;
  iata: string;
  icao?: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  continent: string;
  isEuropean: boolean;
  type: string;
  latitude: number;
  longitude: number;
};

const EXCLUDE_NAME_PATTERNS = ["heliport", "seaplane", "air base", "air force", "naval", "army"];
const COMMERCIAL_AIRPORT_TYPES = new Set(["large_airport", "medium_airport", "small_airport"]);

const EUROPEAN_COMMERCIAL_COUNTRY_CODES = new Set([
  "AL", "AD", "AT", "BY", "BE", "BA", "BG", "HR", "CY", "CZ", "DK",
  "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "XK", "LV",
  "LI", "LT", "LU", "MT", "MD", "MC", "ME", "NL", "MK", "NO", "PL",
  "PT", "RO", "SM", "RS", "SK", "SI", "ES", "SE", "CH", "TR", "UA",
  "GB", "VA",
]);

// The bundled CSV is a snapshot. A small set of airports may have stale or
// incomplete source rows even though current aviation data confirms scheduled
// commercial service. These full overrides are deliberately evidence-backed and
// are injected after CSV parsing so they cannot be lost because of one stale field.
const VERIFIED_AIRPORT_OVERRIDES: AirportRegistryEntry[] = [
  {
    slug: "il-caravaggio-international-airport-bgy",
    iata: "BGY",
    icao: "LIME",
    name: "Il Caravaggio International Airport",
    city: "Bergamo",
    country: "Italy",
    countryCode: "IT",
    continent: "EU",
    isEuropean: true,
    type: "large_airport",
    latitude: 45.669362,
    longitude: 9.708851,
  },
];

function normalize(value: string): string { return value.trim().toLowerCase(); }
function shouldExcludeByName(name: string): boolean {
  const normalizedName = normalize(name);
  const hasExcludedPattern = EXCLUDE_NAME_PATTERNS.some((pattern) => normalizedName.includes(pattern));
  if (!hasExcludedPattern) return false;

  // Some scheduled commercial airports are mixed-use facilities whose source
  // name also references a colocated military base. Keep those when the same
  // name explicitly identifies an airport; the surrounding registry gates still
  // require a commercial airport type, scheduled service, valid IATA and core data.
  if (normalizedName.includes("airport")) return false;

  return true;
}
function createSlug(value: string): string {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function getCountryName(countryCode: string): string {
  if (!countryCode) return "Unknown";
  const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
  return displayNames.of(countryCode) ?? countryCode;
}
function hasCommercialAirportType(record: AirportCsvRow): boolean {
  return COMMERCIAL_AIRPORT_TYPES.has(record.type?.trim() ?? "");
}
function hasScheduledService(record: AirportCsvRow): boolean {
  const value = record.scheduled_service?.trim().toLowerCase() ?? "";
  return value === "1" || value === "yes" || value === "true";
}
function isCommercialScheduledAirport(record: AirportCsvRow): boolean {
  return hasCommercialAirportType(record) && hasScheduledService(record);
}
function isEuropeanAirport(record: AirportCsvRow): boolean {
  const continent = record.continent?.trim().toUpperCase() ?? "";
  const countryCode = record.iso_country?.trim().toUpperCase() ?? "";
  return continent === "EU" || EUROPEAN_COMMERCIAL_COUNTRY_CODES.has(countryCode);
}

async function main(): Promise<void> {
  const csvPath = path.join(process.cwd(), "scripts/data/airports.csv");
  const outputPath = path.join(process.cwd(), "src/data/master/airportRegistry.ts");
  const csv = await fs.readFile(csvPath, "utf8");
  const records = parse(csv, { columns: true, skip_empty_lines: true }) as AirportCsvRow[];
  const airportsByIata = new Map<string, AirportRegistryEntry>();
  let commercialCandidates = 0;
  let europeanCommercialCandidates = 0;

  for (const record of records) {
    if (!isCommercialScheduledAirport(record)) continue;
    commercialCandidates++;
    if (isEuropeanAirport(record)) europeanCommercialCandidates++;

    const iata = record.iata_code?.trim().toUpperCase() ?? "";
    if (!/^[A-Z]{3}$/.test(iata)) continue;
    const name = record.name?.trim() ?? "";
    const city = record.municipality?.trim() ?? "";
    const countryCode = record.iso_country?.trim().toUpperCase() ?? "";
    const continent = record.continent?.trim().toUpperCase() ?? "";
    const type = record.type?.trim() ?? "";
    if (!name || !city || !countryCode || !type) continue;
    if (shouldExcludeByName(name)) continue;
    const latitude = Number(record.latitude_deg);
    const longitude = Number(record.longitude_deg);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) continue;
    const icao = record.icao_code?.trim().toUpperCase();

    airportsByIata.set(iata, {
      slug: `${createSlug(name)}-${iata.toLowerCase()}`,
      iata,
      ...(icao ? { icao } : {}),
      name,
      city,
      country: getCountryName(countryCode),
      countryCode,
      continent,
      isEuropean: isEuropeanAirport(record),
      type,
      latitude,
      longitude,
    });
  }

  const injectedOverrides: string[] = [];
  for (const airport of VERIFIED_AIRPORT_OVERRIDES) {
    const existing = airportsByIata.get(airport.iata);
    if (!existing) injectedOverrides.push(airport.iata);
    airportsByIata.set(airport.iata, airport);
  }

  const airports = Array.from(airportsByIata.values()).sort((a, b) => a.iata.localeCompare(b.iata));
  const output = `export type AirportRegistryEntry = {
  slug: string;
  iata: string;
  icao?: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  continent: string;
  isEuropean: boolean;
  type: string;
  latitude: number;
  longitude: number;
};

export const airportRegistry: AirportRegistryEntry[] = ${JSON.stringify(airports, null, 2)};

export function getAirportRegistryEntryByIata(iata: string) {
  return airportRegistry.find((airport) => airport.iata.toUpperCase() === iata.toUpperCase());
}

export const europeanAirportRegistry = airportRegistry.filter((airport) => airport.isEuropean);
`;

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, output, "utf8");

  const countryCount = new Set(airports.map((airport) => airport.countryCode)).size;
  const europeanAirports = airports.filter((airport) => airport.isEuropean);
  const europeanCountryCount = new Set(europeanAirports.map((airport) => airport.countryCode)).size;
  const large = airports.filter((airport) => airport.type === "large_airport").length;
  const medium = airports.filter((airport) => airport.type === "medium_airport").length;
  const small = airports.filter((airport) => airport.type === "small_airport").length;

  console.log("Global Commercial Airport Registry");
  console.log("==================================");
  console.log("CSV rows:", records.length);
  console.log("Commercial scheduled candidates:", commercialCandidates);
  console.log("European commercial candidates:", europeanCommercialCandidates);
  console.log("Airport registry entries:", airports.length);
  console.log("European registry entries:", europeanAirports.length);
  console.log("Countries represented globally:", countryCount);
  console.log("Countries represented in Europe:", europeanCountryCount);
  console.log(`By type globally: large ${large}, medium ${medium}, small ${small}`);
  console.log("Verified airport overrides injected:", injectedOverrides.length ? injectedOverrides.join(", ") : "none");
  console.log("Written:", outputPath);
}

main().catch((error: unknown) => {
  console.error("Airport Registry generation failed:");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});