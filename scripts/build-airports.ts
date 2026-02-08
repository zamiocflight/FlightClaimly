import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const CSV_PATH = path.join(process.cwd(), 'scripts/data/airports.csv');
const OUT_PATH = path.join(process.cwd(), 'src/data/airports.min.json');

// Typer vi tillåter (rankas senare i API)
const ALLOWED_TYPES = new Set(['large_airport']);

// Ord som indikerar militär / ej kommersiellt
const EXCLUDE_NAME_PATTERNS = [
  'heliport',
  'seaplane',
  'air base',
  'air force',
  'naval',
  'army',
];

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function shouldExcludeByName(name: string) {
  const n = normalize(name);
  return EXCLUDE_NAME_PATTERNS.some(p => n.includes(p));
}

const csv = fs.readFileSync(CSV_PATH, 'utf8');

// Parse CSV → objekt per rad (headers från första raden)
const records = parse(csv, {
  columns: true,
  skip_empty_lines: true,
});

// Transformera
const out = records
  .filter((r: any) => {
    // Endast IATA
    if (!r.iata_code || r.iata_code.trim() === '') return false;

    // Endast tillåtna typer
    if (!ALLOWED_TYPES.has(r.type)) return false;

    // Exkludera militär/icke-kommersiellt via namn
    if (r.name && shouldExcludeByName(r.name)) return false;

    return true;
  })
  .map((r: any) => {
    const name = r.name ?? '';
    const city = r.municipality ?? '';
    const iata = r.iata_code.toUpperCase();
    const icao = (r.icao_code ?? '').toUpperCase();
    const country = (r.iso_country ?? '').toUpperCase();
    const type = r.type;

    const searchText = normalize(
      `${city} ${name} ${iata} ${icao}`
    );

    return {
      iata,
      icao: icao || undefined,
      name,
      city,
      country,
      type,
      searchText,
    };
  });

// Skriv ut minifierad JSON (läsbar, men kompakt)
fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2), 'utf8');

console.log(`✔ Generated ${out.length} airports → ${path.relative(process.cwd(), OUT_PATH)}`);
