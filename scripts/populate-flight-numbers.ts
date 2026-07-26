import fs from "node:fs/promises";
import path from "node:path";

import { flightNumberSeeds as existingFlightNumberSeeds } from "../src/data/master/flightNumberSeeds";
import type { FlightNumberSeed } from "../src/data/flight-numbers/types";
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
  const apiKey =
    process.env.FLIGHTAWARE_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("Missing FLIGHTAWARE_API_KEY");
  }

  return apiKey;
}

type PopulationAirline = {
  slug: string;
  name: string;
  iata: string;
  icao: string;
};

type PopulationSelection = {
  profile: string | null;
  airlines: PopulationAirline[];
};

function getSupportedAirlinesDescription(): string {
  return airlines
    .map(
      (airline) =>
        `${airline.iata.trim().toUpperCase()} (${airline.slug})`
    )
    .sort()
    .join(", ");
}

function resolvePopulationSelection(): PopulationSelection {
  const requestedProfile =
    process.env.FLIGHTAWARE_PROFILE
      ?.trim()
      .toLowerCase() || null;

  let rawValue: string;

  if (requestedProfile) {
    const profileAirlines =
      getPopulationProfileAirlines(requestedProfile);

    if (!profileAirlines) {
      throw new Error(
        `Unknown population profile "${requestedProfile}". ` +
          `Available profiles: ` +
          `${getPopulationProfileNames().join(", ")}`
      );
    }

    rawValue = profileAirlines.join(",");
  } else {
    rawValue =
      process.env.FLIGHTAWARE_AIRLINES ??
      process.env.FLIGHTAWARE_AIRLINE ??
      "SK";
  }

  const requestedIataCodes = rawValue
    .split(",")
    .map((value) => value.trim().toUpperCase())
    .filter((value) => value.length > 0);

  if (requestedIataCodes.length === 0) {
    throw new Error(
      "No airlines were provided. " +
        "Set FLIGHTAWARE_PROFILE or " +
        "FLIGHTAWARE_AIRLINES, for example SK,DY,FR."
    );
  }

  const uniqueIataCodes = [
    ...new Set(requestedIataCodes),
  ];

  const invalidIataCodes = uniqueIataCodes.filter(
    (iata) => !/^[A-Z0-9]{2}$/.test(iata)
  );

  if (invalidIataCodes.length > 0) {
    throw new Error(
      `Invalid airline IATA code(s): ` +
        `${invalidIataCodes.join(", ")}. ` +
        "Expected two-character codes, for example SK,DY,FR."
    );
  }

  const resolvedAirlines = uniqueIataCodes.map(
    (requestedIata) => {
      const airline = airlines.find(
        (candidate) =>
          candidate.iata.trim().toUpperCase() ===
          requestedIata
      );

      if (!airline) {
        throw new Error(
          `Airline "${requestedIata}" was not found in ` +
            "src/data/seo/airlines.ts. " +
            `Configured airlines: ` +
            `${getSupportedAirlinesDescription()}`
        );
      }

      return {
        slug: airline.slug,
        name: airline.name,
        iata: airline.iata.trim().toUpperCase(),
        icao: airline.icao.trim().toUpperCase(),
      };
    }
  );

  return {
    profile: requestedProfile,
    airlines: resolvedAirlines,
  };
}

type FlightAwareSchedule = {
  ident?: string | null;
  ident_iata?: string | null;
  ident_icao?: string | null;

  aircraft_type?: string | null;

  scheduled_out?: string | null;
  scheduled_in?: string | null;

  origin?: string | null;
  origin_iata?: string | null;
  origin_icao?: string | null;

  destination?: string | null;
  destination_iata?: string | null;
  destination_icao?: string | null;
};

type FlightAwareScheduleResponse = {
  scheduled?: FlightAwareSchedule[];
  schedules?: FlightAwareSchedule[];
  flights?: FlightAwareSchedule[];

  links?: {
    next?: string | null;
  };

  num_pages?: number;
};

type FetchSchedulesResult = {
  schedules: FlightAwareSchedule[];
  pagesFetched: number;
};

