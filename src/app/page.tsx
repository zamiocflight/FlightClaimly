'use client';

import { useState } from 'react';

export default function Home() {
  const [flightNumber, setFlightNumber] = useState('');
  const [date, setDate] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [result, setResult] = useState('');
  const [showClaimForm, setShowClaimForm] = useState(false);

  // Claim-formulär state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingNumber, setBookingNumber] = useState('');

  const handlePreCheckSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (flightNumber && date && from && to) {
      setResult('✅ Du kan ha rätt till ersättning!');
      setShowClaimForm(true);
    } else {
      setResult('❌ Alla fält måste fyllas i.');
      setShowClaimForm(false);
    }
  };

  const handleClaimSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const claimData = {
    flightNumber,
    date,
    from,
    to,
    name,
    email,
    bookingNumber,
  };

  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(claimData),
    });

    const result = await response.json();
    console.log(result.message);

    alert('✈️ Claim inskickad!');
  } catch (error) {
    console.error('Något gick fel:', error);
    alert('⚠️ Något gick fel, försök igen!');
  }
};



  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">FlightClaimly – Pre-check</h1>

      <form onSubmit={handlePreCheckSubmit} className="flex flex-col gap-3 mb-4">
        <input
          type="text"
          placeholder="Flight number (e.g. LH123)"
          className="border p-2 rounded"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="From (e.g. CPH)"
          className="border p-2 rounded"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="To (e.g. AMS)"
          className="border p-2 rounded"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <button type="submit" className="bg-black text-white p-2 rounded">
          Check eligibility
        </button>
      </form>

      {result && <p className="mb-6 text-lg">{result}</p>}

      {showClaimForm && (
        <form onSubmit={handleClaimSubmit} className="flex flex-col gap-3 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Slutför din ansökan</h2>
          <input
            type="text"
            placeholder="Full name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email address"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Booking number"
            className="border p-2 rounded"
            value={bookingNumber}
            onChange={(e) => setBookingNumber(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">
            Skicka in ersättningsansökan
          </button>
        </form>
      )}
    </main>
  );
}
