import { airports } from "../src/data/seo/airports";
import { routes } from "../src/data/seo/routes";
import { flightNumbers } from "../src/data/master/flightNumbers";

const airportSlugs = new Set(airports.map((x) => x.slug));
const routeSlugs = new Set(routes.map((x) => x.slug));

const missingAirportSlugs = new Set<string>();

for (const flight of flightNumbers) {
  const rel = flight.relationships;

  if (!airportSlugs.has(rel.originAirport)) {
    missingAirportSlugs.add(rel.originAirport);
  }

  if (!airportSlugs.has(rel.destinationAirport)) {
    missingAirportSlugs.add(rel.destinationAirport);
  }
}

console.log("\nMISSING AIRPORT IDENTITY AUDIT");
console.log("==============================");

for (const missingSlug of [...missingAirportSlugs].sort()) {
  const iataMatch = missingSlug.match(/-([a-z]{3})$/i);
  const iata = iataMatch?.[1]?.toUpperCase();

  const matches = iata
    ? airports.filter(
        (airport) =>
          airport.iata?.toUpperCase() === iata
      )
    : [];

  console.log(`\n${missingSlug}`);

  if (!iata) {
    console.log("  IATA inferred: none");
  } else {
    console.log(`  IATA inferred: ${iata}`);
  }

  if (matches.length === 0) {
    console.log("  Existing airport match: NONE");
  } else {
    for (const airport of matches) {
      console.log(
        `  Existing airport match: ${airport.slug} | ${airport.name} | ${airport.iata}`
      );
    }
  }
}

console.log("\nMISSING ROUTE IDENTITY AUDIT");
console.log("============================");

for (const flight of flightNumbers) {
  const rel = flight.relationships;

  if (routeSlugs.has(rel.route)) continue;

  const reverse = rel.route.split("-to-").reverse().join("-to-");
  const reverseExists = routeSlugs.has(reverse);

  console.log(`\n${flight.slug}`);
  console.log(`  missing: ${rel.route}`);
  console.log(
    `  reverse route exists: ${reverseExists ? reverse : "NO"}`
  );
}