type AirlinePopulationResult = {
  airline: PopulationAirline;
  schedules: FlightAwareSchedule[];
  normalizedSeeds: FlightNumberSeed[];
  fetchedSeeds: FlightNumberSeed[];
  pagesFetched: number;
  rejectedSchedules: number;
  duplicateFetchedSeeds: number;
};

type MergeResult = {
  seeds: FlightNumberSeed[];
  added: number;
  updated: number;
  unchanged: number;
};

type PopulationReportAirline = {
  slug: string;
  name: string;
  iata: string;
  icao: string;
  pagesFetched: number;
  schedulesReturned: number;
  validNormalizedSeeds: number;
  rejectedSchedules: number;
  duplicateFetchedSeeds: number;
  uniqueFetchedSeeds: number;
};

type PopulationSuccessReport = {
  version: 1;
  status: "success";
  startedAt: string;
  completedAt: string;
  durationMs: number;
  configuration: {
    profile: string | null;
    startDate: string;
    endDate: string;
    maximumPagesPerAirline: number;
    airlineCount: number;
    airlines: string[];
  };
  airlines: PopulationReportAirline[];
  totals: {
    existingSeedsBeforeMerge: number;
    schedulesReturned: number;
    validNormalizedSeeds: number;
    rejectedSchedules: number;
    duplicateFetchedSeeds: number;
    uniqueFetchedSeeds: number;
    seedsAdded: number;
    seedsUpdated: number;
    seedsUnchanged: number;
    totalSeedsAfterMerge: number;
  };
  output: {
    seedsFile: string;
    seedsFileWritten: boolean;
    reportFile: string;
  };
};

type PopulationFailureReport = {
  version: 1;
  status: "failed";
  startedAt: string;
  completedAt: string;
  durationMs: number;
  configuration: {
    requestedProfile: string | null;
    requestedAirlines: string | null;
    startDate: string | null;
    endDate: string | null;
    maximumPagesPerAirline: string | null;
  };
  error: {
    name: string;
    message: string;
  };
  output: {
    seedsFile: string;
    seedsFileWritten: false;
    reportFile: string;
  };
};

type PopulationReport =
  | PopulationSuccessReport
  | PopulationFailureReport;

function getMaximumPages(): number {
  const rawValue =
    process.env.FLIGHTAWARE_MAX_PAGES ?? "20";

  const maximumPages = Number.parseInt(
    rawValue,
    10
  );

  if (
    !Number.isInteger(maximumPages) ||
    maximumPages < 1
  ) {
    throw new Error(
      `Invalid FLIGHTAWARE_MAX_PAGES "${rawValue}". ` +
        "Expected a positive integer."
    );
  }

  if (maximumPages > MAXIMUM_ALLOWED_PAGES) {
    throw new Error(
      `Invalid FLIGHTAWARE_MAX_PAGES "${rawValue}". ` +
        `Maximum allowed value is ` +
        `${MAXIMUM_ALLOWED_PAGES}.`
    );
  }

  return maximumPages;
}

function formatUtcDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addUtcDays(date: Date, days: number): Date {
  const nextDate = new Date(date);

  nextDate.setUTCDate(nextDate.getUTCDate() + days);

  return nextDate;
}

function parseUtcDate(
  value: string,
  environmentVariable: string
): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(
      `Invalid ${environmentVariable} "${value}". ` +
        "Expected YYYY-MM-DD."
    );
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (
    Number.isNaN(date.getTime()) ||
    formatUtcDate(date) !== value
  ) {
    throw new Error(
      `Invalid ${environmentVariable} "${value}". ` +
        "Expected a real calendar date in YYYY-MM-DD format."
    );
  }

  return date;
}

function getUtcDifferenceInDays(
  startDate: Date,
  endDate: Date
): number {
  const millisecondsPerDay =
    24 * 60 * 60 * 1_000;

  return (
    (endDate.getTime() - startDate.getTime()) /
    millisecondsPerDay
  );
}

