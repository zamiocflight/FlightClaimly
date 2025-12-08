// src/app/thanks/page.tsx
'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';


type SavedAttachment = {
  filename: string;
  size: number;
  path: string;
  contentType?: string;
};

function ThanksPageInner() {

  const sp = useSearchParams();

  // 1) Läs claim-id från URL, fallback till localStorage om saknas
  const [claimId, setClaimId] = useState<string | null>(sp.get('id'));
  useEffect(() => {
    if (!claimId && typeof window !== 'undefined') {
      const v = localStorage.getItem('lastClaimId');
      if (v) setClaimId(v);
    }
  }, [claimId]);

  // 2) Pre-check-resultat från URL (stubben satte dessa vid redirect)
  const pre = useMemo(() => {
    const eligible = sp.get('eligible') === '1';
    const reason = sp.get('reason') || '';
    const amount = sp.get('amount') || '';
    return { eligible, reason, amount };
  }, [sp]);

  // Format belopp med €
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

  const [files, setFiles] = useState<FileList | null>(null); // övriga bilagor
  const [busy, setBusy] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [isLoaModalOpen, setIsLoaModalOpen] = useState(false);

  async function upload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Digital LoA: namn + kryssruta måste vara ifyllda
    if (!loaName.trim() || !loaConsent) {
      setLoaError(
        'Fyll i ditt namn och kryssa i rutan för att fullmakten ska vara giltig.'
      );
      return;
    }
    setLoaError(null);

    if (!claimId) {
      setErr('Kunde inte hitta ditt ärende-ID. Försök igen från startsidan.');
      return;
    }

    setBusy(true);
    setErr(null);

    try {
      const saved: SavedAttachment[] = [];

      // Bygg lista över bilagor (valfritt)
      const uploadFiles: File[] = [];
      if (files?.length) uploadFiles.push(...Array.from(files));

      // Om det finns bilagor: ladda upp + spara metadata
      if (uploadFiles.length > 0) {
        for (const f of uploadFiles) {
          // 1) Be om signerad URL
          const pres = await fetch(
            `/api/claims/${encodeURIComponent(claimId)}/attachments/presign`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                filename: f.name,
                contentType: f.type,
              }),
            }
          );

          if (!pres.ok) {
            let bodyText = '';
            try {
              bodyText = await pres.text();
            } catch {
              // ignore
            }
            console.error('PRESIGN ERROR', pres.status, bodyText);
            throw new Error(
              'Kunde inte förbereda uppladdningen. Försök igen om en stund.'
            );
          }

          const { url, path, contentType } = await pres.json();

          // 2) Ladda upp direkt till Storage
          const put = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': contentType || 'application/octet-stream',
              'x-upsert': 'true',
            },
            body: f,
          });

          if (!put.ok) {
            let bodyText = '';
            try {
              bodyText = await put.text();
            } catch {
              // ignore
            }
            console.error('UPLOAD ERROR', put.status, bodyText);
            throw new Error('Kunde inte ladda upp filen. Försök igen.');
          }

          saved.push({
            filename: f.name,
            size: f.size,
            path,
            contentType,
          });
        }

        // 3) Spara metadata i DB (bara om vi har filer)
        const meta = await fetch(
          `/api/claims/${encodeURIComponent(claimId)}/attachments`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ files: saved }),
          }
        );

        if (!meta.ok) {
          let bodyText = '';
          try {
            bodyText = await meta.text();
          } catch {
            // ignore
          }
          console.error('META ERROR', meta.status, bodyText);
          throw new Error(
            'Kunde inte spara dokumentinformationen. Försök igen om en stund.'
          );
        }
      }

      // Oavsett om bilagor fanns – digital LoA är nu klar
      setUploaded(true);
      setFiles(null);

      const fileEl = document.getElementById(
        'fileInput'
      ) as HTMLInputElement | null;
      if (fileEl) fileEl.value = '';
    } catch (e: any) {
      console.error(e);
      setErr('❌ Kunde inte slutföra steget. Försök igen.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-6">
        {/* Liten topbar */}
        <header className="flex items-center justify-between mb-2">
          <div className="space-y-0.5">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-700">
              FLIGHTCLAIMLY
            </p>
            <p className="text-[11px] text-slate-500">
              Vi driver ditt ärende mot flygbolaget – du slipper bråket.
            </p>
          </div>
          <Link
            href="/"
            className="text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            ← Till startsidan
          </Link>
        </header>

        {/* Huvudkort: header + precheck + LoA + bilagor + säkerhet */}
        <section className="rounded-3xl bg-white shadow-xl shadow-slate-900/5 border border-slate-200/80 overflow-hidden">
                    {/* Gradient-header */}
          <div className="px-5 sm:px-7 py-5 sm:py-6 border-b border-slate-200/70 bg-gradient-to-br from-sky-50 via-emerald-50 to-white">
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-emerald-700 mb-1.5">
              FLIGHTCLAIMLY • DITT ÄRENDE ÄR REGISTRERAT
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Tack! Vi har mottagit ditt ärende.
            </h1>

            {claimId && (
              <p className="mt-2 text-sm text-slate-700">
                <span className="font-medium">Ärende-ID:</span>{' '}
                <span className="font-mono text-[13px] bg-slate-900/5 px-1.5 py-0.5 rounded">
                  {claimId}
                </span>
              </p>
            )}

            <p className="mt-1.5 text-sm text-slate-600 max-w-xl">
              Nästa steg är att du bekräftar fullmakt och laddar upp underlag
              här på sidan. När det är klart börjar vi handlägga ärendet direkt
              och kontaktar flygbolaget för din räkning.
            </p>
          </div>


          {/* Body */}
          <div className="px-5 sm:px-7 py-5 sm:py-6 space-y-5">
                 {/* Pre-check-beskedet */}
      <section className="rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50 to-emerald-50/60 px-4 py-4 md:px-5 md:py-5 flex gap-3 shadow-sm">
        <div className="text-3xl mt-1">✅</div>
        <div>
          {pre.eligible ? (
            <>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 mb-1">
                <span className="text-xs">✓</span>
                <span>Preliminär bedömning</span>
              </div>
              <h2 className="text-base md:text-lg font-semibold text-emerald-900">
                Bra nyheter – du ser ut att ha rätt till ersättning.
              </h2>
              <p className="text-sm text-emerald-800 mt-1">
                {amountLabel ? `Indikation: ${amountLabel}. ` : null}
                {pre.reason ||
                  'Preliminär bedömning: flyget kan vara ersättningsberättigat enligt EU261.'}
              </p>
              <p className="text-xs md:text-[13px] text-emerald-900 mt-1">
                Det här är ingen garanti, men ett starkt första besked. När du
                har bekräftat fullmakt och laddat upp bilagor börjar vi driva
                kravet mot flygbolaget.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-base md:text-lg font-semibold text-slate-900">
                Oklart – vi granskar manuellt.
              </h2>
              <p className="text-sm text-slate-800 mt-1">
                {pre.reason ||
                  'Skicka gärna in underlag så går vi igenom ditt ärende manuellt.'}
              </p>
            </>
          )}
        </div>
      </section>


            {/* Huvudgrid: vänster (LoA+bilagor), höger (säkerhet) */}
            <div className="grid md:grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)] gap-6 items-start">
              {/* Vänster: LoA + bilagor */}
              <div className="rounded-2xl bg-white border border-slate-200/80 p-4 md:p-5 space-y-5">
                <div>
                  <h2 className="text-sm md:text-base font-semibold text-slate-900">
                    Ladda upp underlag
                  </h2>
                  <p className="mt-1 text-xs md:text-sm text-slate-600">
                    Fullmakten ger oss rätt att driva ärendet mot flygbolaget.
                    Lägg också gärna till boardingkort, bokningsbekräftelse och
                    kvitton om du haft extra kostnader.
                  </p>
                  <ul className="mt-3 list-disc list-inside text-xs md:text-sm text-slate-700 space-y-1">
                    <li>Digital fullmakt (LoA) – obligatorisk</li>
                    <li>Boardingkort eller e-biljett</li>
                    <li>Bokningsbekräftelse</li>
                    <li>Kvitton för extra kostnader (om du haft det)</li>
                  </ul>
                </div>

                {/* Upload-panel (visas bara om vi har ett claimId och inte redan klart) */}
                {claimId ? (
                  !uploaded ? (
                    <form onSubmit={upload} className="space-y-6">
                      {/* Digital LoA */}
                      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
                        <div className="mb-3 space-y-1.5">
                          <h3 className="text-sm font-semibold text-slate-900">
                            Digital fullmakt (LoA){' '}
                            <span className="text-red-600">*</span>
                          </h3>
                          <p className="text-xs md:text-[13px] text-slate-600">
                            Genom att fylla i ditt namn och kryssa i rutan ger
                            du FlightClaimly rätt att företräda dig mot
                            flygbolaget i detta ärende.
                          </p>
                          <button
                            type="button"
                            onClick={() => setIsLoaModalOpen(true)}
                            className="text-[11px] font-medium text-emerald-700 hover:text-emerald-900 underline underline-offset-2"
                          >
                            Visa fullmaktstext
                          </button>
                        </div>

                        <label className="block">
                          <span className="block text-xs font-medium text-slate-800 mb-1">
                            Fullständigt namn (signatur)
                          </span>
                          <input
                            type="text"
                            value={loaName}
                            onChange={(e) => setLoaName(e.target.value)}
                            placeholder="Ditt fullständiga namn"
                            required
                            className="w-full rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                          />
                        </label>

                        <div className="mt-3 flex items-start gap-2">
                          <input
                            id="loaConsent"
                            name="loaConsent"
                            type="checkbox"
                            checked={loaConsent}
                            onChange={(e) => setLoaConsent(e.target.checked)}
                            required
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                          />
                          <label
                            htmlFor="loaConsent"
                            className="text-xs md:text-[13px] text-slate-800"
                          >
                            Jag ger FlightClaimly fullmakt (Letter of
                            Authorization) att företräda mig gentemot
                            flygbolaget i detta ärende.
                          </label>
                        </div>

                        {loaError && (
                          <p className="mt-2 text-xs text-red-600">
                            {loaError}
                          </p>
                        )}
                      </div>

                      {/* Övriga bilagor – valfritt */}
                      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-4 md:p-5">
                        <h3 className="text-sm font-semibold text-slate-900 mb-1">
                          Övriga bilagor (valfritt)
                        </h3>
                        <p className="text-xs md:text-[13px] text-slate-600 mb-3">
                          Lägg gärna till boardingkort, bokningsbekräftelse och
                          kvitton. Du kan ladda upp flera filer samtidigt.
                        </p>

                        <label className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-slate-300 bg-white px-3 py-3 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition">
                          <span className="flex items-center gap-3">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white text-sm">
                              📎
                            </span>
                            <span className="flex flex-col">
                              <span className="text-sm font-semibold text-slate-900">
                                Välj filer
                              </span>
                              <span className="text-[11px] text-slate-500">
                                PDF, JPG, PNG, HEIC. Max några få filer åt
                                gången.
                              </span>
                            </span>
                          </span>
                          <input
                            id="fileInput"
                            type="file"
                            multiple
                            className="hidden"
                            onChange={(e) => setFiles(e.target.files)}
                            accept=".pdf,.jpg,.jpeg,.png,.heic,.heif"
                          />
                        </label>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          type="submit"
                          disabled={busy}
                          className="inline-flex items-center justify-center rounded-md bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm disabled:opacity-60 disabled:cursor-not-allowed transition"
                        >
                          {busy
                            ? 'Bearbetar…'
                            : 'Bekräfta fullmakt och ladda upp'}
                        </button>
                        {err && (
                          <p className="text-xs text-red-600">{err}</p>
                        )}
                        <p className="text-[11px] text-slate-500">
                          Du kan alltid komplettera med fler bilagor senare
                          genom att kontakta oss om det behövs.
                        </p>
                      </div>
                    </form>
                  ) : (
                    // Efter uppladdning: stor grön bekräftelse
                    <section className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 md:p-5">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">🟢</div>
                        <div>
                          <h3 className="text-base font-semibold text-emerald-900">
                            Fullmakt bekräftad!
                          </h3>
                          <p className="text-sm text-emerald-800 mt-1">
                            Tack – vi börjar handlägga ditt ärende direkt. Du
                            får mejl när status uppdateras och kan följa allt
                            via din spårningslänk.
                          </p>
                        </div>
                      </div>
                    </section>
                  )
                ) : (
                  <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded p-3">
                    Kunde inte hitta ditt ärende-ID. Gå tillbaka till
                    startsidan och skicka in formuläret igen.
                  </p>
                )}
              </div>

              {/* Höger: säkerhet / info */}
              <aside className="rounded-2xl border border-slate-900/30 bg-slate-950 text-slate-100 p-4 md:p-5 space-y-4 text-sm">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                    <span>🔒</span>
                    <span>Säker filöverföring</span>
                  </div>
                  <p className="mt-3 text-xs text-slate-200/90 leading-relaxed">
                    Dina filer lagras krypterat och används endast för att
                    hantera ditt ärende. Vi delar dem inte med någon annan än
                    flygbolaget och eventuellt juridiskt ombud kopplat till
                    just detta ärende.
                  </p>
                </div>

                <div className="h-px bg-slate-700/60" />

                <div>
                  <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-300 mb-1">
                    Oberoende aktör
                  </h3>
                  <p className="text-xs text-slate-200/90 leading-relaxed">
                    FlightClaimly är en fristående aktör och inte affilierad med
                    något flygbolag. Vi arbetar alltid på uppdrag av dig som
                    resenär.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Fullmakt (LoA) – infosektion (synlig textversion) */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <h3 className="text-sm font-semibold mb-2 text-slate-900">
            Fullmakt (LoA) – vad innebär den?
          </h3>

          <p className="text-sm text-slate-700">
            För att vi ska kunna driva ditt ärende mot flygbolaget behöver du ge
            oss fullmakt. Det gör du genom att skriva ditt namn och kryssa i
            rutan ovan. Fullmakten gäller endast detta specifika ärende.
          </p>

          <p className="text-sm text-slate-700 mt-2 font-medium">
            Fullmaktstext:
          </p>

          <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded text-sm text-slate-800">
            <p className="font-semibold">Fullmakt – FlightClaimly</p>
            <p className="mt-1">
              Jag ger härmed FlightClaimly rätt att företräda mig i ärendet om
              flygkompensation enligt EU-förordning 261/2004.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Kommunicera med flygbolaget i mitt namn.</li>
              <li>Skicka in krav och följa upp ärendet.</li>
              <li>Ta emot svar och beslut från flygbolaget.</li>
              <li>
                Samarbeta med juridiskt ombud om det behövs för detta ärende.
              </li>
            </ul>
            <p className="mt-2 text-xs text-slate-600">
              Fullmakten kan när som helst återkallas skriftligen. Vi använder
              den endast för att driva just detta ärende.
            </p>
          </div>
        </section>

        {/* Snabblänkar */}
<div className="mt-1 flex gap-3">
  <Link
    href="/"
    className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-sm font-medium text-slate-800"
  >
    Till startsidan
  </Link>
</div>

      </div>

      {/* Modal med fullmaktstext (samma text som infosektionen) */}
      {isLoaModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 p-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h2 className="text-base font-semibold text-slate-900">
                Fullmaktstext – FlightClaimly
              </h2>
              <button
                type="button"
                onClick={() => setIsLoaModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg leading-none"
              >
                ✕
              </button>
            </div>
            <div className="text-sm text-slate-800 space-y-2 max-h-[60vh] overflow-auto">
              <p>
                Genom att skriva ditt namn och kryssa i rutan godkänner du
                nedanstående fullmakt:
              </p>
              <p className="font-semibold">Fullmakt – FlightClaimly</p>
              <p>
                Jag ger härmed FlightClaimly rätt att företräda mig i ärendet om
                flygkompensation enligt EU-förordning 261/2004.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Kommunicera med flygbolaget i mitt namn.</li>
                <li>Skicka in krav och följa upp ärendet.</li>
                <li>Ta emot svar och beslut från flygbolaget.</li>
                <li>
                  Samarbeta med juridiskt ombud om det behövs för detta ärende.
                </li>
              </ul>
              <p className="text-xs text-slate-600 pt-1">
                Fullmakten gäller endast detta specifika ärende och kan
                återkallas skriftligen. FlightClaimly agerar enbart på uppdrag
                av mig som resenär.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
export default function ThanksPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-100 flex items-center justify-center">
          <p className="text-sm text-slate-600">Laddar sidan…</p>
        </main>
      }
    >
      <ThanksPageInner />
    </Suspense>
  );
}
