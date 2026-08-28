import { airports } from "../src/data/seo/airports";
import { airportRegistry } from "../src/data/master/airportRegistry";
import { flightNumbers } from "../src/data/master/flightNumbers";

const seoSlugs = new Set(airports.map((x) => x.slug));
const registryBySlug = new Map(
  airportRegistry.map((x) => [x.slug, x])
);

const missingFromSeo = new Set<string>();

for (const flight of flightNumbers) {
  const rel = flight.relationships;

  for (const slug of [
    rel.originAirport,
    rel.destinationAirport,
  ]) {
    if (!seoSlugs.has(slug)) {
      missingFromSeo.add(slug);
    }
  }
}

console.log("\nAIRPORT REGISTRY GAP AUDIT");
console.log("==========================");

let foundInRegistry = 0;
let trulyMissing = 0;

for (const slug of [...missingFromSeo].sort()) {
  const airport = registryBySlug.get(slug);

  console.log(`\n${slug}`);

  if (airport) {
    foundInRegistry++;

    console.log("  MASTER: ✅ FOUND");
    console.log(`  IATA: ${airport.iata}`);
    console.log(`  Name: ${airport.name}`);
    console.log(`  City: ${airport.city}`);
    console.log(`  Country: ${airport.country}`);
    console.log(`  Type: ${airport.type}`);
  } else {
    trulyMissing++;
    console.log("  MASTER: ❌ NOT FOUND");
  }
}

console.log("\nSUMMARY");
console.log("=======");
console.log(`Missing from SEO airport set: ${missingFromSeo.size}`);
console.log(`Found in master registry:     ${foundInRegistry}`);
console.log(`Truly missing from master:    ${trulyMissing}`);
