// src/app/admin/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';

type ClaimAdmin = {
  id: string; // receivedAt
  flightNumber: string;
  date: string;
  from: string;
  to: string;
  name: string;
  email: string;
  bookingNumber: string;
  receivedAt: string;
  statusInternal: string; // new | processing | sent_to_airline | paid_out | rejected
  statusLabel: string;    // svensk label
  connections: string[];  // mellanlandningar
  attachmentsCount: number; // antal bilagor
};

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: 'new', valueLabel: 'Obehandlad' },
  { value: 'processing', valueLabel: 'Under behandling' },
  { value: 'sent_to_airline', valueLabel: 'Skickat till flygbolaget' },
  { value: 'paid_out', valueLabel: 'Ersättning utbetald' },
  { value: 'rejected', valueLabel: 'Avslaget' },
].map((s) => ({ value: s.value, label: s.valueLabel }));

export default function AdminPage() {
  const [claims, setClaims] = useState<ClaimAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [emailInfoId, setEmailInfoId] = useState<string | null>(null); // visar “mail skickat”
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/claims', { cache: 'no-store' });
        if (!res.ok) throw new Error('Kunde inte hämta ärenden');
        const data = (await res.json()) as ClaimAdmin[];
        setClaims(data);
      } catch (e: any) {
        console.error(e);
        setError(e?.message ?? 'Tekniskt fel.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredClaims = useMemo(() => {
    if (!search.trim()) return claims;
    const q = search.trim().toLowerCase();

    return claims.filter((c) => {
      const haystack = [
        c.name,
        c.email,
        c.bookingNumber,
        c.flightNumber,
        c.from,
        c.to,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [claims, search]);

  async function updateStatus(id: string, status: string) {
    try {
      setSavingId(id);
      setError(null);
      setEmailInfoId(null);

      const res = await fetch('/api/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Kunde inte uppdatera status');
      }

      const data = await res.json().catch(() => ({}));
      const emailSent = !!data.emailSent;

      // uppdatera lokalt
      setClaims((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                statusInternal: status,
                statusLabel: statusLabelSv(status),
              }
            : c,
        ),
      );

      if (emailSent) {
        setEmailInfoId(id);
        setTimeout(() => {
          setEmailInfoId((current) => (current === id ? null : current));
        }, 2500);
      }
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? 'Tekniskt fel vid uppdatering.');
    } finally {
      setSavingId(null);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-200 text-sm">Laddar ärenden…</p>
      </main>
    );
  }

  if (error && claims.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow border border-slate-200 p-6">
          <h1 className="text-lg font-semibold text-slate-900 mb-2">
            Admin – fel
          </h1>
          <p className="text-sm text-slate-700 mb-4">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Topbar */}
      <div className="border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-sky-400">
              FlightClaimly
            </p>
            <h1 className="text-lg sm:text-xl font-semibold text-slate-50">
              Adminpanel – ärenden
            </h1>
            <p className="text-[11px] text-slate-400 mt-1">
              {claims.length} ärenden totalt
              {search.trim() &&
                ` • ${filteredClaims.length} matchar sökningen`}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 mr-1" />
            Endast internt – dela inte denna sida
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        {/* Error-banner */}
        {error && (
          <div className="rounded-lg border border-rose-400/60 bg-rose-950/40 px-3 py-2 text-xs text-rose-100">
            {error}
          </div>
        )}

        {/* Filter-rad */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <div className="flex-1">
            <label className="block text-[11px] font-medium text-slate-300 mb-1">
              Sök (namn, e-post, bokning, flight, rutt)
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="t.ex. Johanna, SK1420, ARN, ABC123…"
              className="w-full rounded-md border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-[13px] text-slate-50 placeholder:text-slate-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/60"
            />
          </div>

          <div className="text-[11px] text-slate-400">
            <p>
              <span className="inline-flex items-center gap-1 mr-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Aktivt / klart</span>
              </span>
              <span className="inline-flex items-center gap-1 mr-3">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span>Pågående</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <span>Avslag</span>
              </span>
            </p>
          </div>
        </div>

        {/* Tabell */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70 shadow-lg shadow-slate-950/60">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-900/90">
              <tr>
                <Th>Skapad</Th>
                <Th>Passagerare</Th>
                <Th>Kontakt</Th>
                <Th>Flyg</Th>
                <Th>Mellanlandningar</Th>
                <Th>Bokning &amp; bilagor</Th>
                <Th>Status</Th>
                <Th>Åtgärd</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/70">
              {filteredClaims.map((c, rowIdx) => {
                const isSaving = savingId === c.id;
                const showEmailInfo = emailInfoId === c.id;

                const connectionsText =
                  c.connections && c.connections.length > 0
                    ? c.connections
                        .filter((x) => x && x.trim().length > 0)
                        .join(', ')
                    : '—';

                const statusBadge = getStatusBadge(c.statusInternal);

                return (
                  <tr
                    key={c.id}
                    className={
                      rowIdx % 2 === 0
                        ? 'bg-slate-950/40 hover:bg-slate-900/60'
                        : 'bg-slate-950/20 hover:bg-slate-900/60'
                    }
                  >
                    <Td>
                      <div className="flex flex-col">
                        <span className="font-mono text-[11px] text-slate-200">
                          {c.receivedAt}
                        </span>
                      </div>
                    </Td>

                    <Td>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-50">
                          {c.name}
                        </span>
                      </div>
                    </Td>

                    <Td>
                      <div className="flex flex-col">
                        <span className="text-slate-100">{c.email}</span>
                      </div>
                    </Td>

                    <Td>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[11px] text-sky-300">
                          {c.flightNumber}
                        </span>
                        <span className="text-slate-100">
                          {c.from} → {c.to}
                        </span>
                        <span className="text-slate-500 text-[11px]">
                          {c.date || '—'}
                        </span>
                      </div>
                    </Td>

                    <Td>
                      <span className="text-[11px] text-slate-100">
                        {connectionsText}
                      </span>
                    </Td>

                    <Td>
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[11px] text-slate-100">
                          {c.bookingNumber}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px]">
                          <span
                            className={
                              c.attachmentsCount > 0
                                ? 'inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-400/60 px-2 py-0.5 text-emerald-100'
                                : 'inline-flex items-center gap-1 rounded-full bg-slate-800/80 border border-slate-700 px-2 py-0.5 text-slate-300'
                            }
                          >
                            <span>📎</span>
                            <span>
                              {c.attachmentsCount > 0
                                ? `${c.attachmentsCount} bilag${
                                    c.attachmentsCount > 1 ? 'or' : 'a'
                                  }`
                                : 'Inga bilagor'}
                            </span>
                          </span>
                        </span>
                      </div>
                    </Td>

                    <Td>
                      <div className="flex flex-col gap-1">
                        {/* Status-badge */}
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${statusBadge.className}`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          <span>{c.statusLabel}</span>
                        </span>

                        {/* Select för ändring */}
                        <select
                          className="mt-1 rounded-md border border-slate-700 bg-slate-950/60 px-2 py-1 text-[11px] text-slate-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500/60"
                          value={c.statusInternal}
                          onChange={(e) =>
                            setClaims((prev) =>
                              prev.map((x) =>
                                x.id === c.id
                                  ? {
                                      ...x,
                                      statusInternal: e.target.value,
                                      statusLabel: statusLabelSv(
                                        e.target.value,
                                      ),
                                    }
                                  : x,
                              ),
                            )
                          }
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>

                        {isSaving && (
                          <span className="text-[10px] text-amber-300">
                            Sparar…
                          </span>
                        )}
                        {showEmailInfo && !isSaving && (
                          <span className="text-[10px] text-emerald-300 flex items-center gap-1">
                            <span>📨</span>
                            <span>Mail skickat ✔</span>
                          </span>
                        )}
                      </div>
                    </Td>

                    <Td>
                      <button
                        type="button"
                        onClick={() => updateStatus(c.receivedAt, c.statusInternal)}
                        disabled={savingId === c.id}
                        className="rounded-full bg-sky-500 px-3 py-1 text-[11px] font-semibold text-slate-950 shadow-sm hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        {savingId === c.id
                          ? 'Sparar…'
                          : 'Spara & skicka mail'}
                      </button>
                    </Td>
                  </tr>
                );
              })}

              {filteredClaims.length === 0 && (
                <tr>
                  <Td colSpan={8}>
                    <p className="text-center text-slate-400 py-8 text-xs">
                      Inga ärenden matchar din sökning.
                    </p>
                  </Td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-[10px] text-slate-500 mt-2">
          Tips: använd sökfältet för att snabbt hitta ärenden på namn, e-post,
          bokningsnummer eller flight.
        </p>
      </div>
    </main>
  );
}

/* ----- Små UI-komponenter ----- */

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-400">
      {children}
    </th>
  );
}

function Td({
  children,
  colSpan,
}: {
  children: React.ReactNode;
  colSpan?: number;
}) {
  return (
    <td
      className="px-3 py-2 align-top text-[11px] text-slate-50"
      colSpan={colSpan}
    >
      {children}
    </td>
  );
}

function statusLabelSv(status: string): string {
  switch (status) {
    case 'new':
      return 'Obehandlad';
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

function getStatusBadge(status: string): { className: string } {
  // styr bara färg på badge via Tailwind-klasser
  switch (status) {
    case 'new':
      return {
        className:
          'bg-slate-900/80 text-slate-100 border border-slate-600/80',
      };
    case 'processing':
      return {
        className:
          'bg-amber-500/10 text-amber-200 border border-amber-400/70',
      };
    case 'sent_to_airline':
      return {
        className:
          'bg-sky-500/10 text-sky-200 border border-sky-400/70',
      };
    case 'paid_out':
      return {
        className:
          'bg-emerald-500/15 text-emerald-200 border border-emerald-400/70',
      };
    case 'rejected':
      return {
        className:
          'bg-rose-500/10 text-rose-200 border border-rose-400/70',
      };
    default:
      return {
        className:
          'bg-slate-900/80 text-slate-100 border border-slate-600/80',
      };
  }
}
