'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type FlightSuggestion = {
  id: string;
  flightNumber: string;
  airlineName: string;
  airlineCode: string;
  depTime: string; // "15:25"
  arrTime: string; // "11:15"
};

type VerifyResult = {
  matched: boolean;
  arrivalDelayMinutes: number | null;
  cancelled: boolean | null;
  confidence: 'high' | 'medium' | 'low';
  source: 'mock' | 'provider';
};

type Verdict = 'eligible' | 'not_eligible' | 'uncertain';

function localeFromPathname(pathname: string): string {
  // pathname like "/sv/check" or "/en/check?..." (query not included)
  const seg = pathname.split('/').filter(Boolean)[0];
  return seg || 'en';
}

function formatDelay(m: number | null): string {
  if (m === null) return '—';
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h} h ${r} min` : `${h} h`;
}

function verdictFromVerify(v: VerifyResult | null): { verdict: Verdict; reason: string } {
  if (!v) return { verdict: 'uncertain', reason: 'We could not verify the disruption yet.' };

  if (v.cancelled === true) {
    return { verdict: 'eligible', reason: 'This looks like a cancellation — you may be eligible under EU261/UK261.' };
  }

  if (typeof v.arrivalDelayMinutes === 'number') {
    if (v.arrivalDelayMinutes >= 180) {
      return { verdict: 'eligible', reason: 'Delay appears 3h+ on arrival — this is typically eligible under EU261.' };
    }
    return {
      verdict: 'not_eligible',
      reason: 'EU261 compensation usually requires 3h+ arrival delay (or cancellation/denied boarding).',
    };
  }

  return { verdict: 'uncertain', reason: 'We could not determine the arrival delay.' };
}

export default function ClientCheck() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const locale = useMemo(() => localeFromPathname(pathname), [pathname]);

  // These come from step 1 (homepage): from/to are IATA or whatever you pass
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';

  // ---------- Wizard core ----------
  const [flightType, setFlightType] = useState<'direct' | 'connecting' | null>(null);
  const [date, setDate] = useState<string>('');

  // Airline (simple MVP typeahead later)
  const [airlineQuery, setAirlineQuery] = useState('');
  const [airlineName, setAirlineName] = useState<string | null>(null);
  const [airlineCode, setAirlineCode] = useState<string | null>(null);

  // Flight selection
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const [showManual, setShowManual] = useState(false);
  const [manualFlightNumber, setManualFlightNumber] = useState('');
  const [manualBookingRef, setManualBookingRef] = useState(''); // keep for later (phase 3)
  const [confirmedFlightNumber, setConfirmedFlightNumber] = useState<string | null>(null);

  // Verify
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [verifyResult, setVerifyResult] = useState<VerifyResult | null>(null);

  // “Is this correct?”
  const [detailsCorrect, setDetailsCorrect] = useState<'yes' | 'no' | null>(null);

  // Verdict
  const [{ verdict, reason: verdictReason }, setVerdict] = useState<{ verdict: Verdict; reason: string }>({
    verdict: 'uncertain',
    reason: '—',
  });

  // Special “B” flow: check original flight
  const [flowMode, setFlowMode] = useState<'current' | 'original'>('current');
  const [showOriginalPrompt, setShowOriginalPrompt] = useState(false);

  // ---------- Mock data (replace later with provider / FlightAware) ----------
  const airlineOptions = useMemo(() => {
    // MVP: a few common airlines. Replace with real typeahead list later.
    const list = [
      { airlineName: 'SAS', airlineCode: 'SK' },
      { airlineName: 'Norwegian', airlineCode: 'DY' },
      { airlineName: 'Ryanair', airlineCode: 'FR' },
      { airlineName: 'Wizz Air', airlineCode: 'W6' },
      { airlineName: 'Lufthansa', airlineCode: 'LH' },
      { airlineName: 'KLM', airlineCode: 'KL' },
      { airlineName: 'Air France', airlineCode: 'AF' },
    ];

    const q = airlineQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (a) => a.airlineName.toLowerCase().includes(q) || a.airlineCode.toLowerCase().includes(q)
    );
  }, [airlineQuery]);

  const suggestions: FlightSuggestion[] = useMemo(() => {
    if (!date || !from || !to || !airlineCode || !airlineName) return [];

    // MVP mock flights: 3 options
    const base = airlineCode.toUpperCase();
    return [
      { id: '1', flightNumber: `${base}23`, airlineName, airlineCode: base, depTime: '15:25', arrTime: '11:15' },
      { id: '2', flightNumber: `${base}25`, airlineName, airlineCode: base, depTime: '18:20', arrTime: '14:10' },
      { id: '3', flightNumber: `${base}27`, airlineName, airlineCode: base, depTime: '21:05', arrTime: '16:50' },
    ];
  }, [date, from, to, airlineCode, airlineName]);

  // When user selects a flight from list → set confirmedFlightNumber
  useEffect(() => {
    if (selectedFlightId === null) return;
    const f = suggestions.find((s) => s.id === selectedFlightId);
    if (!f) return;
    setConfirmedFlightNumber(f.flightNumber);
    setShowManual(false);
    setManualFlightNumber('');
    setVerifyResult(null);
    setDetailsCorrect(null);
    setShowOriginalPrompt(false);
  }, [selectedFlightId, suggestions]);

  // When manual flight typed → update confirmedFlightNumber
  useEffect(() => {
    const v = manualFlightNumber.trim();
    if (!showManual) return;
    setConfirmedFlightNumber(v.length ? v : null);
    setSelectedFlightId(null);
    setVerifyResult(null);
    setDetailsCorrect(null);
    setShowOriginalPrompt(false);
  }, [manualFlightNumber, showManual]);

  // Reset airline/flight when date changes
  function onDateChange(v: string) {
    setDate(v);
    setSelectedFlightId(null);
    setShowManual(false);
    setManualFlightNumber('');
    setConfirmedFlightNumber(null);
    setVerifyResult(null);
    setDetailsCorrect(null);
    setVerifyError(null);
    setShowOriginalPrompt(false);
  }

  // Reset flight when airline changes
  function selectAirline(a: { airlineName: string; airlineCode: string }) {
    setAirlineName(a.airlineName);
    setAirlineCode(a.airlineCode);
    setAirlineQuery(`${a.airlineName} (${a.airlineCode})`);
    setSelectedFlightId(null);
    setShowManual(false);
    setManualFlightNumber('');
    setConfirmedFlightNumber(null);
    setVerifyResult(null);
    setDetailsCorrect(null);
    setVerifyError(null);
    setShowOriginalPrompt(false);
  }

  async function runVerify() {
    if (!from || !to || !date || !confirmedFlightNumber) return;

    setVerifyLoading(true);
    setVerifyError(null);

    try {
      const res = await fetch('/api/flight/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to,
          date,
          flightNumber: confirmedFlightNumber,
        }),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || 'verify failed');
      }

      const data = (await res.json()) as VerifyResult;
      setVerifyResult(data);

      const v = verdictFromVerify(data);
      setVerdict(v);
    } catch (e: any) {
      setVerifyError(e?.message || 'Could not verify this flight');
      setVerifyResult(null);
      setVerdict({ verdict: 'uncertain', reason: 'Verification failed.' });
    } finally {
      setVerifyLoading(false);
    }
  }

  // Auto-run verify when we have the required fields and a flight number picked
  useEffect(() => {
    if (!from || !to || !date || !confirmedFlightNumber) return;
    // Only run once per selection (avoid loops)
    // We run if verifyResult is null and not currently loading
    if (verifyResult !== null) return;
    if (verifyLoading) return;
    runVerify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, date, confirmedFlightNumber]);

  // Controls which blocks show
  const canShowDate = !!flightType;
  const canShowAirline = !!flightType && !!date;
  const canShowFlights = !!flightType && !!date && !!airlineCode;
  const hasFlight = !!confirmedFlightNumber;
  const canShowVerifyCard = canShowFlights && hasFlight;
  const canShowCorrectQuestion = !!verifyResult;
  const canShowVerdict = detailsCorrect === 'yes' && !!verifyResult;

  function resetAll() {
    setFlowMode('current');
    setShowOriginalPrompt(false);
    setFlightType(null);
    setDate('');
    setAirlineQuery('');
    setAirlineName(null);
    setAirlineCode(null);
    setSelectedFlightId(null);
    setShowManual(false);
    setManualFlightNumber('');
    setManualBookingRef('');
    setConfirmedFlightNumber(null);
    setVerifyResult(null);
    setVerifyError(null);
    setDetailsCorrect(null);
    setVerdict({ verdict: 'uncertain', reason: '—' });
  }

  function startOriginalFlightFlow() {
    // Keep route (from/to). Ask for original flight details: date + airline + flight
    setFlowMode('original');
    setShowOriginalPrompt(false);

    // Reset only what matters
    setDate('');
    setAirlineQuery('');
    setAirlineName(null);
    setAirlineCode(null);
    setSelectedFlightId(null);
    setShowManual(false);
    setManualFlightNumber('');
    setConfirmedFlightNumber(null);
    setVerifyResult(null);
    setVerifyError(null);
    setDetailsCorrect(null);
    setVerdict({ verdict: 'uncertain', reason: '—' });

    // Keep flightType because original trip is still direct/connecting typically
    // If you prefer resetting flightType too, uncomment:
    // setFlightType(null);
  }

  // Phase 3 (later): proceed to claim/additional info
  function proceed() {
    // In Phase 2 we typically stop here.
    // But if you want to continue to next step later, this is where you’d route.
    const params = new URLSearchParams({
      from,
      to,
      date,
      flightNumber: confirmedFlightNumber || '',
      // we can carry airline info too
      airline: airlineName || '',
      airlineCode: airlineCode || '',
      flightType: flightType || '',
      flowMode,
      bookingRef: manualBookingRef || '',
    });

    // Example: go to claim in future phase
    router.push(`/${locale}/claim?${params.toString()}`);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
          {/* LEFT RAIL */}
          <aside className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-5">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-300">
                FAS 2
              </p>
              <h2 className="mt-1 text-lg font-semibold">Eligibility check</h2>
              {from && to && (
                <p className="mt-2 text-sm text-white/70">
                  {from} → {to}
                </p>
              )}
              {flowMode === 'original' && (
                <div className="mt-3 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
                  Checking your <span className="font-semibold">original flight</span> (replacement safety-check).
                </div>
              )}
            </div>

            <ol className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="h-7 w-7 rounded-full bg-emerald-400 text-slate-950 grid place-items-center font-bold">
                  1
                </span>
                <div>
                  <div className="font-semibold">Eligibility check</div>
                  <div className="text-xs text-white/60">Active</div>
                </div>
              </li>

              <li className="flex items-center gap-3 opacity-50">
                <span className="h-7 w-7 rounded-full border border-white/25 grid place-items-center font-bold">
                  2
                </span>
                <div>
                  <div className="font-semibold">Additional information</div>
                  <div className="text-xs text-white/60">Locked (Phase 3)</div>
                </div>
              </li>

              <li className="flex items-center gap-3 opacity-50">
                <span className="h-7 w-7 rounded-full border border-white/25 grid place-items-center font-bold">
                  3
                </span>
                <div>
                  <div className="font-semibold">Documents</div>
                  <div className="text-xs text-white/60">Locked</div>
                </div>
              </li>

              <li className="flex items-center gap-3 opacity-50">
                <span className="h-7 w-7 rounded-full border border-white/25 grid place-items-center font-bold">
                  4
                </span>
                <div>
                  <div className="font-semibold">Finish</div>
                  <div className="text-xs text-white/60">Locked</div>
                </div>
              </li>
            </ol>

            <div className="mt-6 pt-6 border-t border-white/10">
              <button
                onClick={resetAll}
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                Start over
              </button>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
            <h1 className="text-2xl font-bold tracking-tight">Let’s verify your flight</h1>
            <p className="mt-2 text-sm text-white/70">
              Answer a few quick questions — we’ll check if your flight disruption is eligible.
            </p>

            {/* SUBSTEP: DIRECT / CONNECTING */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <h2 className="text-base font-semibold">Was it a direct flight?</h2>
              <p className="mt-1 text-sm text-white/60">
                This helps us interpret your itinerary correctly.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => {
                    setFlightType('direct');
                    setShowOriginalPrompt(false);
                  }}
                  className={`rounded-xl border px-4 py-3 text-left ${
                    flightType === 'direct'
                      ? 'border-emerald-400 bg-emerald-400/10'
                      : 'border-white/15 hover:border-white/30'
                  }`}
                >
                  <div className="font-semibold">Yes, direct</div>
                  <div className="text-xs text-white/60">No layovers</div>
                </button>

                <button
                  onClick={() => {
                    setFlightType('connecting');
                    setShowOriginalPrompt(false);
                  }}
                  className={`rounded-xl border px-4 py-3 text-left ${
                    flightType === 'connecting'
                      ? 'border-emerald-400 bg-emerald-400/10'
                      : 'border-white/15 hover:border-white/30'
                  }`}
                >
                  <div className="font-semibold">No, with layovers</div>
                  <div className="text-xs text-white/60">At least 1 connection</div>
                </button>
              </div>
            </div>

            {/* SUBSTEP: DATE */}
            {canShowDate && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                <h2 className="text-base font-semibold">
                  What was your scheduled departure date?
                </h2>
                <p className="mt-1 text-sm text-white/60">Use the date on your ticket.</p>

                <div className="mt-4">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => onDateChange(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-black px-3 py-2 text-sm"
                  />
                </div>
              </div>
            )}

            {/* SUBSTEP: AIRLINE */}
            {canShowAirline && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                <h2 className="text-base font-semibold">Which airline did you fly with?</h2>
                <p className="mt-1 text-sm text-white/60">Start typing to search.</p>

                <div className="mt-4">
                  <input
                    value={airlineQuery}
                    onChange={(e) => {
                      setAirlineQuery(e.target.value);
                      // if user edits, unselect airline
                      setAirlineName(null);
                      setAirlineCode(null);
                      setSelectedFlightId(null);
                      setConfirmedFlightNumber(null);
                      setVerifyResult(null);
                      setDetailsCorrect(null);
                      setVerifyError(null);
                    }}
                    placeholder="e.g. Air France (AF)"
                    className="w-full rounded-xl border border-white/20 bg-black px-3 py-2 text-sm"
                  />
                </div>

                {/* dropdown */}
                {!airlineName && airlineOptions.length > 0 && airlineQuery.trim().length > 0 && (
                  <div className="mt-3 rounded-xl border border-white/10 bg-slate-950/60 overflow-hidden">
                    {airlineOptions.slice(0, 6).map((a) => (
                      <button
                        key={a.airlineCode}
                        onClick={() => selectAirline(a)}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-white/5"
                      >
                        <span className="font-semibold">{a.airlineName}</span>{' '}
                        <span className="text-white/60">({a.airlineCode})</span>
                      </button>
                    ))}
                  </div>
                )}

                {airlineName && airlineCode && (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs">
                    ✅ Selected: <span className="font-semibold">{airlineName}</span> ({airlineCode})
                  </div>
                )}
              </div>
            )}

            {/* SUBSTEP: FLIGHT LIST */}
            {canShowFlights && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                <h2 className="text-base font-semibold">Select your flight</h2>
                <p className="mt-1 text-sm text-white/60">
                  {from} → {to} on <span className="font-semibold">{date}</span>
                </p>

                <div className="mt-4 space-y-2">
                  {suggestions.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFlightId(f.id)}
                      className={`w-full rounded-xl border px-4 py-3 text-left ${
                        selectedFlightId === f.id
                          ? 'border-emerald-400 bg-emerald-400/10'
                          : 'border-white/15 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">{f.flightNumber}</div>
                        <div className="text-xs text-white/60">
                          {f.depTime} → {f.arrTime}
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-white/60">{f.airlineName}</div>
                    </button>
                  ))}

                  <button
                    onClick={() => setShowManual(true)}
                    className={`w-full rounded-xl border px-4 py-3 text-left ${
                      showManual
                        ? 'border-emerald-400 bg-emerald-400/10'
                        : 'border-white/15 hover:border-white/30'
                    }`}
                  >
                    <div className="font-semibold">I can’t find my flight</div>
                    <div className="text-xs text-white/60">Enter flight number manually</div>
                  </button>
                </div>

                {showManual && (
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                    <label className="block text-sm font-semibold">Flight number</label>
                    <input
                      className="mt-2 w-full rounded-xl border border-white/20 bg-black px-3 py-2 text-sm"
                      placeholder="e.g. AF23"
                      value={manualFlightNumber}
                      onChange={(e) => setManualFlightNumber(e.target.value)}
                    />

                    <label className="mt-4 block text-sm font-semibold">
                      Booking reference (optional — used later)
                    </label>
                    <input
                      className="mt-2 w-full rounded-xl border border-white/20 bg-black px-3 py-2 text-sm"
                      placeholder="e.g. ZY4KQ1"
                      value={manualBookingRef}
                      onChange={(e) => setManualBookingRef(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* SUBSTEP: VERIFY RESULT */}
            {canShowVerifyCard && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold">Detected disruption</h2>
                    <p className="mt-1 text-sm text-white/60">
                      We’re verifying the flight using our data sources.
                    </p>
                  </div>

                  <button
                    onClick={runVerify}
                    disabled={verifyLoading}
                    className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-black disabled:opacity-40"
                  >
                    {verifyLoading ? 'Checking…' : 'Re-check'}
                  </button>
                </div>

                {verifyError && (
                  <div className="mt-3 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-200">
                    {String(verifyError)}
                  </div>
                )}

                {verifyResult ? (
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs">
                        Flight: <span className="font-semibold">{confirmedFlightNumber}</span>
                      </span>
                      <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs">
                        Route: <span className="font-semibold">{from} → {to}</span>
                      </span>
                      <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs">
                        Confidence: <span className="font-semibold">{verifyResult.confidence}</span>
                      </span>

                      {verifyResult.cancelled === true ? (
                        <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-200">
                          CANCELLED
                        </span>
                      ) : (
                        <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-200">
                          Delay: <span className="font-semibold">{formatDelay(verifyResult.arrivalDelayMinutes)}</span>
                        </span>
                      )}
                    </div>

                    <div className="mt-3 text-sm text-white/70">
                      Source: <span className="font-semibold">{verifyResult.source}</span>
                      {verifyResult.matched ? (
                        <span className="ml-2 text-emerald-300">✓ matched</span>
                      ) : (
                        <span className="ml-2 text-amber-300">⚠ not fully matched</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                    {verifyLoading ? 'Loading flight data…' : 'Select a flight to see results.'}
                  </div>
                )}
              </div>
            )}

            {/* SUBSTEP: IS THIS CORRECT */}
            {canShowCorrectQuestion && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                <h2 className="text-base font-semibold">Are these details correct?</h2>

                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => {
                      setDetailsCorrect('yes');
                      setShowOriginalPrompt(false);
                    }}
                    className={`w-full rounded-xl border px-4 py-3 text-left ${
                      detailsCorrect === 'yes'
                        ? 'border-emerald-400 bg-emerald-400/10'
                        : 'border-white/15 hover:border-white/30'
                    }`}
                  >
                    Yes
                  </button>

                  <button
                    onClick={() => {
                      setDetailsCorrect('no');
                      setShowOriginalPrompt(false);
                    }}
                    className={`w-full rounded-xl border px-4 py-3 text-left ${
                      detailsCorrect === 'no'
                        ? 'border-emerald-400 bg-emerald-400/10'
                        : 'border-white/15 hover:border-white/30'
                    }`}
                  >
                    No
                  </button>
                </div>

                {detailsCorrect === 'no' && (
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                    No worries — try selecting a different flight, or use manual entry.
                  </div>
                )}
              </div>
            )}

            {/* SUBSTEP: VERDICT */}
            {canShowVerdict && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                {verdict === 'eligible' && (
                  <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-4">
                    <div className="text-lg font-semibold text-emerald-200">✅ Looks eligible</div>
                    <p className="mt-2 text-sm text-emerald-100/80">{verdictReason}</p>

                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={proceed}
                        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black"
                      >
                        Continue
                      </button>
                      <button
                        onClick={resetAll}
                        className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
                      >
                        Check another flight
                      </button>
                    </div>
                  </div>
                )}

                {verdict === 'uncertain' && (
                  <div className="rounded-xl border border-amber-400/25 bg-amber-400/10 p-4">
                    <div className="text-lg font-semibold text-amber-200">⚠ We’re not fully sure yet</div>
                    <p className="mt-2 text-sm text-amber-100/80">{verdictReason}</p>

                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={proceed}
                        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black"
                      >
                        Continue anyway
                      </button>
                      <button
                        onClick={resetAll}
                        className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
                      >
                        Check another flight
                      </button>
                    </div>
                  </div>
                )}

                {verdict === 'not_eligible' && (
                  <div className="rounded-xl border border-red-400/25 bg-red-400/10 p-4">
                    <div className="text-lg font-semibold text-red-200">
                      Unfortunately, there’s no compensation for this flight
                    </div>
                    <p className="mt-2 text-sm text-red-100/80">
                      {verdictReason}
                    </p>

                    {/* B-flow: replacement/original safety check */}
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm font-semibold">Was this a replacement flight?</div>
                      <p className="mt-1 text-sm text-white/70">
                        If your airline rebooked you due to a disruption, you might be eligible for compensation for your <span className="font-semibold">original flight</span> instead.
                      </p>

                      <div className="mt-3 flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => startOriginalFlightFlow()}
                          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black"
                        >
                          Check original flight
                        </button>

                        <button
                          onClick={() => resetAll()}
                          className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
                        >
                          Check another flight
                        </button>
                      </div>

                      <button
                        onClick={() => setShowOriginalPrompt((v) => !v)}
                        className="mt-3 text-xs text-white/60 underline underline-offset-2"
                      >
                        What counts as a replacement flight?
                      </button>

                      {showOriginalPrompt && (
                        <div className="mt-3 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/70">
                          If the airline moved you to a different flight after a delay/cancellation — that’s a replacement.
                          In that case, compensation may apply to the original disrupted flight, even if the replacement was only slightly delayed.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
