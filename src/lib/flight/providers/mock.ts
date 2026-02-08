import { FlightVerifyInput, FlightVerifyResult } from '../types';

// Mock-logik för utveckling & UI-test
// Styrs av flightNumber för förutsägbara resultat
export async function verifyFlightMock(
  input: FlightVerifyInput
): Promise<FlightVerifyResult> {
  const code = input.flightNumber.toUpperCase();

  // TEST210 → delayed > 3h (high)
  if (code.includes('210')) {
    return {
      matched: true,
      arrivalDelayMinutes: 210,
      cancelled: false,
      confidence: 'high',
      source: 'mock',
    };
  }

  // TEST180 → exakt 3h (high)
  if (code.includes('180')) {
    return {
      matched: true,
      arrivalDelayMinutes: 180,
      cancelled: false,
      confidence: 'high',
      source: 'mock',
    };
  }

  // TEST090 → <3h (high)
  if (code.includes('090')) {
    return {
      matched: true,
      arrivalDelayMinutes: 90,
      cancelled: false,
      confidence: 'high',
      source: 'mock',
    };
  }

  // TESTLOW → oklar data
  if (code.includes('LOW')) {
    return {
      matched: true,
      arrivalDelayMinutes: null,
      cancelled: null,
      confidence: 'low',
      source: 'mock',
    };
  }

  // TESTNOM → ingen match
  if (code.includes('NOM')) {
    return {
      matched: false,
      arrivalDelayMinutes: null,
      cancelled: null,
      confidence: 'low',
      source: 'mock',
    };
  }

  // Default: oklar
  return {
    matched: true,
    arrivalDelayMinutes: null,
    cancelled: null,
    confidence: 'medium',
    source: 'mock',
  };
}
