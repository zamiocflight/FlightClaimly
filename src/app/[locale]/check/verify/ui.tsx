'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

type VerifyResult = {
  matched: boolean;
  arrivalDelayMinutes: number | null;
  cancelled: boolean | null;
  confidence: 'high' | 'medium' | 'low';
  source: 'mock' | 'provider';
};

  export function VerifyClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const from = searchParams.get('from')!;
  const to = searchParams.get('to')!;
  const date = searchParams.get('date')!;
  const flightNumber = searchParams.get('flightNumber')!;

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [confirm, setConfirm] = useState<'yes' | 'no' | null>(null);

  useEffect(() => {
    async function run() {
      setLoading(true);

      const res = await fetch('/api/flight/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to,
          date,
          flightNumber,
        }),
      });

      const json = await res.json();
      setResult(json);
      setLoading(false);
    }

    run();
  }, [from, to, date, flightNumber]);

  if (loading) {
    return (
      <div className="p-8 text-white">
        Checking flight status…
      </div>
    );
  }

  if (!result || !result.matched) {
    return (
      <div className="p-8 text-white">
        ❌ We couldn’t verify this flight.  
        Please go back and check your details.
      </div>
    );
  }

  const delay = result.arrivalDelayMinutes ?? 0;
  const eligible = result.cancelled || delay >= 180;

  return (
    <div className="mx-auto max-w-3xl p-8 text-white">
      <h1 className="mb-6 text-2xl font-semibold">
        We found your flight
      </h1>

      {/* SUMMARY CARD */}
      <div className="mb-6 rounded-lg border border-white/15 bg-white/5 p-6">
        <div className="flex justify-between text-sm text-white/70">
          <span>{from} → {to}</span>
          <span>{date}</span>
        </div>

        <div className="mt-3 text-lg font-semibold">
          Flight {flightNumber}
        </div>

        {result.cancelled ? (
          <div className="mt-3 text-red-400">
            ❌ Flight was cancelled
          </div>
        ) : (
          <div className="mt-3">
            Total delay:{' '}
            <span
              className={
                delay >= 180 ? 'text-emerald-400' : 'text-yellow-400'
              }
            >
              {delay} minutes
            </span>
          </div>
        )}
      </div>

      {/* ELIGIBILITY MESSAGE */}
      {!eligible && (
        <div className="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm">
          Under EU261, compensation applies only for delays of{' '}
          <strong>3 hours or more</strong>.
        </div>
      )}

      {eligible && (
        <div className="mb-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm">
          ✅ This flight appears eligible for compensation.
        </div>
      )}

      {/* CONFIRM */}
      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">
          Are these details correct?
        </h2>

        <div className="space-y-3">
          <button
            onClick={() => setConfirm('yes')}
            className={`w-full rounded-lg border px-4 py-3 text-left ${
              confirm === 'yes'
                ? 'border-emerald-400 bg-emerald-400/10'
                : 'border-white/20'
            }`}
          >
            Yes, this is my flight
          </button>

          <button
            onClick={() => setConfirm('no')}
            className={`w-full rounded-lg border px-4 py-3 text-left ${
              confirm === 'no'
                ? 'border-red-400 bg-red-400/10'
                : 'border-white/20'
            }`}
          >
            No, something is wrong
          </button>
        </div>
      </div>

      {/* CONTINUE */}
      <div className="mt-10">
        <button
          disabled={!eligible || confirm !== 'yes'}
          onClick={() => router.push('/claim')}
          className="rounded bg-emerald-500 px-6 py-3 font-semibold text-black disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
