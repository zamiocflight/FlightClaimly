import { airlines } from "../src/data/seo/airlines";
import { airports } from "../src/data/seo/airports";
import { countries } from "../src/data/seo/countries";
import { routes } from "../src/data/seo/routes";
import { flightNumbers } from "../src/data/master/flightNumbers";
import { airportRegistry } from "../src/data/master/airportRegistry";

type Severity = "ERROR" | "WARNING" | "INFO";

type Finding = {
  severity: Severity;
  area: string;
  entity: string;
  message: string;
};

const findings: Finding[] = [];

function add(
  severity: Severity,
  area: string,
  entity: string,
  message: string
) {
  findings.push({ severity, area, entity, message });
}

function findDuplicates(values: string[]) {
  const counts = new Map<string, number>();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([value]) => value);
}

const airlineSlugs = new Set(airlines.map((airline) => airline.slug));
const airportSlugs = new Set(airports.map((airport) => airport.slug));

const seoAirportBySlug = new Map(
  airports.map((airport) => [airport.slug, airport])
);

const masterAirportBySlug = new Map(
  airportRegistry.map((airport) => [airport.slug, airport])
);

const masterAirportByIata = new Map(
  airportRegistry.map((airport) => [
    airport.iata.toUpperCase(),
    airport,
  ])
);

function resolveAirportIdentity(slug: string) {
  const seoAirport = seoAirportBySlug.get(slug);

  if (seoAirport) {
    const masterAirport = masterAirportByIata.get(
      seoAirport.iata.toUpperCase()
    );

    return {
      seoAirport,
      masterAirport,
      hasSeoPage: true,
    };
  }

  const masterAirport = masterAirportBySlug.get(slug);

  if (masterAirport) {
    return {
      seoAirport: undefined,
      masterAirport,
      hasSeoPage: false,
    };
  }

  return undefined;
}
const countrySlugs = new Set(countries.map((country) => country.slug));
const routeSlugs = new Set(routes.map((route) => route.slug));

for (const slug of findDuplicates(airlines.map((x) => x.slug))) {
  add("ERROR", "airlines", slug, "Duplicate airline slug");
}

for (const slug of findDuplicates(airports.map((x) => x.slug))) {
  add("ERROR", "airports", slug, "Duplicate airport slug");
}

for (const slug of findDuplicates(countries.map((x) => x.slug))) {
  add("ERROR", "countries", slug, "Duplicate country slug");
}

for (const slug of findDuplicates(routes.map((x) => x.slug))) {
  add("ERROR", "routes", slug, "Duplicate route slug");
}

for (const slug of findDuplicates(flightNumbers.map((x) => x.slug))) {
  add("ERROR", "flightNumbers", slug, "Duplicate flight-number slug");
}

for (const airport of airports) {
  for (const airlineSlug of airport.mainAirlines ?? []) {
    if (!airlineSlugs.has(airlineSlug)) {
      add(
        "ERROR",
        "airports",
        airport.slug,
        `Unknown mainAirline: ${airlineSlug}`
      );
    }
  }

  const countryExists = countries.some(
    (country) =>
      country.name.toLowerCase() === airport.country.toLowerCase()
  );

  if (!countryExists) {
    add(
      "WARNING",
      "airports",
      airport.slug,
      `No country entity found for "${airport.country}"`
    );
  }
}

