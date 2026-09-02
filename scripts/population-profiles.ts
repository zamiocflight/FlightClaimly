import {
  europeExpandedAirlines,
  globalCoreAirlines,
  intercontinentalCoreAirlines,
} from "../src/data/master/priorityAirlines";

export const populationProfiles = {
  nordics: ["SK", "DY"],
  "europe-core": ["SK", "DY", "FR", "LH", "U2", "AF", "KL", "BA"],
  "europe-expanded": europeExpandedAirlines,
  "intercontinental-core": intercontinentalCoreAirlines,
  "global-core": globalCoreAirlines,
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
