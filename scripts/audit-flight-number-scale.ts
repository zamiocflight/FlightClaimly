import { flightNumbers } from "../src/data/master/flightNumbers";
import {
  evaluateFlightNumberForPublication,
} from "../src/data/flight-numbers/publication";

const slugCounts = new Map<string, number>();
const identityCounts = new Map<string, number>();
const airlineCounts = new Map<string, number>();

let publishable = 0;
let blocked = 0;

for (const flightNumber of flightNumbers) {
  slugCounts.set(
    flightNumber.slug,
    (slugCounts.get(flightNumber.slug) ?? 0) + 1
  );

  const identity = `${flightNumber.airline}:${flightNumber.flightNumber}`;
  identityCounts.set(
    identity,
    (identityCounts.get(identity) ?? 0) + 1
  );

  const decision = evaluateFlightNumberForPublication(flightNumber);

  if (decision.publish) {
    publishable += 1;
    airlineCounts.set(
      flightNumber.airlineName,
      (airlineCounts.get(flightNumber.airlineName) ?? 0) + 1
    );
  } else {
    blocked += 1;
    console.warn(
      `BLOCKED ${flightNumber.flightNumber}: ${decision.reasons.join(", ")}`
    );
  }
}

const duplicateSlugs = [...slugCounts.entries()].filter(([, count]) => count > 1);
const duplicateIdentities = [...identityCounts.entries()].filter(([, count]) => count > 1);

console.log("Flight Number Scale Audit");
console.log("=========================");
console.log("Entities:", flightNumbers.length);
console.log("Publishable:", publishable);
console.log("Blocked:", blocked);
console.log("Duplicate slugs:", duplicateSlugs.length);
console.log("Duplicate identities:", duplicateIdentities.length);
console.log("Airlines represented:", airlineCounts.size);
console.log("");
console.log("By airline:");

for (const [airline, count] of [...airlineCounts.entries()].sort((a, b) =>
  a[0].localeCompare(b[0])
)) {
  console.log(`- ${airline}: ${count}`);
}

if (duplicateSlugs.length > 0) {
  console.error("Duplicate slug values:", duplicateSlugs);
}

if (duplicateIdentities.length > 0) {
  console.error("Duplicate airline/flight-number identities:", duplicateIdentities);
}

if (blocked > 0 || duplicateSlugs.length > 0 || duplicateIdentities.length > 0) {
  process.exitCode = 1;
}