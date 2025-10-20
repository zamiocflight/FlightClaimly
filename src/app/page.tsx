'use client';

import { useState } from 'react';

type Form = {
  flightNumber: string; date: string; from: string; to: string;
  name: string; email: string; bookingNumber: string;
};

export default function Home() {
  const [form, setForm] = useState<Form>({
    flightNumber: '', date: '', from: '', to: '',
    name: '', email: '', bookingNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function set<K extends keyof Form>(k: K, v: string) { setForm(f => ({ ...f, [k]: v })); }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr(null);
    try {
      const res = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json(); // { ok, claim }
      const id = data?.claim?.receivedAt;
      if (id) localStorage.setItem('lastClaimId', id);
      window.location.href = '/thanks';
    } catch {
      setErr('Kunde inte skicka, försök igen.');
    } finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">FlightClaimly – Pre-check</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block space-y-1">
            <span className="text-sm opacity-80">Flight number</span>
            <input className="w-full border rounded px-3 py-2 bg-white text-gray-900"
              placeholder="e.g. LH123"
              value={form.flightNumber}
              onChange={(e)=>set('flightNumber', e.target.value.trim().toUpperCase())}
              required />
          </label>

          <label className="block space-y-1">
            <span className="text-sm opacity-80">Date</span>
            <input type="date" className="w-full border rounded px-3 py-2 bg-white text-gray-900"
              value={form.date} onChange={(e)=>set('date', e.target.value)} required />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1">
              <span className="text-sm opacity-80">From</span>
              <input className="w-full border rounded px-3 py-2 bg-white text-gray-900"
                placeholder="CPH" value={form.from}
                onChange={(e)=>set('from', e.target.value.trim().toUpperCase())} required />
            </label>
            <label className="block space-y-1">
              <span className="text-sm opacity-80">To</span>
              <input className="w-full border rounded px-3 py-2 bg-white text-gray-900"
                placeholder="AMS" value={form.to}
                onChange={(e)=>set('to', e.target.value.trim().toUpperCase())} required />
            </label>
          </div>

          <label className="block space-y-1">
            <span className="text-sm opacity-80">Full name</span>
            <input className="w-full border rounded px-3 py-2 bg-white text-gray-900"
              value={form.name} onChange={(e)=>set('name', e.target.value)} required />
          </label>

          <label className="block space-y-1">
            <span className="text-sm opacity-80">Email</span>
            <input type="email" className="w-full border rounded px-3 py-2 bg-white text-gray-900"
              value={form.email} onChange={(e)=>set('email', e.target.value)} required />
          </label>

          <label className="block space-y-1">
            <span className="text-sm opacity-80">Booking reference</span>
            <input className="w-full border rounded px-3 py-2 bg-white text-gray-900"
              placeholder="ABC123" value={form.bookingNumber}
              onChange={(e)=>set('bookingNumber', e.target.value.trim().toUpperCase())} required />
          </label>

          {err && <p className="text-red-400 text-sm">{err}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-2 rounded">
            {loading ? 'Skickar…' : 'Check eligibility'}
          </button>
        </form>

        <div className="text-sm opacity-70 mt-4">
          Genom att skicka godkänner du våra villkor.
        </div>
      </div>
    </main>
  );
}
