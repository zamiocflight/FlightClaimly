import fs from "node:fs/promises";
import path from "node:path";

import { flightNumberSeeds as existingFlightNumberSeeds } from "../src/data/master/flightNumberSeeds";
import { priorityAirlineEntities } from "../src/data/master/priorityAirlineEntities";
import type { FlightNumberSeed } from "../src/data/flight-numbers/types";
import { evaluateFlightNumberSeedForPublication } from "../src/data/flight-numbers/publication";
import { airlines } from "../src/data/seo/airlines";
import {
  getPopulationProfileAirlines,
  getPopulationProfileNames,
} from "./population-profiles";
import {
  calculateGreatCircleDistanceKm,
  getDistanceBand,
} from "../src/lib/aviation/distance";

const FLIGHTAWARE_API_BASE =
  "https://aeroapi.flightaware.com/aeroapi";

const MAXIMUM_ALLOWED_PAGES = 100;
const MAXIMUM_DATE_RANGE_DAYS = 31;
const REQUEST_TIMEOUT_MS = 30_000;
const MAXIMUM_ERROR_RESPONSE_LENGTH = 1_000;

const FLIGHT_NUMBER_SEEDS_PATH = path.join(
  process.cwd(),
  "src/data/master/flightNumberSeeds.ts"
);

const POPULATION_REPORT_PATH = path.join(
  process.cwd(),
  "reports/population/latest.json"
);

function getFlightAwareApiKey(): string {
  const apiKey = process.env.FLIGHTAWARE_API_KEY?.trim();
  if (!apiKey) throw new Error("Missing FLIGHTAWARE_API_KEY");
  return apiKey;
}

type PopulationAirline = { slug: string; name: string; iata: string; icao: string };
type PopulationSelection = { profile: string | null; airlines: PopulationAirline[] };

type FlightAwareSchedule = {
  ident?: string | null; ident_iata?: string | null; ident_icao?: string | null;
  aircraft_type?: string | null; scheduled_out?: string | null; scheduled_in?: string | null;
  origin?: string | null; origin_iata?: string | null; origin_icao?: string | null;
  destination?: string | null; destination_iata?: string | null; destination_icao?: string | null;
};

type FlightAwareScheduleResponse = {
  scheduled?: FlightAwareSchedule[]; schedules?: FlightAwareSchedule[]; flights?: FlightAwareSchedule[];
  links?: { next?: string | null }; num_pages?: number;
};

type FetchSchedulesResult = { schedules: FlightAwareSchedule[]; pagesFetched: number };
type AirlinePopulationResult = {
  airline: PopulationAirline; schedules: FlightAwareSchedule[]; normalizedSeeds: FlightNumberSeed[];
  fetchedSeeds: FlightNumberSeed[]; pagesFetched: number; rejectedSchedules: number; duplicateFetchedSeeds: number;
};
type MergeResult = { seeds: FlightNumberSeed[]; added: number; updated: number; unchanged: number; routeConflicts: number };
type PopulationReportAirline = {
  slug: string; name: string; iata: string; icao: string; pagesFetched: number; schedulesReturned: number;
  validNormalizedSeeds: number; rejectedSchedules: number; duplicateFetchedSeeds: number; uniqueFetchedSeeds: number;
};
type PopulationSuccessReport = {
  version: 1; status: "success"; startedAt: string; completedAt: string; durationMs: number;
  configuration: { profile: string | null; startDate: string; endDate: string; maximumPagesPerAirline: number; airlineCount: number; airlines: string[] };
  airlines: PopulationReportAirline[];
  totals: { existingSeedsBeforeMerge: number; schedulesReturned: number; validNormalizedSeeds: number; rejectedSchedules: number; duplicateFetchedSeeds: number; uniqueFetchedSeeds: number; seedsAdded: number; seedsUpdated: number; seedsUnchanged: number; routeConflicts: number; totalSeedsAfterMerge: number };
  output: { seedsFile: string; seedsFileWritten: boolean; reportFile: string };
};
type PopulationFailureReport = {
  version: 1; status: "failed"; startedAt: string; completedAt: string; durationMs: number;
  configuration: { requestedProfile: string | null; requestedAirlines: string | null; startDate: string | null; endDate: string | null; maximumPagesPerAirline: string | null };
  error: { name: string; message: string };
  output: { seedsFile: string; seedsFileWritten: false; reportFile: string };
};
type PopulationReport = PopulationSuccessReport | PopulationFailureReport;

