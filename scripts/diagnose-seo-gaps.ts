import { airlines } from "../src/data/seo/airlines";
import { airports } from "../src/data/seo/airports";
import { countries } from "../src/data/seo/countries";
import { routes } from "../src/data/seo/routes";
import { flightNumbers } from "../src/data/master/flightNumbers";

const airportSlugs = new Set(airports.map((x) => x.slug));
const airlineSlugs = new Set(airlines.map((x) => x.slug));
const routeSlugs = new Set(routes.map((x) => x.slug));

const missingAirports = new Map<string, string[]>();
const missingRoutes = new Map<string, string[]>();
const missingMainAirlines = new Map<string, string[]>();

function add(map: Map<string, string[]>, key: string, source: string) {
  const values = map.get(key) ?? [];
  values.push(source);
  map.set(key, values);
}

for (const airport of airports) {
  for (const slug of airport.mainAirlines ?? []) {
    if (!airlineSlugs.has(slug)) {
      add(missingMainAirlines, slug, airport.slug);
    }
  }
}

for (const flight of flightNumbers) {
  const rel = flight.relationships;

  if (!airportSlugs.has(rel.originAirport)) {
    add(missingAirports, rel.originAirport, flight.slug);
  }

  if (!airportSlugs.has(rel.destinationAirport)) {
    add(missingAirports, rel.destinationAirport, flight.slug);
  }

  if (!routeSlugs.has(rel.route)) {
    add(missingRoutes, rel.route, flight.slug);
  }
}

const countryNames = new Set(
  countries.map((x) => x.name.toLowerCase())
);

const missingCountries = [
  ...new Set(
    airports
      .map((x) => x.country)
      .filter((name) => !countryNames.has(name.toLowerCase()))
  ),
].sort();

function printMap(title: string, map: Map<string, string[]>) {
  console.log(`\n=== ${title} (${map.size}) ===`);

  for (const [key, sources] of [...map.entries()].sort()) {
    console.log(`${key}`);
    console.log(`  used by: ${sources.join(", ")}`);
  }
}

console.log("\nSEO GAP DIAGNOSIS");
console.log("=================");

console.log(`Airports in engine: ${airports.length}`);
console.log(`Routes in engine: ${routes.length}`);
console.log(`Airlines in engine: ${airlines.length}`);
console.log(`Countries in engine: ${countries.length}`);
console.log(`Flight numbers: ${flightNumbers.length}`);

printMap("MISSING AIRPORT ENTITIES", missingAirports);
printMap("MISSING ROUTE ENTITIES", missingRoutes);
printMap("MISSING MAIN AIRLINE ENTITIES", missingMainAirlines);

console.log(`\n=== MISSING COUNTRY ENTITIES (${missingCountries.length}) ===`);
for (const country of missingCountries) {
  console.log(country);
}
