'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Attachment = {
  filename: string;
  size: number;
  path: string;
  uploadedAt: string;
  contentType?: string;
};

type Claim = {
  flightNumber: string;
  date?: string;
  from: string;
  to: string;
  name: string;
  email: string;
  bookingNumber: string;
  receivedAt: string; // id
  status: string;     // sv/eng – normaliseras till kod
  attachments?: Attachment[];
};

const labelToCode = (s: string) =>
  ({ 'Obehandlad': 'new', 'Under behandling': 'processing', 'Klar': 'approved' } as Record<string,string>)[s] ?? s;

const codeToLabel = (s: string) =>
  ({ new: 'Obehandlad', processing: 'Under behandling', approved: 'Klar' } as Record<string,string>)[s] ?? s;

function getStatusIcon(s: string) {
  const code = labelToCode(s);
  if (code === 'new') return '🔴';
  if (code === 'processing') return '🟡';
  if (code === 'approved') return '🟢';
  return '⚪️';
}

function rowClass(s: string) {
  const code = labelToCode(s);
  if (code === 'new') return 'bg-red-50';
  if (code === 'processing') return 'bg-yellow-50';
  if (code === 'approved') return 'bg-green-50';
  return '';
}

export default function AdminPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('Alla');
  const [savingId, setSavingId] = useState<string|null>(null);
  const [justSavedId, setJustSavedId] = useState<string|null>(null);
  const router = useRouter();

  // 🔐 auth
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token !== 'flight-auth') router.push('/login');
  }, [router]);

  // 📥 load + auto-refresh
  const loadClaims = async () => {
    const res = await fetch('/api/claims', { cache: 'no-store' });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data: Claim[] = await res.json();
    setClaims(data.map(c => ({ ...c, status: labelToCode(c.status) })));
  };

  useEffect(() => {
    loadClaims();
    const onFocus = () => loadClaims();
    window.addEventListener('focus', onFocus);
    const iv = setInterval(loadClaims, 20000);
    return () => { window.removeEventListener('focus', onFocus); clearInterval(iv); };
  }, []);

  // 🔄 status update
  const handleStatusChange = async (
    id: { receivedAt?: string; email?: string; bookingNumber?: string },
    newStatusCode: string
  ) => {
    const idx = id.receivedAt
      ? claims.findIndex((c) => c.receivedAt === id.receivedAt)
      : claims.findIndex((c) => c.email === id.email && c.bookingNumber === id.bookingNumber);
    if (idx === -1) { alert('Hittade inte ärendet att uppdatera.'); return; }

    const snapshot = [...claims];
    const updated = [...claims];
    updated[idx].status = newStatusCode;
    setClaims(updated);

    try {
      setSavingId(id.receivedAt ?? null);
      const r = await fetch(`/api/claims/${id.receivedAt}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatusCode }),
      });

      if (!r.ok) {
        const payload = await r.json().catch(() => ({}));
        console.error('PATCH failed:', payload);
        setClaims(snapshot);
        alert(`Kunde inte spara status (${r.status}).`);
      } else {
        setJustSavedId(id.receivedAt ?? null);
        setTimeout(() => setJustSavedId(null), 1500);
      }
    } catch {
      setClaims(snapshot);
      alert('Nätverksfel. Försök igen.');
    } finally {
      setSavingId(null);
    }
  };

  const filteredClaims =
    statusFilter === 'Alla'
      ? claims
      : claims.filter((c) => codeToLabel(c.status) === statusFilter);

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">📋 Inkomna Flight Claims</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              window.location.href = '/login';
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            🚪 Logga ut
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="mr-2 text-sm font-semibold">Filtrera på status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-2 py-1 rounded text-sm bg-white text-gray-900"
        >
          <option value="Alla">Alla</option>
          <option value="Obehandlad">Obehandlad</option>
          <option value="Under behandling">Under behandling</option>
          <option value="Klar">Klar</option>
        </select>
      </div>

      <a
        href="/api/export"
        className="inline-block mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
        download
      >
        ⬇️ Exportera till CSV
      </a>

      {filteredClaims.length === 0 && <p>Inga ärenden ännu.</p>}

      {filteredClaims.length > 0 && (
        <div className="overflow-auto">
          <table className="w-full border border-gray-300 text-sm bg-white text-gray-900">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="p-2 border">Datum</th>
                <th className="p-2 border">Namn</th>
                <th className="p-2 border">Flight</th>
                <th className="p-2 border">Från</th>
                <th className="p-2 border">Till</th>
                <th className="p-2 border">Bokningsnr</th>
                <th className="p-2 border">E-post</th>
                <th className="p-2 border">Bilagor</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.map((c) => (
                <tr key={c.receivedAt} className={`border-t ${rowClass(c.status)}`}>
                  <td className="p-2 border">{c.date ? new Date(c.date).toLocaleDateString() : '—'}</td>
                  <td className="p-2 border">{c.name}</td>
                  <td className="p-2 border">{c.flightNumber}</td>
                  <td className="p-2 border">{c.from}</td>
                  <td className="p-2 border">{c.to}</td>
                  <td className="p-2 border">{c.bookingNumber}</td>
                  <td className="p-2 border">{c.email}</td>

                  <td className="p-2 border">
                    {c.attachments?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {c.attachments.map((a) => (
                          <a
                            key={a.filename}
                            href={`/api/claims/${c.receivedAt}/attachments/${encodeURIComponent(a.filename)}`}
                            target="_blank"
                            className="underline text-blue-700"
                          >
                            {a.filename}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500">—</span>
                    )}
                  </td>

                  <td className="p-2 border">
                    <div className="flex items-center gap-2">
                      <span>{getStatusIcon(c.status)}</span>
                      <select
                        value={labelToCode(c.status)}
                        disabled={savingId === c.receivedAt}
                        onChange={(e) =>
                          handleStatusChange(
                            { email: c.email, bookingNumber: c.bookingNumber, receivedAt: c.receivedAt },
                            e.target.value
                          )
                        }
                        className="border px-2 py-1 rounded bg-white text-gray-900"
                      >
                        <option value="new">Obehandlad</option>
                        <option value="processing">Under behandling</option>
                        <option value="approved">Klar</option>
                      </select>
                      {justSavedId === c.receivedAt && (
                        <span className="text-xs text-green-600">💾 Sparad!</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