const populationAirlines = [...airlines, ...priorityAirlineEntities];

function getSupportedAirlinesDescription(): string {
  return populationAirlines.map((airline) => `${airline.iata.trim().toUpperCase()} (${airline.slug})`).sort().join(", ");
}

function resolvePopulationSelection(): PopulationSelection {
  const requestedProfile = process.env.FLIGHTAWARE_PROFILE?.trim().toLowerCase() || null;
  let rawValue: string;
  if (requestedProfile) {
    const profileAirlines = getPopulationProfileAirlines(requestedProfile);
    if (!profileAirlines) throw new Error(`Unknown population profile "${requestedProfile}". Available profiles: ${getPopulationProfileNames().join(", ")}`);
    rawValue = profileAirlines.join(",");
  } else {
    rawValue = process.env.FLIGHTAWARE_AIRLINES ?? process.env.FLIGHTAWARE_AIRLINE ?? "SK";
  }
  const requestedIataCodes = rawValue.split(",").map((value) => value.trim().toUpperCase()).filter(Boolean);
  if (!requestedIataCodes.length) throw new Error("No airlines were provided. Set FLIGHTAWARE_PROFILE or FLIGHTAWARE_AIRLINES, for example SK,DY,FR.");
  const uniqueIataCodes = [...new Set(requestedIataCodes)];
  const invalidIataCodes = uniqueIataCodes.filter((iata) => !/^[A-Z0-9]{2}$/.test(iata));
  if (invalidIataCodes.length) throw new Error(`Invalid airline IATA code(s): ${invalidIataCodes.join(", ")}. Expected two-character codes, for example SK,DY,FR.`);
  const resolvedAirlines = uniqueIataCodes.map((requestedIata) => {
    const airline = populationAirlines.find((candidate) => candidate.iata.trim().toUpperCase() === requestedIata);
    if (!airline) throw new Error(`Airline "${requestedIata}" was not found in the airline knowledge registry. Configured airlines: ${getSupportedAirlinesDescription()}`);
    return { slug: airline.slug, name: airline.name, iata: airline.iata.trim().toUpperCase(), icao: airline.icao.trim().toUpperCase() };
  });
  return { profile: requestedProfile, airlines: resolvedAirlines };
}

