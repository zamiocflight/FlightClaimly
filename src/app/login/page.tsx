'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const USERNAME = 'admin';
const PASSWORD = 'FlightClaimly123';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === USERNAME && password === PASSWORD) {
      localStorage.setItem('adminToken', 'flight-auth');
      router.push('/admin');
    } else {
      setError('Fel användarnamn eller lösenord.');
    }
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🔐 Admin Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="bg-black text-white p-2 rounded">
          Logga in
        </button>
      </form>
    </main>
  );
}
