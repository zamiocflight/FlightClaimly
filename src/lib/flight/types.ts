export type FlightVerifyInput = {
  flightNumber: string;
  date: string;
  from: string;
  to: string;
};

export type FlightVerifyResult = {
  matched: boolean;
  arrivalDelayMinutes: number | null;
  cancelled: boolean | null;
  confidence: "high" | "medium" | "low";
  source: "mock" | "provider";

  scheduledDeparture?: string | null;
  actualDeparture?: string | null;
  scheduledArrival?: string | null;
  actualArrival?: string | null;
  distanceKm?: number | null;
};