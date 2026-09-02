import { priorityAirlines } from "../src/data/master/priorityAirlines";
import { airlines } from "../src/data/seo/airlines";

const seoByIata = new Map(
  airlines.map((airline) => [airline.iata.trim().toUpperCase(), airline])
);

const missingFromSeo = priorityAirlines.filter(
  (airline) => !seoByIata.has(airline.iata)
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
console.log(`Missing SEO entities: ${missingFromSeo.length}`);

if (missingFromSeo.length) {
  console.log(
    `Missing: ${missingFromSeo
      .map((airline) => `${airline.iata}/${airline.icao} ${airline.name}`)
      .join(", ")}`
  );
}

if (duplicateIata.length || duplicateIcao.length) {
  throw new Error(
    `Duplicate airline identities. IATA: ${duplicateIata.join(", ") || "none"}; ICAO: ${duplicateIcao.join(", ") || "none"}`
  );
}
