import { priorityAirlineEntities } from "../src/data/master/priorityAirlineEntities";
import { priorityAirlines } from "../src/data/master/priorityAirlines";
import { airlines } from "../src/data/seo/airlines";

const configuredAirlines = [...airlines, ...priorityAirlineEntities];
const configuredByIata = new Map(
  configuredAirlines.map((airline) => [airline.iata.trim().toUpperCase(), airline])
);

const missingEntities = priorityAirlines.filter(
  (airline) => !configuredByIata.has(airline.iata)
);

const duplicateIata = priorityAirlines
  .map((airline) => airline.iata)
  .filter((iata, index, all) => all.indexOf(iata) !== index);

const duplicateIcao = priorityAirlines
  .map((airline) => airline.icao)
  .filter((icao, index, all) => all.indexOf(icao) !== index);

console.log(`Priority airlines: ${priorityAirlines.length}`);
console.log(`Europe: ${priorityAirlines.filter((airline) => airline.region === "europe").length}`);
console.log(`Global/intercontinental: ${priorityAirlines.filter((airline) => airline.region === "global").length}`);
console.log(`Configured airline entities: ${configuredAirlines.length}`);
console.log(`Missing priority entities: ${missingEntities.length}`);

if (missingEntities.length) {
  console.log(
    `Missing: ${missingEntities
      .map((airline) => `${airline.iata}/${airline.icao} ${airline.name}`)
      .join(", ")}`
  );
}

if (duplicateIata.length || duplicateIcao.length || missingEntities.length) {
  throw new Error(
    [
      `Priority airline validation failed.`,
      `Duplicate IATA: ${duplicateIata.join(", ") || "none"}.`,
      `Duplicate ICAO: ${duplicateIcao.join(", ") || "none"}.`,
      `Missing entities: ${missingEntities.map((airline) => airline.iata).join(", ") || "none"}.`,
    ].join(" ")
  );
}

console.log("Priority airline coverage: PASS");