function getMaximumPages(): number {
  const rawValue = process.env.FLIGHTAWARE_MAX_PAGES ?? "20";
  const maximumPages = Number.parseInt(rawValue, 10);
  if (!Number.isInteger(maximumPages) || maximumPages < 1) throw new Error(`Invalid FLIGHTAWARE_MAX_PAGES "${rawValue}". Expected a positive integer.`);
  if (maximumPages > MAXIMUM_ALLOWED_PAGES) throw new Error(`Invalid FLIGHTAWARE_MAX_PAGES "${rawValue}". Maximum allowed value is ${MAXIMUM_ALLOWED_PAGES}.`);
  return maximumPages;
}
function formatUtcDate(date: Date): string { return date.toISOString().slice(0, 10) }
function addUtcDays(date: Date, days: number): Date { const nextDate = new Date(date); nextDate.setUTCDate(nextDate.getUTCDate() + days); return nextDate }
function parseUtcDate(value: string, environmentVariable: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error(`Invalid ${environmentVariable} "${value}". Expected YYYY-MM-DD.`);
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || formatUtcDate(date) !== value) throw new Error(`Invalid ${environmentVariable} "${value}". Expected a real calendar date in YYYY-MM-DD format.`);
  return date;
}
function getPopulationDateRange(): { startDate: string; endDate: string } {
  const today = new Date();
  const startDate = process.env.FLIGHTAWARE_START_DATE?.trim() || formatUtcDate(today);
  const endDate = process.env.FLIGHTAWARE_END_DATE?.trim() || formatUtcDate(addUtcDays(today, 1));
  const parsedStartDate = parseUtcDate(startDate, "FLIGHTAWARE_START_DATE");
  const parsedEndDate = parseUtcDate(endDate, "FLIGHTAWARE_END_DATE");
  const days = (parsedEndDate.getTime() - parsedStartDate.getTime()) / 86_400_000;
  if (days <= 0) throw new Error("Invalid FlightAware date range. FLIGHTAWARE_END_DATE must be later than FLIGHTAWARE_START_DATE.");
  if (days > MAXIMUM_DATE_RANGE_DAYS) throw new Error(`Invalid FlightAware date range. Maximum allowed range is ${MAXIMUM_DATE_RANGE_DAYS} days.`);
  return { startDate, endDate };
}
function normalizeFlightNumber(schedule: FlightAwareSchedule): string | null {
  const value = schedule.ident_iata || schedule.ident || schedule.ident_icao;
  return value ? value.replace(/\s+/g, "").toUpperCase() : null;
}
function normalizeAirport(iata?: string | null, fallback?: string | null): string | null {
  const value = iata || fallback; if (!value) return null;
  const normalized = value.trim().toUpperCase(); return /^[A-Z]{3}$/.test(normalized) ? normalized : null;
}
function toSeed(schedule: FlightAwareSchedule, airline: PopulationAirline): FlightNumberSeed | null {
  const flightNumber = normalizeFlightNumber(schedule);
  const originIata = normalizeAirport(schedule.origin_iata, schedule.origin);
  const destinationIata = normalizeAirport(schedule.destination_iata, schedule.destination);
  if (!flightNumber || !originIata || !destinationIata) return null;
  const distanceKm = calculateGreatCircleDistanceKm(originIata, destinationIata);
  if (distanceKm === null) return null;
  const seed: FlightNumberSeed = {
    flightNumber, airline: airline.slug, originIata, destinationIata,
    distanceBand: getDistanceBand(distanceKm), eu261Eligible: false,
    aircraft: schedule.aircraft_type || undefined,
    schedule: schedule.scheduled_out && schedule.scheduled_in ? `${schedule.scheduled_out} → ${schedule.scheduled_in}` : undefined,
  };
  return evaluateFlightNumberSeedForPublication(seed).publish ? seed : null;
}
function getSeedIdentity(seed: FlightNumberSeed): string { return `${seed.airline}:${seed.flightNumber}` }
function sameRoute(a: FlightNumberSeed, b: FlightNumberSeed): boolean { return a.originIata === b.originIata && a.destinationIata === b.destinationIata }
function seedsAreEqual(a: FlightNumberSeed, b: FlightNumberSeed): boolean {
  return a.flightNumber === b.flightNumber && a.airline === b.airline && sameRoute(a, b) && a.distanceBand === b.distanceBand && a.aircraft === b.aircraft && a.schedule === b.schedule;
}
function deduplicateFetchedSeeds(seeds: FlightNumberSeed[]): FlightNumberSeed[] {
  const map = new Map<string, FlightNumberSeed>();
  for (const seed of seeds) {
    const identity = getSeedIdentity(seed); const existing = map.get(identity);
    if (!existing) { map.set(identity, seed); continue }
    if (!sameRoute(existing, seed)) {
      console.warn(`Route conflict in fetched schedules for ${seed.flightNumber}: keeping ${existing.originIata} → ${existing.destinationIata}, ignoring ${seed.originIata} → ${seed.destinationIata}.`);
      continue;
    }
    map.set(identity, seed);
  }
  return [...map.values()];
}
function sortSeeds(seeds: FlightNumberSeed[]): FlightNumberSeed[] {
  return [...seeds].sort((a, b) => a.airline.localeCompare(b.airline) || a.flightNumber.localeCompare(b.flightNumber, "en", { numeric: true }));
}
function mergeFlightNumberSeeds(existingSeeds: FlightNumberSeed[], fetchedSeeds: FlightNumberSeed[]): MergeResult {
  const map = new Map<string, FlightNumberSeed>(); for (const seed of existingSeeds) map.set(getSeedIdentity(seed), seed);
  let added = 0, updated = 0, unchanged = 0, routeConflicts = 0;
  for (const fetched of fetchedSeeds) {
    const identity = getSeedIdentity(fetched); const existing = map.get(identity);
    if (!existing) { map.set(identity, fetched); added++; continue }
    if (!sameRoute(existing, fetched)) {
      routeConflicts++;
      console.warn(`Route identity conflict for ${fetched.flightNumber}: preserving ${existing.originIata} → ${existing.destinationIata}, ignoring ${fetched.originIata} → ${fetched.destinationIata}.`);
      continue;
    }
    if (seedsAreEqual(existing, fetched)) { unchanged++; continue }
    map.set(identity, fetched); updated++;
  }
  return { seeds: sortSeeds([...map.values()]), added, updated, unchanged, routeConflicts };
}
function serializeSeeds(seeds: FlightNumberSeed[]): string {
  return `import type { FlightNumberSeed } from "../flight-numbers/types";\n\nexport const flightNumberSeeds: FlightNumberSeed[] = ${JSON.stringify(seeds, null, 2)};\n`;
}
function normalizeNextUrl(next: string, currentUrl: string): string {
  const parsed = new URL(next, currentUrl);
  let pathname = parsed.pathname;
  if (pathname === "/aeroapi") pathname = "/";
  else if (pathname.startsWith("/aeroapi/")) pathname = pathname.slice("/aeroapi".length);
  if (!pathname.startsWith("/schedules/")) {
    throw new Error(`Unexpected FlightAware pagination path: ${pathname}`);
  }
  return `${FLIGHTAWARE_API_BASE}${pathname}${parsed.search}`;
}
async function fetchSchedulesForAirline(airline: PopulationAirline, startDate: string, endDate: string, maximumPages: number): Promise<FetchSchedulesResult> {
  const apiKey = getFlightAwareApiKey();
  let url: string | null = `${FLIGHTAWARE_API_BASE}/schedules/${encodeURIComponent(startDate)}/${encodeURIComponent(endDate)}?airline=${encodeURIComponent(airline.icao)}`;
  const schedules: FlightAwareSchedule[] = []; let pagesFetched = 0;
  while (url && pagesFetched < maximumPages) {
    const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    let response: Response;
    try { response = await fetch(url, { headers: { "x-apikey": apiKey }, signal: controller.signal }) } finally { clearTimeout(timeout) }
    if (!response.ok) {
      const body = (await response.text()).slice(0, MAXIMUM_ERROR_RESPONSE_LENGTH);
      throw new Error(`FlightAware request failed for ${airline.iata} (${response.status} ${response.statusText}). ${body}`);
    }
    const data = (await response.json()) as FlightAwareScheduleResponse;
    const pageSchedules = data.scheduled ?? data.schedules ?? data.flights ?? [];
    schedules.push(...pageSchedules); pagesFetched++;
    url = data.links?.next ? normalizeNextUrl(data.links.next, url) : null;
  }
  return { schedules, pagesFetched };
}
async function populateAirline(airline: PopulationAirline, startDate: string, endDate: string, maximumPages: number): Promise<AirlinePopulationResult> {
  const fetched = await fetchSchedulesForAirline(airline, startDate, endDate, maximumPages);
  const normalizedSeeds = fetched.schedules.map((schedule) => toSeed(schedule, airline)).filter((seed): seed is FlightNumberSeed => seed !== null);
  const fetchedSeeds = deduplicateFetchedSeeds(normalizedSeeds);
  return { airline, schedules: fetched.schedules, normalizedSeeds, fetchedSeeds, pagesFetched: fetched.pagesFetched, rejectedSchedules: fetched.schedules.length - normalizedSeeds.length, duplicateFetchedSeeds: normalizedSeeds.length - fetchedSeeds.length };
}
async function writeReport(report: PopulationReport): Promise<void> {
  await fs.mkdir(path.dirname(POPULATION_REPORT_PATH), { recursive: true });
  await fs.writeFile(POPULATION_REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}
async function main(): Promise<void> {
  const startedAtDate = new Date();
  try {
    const selection = resolvePopulationSelection(); const { startDate, endDate } = getPopulationDateRange(); const maximumPages = getMaximumPages();
    console.log(`Flight Number Population Engine: ${selection.airlines.map((a) => a.iata).join(", ")} | ${startDate} → ${endDate}`);
    const results: AirlinePopulationResult[] = [];
    for (const airline of selection.airlines) results.push(await populateAirline(airline, startDate, endDate, maximumPages));
    const fetchedSeeds = results.flatMap((result) => result.fetchedSeeds);
    const merge = mergeFlightNumberSeeds(existingFlightNumberSeeds, fetchedSeeds);
    const seedsFileWritten = merge.added > 0 || merge.updated > 0;
    if (seedsFileWritten) await fs.writeFile(FLIGHT_NUMBER_SEEDS_PATH, serializeSeeds(merge.seeds), "utf8");
    const completedAtDate = new Date();
    const report: PopulationSuccessReport = {
      version: 1, status: "success", startedAt: startedAtDate.toISOString(), completedAt: completedAtDate.toISOString(), durationMs: completedAtDate.getTime() - startedAtDate.getTime(),
      configuration: { profile: selection.profile, startDate, endDate, maximumPagesPerAirline: maximumPages, airlineCount: selection.airlines.length, airlines: selection.airlines.map((a) => a.iata) },
      airlines: results.map((r) => ({ slug: r.airline.slug, name: r.airline.name, iata: r.airline.iata, icao: r.airline.icao, pagesFetched: r.pagesFetched, schedulesReturned: r.schedules.length, validNormalizedSeeds: r.normalizedSeeds.length, rejectedSchedules: r.rejectedSchedules, duplicateFetchedSeeds: r.duplicateFetchedSeeds, uniqueFetchedSeeds: r.fetchedSeeds.length })),
      totals: { existingSeedsBeforeMerge: existingFlightNumberSeeds.length, schedulesReturned: results.reduce((s, r) => s + r.schedules.length, 0), validNormalizedSeeds: results.reduce((s, r) => s + r.normalizedSeeds.length, 0), rejectedSchedules: results.reduce((s, r) => s + r.rejectedSchedules, 0), duplicateFetchedSeeds: results.reduce((s, r) => s + r.duplicateFetchedSeeds, 0), uniqueFetchedSeeds: fetchedSeeds.length, seedsAdded: merge.added, seedsUpdated: merge.updated, seedsUnchanged: merge.unchanged, routeConflicts: merge.routeConflicts, totalSeedsAfterMerge: merge.seeds.length },
      output: { seedsFile: FLIGHT_NUMBER_SEEDS_PATH, seedsFileWritten, reportFile: POPULATION_REPORT_PATH },
    };
    await writeReport(report);
    console.log(`Population complete. Added ${merge.added}, updated ${merge.updated}, unchanged ${merge.unchanged}, route conflicts ${merge.routeConflicts}. Total ${merge.seeds.length}.`);
  } catch (error: unknown) {
    const completedAtDate = new Date(); const err = error instanceof Error ? error : new Error(String(error));
    const report: PopulationFailureReport = { version: 1, status: "failed", startedAt: startedAtDate.toISOString(), completedAt: completedAtDate.toISOString(), durationMs: completedAtDate.getTime() - startedAtDate.getTime(), configuration: { requestedProfile: process.env.FLIGHTAWARE_PROFILE ?? null, requestedAirlines: process.env.FLIGHTAWARE_AIRLINES ?? process.env.FLIGHTAWARE_AIRLINE ?? null, startDate: process.env.FLIGHTAWARE_START_DATE ?? null, endDate: process.env.FLIGHTAWARE_END_DATE ?? null, maximumPagesPerAirline: process.env.FLIGHTAWARE_MAX_PAGES ?? null }, error: { name: err.name, message: err.message }, output: { seedsFile: FLIGHT_NUMBER_SEEDS_PATH, seedsFileWritten: false, reportFile: POPULATION_REPORT_PATH } };
    await writeReport(report); console.error(err.message); process.exitCode = 1;
  }
}
main();