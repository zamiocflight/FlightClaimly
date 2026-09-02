import {
  europeExpandedAirlines,
  globalCoreAirlines,
} from "../src/data/master/priorityAirlines";
import { airlines } from "../src/data/seo/airlines";

const configuredAirlineIata = new Set(
  airlines.map((airline) => airline.iata.trim().toUpperCase())
);

const executableEuropeExpandedAirlines = europeExpandedAirlines.filter((iata) =>
  configuredAirlineIata.has(iata)
);

const executableGlobalCoreAirlines = globalCoreAirlines.filter((iata) =>
  configuredAirlineIata.has(iata)
);

export const populationProfiles = {
  nordics: ["SK", "DY"],
  "europe-core": ["SK", "DY", "FR", "LH", "U2", "AF", "KL", "BA"],
  "europe-expanded": executableEuropeExpandedAirlines,
  "global-core": executableGlobalCoreAirlines,
} as const;

export type PopulationProfileName =
  keyof typeof populationProfiles;

export function getPopulationProfileNames(): string[] {
  return Object.keys(populationProfiles).sort();
}

export function getPopulationProfileAirlines(
  profileName: string
): string[] | null {
  const normalizedProfileName =
    profileName.trim().toLowerCase();

  if (
    !Object.prototype.hasOwnProperty.call(
      populationProfiles,
      normalizedProfileName
    )
  ) {
    return null;
  }

  const profile =
    populationProfiles[
      normalizedProfileName as PopulationProfileName
    ];

  return [...profile];
}