function getPopulationDateRange(): {
  startDate: string;
  endDate: string;
} {
  const today = new Date();

  const startDate =
    process.env.FLIGHTAWARE_START_DATE?.trim() ||
    formatUtcDate(today);

  const endDate =
    process.env.FLIGHTAWARE_END_DATE?.trim() ||
    formatUtcDate(addUtcDays(today, 1));

  const parsedStartDate = parseUtcDate(
    startDate,
    "FLIGHTAWARE_START_DATE"
  );

  const parsedEndDate = parseUtcDate(
    endDate,
    "FLIGHTAWARE_END_DATE"
  );

  const dateRangeDays = getUtcDifferenceInDays(
    parsedStartDate,
    parsedEndDate
  );

  if (dateRangeDays <= 0) {
    throw new Error(
      "Invalid FlightAware date range. " +
        "FLIGHTAWARE_END_DATE must be later than " +
        "FLIGHTAWARE_START_DATE."
    );
  }

  if (dateRangeDays > MAXIMUM_DATE_RANGE_DAYS) {
    throw new Error(
      "Invalid FlightAware date range. " +
        `Maximum allowed range is ` +
        `${MAXIMUM_DATE_RANGE_DAYS} days.`
    );
  }

  return {
    startDate,
    endDate,
  };
}

function normalizeFlightNumber(
  schedule: FlightAwareSchedule
): string | null {
  const flightNumber =
    schedule.ident_iata ||
    schedule.ident ||
    schedule.ident_icao;

  if (!flightNumber) {
    return null;
  }

  return flightNumber.replace(/\s+/g, "").toUpperCase();
}

function normalizeAirport(
  iata?: string | null,
  fallback?: string | null
): string | null {
  const value = iata || fallback;

  if (!value) {
    return null;
  }

  const normalized = value.trim().toUpperCase();

  return /^[A-Z]{3}$/.test(normalized)
    ? normalized
    : null;
}

function toSeed(
  schedule: FlightAwareSchedule,
  airline: PopulationAirline
): FlightNumberSeed | null {
  const flightNumber = normalizeFlightNumber(schedule);

  const originIata = normalizeAirport(
    schedule.origin_iata,
    schedule.origin
  );

  const destinationIata = normalizeAirport(
    schedule.destination_iata,
    schedule.destination
  );

  if (!flightNumber || !originIata || !destinationIata) {
    return null;
  }

  const distanceKm = calculateGreatCircleDistanceKm(
    originIata,
    destinationIata
  );

  if (distanceKm === null) {
    return null;
  }

  return {
    flightNumber,
    airline: airline.slug,
    originIata,
    destinationIata,
    distanceBand: getDistanceBand(distanceKm),
    eu261Eligible: true,
    aircraft: schedule.aircraft_type || undefined,
    schedule:
      schedule.scheduled_out && schedule.scheduled_in
        ? `${schedule.scheduled_out} → ${schedule.scheduled_in}`
        : undefined,
  };
}

function getSeedIdentity(seed: FlightNumberSeed): string {
  return `${seed.airline}:${seed.flightNumber}`;
}

function seedsAreEqual(
  first: FlightNumberSeed,
  second: FlightNumberSeed
): boolean {
  return (
    first.flightNumber === second.flightNumber &&
    first.airline === second.airline &&
    first.originIata === second.originIata &&
    first.destinationIata === second.destinationIata &&
    first.distanceBand === second.distanceBand &&
    first.eu261Eligible === second.eu261Eligible &&
    first.aircraft === second.aircraft &&
    first.schedule === second.schedule
  );
}

function deduplicateFetchedSeeds(
  seeds: FlightNumberSeed[]
): FlightNumberSeed[] {
  const seedsByIdentity = new Map<
    string,
    FlightNumberSeed
  >();

  for (const seed of seeds) {
    seedsByIdentity.set(getSeedIdentity(seed), seed);
  }

  return [...seedsByIdentity.values()];
}

