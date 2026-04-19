// src/app/[locale]/payout/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

function formatIBAN(value: string) {
  return value
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .match(/.{1,4}/g)
    ?.join(' ') || '';
}


type PayoutStatusResponse = {
  ok: boolean;
  hasSubmitted: boolean;
  payout: {
    accountHolder?: string | null;
    ibanLast4?: string | null;
    submittedAt?: string | null;
  } | null;
};

export default function PayoutPage() {
const params = useParams<{ locale: string; id: string }>();
const { locale, id } = params;

const sp = useSearchParams();
const token = sp.get('t') || '';

  const [accountHolder, setAccountHolder] = useState('');
  const [iban, setIban] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔒 Status fetch: om redan inskickat → lås formuläret och visa tack-vy även efter refresh
const [statusLoading, setStatusLoading] = useState(true);
const [hasSubmitted, setHasSubmitted] = useState(false);
const [submittedInfo, setSubmittedInfo] = useState<{
  accountHolder?: string | null;
  ibanLast4?: string | null;
  submittedAt?: string | null;
} | null>(null);

const [compensation, setCompensation] = useState<number | null>(null);

useEffect(() => {
  let alive = true;

  async function loadStatus() {
    try {
      setStatusLoading(true);

      // 🔒 Token måste finnas – annars ska vi inte ens försöka hämta status
      if (!token) {
        if (alive) {
          setError('Ogiltig länk. Be oss skicka en ny.');
          setHasSubmitted(false);
          setSubmittedInfo(null);
        }
        return;
      }

      const res = await fetch(
        `/api/payout/status?id=${encodeURIComponent(id)}&t=${encodeURIComponent(token)}`,
        { cache: 'no-store' }
      );

      // 🛡️ Skydda mot tom/icke-JSON response
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        if (alive) setError('Ogiltig länk. Be oss skicka en ny.');
        return;
      }

      const data = (await res.json()) as Partial<PayoutStatusResponse>;

      if (!alive) return;

   if (res.ok && data?.ok) {
  setHasSubmitted(Boolean((data as any).hasSubmitted));
  setSubmittedInfo(((data as any).payout ?? null) as any);

  // 👇 NY KOD – exakt här inne
  if ((data as any)?.compensationAmount) {
    setCompensation((data as any).compensationAmount);
  }

} else {
  setError((data as any)?.error || 'Ogiltig länk. Be oss skicka en ny.');
}
    } catch (e) {
      if (alive) setError('Ogiltig länk. Be oss skicka en ny.');
    } finally {
      if (alive) setStatusLoading(false);
    }
  }

  if (id) loadStatus();

  return () => {
    alive = false;
  };
}, [id, token]);

async function onSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError(null);

  if (!accountHolder.trim()) return setError('Fyll i kontoinnehavare.');
  if (!iban.trim()) return setError('Fyll i IBAN.');
  if (!confirm) return setError('Bekräfta att uppgifterna stämmer.');

  if (!token) return setError('Ogiltig länk. Be oss skicka en ny.');

  const cleanIban = iban.replace(/\s+/g, '').toUpperCase();

