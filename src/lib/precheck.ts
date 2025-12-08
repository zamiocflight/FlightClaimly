// src/lib/precheck.ts
export type PrecheckResult = {
  eligible: boolean;
  reason: string;
  amount?: string; // e.g. "€250", "€400"
};

/**
 * Superenkel stub: bedömning baserad på flygavstånd (grovt) och datum.
 * Byts ut mot FlightAware/OAG senare.
 */
export function precheckStub(params: {
  from: string; to: string; date?: string; flightNumber?: string;
}): PrecheckResult {
  const { from, to, date } = params;

  // (1) Datumkontroll – inte framtiden
  if (date && new Date(date) > new Date()) {
    return { eligible: false, reason: 'Flyget ligger i framtiden. Välj ett historiskt datum.' };
  }

  // (2) Grov avståndsbedömning (IATA-längd ~ proxy)
  const distGuess =
    Math.abs((from || '').charCodeAt(0) - (to || '').charCodeAt(0)) * 250 + 200; // helt godtyckligt

  let amount: string | undefined;
  if (distGuess < 1500) amount = '€250';
  else if (distGuess < 3500) amount = '€400';
  else amount = '€600';

  return {
    eligible: true,
    reason: 'Indikation baserad på preliminära regler (EU261) och grovt avstånd.',
    amount,
  };
}
