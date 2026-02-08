export type FlightVerifyInput = {
  flightNumber: string; // ex "SK123"
  date: string;         // YYYY-MM-DD
  from: string;         // IATA
  to: string;           // IATA
};

export type FlightVerifyResult = {
  matched: boolean;
  arrivalDelayMinutes: number | null;
  cancelled: boolean | null;
  confidence: 'high' | 'medium' | 'low';
  source: 'mock' | 'provider';
};
