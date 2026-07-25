import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse/sync";

type AirportCsvRow = {
  type?: string;
  name?: string;
  latitude_deg?: string;
  longitude_deg?: string;
  iso_country?: string;
  municipality?: string;
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
  type: string;
  latitude: number;
  longitude: number;
};

const EXCLUDE_NAME_PATTERNS = [
  "heliport",
  "seaplane",
  "air base",
  "air force",
  "naval",
  "army",
];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function shouldExcludeByName(name: string): boolean {
  const normalizedName = normalize(name);

  return EXCLUDE_NAME_PATTERNS.some((pattern) =>
    normalizedName.includes(pattern)
  );
}

function createSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCountryName(countryCode: string): string {
  if (!countryCode) {
    return "Unknown";
  }

  const displayNames = new Intl.DisplayNames(["en"], {
    type: "region",
  });

  return displayNames.of(countryCode) ?? countryCode;
}

async function main(): Promise<void> {
  const csvPath = path.join(
    process.cwd(),
    "scripts/data/airports.csv"
  );

  const outputPath = path.join(
    process.cwd(),
    "src/data/master/airportRegistry.ts"
  );

  const csv = await fs.readFile(csvPath, "utf8");

  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
  }) as AirportCsvRow[];

  const airportsByIata = new Map<
    string,
    AirportRegistryEntry
  >();

  for (const record of records) {
    const iata = record.iata_code?.trim().toUpperCase() ?? "";

    if (!/^[A-Z]{3}$/.test(iata)) {
      continue;
    }

    const name = record.name?.trim() ?? "";
    const city = record.municipality?.trim() ?? "";
    const countryCode =
      record.iso_country?.trim().toUpperCase() ?? "";
    const type = record.type?.trim() ?? "";

    if (!name || !city || !countryCode || !type) {
      continue;
    }

    if (shouldExcludeByName(name)) {
      continue;
    }

    const latitude = Number(record.latitude_deg);
    const longitude = Number(record.longitude_deg);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      continue;
    }

    const icao = record.icao_code?.trim().toUpperCase();

    airportsByIata.set(iata, {
      slug: `${createSlug(name)}-${iata.toLowerCase()}`,
      iata,
      ...(icao ? { icao } : {}),
      name,
      city,
      country: getCountryName(countryCode),
      countryCode,
      type,
      latitude,
      longitude,
    });
  }

  const airports = Array.from(airportsByIata.values()).sort(
    (a, b) => a.iata.localeCompare(b.iata)
  );

  const output = `export type AirportRegistryEntry = {
  slug: string;
  iata: string;
  icao?: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  type: string;
  latitude: number;
  longitude: number;
};

export const airportRegistry: AirportRegistryEntry[] = ${JSON.stringify(
    airports,
    null,
    2
  )};

export function getAirportRegistryEntryByIata(iata: string) {
  return airportRegistry.find(
    (airport) =>
      airport.iata.toUpperCase() === iata.toUpperCase()
  );
}
`;

  await fs.mkdir(path.dirname(outputPath), {
    recursive: true,
  });

  await fs.writeFile(outputPath, output, "utf8");

  console.log("CSV rows:", records.length);
  console.log("Airport registry entries:", airports.length);
  console.log("Written:", outputPath);
}

main().catch((error: unknown) => {
  console.error("Airport Registry generation failed:");

  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }

  process.exitCode = 1;
});