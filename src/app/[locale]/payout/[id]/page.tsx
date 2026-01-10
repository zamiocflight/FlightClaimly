// src/app/[locale]/payout/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';


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

  setLoading(true);
  try {
    const res = await fetch('/api/payout/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        token,
        accountHolder: accountHolder.trim(),
        iban: iban.trim(),
      }),
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

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">Lämna kontouppgifter</h1>
      <p className="mt-3 text-slate-700">
        För att kunna betala ut ersättningen behöver vi dina kontouppgifter (IBAN).
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-800">
            Kontoinnehavare
          </label>
          <input
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
            placeholder="För- och efternamn"
            autoComplete="name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-800">IBAN</label>
          <input
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
            placeholder="SE12 3456 7890 1234 5678 90"
            autoComplete="off"
          />
          <p className="mt-1 text-xs text-slate-500">
            Vi sparar dina uppgifter för att kunna genomföra utbetalningen.
          </p>
        </div>

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

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? 'Sparar…' : 'Spara kontouppgifter'}
        </button>

        <p className="text-xs text-slate-500">Ärende-ID: {id}</p>
      </form>
    </main>
  );
}