for (const airline of airlines) {
  for (const countrySlug of airline.countrySlugs ?? []) {
    if (!countrySlugs.has(countrySlug)) {
      add(
        "ERROR",
        "airlines",
        airline.slug,
        `Unknown countrySlug: ${countrySlug}`
      );
    }
  }

  const searchableText = [
    airline.title,
    airline.metadataTitle,
    airline.description,
    airline.intro,
    airline.overview,
    airline.passengerRights,
    airline.compensationIntro,
    airline.compensationRules,
    airline.statisticsIntro,
    airline.timelineIntro,
    ...(airline.claimProcess ?? []),
    ...(airline.commonIssues ?? []),
    ...(airline.faq ?? []).flatMap((item) => [
      item.question,
      item.answer,
    ]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  for (const otherAirline of airlines) {
    if (otherAirline.slug === airline.slug) continue;

    const otherName = otherAirline.name.toLowerCase();

    if (
      otherName.length >= 4 &&
      searchableText.includes(otherName)
    ) {
      add(
        "WARNING",
        "airlines",
        airline.slug,
        `Copy mentions another airline: "${otherAirline.name}"`
      );
    }
  }
}

for (const route of routes) {
  if (!airportSlugs.has(route.origin.slug)) {
    add(
      "ERROR",
      "routes",
      route.slug,
      `Unknown origin airport: ${route.origin.slug}`
    );
  }

  if (!airportSlugs.has(route.destination.slug)) {
    add(
      "ERROR",
      "routes",
      route.slug,
      `Unknown destination airport: ${route.destination.slug}`
    );
  }

  if (route.origin.slug === route.destination.slug) {
    add(
      "ERROR",
      "routes",
      route.slug,
      "Origin and destination are identical"
    );
  }

  for (const airline of route.airlines) {
    if (!airlineSlugs.has(airline.slug)) {
      add(
        "ERROR",
        "routes",
        route.slug,
        `Unknown airline: ${airline.slug}`
      );
    }
  }
}

for (const flightNumber of flightNumbers) {
  const rel = flightNumber.relationships;

  if (!airlineSlugs.has(rel.airline)) {
    add(
      "ERROR",
      "flightNumbers",
      flightNumber.slug,
      `Unknown airline relationship: ${rel.airline}`
    );
  }

  if (!routeSlugs.has(rel.route)) {
    add(
      "WARNING",
      "flightNumbers",
      flightNumber.slug,
      `Route not yet represented in SEO Route Engine: ${rel.route}`
    );
  }

  const originIdentity = resolveAirportIdentity(
    rel.originAirport
  );

  if (!originIdentity) {
    add(
      "ERROR",
      "flightNumbers",
      flightNumber.slug,
      `Origin airport cannot be resolved: ${rel.originAirport}`
    );
  } else if (!originIdentity.hasSeoPage) {
    add(
      "INFO",
      "flightNumbers",
      flightNumber.slug,
      `Origin airport exists in master but has no SEO airport page: ${rel.originAirport}`
    );
  }

  const destinationIdentity = resolveAirportIdentity(
    rel.destinationAirport
  );

  if (!destinationIdentity) {
    add(
      "ERROR",
      "flightNumbers",
      flightNumber.slug,
      `Destination airport cannot be resolved: ${rel.destinationAirport}`
    );
  } else if (!destinationIdentity.hasSeoPage) {
    add(
      "INFO",
      "flightNumbers",
      flightNumber.slug,
      `Destination airport exists in master but has no SEO airport page: ${rel.destinationAirport}`
    );
  }
}

const errors = findings.filter((x) => x.severity === "ERROR");
const warnings = findings.filter((x) => x.severity === "WARNING");
const infos = findings.filter((x) => x.severity === "INFO");

console.log("\nSEO DATA AUDIT");
console.log("==============");
console.log(`Airports:       ${airports.length}`);
console.log(`Airlines:       ${airlines.length}`);
console.log(`Countries:      ${countries.length}`);
console.log(`Routes:         ${routes.length}`);
console.log(`Flight numbers: ${flightNumbers.length}`);
console.log("");
console.log(`Errors:   ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);
console.log(`Info:     ${infos.length}`);

if (findings.length) {
  console.log("\nFINDINGS");
  console.log("========");

  for (const finding of findings) {
    console.log(
      `[${finding.severity}] ${finding.area}/${finding.entity}: ${finding.message}`
    );
  }
} else {
  console.log("\n✅ No SEO data integrity issues found.");
}

if (errors.length > 0) {
  process.exitCode = 1;
}
