import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse/sync";

type AirportCsvRow = {
  iata_code: string;
  latitude_deg: string;
  longitude_deg: string;
};

type AirportCoordinate = {
  latitude: number;
  longitude: number;
};

async function main() {
  const csvPath = path.join(process.cwd(), "scripts/data/airports.csv");

  const outputPath = path.join(
    process.cwd(),
    "src/data/master/airportCoordinates.ts"
  );

  const csv = await fs.readFile(csvPath, "utf8");

  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
  }) as AirportCsvRow[];

  const coordinates: Record<string, AirportCoordinate> = {};

  for (const record of records) {
    const iata = record.iata_code.trim().toUpperCase();

    if (!/^[A-Z]{3}$/.test(iata)) {
      continue;
    }

    const latitude = Number(record.latitude_deg);
    const longitude = Number(record.longitude_deg);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      continue;
    }

    coordinates[iata] = {
      latitude,
      longitude,
    };
  }

  const sortedCoordinates = Object.fromEntries(
    Object.entries(coordinates).sort(([a], [b]) => a.localeCompare(b))
  );

  const output = `export type AirportCoordinates = {
  latitude: number;
  longitude: number;
};

export const airportCoordinates: Record<string, AirportCoordinates> = ${JSON.stringify(
    sortedCoordinates,
    null,
    2
  )};
`;

  await fs.mkdir(path.dirname(outputPath), {
    recursive: true,
  });

  await fs.writeFile(outputPath, output, "utf8");

  console.log("CSV rows:", records.length);
  console.log("IATA coordinates generated:", Object.keys(sortedCoordinates).length);
  console.log("Written:", outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});