function sortSeeds(
  seeds: FlightNumberSeed[]
): FlightNumberSeed[] {
  return [...seeds].sort((first, second) => {
    const airlineComparison = first.airline.localeCompare(
      second.airline
    );

    if (airlineComparison !== 0) {
      return airlineComparison;
    }

    return first.flightNumber.localeCompare(
      second.flightNumber,
      "en",
      {
        numeric: true,
      }
    );
  });
}

function mergeFlightNumberSeeds(
  existingSeeds: FlightNumberSeed[],
  fetchedSeeds: FlightNumberSeed[]
): MergeResult {
  const seedsByIdentity = new Map<
    string,
    FlightNumberSeed
  >();

  for (const seed of existingSeeds) {
    seedsByIdentity.set(getSeedIdentity(seed), seed);
  }

  let added = 0;
  let updated = 0;
  let unchanged = 0;

  for (const fetchedSeed of fetchedSeeds) {
    const identity = getSeedIdentity(fetchedSeed);
    const existingSeed = seedsByIdentity.get(identity);

    if (!existingSeed) {
      seedsByIdentity.set(identity, fetchedSeed);
      added += 1;
      continue;
    }

    if (seedsAreEqual(existingSeed, fetchedSeed)) {
      unchanged += 1;
      continue;
    }

    seedsByIdentity.set(identity, fetchedSeed);
    updated += 1;
  }

  return {
    seeds: sortSeeds([...seedsByIdentity.values()]),
    added,
    updated,
    unchanged,
  };
}

function serializeSeeds(
  seeds: FlightNumberSeed[]
): string {
  return `import type { FlightNumberSeed } from "../flight-numbers/types";

export const flightNumberSeeds: FlightNumberSeed[] = ${JSON.stringify(
    seeds,
    null,
    2
  )};
`;
}

function createPopulationReport(
  startedAt: Date,
  completedAt: Date,
  populationSelection: PopulationSelection,
  startDate: string,
  endDate: string,
  maximumPages: number,
  populationResults: AirlinePopulationResult[],
  totalSchedules: number,
  totalNormalizedSeeds: number,
  totalRejectedSchedules: number,
  totalDuplicateFetchedSeeds: number,
  allFetchedSeeds: FlightNumberSeed[],
  mergeResult: MergeResult,
  seedsFileWritten: boolean
): PopulationSuccessReport {
  return {
    version: 1,
    status: "success",
    startedAt: startedAt.toISOString(),
    completedAt: completedAt.toISOString(),
    durationMs:
      completedAt.getTime() - startedAt.getTime(),

    configuration: {
      profile: populationSelection.profile,
      startDate,
      endDate,
      maximumPagesPerAirline: maximumPages,
      airlineCount: populationSelection.airlines.length,
      airlines: populationSelection.airlines.map(
      (airline) => airline.iata
      ),
    },

    airlines: populationResults.map((result) => ({
      slug: result.airline.slug,
      name: result.airline.name,
      iata: result.airline.iata,
      icao: result.airline.icao,
      pagesFetched: result.pagesFetched,
      schedulesReturned: result.schedules.length,
      validNormalizedSeeds:
        result.normalizedSeeds.length,
      rejectedSchedules:
        result.rejectedSchedules,
      duplicateFetchedSeeds:
        result.duplicateFetchedSeeds,
      uniqueFetchedSeeds:
        result.fetchedSeeds.length,
    })),

    totals: {
      existingSeedsBeforeMerge:
        existingFlightNumberSeeds.length,
      schedulesReturned: totalSchedules,
      validNormalizedSeeds:
        totalNormalizedSeeds,
      rejectedSchedules:
        totalRejectedSchedules,
      duplicateFetchedSeeds:
        totalDuplicateFetchedSeeds,
      uniqueFetchedSeeds:
        allFetchedSeeds.length,
      seedsAdded: mergeResult.added,
      seedsUpdated: mergeResult.updated,
      seedsUnchanged: mergeResult.unchanged,
      totalSeedsAfterMerge:
        mergeResult.seeds.length,
    },

    output: {
      seedsFile: path.relative(
        process.cwd(),
        FLIGHT_NUMBER_SEEDS_PATH
      ),
      seedsFileWritten,
      reportFile: path.relative(
        process.cwd(),
        POPULATION_REPORT_PATH
      ),
    },
  };
}


