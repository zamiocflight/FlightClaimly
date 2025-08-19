'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Claim = {
  flightNumber: string;
  date: string;
  from: string;
  to: string;
  name: string;
  email: string;
  bookingNumber: string;
  receivedAt: string;
  status: string;
};

export default function AdminPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [statusFilter, setStatusFilter] = useState('Alla');
  const router = useRouter();

 useEffect(() => {
  const token = localStorage.getItem('adminToken');
  if (token !== 'flight-auth') {
    router.push('/login');
  }
}, [router]);


  useEffect(() => {
    fetch('/api/claims')
      .then((res) => res.json())
      .then((data) => setClaims(data));
  }, []);

  const handleStatusChange = async (index: number, newStatus: string) => {
    const updatedClaims = [...claims];
    updatedClaims[index].status = newStatus;
    setClaims(updatedClaims);

    await fetch('/api/update-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index, newStatus }),
    });
  };

  const filteredClaims =
    statusFilter === 'Alla'
      ? claims
      : claims.filter((c) => c.status === statusFilter);

  const getStatusIcon = (status: string) => {
    if (status === 'Obehandlad') return '🔴';
    if (status === 'Under behandling') return '🟡';
    if (status === 'Klar') return '🟢';
    return '⚪️';
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">📋 Inkomna Flight Claims</h1>
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

      <div className="mb-4">
        <label className="mr-2 text-sm font-semibold">Filtrera på status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-2 py-1 rounded text-sm"
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
          <table className="w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Datum</th>
                <th className="p-2 border">Namn</th>
                <th className="p-2 border">Flight</th>
                <th className="p-2 border">Från</th>
                <th className="p-2 border">Till</th>
                <th className="p-2 border">Bokningsnr</th>
                <th className="p-2 border">E-post</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.map((c, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2 border">{new Date(c.receivedAt).toLocaleDateString()}</td>
                  <td className="p-2 border">{c.name}</td>
                  <td className="p-2 border">{c.flightNumber}</td>
                  <td className="p-2 border">{c.from}</td>
                  <td className="p-2 border">{c.to}</td>
                  <td className="p-2 border">{c.bookingNumber}</td>
                  <td className="p-2 border">{c.email}</td>
                  <td className="p-2 border">
                    <div className="flex items-center gap-2">
                      <span>{getStatusIcon(c.status)}</span>
                      <select
                        value={c.status}
                        onChange={(e) => handleStatusChange(i, e.target.value)}
                        className="border px-2 py-1 rounded"
                      >
                        <option value="Obehandlad">Obehandlad</option>
                        <option value="Under behandling">Under behandling</option>
                        <option value="Klar">Klar</option>
                      </select>
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

