export const populationProfiles = {
  nordics: ["SK", "DY"],
  "europe-core": ["SK", "DY", "FR", "LH", "U2", "AF", "KL", "BA"],
  "europe-expanded": [
    "SK",
    "LH",
    "LX",
    "OS",
    "BA",
    "SN",
    "AF",
    "KL",
    "IB",
    "TP",
    "AY",
    "LO",
    "AZ",
    "VY",
    "U2",
    "FR",
    "W6",
    "TK",
    "A3",
    "UX",
    "FI",
    "EI",
    "VS",
    "LS",
    "DY",
    "EW",
    "HV",
    "BT",
  ],
  "global-core": [
    "SK",
    "LH",
    "LX",
    "OS",
    "BA",
    "SN",
    "AF",
    "KL",
    "IB",
    "TP",
    "AY",
    "LO",
    "AZ",
    "VY",
    "U2",
    "FR",
    "W6",
    "TK",
    "A3",
    "UX",
    "FI",
    "EI",
    "VS",
    "LS",
    "DY",
    "EW",
    "HV",
    "BT",
    "DL",
    "AA",
    "UA",
    "AC",
    "EK",
    "QR",
    "EY",
    "SQ",
    "TG",
    "NH",
    "JL",
    "CX",
    "KE",
    "BR",
  ],
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
