'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ClientClaim() {
  const searchParams = useSearchParams();

  // ---- Data from page 2 ----
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  const flightNumber = searchParams.get('flightNumber') || '';
  const issueType = searchParams.get('issueType') || '';

  // ---- Claim form state ----
  const [passengers, setPassengers] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [accepted, setAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    passengers > 0 &&
    name.trim() &&
    email.includes('@') &&
    accepted &&
    from &&
    to &&
    date &&
    issueType;

  async function submitClaim() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
  from,
  to,
  date,
  flightNumber,
  issueType,
  name,
  email,
  phone,
  bookingNumber: bookingRef, // ✅ VIKTIGT: backend förväntar bookingNumber
}),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to submit claim');
      }

      const data = await res.json();
      const id = data?.id || data?.claim?.id;

      if (!id) throw new Error('No claim id returned');

      window.location.href = `/thanks?id=${id}`;
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl p-6 text-white">
      <h1 className="mb-6 text-xl font-semibold">
        Almost done
      </h1>

      {/* SUMMARY */}
      <div className="mb-6 rounded-lg border border-white/20 p-4 text-sm">
        <div>{from} → {to}</div>
        <div>{date}</div>
        {flightNumber && <div>{flightNumber}</div>}
        <div className="capitalize">{issueType}</div>
      </div>

      <div className="space-y-4">
        {/* PASSENGERS */}
        <div>
          <label className="mb-1 block text-sm">
            Number of passengers
          </label>
          <input
            type="number"
            min={1}
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="w-full rounded border border-white/30 bg-black px-3 py-2"
          />
        </div>

        {/* NAME */}
        <div>
          <label className="mb-1 block text-sm">
            Full name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border border-white/30 bg-black px-3 py-2"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="mb-1 block text-sm">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-white/30 bg-black px-3 py-2"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="mb-1 block text-sm">
            Phone number (optional)
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded border border-white/30 bg-black px-3 py-2"
          />
        </div>

        {/* BOOKING REF */}
        <div>
          <label className="mb-1 block text-sm">
            Booking reference (optional)
          </label>
          <input
            value={bookingRef}
            onChange={(e) => setBookingRef(e.target.value)}
            className="w-full rounded border border-white/30 bg-black px-3 py-2"
          />
        </div>

        {/* CONSENT */}
        <label className="flex items-start gap-2 text-sm text-white/80">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1"
          />
          <span>
            I authorize FlightClaimly to handle my claim and accept the terms.
          </span>
        </label>

        {error && (
          <div className="text-sm text-red-400">
            {error}
          </div>
        )}

        <button
          disabled={!canSubmit || loading}
          onClick={submitClaim}
          className="mt-6 w-full rounded bg-emerald-500 px-6 py-3 font-semibold text-black disabled:opacity-40"
        >
          {loading ? 'Submitting…' : 'Submit claim'}
        </button>
      </div>
    </div>
  );
}