function createPopulationFailureReport(
  startedAt: Date,
  completedAt: Date,
  error: unknown
): PopulationFailureReport {
  const normalizedError =
    error instanceof Error
      ? error
      : new Error(String(error));

  return {
    version: 1,
    status: "failed",
    startedAt: startedAt.toISOString(),
    completedAt: completedAt.toISOString(),
    durationMs:
      completedAt.getTime() - startedAt.getTime(),

    configuration: {
      requestedProfile:
        process.env.FLIGHTAWARE_PROFILE?.trim() ||
        null,

      requestedAirlines:
        process.env.FLIGHTAWARE_AIRLINES?.trim() ||
        process.env.FLIGHTAWARE_AIRLINE?.trim() ||
        null,

      startDate:
        process.env.FLIGHTAWARE_START_DATE?.trim() ||
        null,

      endDate:
        process.env.FLIGHTAWARE_END_DATE?.trim() ||
        null,

      maximumPagesPerAirline:
        process.env.FLIGHTAWARE_MAX_PAGES?.trim() ||
        null,
    },

    error: {
      name: normalizedError.name,
      message: normalizedError.message,
    },

    output: {
      seedsFile: path.relative(
        process.cwd(),
        FLIGHT_NUMBER_SEEDS_PATH
      ),
      seedsFileWritten: false,
      reportFile: path.relative(
        process.cwd(),
        POPULATION_REPORT_PATH
      ),
    },
  };
}

async function writePopulationReport(
  report: PopulationReport
): Promise<void> {
  await fs.mkdir(
    path.dirname(POPULATION_REPORT_PATH),
    {
      recursive: true,
    }
  );

  await fs.writeFile(
    POPULATION_REPORT_PATH,
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8"
  );
}

function resolveFlightAwareUrl(
  urlOrPath: string
): string {
  if (
    urlOrPath.startsWith("https://") ||
    urlOrPath.startsWith("http://")
  ) {
    return urlOrPath;
  }

  const normalizedPath = urlOrPath.startsWith("/")
    ? urlOrPath
    : `/${urlOrPath}`;

  return `${FLIGHTAWARE_API_BASE}${normalizedPath}`;
}

async function fetchSchedulePage(
  url: string,
  apiKey: string
): Promise<FlightAwareScheduleResponse> {
  let response: Response;

  try {
    response = await fetch(url, {
      headers: {
        "x-apikey": apiKey,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(
        REQUEST_TIMEOUT_MS
      ),
    });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error.name === "TimeoutError" ||
        error.name === "AbortError")
    ) {
      throw new Error(
        `FlightAware request timed out after ` +
          `${REQUEST_TIMEOUT_MS} ms.`
      );
    }

    throw error;
  }

  if (!response.ok) {
    const responseBody = await response.text();

    const safeResponseBody = responseBody
      .slice(0, MAXIMUM_ERROR_RESPONSE_LENGTH)
      .trim();

    throw new Error(
      `FlightAware returned ${response.status}` +
        (safeResponseBody
          ? `: ${safeResponseBody}`
          : ".")
    );
  }

  return (await response.json()) as
    FlightAwareScheduleResponse;
}

function extractSchedules(
  response: FlightAwareScheduleResponse
): FlightAwareSchedule[] {
  return (
    response.scheduled ??
    response.schedules ??
    response.flights ??
    []
  );
}

