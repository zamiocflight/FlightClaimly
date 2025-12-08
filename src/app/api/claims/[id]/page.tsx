// src/app/track/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type PublicClaim = {
  id: string;
  status: string;
  flightNumber: string;
  from: string;
  to: string;
  date: string | null;
  bookingNumber: string;
  receivedAt: string;
};

export default function TrackPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const token = searchParams.get('t');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claim, setClaim] = useState<PublicClaim | null>(null);

  useEffect(() => {
    if (!token) {
      setError('Ogiltig eller ofullständig länk.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/claims/${params.id}/public?t=${encodeURIComponent(token)}`,
          { cache: 'no-store' }
        );

        if (!res.ok) {
          if (res.status === 404) {
            setError('Ärendet kunde inte hittas. Kontrollera att länken är korrekt.');
          } else if (res.status === 400) {
            setError('Länken saknar nödvändig information.');
          } else {
            setError('Ett fel uppstod när ditt ärende skulle hämtas.');
          }
          setLoading(false);
          return;
        }

        const data = await res.json();
        setClaim(data);
        setLoading(false);
      } catch (e) {
        console.error('Error fetching claim:', e);
        setError('Tekniskt fel – försök igen senare.');
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, token]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-700">Laddar ditt ärende…</p>
      </main>
    );
  }

  if (error || !claim) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6 border border-slate-200">
          <h1 className="text-xl font-semibold text-slate-900 mb-2">Kunde inte visa ärendet</h1>
          <p className="text-sm text-slate-700 mb-4">{error ?? 'Okänt fel.'}</p>
          <p className="text-xs text-slate-500">
            Om problemet kvarstår, svara på mailet du fick när du skapade ärendet så hjälper vi dig vidare.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-slate-200">
        <header className="mb-6 border-b border-slate-200 pb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 mb-1">
            FlightClaimly
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Följ ditt ärende
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ärende-ID: <span className="font-mono">{claim.id}</span>
          </p>
        </header>

        <section className="mb-5">
          <h2 className="text-sm font-semibold text-slate-800 mb-2">Status</h2>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-100">
            {statusLabel(claim.status)}
          </span>
          <p className="text-xs text-slate-500 mt-2">
            Vi uppdaterar statusen här när ditt ärende går vidare i processen.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="text-sm font-semibold text-slate-800 mb-2">Flygdetaljer</h2>
          <div className="text-sm text-slate-700 space-y-1">
            <p>
              <span className="font-medium">Flyg:</span>{' '}
              {claim.flightNumber} · {claim.from} → {claim.to}
            </p>
            <p>
              <span className="font-medium">Datum:</span>{' '}
              {claim.date || '-'}
            </p>
            <p>
              <span className="font-medium">Bokningsnummer:</span>{' '}
              {claim.bookingNumber}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-slate-800 mb-2">Tidslinje</h2>
          <ol className="relative border-l border-slate-200 pl-4 text-xs text-slate-700 space-y-3">
            <li className="ml-1">
              <div className="absolute -left-[7px] h-3 w-3 rounded-full bg-sky-500 border-2 border-white shadow" />
              <p className="font-medium">Ärende skapat</p>
              <p className="text-slate-500">
                Vi har mottagit ditt ärende och påbörjat hanteringen.
              </p>
            </li>
            <li className="ml-1">
              <div className="absolute -left-[7px] mt-6 h-3 w-3 rounded-full bg-slate-300 border-2 border-white" />
              <p className="font-medium">Nästa steg</p>
              <p className="text-slate-500">
                Vi går igenom ditt underlag och kontaktar flygbolaget vid behov.
              </p>
            </li>
            {/* Senare kan vi ersätta detta med riktiga events från en claim_events-tabell */}
          </ol>
        </section>
      </div>
    </main>
  );
}

// Enkel mapping så du kan ha interna status-koder men snygga labels
function statusLabel(status: string) {
  switch (status) {
    case 'new':
      return 'Mottaget';
    case 'processing':
      return 'Under behandling';
    case 'sent_to_airline':
      return 'Skickat till flygbolaget';
    case 'paid_out':
      return 'Ersättning utbetald';
    case 'rejected':
      return 'Avslaget';
    default:
      return status;
  }
}
