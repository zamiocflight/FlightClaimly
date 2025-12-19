// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('login');

  const [pw, setPw] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setErr(null);
    setLoading(true);
    try {
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      if (!r.ok) throw new Error(t('errors.invalidPassword'));
      window.location.href = '/admin';
    } catch (e: any) {
      setErr(e?.message ?? t('errors.generic'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-sm rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-xl font-semibold">
          {t('title')}
        </h1>

        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">
            {t('passwordLabel')}
          </span>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            placeholder={t('passwordPlaceholder')}
          />
        </label>

        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}

        <button
          onClick={submit}
          disabled={loading || !pw}
          className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white disabled:opacity-60"
        >
          {loading ? t('loading') : t('submit')}
        </button>
      </div>
    </main>
  );
}