async function fetchAllSchedules(
  initialUrl: string,
  maximumPages: number,
  airlineIata: string,
  apiKey: string
): Promise<FetchSchedulesResult> {
  const schedules: FlightAwareSchedule[] = [];

  let nextUrl: string | null = initialUrl;
  let pagesFetched = 0;

  const visitedUrls = new Set<string>();

  while (
    nextUrl !== null &&
    pagesFetched < maximumPages
  ) {
    const resolvedUrl =
      resolveFlightAwareUrl(nextUrl);

    if (visitedUrls.has(resolvedUrl)) {
      throw new Error(
        "FlightAware pagination returned a repeated URL."
      );
    }

    visitedUrls.add(resolvedUrl);

    const response =
    await fetchSchedulePage(
    resolvedUrl,
    apiKey
    );

    const pageSchedules =
      extractSchedules(response);

    pagesFetched += 1;
    schedules.push(...pageSchedules);

    console.log(
  `[${airlineIata}] Page ${pagesFetched}: ` +
    `${pageSchedules.length} schedules`
);

    nextUrl = response.links?.next ?? null;
  }

  if (nextUrl !== null) {
    console.warn(
  `[${airlineIata}] Pagination stopped after ` +
    `${maximumPages} pages. ` +
    "Increase FLIGHTAWARE_MAX_PAGES to fetch more."
);
  }

  return {
    schedules,
    pagesFetched,
  };
}

async function populateAirline(
  airline: PopulationAirline,
  startDate: string,
  endDate: string,
  maximumPages: number,
  apiKey: string
): Promise<AirlinePopulationResult> {
  console.log("");
  console.log(
    `Populating ${airline.name} ` +
      `(${airline.iata}/${airline.icao})...`
  );

  const params = new URLSearchParams({
    airline: airline.iata,
    include_codeshares: "false",
    include_regional: "true",
    max_pages: "1",
  });

  const initialUrl =
    `${FLIGHTAWARE_API_BASE}/schedules/` +
    `${startDate}/${endDate}?${params.toString()}`;

  const fetchResult = await fetchAllSchedules(
  initialUrl,
  maximumPages,
  airline.iata,
  apiKey
  );

  const normalizedSeeds = fetchResult.schedules
    .map((schedule) => toSeed(schedule, airline))
    .filter(
      (seed): seed is FlightNumberSeed =>
        seed !== null
    );

  const fetchedSeeds =
    deduplicateFetchedSeeds(normalizedSeeds);

  return {
    airline,
    schedules: fetchResult.schedules,
    normalizedSeeds,
    fetchedSeeds,
    pagesFetched: fetchResult.pagesFetched,
    rejectedSchedules:
      fetchResult.schedules.length -
      normalizedSeeds.length,
    duplicateFetchedSeeds:
      normalizedSeeds.length -
      fetchedSeeds.length,
  };
}

