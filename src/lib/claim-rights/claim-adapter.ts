import type { Claim } from "@/lib/claims";
import { airportRegistry } from "@/data/master/airportRegistry";
import type {
  ClaimDisruptionType,
  ClaimRightsAssessmentInput,
} from "./types";

const EU261_COUNTRY_CODES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE",
  "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT",
  "RO", "SK", "SI", "ES", "SE", "IS", "NO", "CH",
  // EU outermost territories represented with their own ISO country codes.
  "GF", "GP", "MQ", "RE", "YT", "MF",
]);

function normalizeIata(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const code = value.trim().toUpperCase();
  return /^[A-Z]{3}$/.test(code) ? code : undefined;
}

function airportTerritory(iata: string | undefined): boolean | undefined {
  if (!iata) return undefined;
  const airport = airportRegistry.find((entry) => entry.iata === iata);
  if (!airport?.countryCode) return undefined;
  return EU261_COUNTRY_CODES.has(airport.countryCode.toUpperCase());
}

function parseMaybeJson(value: unknown): unknown {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function findStringFact(value: unknown, keys: string[]): string | undefined {
  const parsed = parseMaybeJson(value);
  if (!parsed || typeof parsed !== "object") return undefined;

  if (Array.isArray(parsed)) {
    for (const item of parsed) {
      const found = findStringFact(item, keys);
      if (found) return found;
    }
    return undefined;
  }

  const record = parsed as Record<string, unknown>;
  for (const key of keys) {
    const candidate = record[key];
    if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
  }

  for (const candidate of Object.values(record)) {
    if (candidate && typeof candidate === "object") {
      const found = findStringFact(candidate, keys);
      if (found) return found;
    }
  }

  return undefined;
}

function findNumberFact(value: unknown, keys: string[]): number | undefined {
  const parsed = parseMaybeJson(value);
  if (!parsed || typeof parsed !== "object") return undefined;

  if (Array.isArray(parsed)) {
    for (const item of parsed) {
      const found = findNumberFact(item, keys);
      if (found !== undefined) return found;
    }
    return undefined;
  }

  const record = parsed as Record<string, unknown>;
  for (const key of keys) {
    const candidate = record[key];
    if (typeof candidate === "number" && Number.isFinite(candidate)) return candidate;
    if (typeof candidate === "string" && candidate.trim() && Number.isFinite(Number(candidate))) {
      return Number(candidate);
    }
  }

  for (const candidate of Object.values(record)) {
    if (candidate && typeof candidate === "object") {
      const found = findNumberFact(candidate, keys);
      if (found !== undefined) return found;
    }
  }

  return undefined;
}

function disruptionTypeFromClaim(claim: Claim): ClaimDisruptionType | undefined {
  const raw = findStringFact(claim.segments, ["disruptionType", "disruption", "type"]);
  const normalized = raw?.toLowerCase();

  if (normalized === "delayed" || normalized === "delay") return "delay";
  if (normalized === "cancelled" || normalized === "canceled" || normalized === "cancellation") {
    return "cancellation";
  }
  if (normalized === "denied" || normalized === "denied-boarding" || normalized === "denied_boarding") {
    return "denied-boarding";
  }

  return undefined;
}

/**
 * Conservative adapter from the existing transactional Claim into the locked
 * Claim Rights Assessment contract. It only promotes facts that can be found
 * in existing structured claim data. Missing facts deliberately remain
 * undefined so the legal resolver can report them as unresolved.
 */
export function claimToRightsAssessmentInput(claim: Claim): ClaimRightsAssessmentInput {
  const departureIata = normalizeIata(claim.from);
  const arrivalIata = normalizeIata(claim.to);

  const arrivalDelayMinutes = findNumberFact(claim.segments, [
    "arrivalDelayMinutes",
    "finalArrivalDelayMinutes",
    "delayMinutes",
  ]);
  const departureDelayMinutes = findNumberFact(claim.segments, ["departureDelayMinutes"]);
  const delayReasonSlug = findStringFact(claim.segments, ["delayReasonSlug"]);

  return {
    departureAirport: {
      iata: departureIata,
      eu261Territory: airportTerritory(departureIata),
    },
    arrivalAirport: {
      iata: arrivalIata,
      eu261Territory: airportTerritory(arrivalIata),
    },
    disruption: {
      type: disruptionTypeFromClaim(claim),
      arrivalDelayMinutes,
      departureDelayMinutes,
      delayReasonSlug,
    },
  };
}
