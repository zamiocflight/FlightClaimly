// src/app/[locale]thanks/page.tsx
'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type SavedAttachment = {
  filename: string;
  size: number;
  path: string;
  contentType?: string;
};

function ThanksPageInner() {
  const t = useTranslations('thanks');
  const sp = useSearchParams();

  // 1) Läs claim-id från URL, fallback till localStorage om saknas
  const [claimId, setClaimId] = useState<string | null>(sp.get('id'));
  useEffect(() => {
    if (!claimId && typeof window !== 'undefined') {
      const v = localStorage.getItem('lastClaimId');
      if (v) setClaimId(v);
    }
  }, [claimId]);

  // 2) Pre-check-resultat från URL
  const pre = useMemo(() => {
    const eligible = sp.get('eligible') === '1';
    const reason = sp.get('reason') || '';
    const amount = sp.get('amount') || '';
    return { eligible, reason, amount };
  }, [sp]);

  const amountLabel = useMemo(() => {
    if (!pre.amount) return '';
    const v = pre.amount.trim();
    const hasSymbol = v.includes('€') || v.toLowerCase().includes('eur');
    return hasSymbol ? v : `€${v}`;
  }, [pre]);

  // 3) Upload / LoA-state
  const [loaName, setLoaName] = useState('');
  const [loaConsent, setLoaConsent] = useState(false);
  const [loaError, setLoaError] = useState<string | null>(null);

  const [files, setFiles] = useState<File[]>([]);

  const [busy, setBusy] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [isLoaModalOpen, setIsLoaModalOpen] = useState(false);

  async function upload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!loaName.trim() || !loaConsent) {
      setLoaError(t('loa.error'));
      return;
    }
    setLoaError(null);

    if (!claimId) {
      setErr(t('errors.missingId'));
      return;
    }

    setBusy(true);
    setErr(null);

    try {
      const saved: SavedAttachment[] = [];
      const uploadFiles: File[] = [];
      if (files.length) uploadFiles.push(...files);

      if (uploadFiles.length > 0) {
        for (const f of uploadFiles) {
          const pres = await fetch(
            `/api/claims/${encodeURIComponent(claimId)}/attachments/presign`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ filename: f.name, contentType: f.type }),
            }
          );
          if (!pres.ok) throw new Error('presign');
          const { url, path, contentType } = await pres.json();

          const put = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': contentType || 'application/octet-stream',
              'x-upsert': 'true',
            },
            body: f,
          });
          if (!put.ok) throw new Error('upload');

          saved.push({ filename: f.name, size: f.size, path, contentType });
        }

        const meta = await fetch(
          `/api/claims/${encodeURIComponent(claimId)}/attachments`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ files: saved }),
          }
        );
        if (!meta.ok) throw new Error('meta');
      }

      setUploaded(true);
      setFiles([]);
      const fileEl = document.getElementById('fileInput') as HTMLInputElement | null;
      if (fileEl) fileEl.value = '';
    } catch {
      setErr(t('errors.generic'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-6">
        <header className="flex items-center justify-between mb-2">
          <div className="space-y-0.5">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-700">
              FLIGHTCLAIMLY
            </p>
            <p className="text-[11px] text-slate-500">{t('brandTagline')}</p>
          </div>
          <Link href="/" className="text-xs font-medium text-slate-600 hover:text-slate-900">
            {t('backHome')}
          </Link>
        </header>

        <section className="rounded-3xl bg-white shadow-xl border border-slate-200/80 overflow-hidden">
          <div className="px-5 sm:px-7 py-5 sm:py-6 border-b border-slate-200/70 bg-gradient-to-br from-sky-50 via-emerald-50 to-white">
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-emerald-700 mb-1.5">
              {t('header.badge')}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              {t('header.title')}
            </h1>

            {claimId && (
              <p className="mt-2 text-sm text-slate-700">
                <span className="font-medium">{t('header.claimId')}:</span>{' '}
                <span className="font-mono text-[13px] bg-slate-900/5 px-1.5 py-0.5 rounded">
                  {claimId}
                </span>
              </p>
            )}

            <p className="mt-1.5 text-sm text-slate-600 max-w-xl">
              {t('header.intro')}
            </p>
          </div>

          <div className="px-5 sm:px-7 py-5 sm:py-6 space-y-5">
            <section className="rounded-2xl border border-emerald-200/80 bg-emerald-50 px-4 py-4 md:px-5 md:py-5 flex gap-3">
              <div className="text-3xl mt-1">✅</div>
              <div>
                {pre.eligible ? (
                  <>
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 mb-1">
                      <span>✓</span>
                      <span>{t('precheck.badge')}</span>
                    </div>
                    <h2 className="text-base md:text-lg font-semibold text-emerald-900">
                      {t('precheck.eligibleTitle')}
                    </h2>
                    <p className="text-sm text-emerald-800 mt-1">
                      {amountLabel ? `${t('precheck.amountPrefix')} ${amountLabel}. ` : null}
                      {pre.reason || t('precheck.eligibleFallback')}
                    </p>
                    <p className="text-xs md:text-[13px] text-emerald-900 mt-1">
                      {t('precheck.eligibleNote')}
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-base md:text-lg font-semibold text-slate-900">
                      {t('precheck.unclearTitle')}
                    </h2>
                    <p className="text-sm text-slate-800 mt-1">
                      {pre.reason || t('precheck.unclearFallback')}
                    </p>
                  </>
                )}
              </div>
            </section>

            <div className="grid md:grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)] gap-6 items-start">
              <div className="rounded-2xl bg-white border border-slate-200/80 p-4 md:p-5 space-y-5">
                <div>
                  <h2 className="text-sm md:text-base font-semibold text-slate-900">
                    {t('upload.title')}
                  </h2>
                  <p className="mt-1 text-xs md:text-sm text-slate-600">
                    {t('upload.intro')}
                  </p>
                  <ul className="mt-3 list-disc list-inside text-xs md:text-sm text-slate-700 space-y-1">
                    {t.raw('upload.list').map((li: string, i: number) => (
                      <li key={i}>{li}</li>
                    ))}
                  </ul>
                </div>

                {claimId ? (
                  !uploaded ? (
                    <form onSubmit={upload} className="space-y-6">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-5">
                        <div className="mb-3 space-y-1.5">
                          <h3 className="text-sm font-semibold text-slate-900">
                            {t('loa.title')} <span className="text-red-600">*</span>
                          </h3>
                          <p className="text-xs md:text-[13px] text-slate-600">
                            {t('loa.description')}
                          </p>
                          <button
                            type="button"
                            onClick={() => setIsLoaModalOpen(true)}
                            className="text-[11px] font-medium text-emerald-700 underline underline-offset-2"
                          >
                            {t('loa.viewText')}
                          </button>
                        </div>

                        <label className="block">
                          <span className="block text-xs font-medium text-slate-800 mb-1">
                            {t('loa.nameLabel')}
                          </span>
                          <input
                            type="text"
                            value={loaName}
                            onChange={(e) => setLoaName(e.target.value)}
                            placeholder={t('loa.namePlaceholder')}
                            required
                            className="w-full rounded-lg border px-3 py-2 text-sm"
                          />
                        </label>

                        <div className="mt-3 flex items-start gap-2">
                          <input
                            id="loaConsent"
                            type="checkbox"
                            checked={loaConsent}
                            onChange={(e) => setLoaConsent(e.target.checked)}
                            required
                            className="mt-1 h-4 w-4"
                          />
                          <label htmlFor="loaConsent" className="text-xs md:text-[13px]">
                            {t('loa.consent')}
                          </label>
                        </div>

                        {loaError && <p className="mt-2 text-xs text-red-600">{loaError}</p>}
                      </div>

                      <div className="rounded-2xl border border-dashed p-4 md:p-5">
                        <h3 className="text-sm font-semibold mb-1">{t('attachments.title')}</h3>
                        <p className="text-xs md:text-[13px] mb-3">
                          {t('attachments.description')}
                        </p>

                        <label className="flex items-center justify-between gap-3 rounded-xl border px-3 py-3 cursor-pointer">
  <span className="text-sm font-semibold">
    {t('attachments.choose')}
  </span>
  <span className="text-[11px] text-slate-500">
    {t('attachments.types')}
  </span>

<input
  id="fileInput"
  type="file"
  multiple
  className="hidden"
  onChange={(e) => setFiles(e.target.files ? Array.from(e.target.files) : [])}
  accept=".pdf,.jpg,.jpeg,.png,.heic,.heif"
/>
</label>

{/* 👇 VIKTIGT: UTANFÖR label */}
{files.length > 0 && (
  <div className="mt-2 rounded-lg bg-slate-50 border px-3 py-2">
    <ul className="space-y-1 text-xs text-slate-700">
      {files.map((file, i) => (
        <li key={i} className="flex items-center gap-2">
          📎 <span>{file.name}</span>
        </li>
      ))}
    </ul>
  </div>
)}

                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          type="submit"
                          disabled={busy}
                          className="rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white"
                        >
                          {busy ? t('actions.submitting') : t('actions.submit')}
                        </button>
                        {err && <p className="text-xs text-red-600">{err}</p>}
                        <p className="text-[11px] text-slate-500">{t('actions.later')}</p>
                      </div>
                    </form>
                  ) : (
                    <section className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 md:p-5">
                      <h3 className="text-base font-semibold text-emerald-900">
                        {t('success.title')}
                      </h3>
                      <p className="text-sm text-emerald-800 mt-1">
                        {t('success.text')}
                      </p>
                    </section>
                  )
                ) : (
                  <p className="text-sm text-amber-700 bg-amber-50 border rounded p-3">
                    {t('errors.missingId')}
                  </p>
                )}
              </div>

              <aside className="rounded-2xl border bg-slate-950 text-slate-100 p-4 md:p-5 space-y-4 text-sm">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase text-emerald-300">
                    🔒 {t('security.badge')}
                  </div>
                  <p className="mt-3 text-xs text-slate-200">
                    {t('security.text')}
                  </p>
                </div>
                <div className="h-px bg-slate-700" />
                <div>
                  <h3 className="text-xs font-semibold uppercase mb-1">
                    {t('security.independentTitle')}
                  </h3>
                  <p className="text-xs text-slate-200">
                    {t('security.independentText')}
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-5 md:p-6">
          <h3 className="text-sm font-semibold mb-2">{t('loaText.title')}</h3>
          <p className="text-sm text-slate-700">{t('loaText.intro')}</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            {t.raw('loaText.bullets').map((li: string, i: number) => (
              <li key={i}>{li}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-slate-600">{t('loaText.note')}</p>
        </section>

        <div className="mt-1 flex gap-3">
          <Link href="/" className="px-4 py-2 rounded-md bg-slate-100 text-sm font-medium">
            {t('home')}
          </Link>
        </div>
      </div>

      {isLoaModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6">
            <button onClick={() => setIsLoaModalOpen(false)} className="float-right">✕</button>
            <h2 className="text-base font-semibold mb-2">{t('loaText.title')}</h2>
            <p className="text-sm">{t('loaText.intro')}</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              {t.raw('loaText.bullets').map((li: string, i: number) => (
                <li key={i}>{li}</li>
              ))}
            </ul>
            <p className="text-xs text-slate-600 mt-2">{t('loaText.note')}</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default function ThanksPage() {
  const t = useTranslations('thanks');
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-100 flex items-center justify-center">
          <p className="text-sm text-slate-600">{t('loading')}</p>
        </main>
      }
    >
      <ThanksPageInner />
    </Suspense>
  );
}