async function runPopulation(
  startedAt: Date
): Promise<void> {
const apiKey = getFlightAwareApiKey();

  const populationSelection =
    resolvePopulationSelection();

  const populationAirlines =
    populationSelection.airlines;

  console.log("Population Engine starting...");
  console.log("Started at:", startedAt.toISOString());

  const { startDate, endDate } =
    getPopulationDateRange();

  const maximumPages = getMaximumPages();

console.log(
  "Profile:",
  populationSelection.profile ?? "custom"
);

  console.log(
    "Airlines:",
    populationAirlines
      .map(
        (airline) =>
          `${airline.name} (${airline.iata}/${airline.icao})`
      )
      .join(", ")
  );

  console.log(
    "Airline count:",
    populationAirlines.length
  );

  console.log("Start date:", startDate);
  console.log("End date:", endDate);
  console.log("Maximum pages per airline:", maximumPages);

  console.log(
    "Existing seeds:",
    existingFlightNumberSeeds.length
  );

  const populationResults: AirlinePopulationResult[] =
    [];

  for (const airline of populationAirlines) {
   const result = await populateAirline(
  airline,
  startDate,
  endDate,
  maximumPages,
  apiKey
  );

    populationResults.push(result);
  }

  const allFetchedSeeds =
    deduplicateFetchedSeeds(
      populationResults.flatMap(
        (result) => result.fetchedSeeds
      )
    );

  const mergeResult = mergeFlightNumberSeeds(
    existingFlightNumberSeeds,
    allFetchedSeeds
  );

  console.log("");
  console.log("Population summary:");

  for (const result of populationResults) {
    console.log("");
    console.log(
      `${result.airline.name} (${result.airline.iata})`
    );

    console.log(
      "  Pages fetched:",
      result.pagesFetched
    );

    console.log(
      "  Schedules returned:",
      result.schedules.length
    );

    console.log(
      "  Valid normalized seeds:",
      result.normalizedSeeds.length
    );

    console.log(
      "  Rejected schedules:",
      result.rejectedSchedules
    );

    console.log(
      "  Duplicate fetched seeds:",
      result.duplicateFetchedSeeds
    );

    console.log(
      "  Unique fetched seeds:",
      result.fetchedSeeds.length
    );
  }

  const totalSchedules = populationResults.reduce(
    (total, result) =>
      total + result.schedules.length,
    0
  );

  const totalNormalizedSeeds =
    populationResults.reduce(
      (total, result) =>
        total + result.normalizedSeeds.length,
      0
    );

  const totalRejectedSchedules =
    populationResults.reduce(
      (total, result) =>
        total + result.rejectedSchedules,
      0
    );

  const totalDuplicateFetchedSeeds =
    populationResults.reduce(
      (total, result) =>
        total + result.duplicateFetchedSeeds,
      0
    );

  console.log("");
  console.log("Combined totals:");
  console.log("Schedules returned:", totalSchedules);

  console.log(
    "Valid normalized seeds:",
    totalNormalizedSeeds
  );

  console.log(
    "Rejected schedules:",
    totalRejectedSchedules
  );

  console.log(
    "Duplicate fetched seeds:",
    totalDuplicateFetchedSeeds
  );

  console.log(
    "Unique fetched seeds:",
    allFetchedSeeds.length
  );

  console.log("Seeds added:", mergeResult.added);
  console.log("Seeds updated:", mergeResult.updated);
  console.log("Seeds unchanged:", mergeResult.unchanged);

  console.log(
    "Total seeds after merge:",
    mergeResult.seeds.length
  );

  const existingOutput = serializeSeeds(
  sortSeeds(existingFlightNumberSeeds)
);

const nextOutput = serializeSeeds(
  mergeResult.seeds
);

const seedsFileWritten =
  existingOutput !== nextOutput;

if (seedsFileWritten) {
  await fs.mkdir(
    path.dirname(FLIGHT_NUMBER_SEEDS_PATH),
    {
      recursive: true,
    }
  );

  await fs.writeFile(
    FLIGHT_NUMBER_SEEDS_PATH,
    nextOutput,
    "utf8"
  );

  console.log(
    "Written:",
    FLIGHT_NUMBER_SEEDS_PATH
  );
} else {
  console.log(
    "No seed changes detected. File not rewritten."
  );
}

const completedAt = new Date();

const populationReport = createPopulationReport(
  startedAt,
  completedAt,
  populationSelection,
  startDate,
  endDate,
  maximumPages,
  populationResults,
  totalSchedules,
  totalNormalizedSeeds,
  totalRejectedSchedules,
  totalDuplicateFetchedSeeds,
  allFetchedSeeds,
  mergeResult,
  seedsFileWritten
);

await writePopulationReport(populationReport);

console.log(
  "Population report written:",
  POPULATION_REPORT_PATH
);

console.log(
  "Completed at:",
  completedAt.toISOString()
);

console.log(
  "Duration:",
  `${populationReport.durationMs} ms`
);
}

async function main(): Promise<void> {
  const startedAt = new Date();

  try {
    await runPopulation(startedAt);
  } catch (error: unknown) {
    const completedAt = new Date();

    const failureReport =
      createPopulationFailureReport(
        startedAt,
        completedAt,
        error
      );

    console.error("Population Engine failed:");
    console.error(failureReport.error.message);

    try {
      await writePopulationReport(failureReport);

      console.error(
        "Failure report written:",
        POPULATION_REPORT_PATH
      );
    } catch (reportError: unknown) {
      console.error(
        "Unable to write failure report:"
      );

      if (reportError instanceof Error) {
        console.error(reportError.message);
      } else {
        console.error(reportError);
      }
    }

    process.exitCode = 1;
  }
}

void main();