if (cleanIban.length < 15) {
  return setError('Ogiltigt IBAN.');
}

  setLoading(true);
  try {
    const res = await fetch('/api/payout/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        token,
        accountHolder: accountHolder.trim(),
        iban: cleanIban,      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'Något gick fel.');

      // ✅ UI success direkt
      setOk(true);

      // ✅ Proffsigt: refresh-state (ladda status igen så tack-vyn blir “låsbar” även utan reload)
      setHasSubmitted(true);
      setSubmittedInfo({
        accountHolder: accountHolder.trim(),
        ibanLast4: iban.replace(/\s+/g, '').toUpperCase().slice(-4),
        submittedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      setError(err?.message || 'Något gick fel.');
    } finally {
      setLoading(false);
    }
  }

  if (statusLoading) {
    return (
      <main className="mx-auto max-w-xl px-4 py-12">
        <p className="text-slate-700">Laddar…</p>
      </main>
    );
  }

  // ✅ Om redan inskickat → visa tack-vy (låst)
  if (hasSubmitted) {
    
    return (
      <main className="mx-auto max-w-xl px-4 py-12">
        <h1 className="text-2xl font-bold text-slate-900">Tack!</h1>
        <p className="mt-3 text-slate-700">
          Vi har mottagit dina kontouppgifter. Du behöver inte göra något mer just nu.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-sm text-slate-700">
            <div>
              <span className="font-semibold">Kontoinnehavare:</span>{' '}
              {submittedInfo?.accountHolder ?? '—'}
            </div>
            <div className="mt-2">
              <span className="font-semibold">IBAN:</span> ****
              {submittedInfo?.ibanLast4 ?? '—'}
            </div>
            <div className="mt-2">
              <span className="font-semibold">Mottaget:</span>{' '}
              {submittedInfo?.submittedAt ?? '—'}
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-slate-500">Ärende-ID: {id}</p>

        {/* valfri CTA */}
        <a
          className="mt-6 inline-block text-sm font-semibold text-slate-900 underline"
          href={`/${locale}/track/${encodeURIComponent(id)}`}
        >
          Tillbaka till ärendet
        </a>

        {/* behåll för tydlighet under utveckling */}
        {ok && (
          <p className="mt-4 text-xs text-slate-500">
            (OK) Uppgifterna sparades nyss.
          </p>
        )}
      </main>
    );
  }

const gross = compensation ?? 400;
const fee = Math.round(gross * 0.2);
const net = gross - fee;

 return (
  <main className="mx-auto max-w-xl px-4 py-12">

    {/* CARD */}
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* HEADER */}
      <div className="mb-6">
        <div className="text-xs font-semibold text-slate-500 tracking-wide">
          🔒 Säker utbetalning
        </div>

        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Lämna kontouppgifter
        </h1>

        <p className="mt-3 text-slate-600 text-sm leading-relaxed">
          För att betala ut din ersättningen behöver vi dina kontouppgifter (IBAN).
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">

       <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
  <div className="text-xs font-medium text-emerald-700">
    Din ersättning
  </div>

  <div className="mt-1 text-4xl font-bold text-emerald-900 tracking-tight">
    €{gross}
  </div>

  <div className="mt-1 text-sm text-emerald-800">
    Avgift (20%): <span className="font-semibold">-€{fee}</span>
  </div>

  <div className="mt-2 text-base font-semibold text-emerald-900">
    Du får utbetalt: <span className="font-semibold">€{net}</span>
  </div>

  <div className="text-xs text-emerald-700 mt-1">
    Utbetalas när ärendet är slutfört.
  </div>
</div>



        {/* NAME */}
        <div>
          <label className="block text-sm font-medium text-slate-800">
            Kontoinnehavare
          </label>

          <input
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm 
            focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition"
            placeholder="För- och efternamn"
            autoComplete="name"
          />
        </div>

        {/* IBAN */}
        <div>
          <label className="block text-sm font-medium text-slate-800">
            IBAN
          </label>

          <input
            value={iban}
            onChange={(e) => setIban(formatIBAN(e.target.value))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-base font-mono tracking-wider focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition"
            placeholder="SE12 3456 7890 1234 5678 90"
            autoComplete="off"
            inputMode="numeric"
            maxLength={34}
          />

          <p className="mt-2 text-xs text-slate-500">
            Vi sparar dina uppgifter för att kunna genomföra utbetalningen.
          </p>
        </div>

        {/* CHECKBOX */}
        <label className="flex items-start gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={confirm}
            onChange={(e) => setConfirm(e.target.checked)}
            className="mt-1"
          />
          <span>
            Jag bekräftar att kontot tillhör mig (eller en av passagerarna) och att
            uppgifterna är korrekta.
          </span>
        </label>

        {/* ERROR */}
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        )}

        {/* CTA */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.99] transition"
        >
          {loading ? 'Sparar…' : 'Spara kontouppgifter'}
        </button>

        {/* META */}
        <div className="pt-2 text-xs text-slate-500">
          Ärende-ID: {id}
        </div>
      </form>
    </div>
  </main>
);
}
