import type { Airline } from "@/data/seo/shared/types";

const EU_EEA_SWISS_COUNTRIES = new Set([
  "Austria",
  "Belgium",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Czechia",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Iceland",
  "Ireland",
  "Italy",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Netherlands",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
]);

const UK_COUNTRIES = new Set([
  "United Kingdom",
  "England",
  "Scotland",
  "Wales",
  "Northern Ireland",
]);

function isEuropean261Country(country: string): boolean {
  return EU_EEA_SWISS_COUNTRIES.has(country.trim());
}

function isUkCountry(country: string): boolean {
  return UK_COUNTRIES.has(country.trim());
}

function airlineIsEuropeanCarrier(airline: Airline): boolean {
  if (isEuropean261Country(airline.country)) {
    return true;
  }

  return (airline.countrySlugs ?? []).some((slug) =>
    [
      "austria",
      "belgium",
      "bulgaria",
      "croatia",
      "cyprus",
      "czech-republic",
      "czechia",
      "denmark",
      "estonia",
      "finland",
      "france",
      "germany",
      "greece",
      "hungary",
      "iceland",
      "ireland",
      "italy",
      "latvia",
      "liechtenstein",
      "lithuania",
      "luxembourg",
      "malta",
      "netherlands",
      "norway",
      "poland",
      "portugal",
      "romania",
      "slovakia",
      "slovenia",
      "spain",
      "sweden",
      "switzerland",
    ].includes(slug)
  );
}

function airlineIsUkCarrier(airline: Airline): boolean {
  if (isUkCountry(airline.country)) {
    return true;
  }

  return (airline.countrySlugs ?? []).some((slug) =>
    ["united-kingdom", "uk", "england", "scotland", "wales", "northern-ireland"].includes(
      slug
    )
  );
}

export type PassengerRightsCoverage = {
  eu261: boolean;
  uk261: boolean;
};

export function resolvePassengerRightsCoverage({
  originCountry,
  destinationCountry,
  airline,
}: {
  originCountry: string;
  destinationCountry: string;
  airline: Airline;
}): PassengerRightsCoverage {
  const departsEu261Area = isEuropean261Country(originCountry);
  const arrivesEu261Area = isEuropean261Country(destinationCountry);
  const departsUk = isUkCountry(originCountry);
  const arrivesUk = isUkCountry(destinationCountry);

  return {
    eu261:
      departsEu261Area ||
      (arrivesEu261Area && airlineIsEuropeanCarrier(airline)),
    uk261:
      departsUk ||
      (arrivesUk && (airlineIsUkCarrier(airline) || airlineIsEuropeanCarrier(airline))),
  };
}
