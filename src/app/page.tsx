'use client';

import React, { FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';

/* ---------- Form state ---------- */
type FormState = {
  flightNumber: string;
  date: string;
  from: string;
  to: string;
  hasConnection: 'direct' | 'connection';
  connections: string[];
  name: string;
  email: string;
  bookingNumber: string;
  phone: string;
};

const INITIAL: FormState = {
  flightNumber: '',
  date: '',
  from: '',
  to: '',
  hasConnection: 'direct',
  connections: [''],
  name: '',
  email: '',
  bookingNumber: '',
  phone: '',
};

type TrackStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Home() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // 🔹 Två steg i formuläret
  const [step, setStep] = useState<'quick' | 'details'>('quick');
  const [quickStatus, setQuickStatus] = useState<
    'idle' | 'checking' | 'eligible' | 'ineligible'
  >('idle');
  const [quickMessage, setQuickMessage] = useState<string | null>(null);

  // 🔹 Följ ärende – modal + magic link
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [trackEmail, setTrackEmail] = useState('');
  const [trackStatus, setTrackStatus] = useState<TrackStatus>('idle');
  const [trackMessage, setTrackMessage] = useState<string | null>(null);

  // 🔹 Mobilmeny
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  async function handleTrackSubmit(e: FormEvent) {
    e.preventDefault();
    setTrackStatus('loading');
    setTrackMessage(null);

    try {
      const res = await fetch('/api/send-track-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trackEmail.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setTrackStatus('error');
        setTrackMessage(
          data?.error ||
            'Kunde inte skicka länken just nu. Försök igen om en stund.'
        );
        return;
      }

      setTrackStatus('success');
      setTrackMessage(
        'Om vi hittar ett ärende kopplat till den här e-posten skickar vi en säker spårningslänk inom några minuter.'
      );
    } catch (e) {
      console.error(e);
      setTrackStatus('error');
      setTrackMessage('Tekniskt fel – försök igen om en stund.');
    }
  }

  // 🔹 Steg 1 – snabb koll (frontend-logik)
  function handleQuickCheck(e: FormEvent) {
    e.preventDefault();
    setQuickMessage(null);
    setQuickStatus('checking');

    const { flightNumber, date, from, to } = form;

    if (!flightNumber || !date || !from || !to) {
      setQuickStatus('ineligible');
      setQuickMessage(
        'Fyll i flygnummer, datum, från och till för att vi ska kunna kontrollera.'
      );
      return;
    }

    setTimeout(() => {
      setQuickStatus('eligible');
      setQuickMessage(
        'Bra nyheter! Ditt flyg ser ut att kunna vara ersättningsberättigat enligt EU261. Fyll i dina uppgifter nedan så sköter vi resten.'
      );
      setStep('details');
    }, 400);
  }

  // 🔹 Steg 2 – skicka in ärendet
  async function submit() {
    setErr(null);
    setLoading(true);
    try {
      const r = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      // 🔍 Logga status + ev feltext
      if (!r.ok) {
        let serverMsg = '';
        try {
          const data = await r.json();
          serverMsg = data?.error || JSON.stringify(data);
        } catch {
          serverMsg = await r.text();
        }
        console.error('API /api/claims error:', r.status, serverMsg);
        throw new Error(serverMsg || 'Kunde inte skicka, försök igen.');
      }

      const data = await r.json();

      const id =
        data?.id ||
        data?.claim?.receivedAt ||
        data?.claim?.id ||
        data?.claim?.received_at ||
        data?.receivedAt;

      if (!id) throw new Error('Inget ärende-ID i svar.');
      try {
        localStorage.setItem('lastClaimId', String(id));
      } catch {}

      const eligible = data?.precheck?.eligible ? '1' : '0';
      const reason = data?.precheck?.reason ?? '';
      const amount =
        data?.precheck?.amount ?? data?.precheck?.amountHint ?? '';

      const q = new URLSearchParams({
        id: String(id),
        ...(eligible ? { eligible } : {}),
        ...(reason ? { reason } : {}),
        ...(amount ? { amount } : {}),
      });

      window.location.href = `/thanks?${q.toString()}`;
    } catch (e: any) {
      console.error(e);
      setErr(e?.message ?? 'Nätverksfel. Försök igen.');
    } finally {
      setLoading(false);
    }
  }

  function handleFullSubmit(e: FormEvent) {
    e.preventDefault();
    submit();
  }

  function openTrackModal() {
    setIsTrackModalOpen(true);
    setTrackStatus('idle');
    setTrackMessage(null);
    setIsMobileNavOpen(false);
  }

  return (
    <main className="relative min-h-screen text-slate-900">
      {/* Background sky + soft vignette */}
      <Image
        src="/bg/sky.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/75 to-white" />
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_-140px_160px_-60px_rgba(14,165,164,0.08)]" />

      {/* Content */}
      <div className="relative z-10" id="top">
        {/* Header */}
        <header className="w-full px-4 sm:px-6 pt-4 md:pt-5 flex items-center justify-between">
          {/* Logga */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-flightclaimly.svg"
              alt="FlightClaimly"
              width={260}
              height={52}
              priority
              className="w-auto h-10 sm:h-12"
            />
          </Link>

          {/* Desktop: meny + språk + Följ ärende */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-8 text-[15px] font-semibold text-slate-900">
              <a href="#how" className="hover:text-slate-700 transition-colors">
                Få kompensation
              </a>
              <a
                href="/delays"
                className="hover:text-slate-700 transition-colors"
              >
                Flygförseningar
              </a>
              <a
                href="/cancellations"
                className="hover:text-slate-700 transition-colors"
              >
                Flyginställningar
              </a>
              <a
                href="/rights"
                className="hover:text-slate-700 transition-colors"
              >
                Dina rättigheter
              </a>
              <a href="/faq" className="hover:text-slate-700 transition-colors">
                FAQ
              </a>
              <a
                href="/about"
                className="hover:text-slate-700 transition-colors"
              >
                Om oss
              </a>
              <a
                href="/contact"
                className="hover:text-slate-700 transition-colors"
              >
                Kontakt
              </a>
            </nav>

            {/* Språk – placeholder tills vidare */}
            <button
              type="button"
              className="text-[14px] font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              SV ▾
            </button>

            {/* Följ ärende */}
            <button
              type="button"
              onClick={openTrackModal}
              className="inline-flex items-center gap-2 rounded-md border border-slate-900/10 bg-slate-900 px-4 py-2 text-[14px] font-semibold text-white shadow-sm hover:bg-slate-800 hover:shadow-md transition"
            >
              <UserCircleIcon className="h-5 w-5" />
              Följ ärende
            </button>
          </div>

          {/* Mobil: hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center px-2.5 py-2 text-slate-900"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Öppna meny"
          >
            <span className="sr-only">Öppna meny</span>
            <span className="flex flex-col gap-1.5">
              <span className="block h-[2px] w-5 rounded-full bg-slate-900" />
              <span className="block h-[2px] w-5 rounded-full bg-slate-900" />
              <span className="block h-[2px] w-5 rounded-full bg-slate-900" />
            </span>
          </button>
        </header>

        {/* Mobil: slide-over-meny */}
        {isMobileNavOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div
              className="flex-1 bg-black/40"
              onClick={() => setIsMobileNavOpen(false)}
            />
            <div className="w-72 max-w-full h-full bg-white shadow-2xl flex flex-col">
              <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200">
                <span className="text-sm font-semibold text-slate-900">
                  Meny
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="text-slate-400 hover:text-slate-700"
                  aria-label="Stäng meny"
                >
                  ✕
                </button>
              </div>

              <nav className="flex-1 px-4 py-4 space-y-2 text-[15px] font-medium text-slate-900">
                <a
                  href="#how"
                  className="block py-1.5"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Få kompensation
                </a>
                <a
                  href="/delays"
                  className="block py-1.5"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Flygförseningar
                </a>
                <a
                  href="/cancellations"
                  className="block py-1.5"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Flyginställningar
                </a>
                <a
                  href="/rights"
                  className="block py-1.5"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Dina rättigheter
                </a>
                <a
                  href="/faq"
                  className="block py-1.5"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  FAQ
                </a>
                <a
                  href="/about"
                  className="block py-1.5"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Om oss
                </a>
                <a
                  href="/contact"
                  className="block py-1.5"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Kontakt
                </a>
              </nav>

              <div className="px-4 pb-6 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={openTrackModal}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                >
                  <UserCircleIcon className="h-5 w-5" />
                  Följ ärende
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Följ ärende – modal */}
        {isTrackModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4 transition">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-slate-200 p-6">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Följ ditt ärende
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Ange den e-postadress du använde när du skickade in ditt
                    ärende. Om vi hittar ett ärende skickar vi en säker länk där
                    du kan följa status.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsTrackModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-lg leading-none"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleTrackSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    E-postadress
                  </label>
                  <input
                    type="email"
                    required
                    value={trackEmail}
                    onChange={(e) => setTrackEmail(e.target.value)}
                    placeholder="din@mail.se"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>

                {trackMessage && (
                  <p
                    className={`text-sm ${
                      trackStatus === 'error'
                        ? 'text-red-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    {trackMessage}
                  </p>
                )}

                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsTrackModalOpen(false)}
                    className="text-sm font-medium text-slate-500 hover:text-slate-800"
                  >
                    Avbryt
                  </button>
                  <div className="flex items-center gap-2">
                    {trackStatus === 'success' && (
                      <button
                        type="submit"
                        className="text-xs text-slate-500 hover:text-slate-800 underline"
                      >
                        Hittade du inte länken? Skicka igen
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={trackStatus === 'loading'}
                      className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {trackStatus === 'loading'
                        ? 'Skickar länk…'
                        : 'Skicka länk'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 md:pt-16 pb-20 md:pb-28 grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Copy-sida */}
          <div className="order-1 md:order-1">
            {/* Badge – trygghet & erbjudande */}
            <div className="inline-flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-emerald-900/90">
              <span>EU261 / UK261</span>
              <span>•</span>
              <span>LÄGSTA AVGIFT</span>
              <span>•</span>
              <span>NO WIN, NO FEE</span>
            </div>

           <h1 className="mt-3 max-w-3xl text-[26px] sm:text-[30px] md:text-[38px] font-black leading-snug md:leading-tight tracking-[-0.5px] text-slate-950 drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
  Få upp till 600&nbsp;€ i ersättning för försenade eller inställda
  flyg – utan krångel.
</h1>


            <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-xl">
              Kolla om ditt{' '}
              <a
                href="/delays"
                className="hover:text-slate-900 transition-colors"
              >
                försenade flyg
              </a>{' '}
              eller{' '}
              <a
                href="/cancellations"
                className="hover:text-slate-900 transition-colors"
              >
                inställda flyg
              </a>{' '}
              ger rätt till ersättning enligt{' '}
              <a
                href="/rights"
                className="hover:text-slate-900 transition-colors"
              >
                EU261
              </a>
              . Vi hjälper dig att kräva ersättning från flygbolaget – du
              betalar bara om du får pengar utbetalda.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href="#precheck"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-md border border-slate-900 bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm whitespace-nowrap transition-all duration-150 ease-out hover:bg-slate-800 hover:shadow-md hover:-translate-y-[1px] active:scale-[0.98]"
              >
                Kolla mitt flyg nu
              </a>

              {/* Liten trygghetsrad under knappen */}
              <p className="mt-1 text-[11px] text-slate-700/80">
                Tar ca 2 minuter. Inget att betala om du inte får ersättning –{' '}
                <a href="/terms" className="underline">
                  läs mer om vår avgift (20 %).
                </a>
              </p>
            </div>
          </div>

          {/* Form-kortet */}
          <div
            id="precheck"
            className="order-2 md:order-2 mt-6 md:mt-0 w-full max-w-md md:max-w-none mx-auto
           rounded-2xl border border-white/40 bg-white/85 bg-clip-padding
           shadow-[0_28px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl
           p-5 sm:p-6 md:p-7"
          >
            {/* Steg-indikator */}
            <div className="mb-3 flex items-center justify-between text-[11px] font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <span
                  className={
                    step === 'quick'
                      ? 'inline-flex h-5 w-5 items-center justify-center rounded-full text-white text-[11px] font-semibold shadow-[0_2px_4px_rgba(0,0,0,0.15)] bg-gradient-to-br from-emerald-500 to-emerald-600'
                      : 'inline-flex h-5 w-5 items-center justify-center rounded-full text-emerald-700 text-[11px] font-semibold bg-emerald-100 shadow-inner'
                  }
                >
                  1
                </span>

                <span
                  className={
                    step === 'quick' ? 'text-slate-900' : 'text-slate-500'
                  }
                >
                  Kolla ditt flyg
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={
                    step === 'details'
                      ? 'inline-flex h-5 w-5 items-center justify-center rounded-full text-white text-[11px] font-semibold shadow-[0_2px_4px_rgba(0,0,0,0.15)] bg-gradient-to-br from-emerald-500 to-emerald-600'
                      : 'inline-flex h-5 w-5 items-center justify-center rounded-full text-emerald-700 text-[11px] font-semibold bg-emerald-100 shadow-inner'
                  }
                >
                  2
                </span>

                <span
                  className={
                    step === 'details' ? 'text-slate-900' : 'text-slate-500'
                  }
                >
                  Fyll i dina uppgifter
                </span>
              </div>
            </div>

            {/* Steg 1 – snabb förhandskontroll */}
            <div className="mb-5">
              <h3 className="text-base md:text-lg font-semibold mb-1">
                Snabb förhandskontroll
              </h3>
              <p className="text-[11px] md:text-xs text-slate-600 mb-4">
                Ange ditt flyg – vi gör en snabb bedömning om du kan ha rätt
                till ersättning enligt{' '}
                <a
                  href="/rights"
                  className="underline underline-offset-2 decoration-emerald-500/70"
                >
                  EU261
                </a>
                .
              </p>

              <form onSubmit={handleQuickCheck} className="grid grid-cols-1 gap-3">
                <Input
                  label="Flygnummer"
                  placeholder="t.ex. SK1420"
                  value={form.flightNumber}
                  onChange={(v) =>
                    setForm({ ...form, flightNumber: v.toUpperCase() })
                  }
                />
                <Input
                  label="Datum"
                  type="date"
                  value={form.date}
                  onChange={(v) => setForm({ ...form, date: v })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Från"
                    placeholder="CPH"
                    value={form.from}
                    onChange={(v) =>
                      setForm({ ...form, from: v.toUpperCase() })
                    }
                  />
                  <Input
                    label="Till"
                    placeholder="ARN"
                    value={form.to}
                    onChange={(v) =>
                      setForm({ ...form, to: v.toUpperCase() })
                    }
                  />
                </div>

                <div>
                  <span className="mb-1 block text-xs font-medium text-slate-800">
                    Mellanlandning
                  </span>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <label className="inline-flex items-center gap-1">
                      <input
                        type="radio"
                        name="connection"
                        value="direct"
                        checked={form.hasConnection === 'direct'}
                        onChange={() =>
                          setForm({
                            ...form,
                            hasConnection: 'direct',
                            connections: [''],
                          })
                        }
                      />
                      <span>Direktflyg</span>
                    </label>
                    <label className="inline-flex items-center gap-1">
                      <input
                        type="radio"
                        name="connection"
                        value="connection"
                        checked={form.hasConnection === 'connection'}
                        onChange={() =>
                          setForm({
                            ...form,
                            hasConnection: 'connection',
                            connections: form.connections.length
                              ? form.connections
                              : [''],
                          })
                        }
                      />
                      <span>Med mellanlandning</span>
                    </label>
                  </div>

                  {form.hasConnection === 'connection' && (
                    <div className="mt-2 space-y-2">
                      {form.connections.map((value, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => {
                              const next = [...form.connections];
                              next[index] = e.target.value;
                              setForm({ ...form, connections: next });
                            }}
                            placeholder="t.ex. FRA, DOH eller Paris CDG"
                            className="w-full rounded-lg border border-slate-300 bg-white/95 px-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                const next = form.connections.filter(
                                  (_, i) => i !== index
                                );
                                setForm({
                                  ...form,
                                  connections: next.length ? next : [''],
                                });
                              }}
                              className="text-[11px] text-slate-500 hover:text-red-600"
                            >
                              Ta bort
                            </button>
                          )}
                        </div>
                      ))}

                      {form.connections.length < 5 && (
                        <button
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              connections: [...form.connections, ''],
                            })
                          }
                          className="text-[11px] font-medium text-emerald-700 hover:text-emerald-800"
                        >
                          + Lägg till ytterligare en flygplats
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {quickMessage && (
                  <p
                    className={`text-xs ${
                      quickStatus === 'ineligible'
                        ? 'text-red-600'
                        : 'text-emerald-700'
                    }`}
                  >
                    {quickMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="
  inline-flex items-center justify-center
  w-full sm:w-auto
  rounded-xl px-5 py-2.5
  font-semibold text-sm
  text-white
  bg-emerald-600
  shadow-[0_2px_4px_rgba(0,0,0,0.06)]
  hover:bg-emerald-700 hover:shadow-[0_3px_6px_rgba(0,0,0,0.10)]
  active:scale-[0.98]
  transition-all duration-150
  disabled:opacity-60 disabled:cursor-not-allowed
"
                  disabled={quickStatus === 'checking'}
                >
                  {quickStatus === 'checking'
                    ? 'Kontrollerar…'
                    : 'Kolla mitt flyg'}
                </button>
              </form>
            </div>

            {/* Steg 2 – detaljer */}
            {step === 'details' && (
              <>
                <div className="h-px bg-slate-200 my-3" />
                <form
                  onSubmit={handleFullSubmit}
                  className="grid grid-cols-1 gap-3"
                >
                  <h3 className="text-sm font-semibold text-slate-900">
                    Dina uppgifter
                  </h3>
                  <Input
                    label="Fullständigt namn"
                    placeholder="Ditt namn"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                  />
                  <Input
                    label="E-post"
                    type="email"
                    placeholder="din@mail.se"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                  />
                  <Input
                    label="Telefonnummer"
                    type="tel"
                    placeholder="+46 70 123 45 67"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                  />
                  <Input
                    label="Bokningsnummer"
                    placeholder="ABC123"
                    value={form.bookingNumber}
                    onChange={(v) =>
                      setForm({ ...form, bookingNumber: v })
                    }
                  />

                  {err && (
                    <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                      {err}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="
  inline-flex items-center justify-center
  w-full sm:w-auto
  rounded-xl px-5 py-2.5
  font-semibold text-sm
  text-white
  bg-emerald-600
  shadow-[0_2px_4px_rgba(0,0,0,0.06)]
  hover:bg-emerald-700 hover:shadow-[0_3px_6px_rgba(0,0,0,0.10)]
  active:scale-[0.98]
  transition-all duration-150
  disabled:opacity-60 disabled:cursor-not-allowed
"
                  >
                    {loading ? 'Skickar in ärendet…' : 'Skicka in ärendet'}
                  </button>

                  <p className="mt-1 text-[11px] text-slate-600">
                    Genom att skicka godkänner du våra{' '}
                    <a className="underline" href="/terms">
                      Terms
                    </a>{' '}
                    &{' '}
                    <a className="underline" href="/privacy">
                      Privacy
                    </a>
                    .
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100">
                      GDPR-anpassat
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100">
                      No win, no fee –{' '}
                      <span className="font-semibold">20 % vid vinst</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100">
                      Snabb handläggning
                    </span>
                  </div>
                </form>
              </>
            )}
          </div>
        </section>

        {/* Läs mer – precis vid kanten innan man scrollar till stegen */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 mb-4 flex justify-center">
          <a
            href="#how"
            className="inline-flex items-center gap-1 text-[15px] font-semibold text-slate-800 hover:text-slate-900 transition-colors"
          >
            Läs mer
            <span className="text-slate-400 text-base animate-bounce">↓</span>
          </a>
        </div>

        {/* Dina 3 enkla steg – ljusgrå band-sektion */}
        <section id="how" className="bg-slate-50/80 border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
            {/* Header */}
            <div className="mb-8 md:mb-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-slate-200 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-600 uppercase">
                  Så funkar det
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
                Dina 3 enkla steg till kompensation
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                Vi gör processen så enkel som möjligt: du skickar in ditt flyg,
                vi tar fighten med flygbolaget och du får ersättningen utbetald
                enligt{' '}
                <a
                  href="/rights"
                  className="hover:text-slate-900 transition-colors"

                >
                  dina rättigheter i EU261
                </a>
                .
              </p>
            </div>

            {/* Steg-lista */}
            <div className="grid gap-8 md:grid-cols-3 md:gap-10">
              <div className="relative">
                <div className="absolute -left-3 top-1 hidden h-10 w-px bg-gradient-to-b from-emerald-500/60 via-emerald-400/40 to-transparent md:block" />
                <CardStep
                  n="1"
                  title="Skicka in ditt flyg"
                  icon={<IconStep1 className="h-4 w-4 text-emerald-600" />}
                >
                  Fyll i flygnummer, datum och rutt. Vi gör en snabb
                  förhandskoll och bekräftar om ditt ärende kan vara
                  ersättningsberättigat enligt EU261.
                </CardStep>
              </div>

              <div className="relative">
                <div className="absolute -left-3 top-1 hidden h-10 w-px bg-gradient-to-b from-emerald-500/60 via-emerald-400/40 to-transparent md:block" />
                <CardStep
                  n="2"
                  title="Vi driver ärendet"
                  icon={<IconStep2 className="h-4 w-4 text-emerald-600" />}
                >
                  Du lägger till dina uppgifter och bilagor. Vi kontaktar
                  flygbolaget, sköter allt formellt och håller dig uppdaterad
                  längs vägen via mail och din ärendesida.
                </CardStep>
              </div>

              <div className="relative">
                <div className="absolute -left-3 top-1 hidden h-10 w-px bg-gradient-to-b from-emerald-500/60 via-emerald-400/40 to-transparent md:block" />
                <CardStep
                  n="3"
                  title="Du får din ersättning"
                  icon={<IconStep3 className="h-4 w-4 text-emerald-600" />}
                >
                  När flygbolaget betalar gör vi en utbetalning till dig, minus
                  vår avgift. Inget resultat – ingen avgift. Du får en tydlig
                  sammanställning på vad som betalats ut.
                </CardStep>
              </div>
            </div>

            {/* Subtil divider mot nästa sektion */}
            <div className="mt-12 flex justify-center">
              <div className="h-px w-16 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-full" />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* ⭐ ULTRA CLEAN TRUST ROW – No background boxes */}
        {/* ---------------------------------------------------- */}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 text-[14px] font-semibold text-slate-900">
            <div className="flex justify-start items-center gap-2">
              <span className="text-emerald-600 text-lg">✓</span>
              <a
                href="/rights"
                className="hover:text-slate-950 transition-colors"
              >
                EU261–rättigheter
              </a>
            </div>

            <div className="flex justify-center items-center gap-2 mt-3 sm:mt-0">
              <span className="text-emerald-600 text-lg">✓</span>
              <a
                href="/terms"
                className="hover:text-slate-950 transition-colors"
              >
                No win, no fee (20 %)
              </a>
            </div>

            <div className="flex justify-end items-center gap-2 mt-3 sm:mt-0">
              <span className="text-emerald-600 text-lg">✓</span>
              <span>GDPR-säker hantering</span>
            </div>
          </div>
        </div>

        {/* Varför välja FlightClaimly – vit sektion */}
        <section id="why" className="bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-18 pb-16 md:pt-20 md:pb-20">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
                Varför välja FlightClaimly?
              </h2>
            </div>

            <div className="grid gap-10 md:grid-cols-3 md:gap-12">
              {/* Peace of mind */}
              <div className="max-w-sm">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 mb-2">
                  Peace of mind
                </div>
                <h3 className="text-[16px] font-semibold text-slate-900 mb-2">
                  Vi tar fighten – du kan slappna av
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Vi sköter all kontakt med flygbolaget åt dig. Inga långa
                  mejltrådar, ingen juridisk djungel – du får tydliga
                  statusuppdateringar och kan fokusera på jobbet, familjen
                  eller nästa resa.
                </p>
              </div>

              {/* Lägst avgift */}
              <div className="max-w-sm">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 mb-2">
                  Lägst avgift
                </div>
                <h3 className="text-[16px] font-semibold text-slate-900 mb-2">
                  Mer pengar i fickan än hos konkurrenterna
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Vår standardavgift är 20&nbsp;% – bland de lägsta i Norden.
                  Många konkurrenter tar mer betalt eller gömmer kostnader i
                  det finstilta. Vi är transparenta med våra villkor och du
                  behåller en större del av din ersättning.
                </p>
              </div>

              {/* Smart & rättvist */}
              <div className="max-w-sm">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 mb-2">
                  Smart &amp; rättvist
                </div>
                <h3 className="text-[16px] font-semibold text-slate-900 mb-2">
                  Automatiserat där det går – jurist när det behövs
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Vi använder smart teknik för att snabba upp processen i
                  enkla fall. Behövs jurist tar vi kostnaden uppfront och drar
                  den endast vid vinst. Du betalar aldrig ur egen ficka och får
                  alltid veta villkoren i förväg.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GLOBAL FOOTER */}
        <footer className="bg-slate-950 text-slate-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-12">
            <div className="grid gap-10 md:grid-cols-4 md:gap-8">
              {/* Brand + pitch */}
              <div className="md:col-span-2 space-y-3">
                <Link href="/" className="inline-flex items-center gap-2">
                  <span className="text-sm font-semibold tracking-[0.2em] text-emerald-400 uppercase">
                    FLIGHTCLAIMLY
                  </span>
                </Link>
                <p className="text-sm text-slate-400 max-w-md">
                  Vi hjälper resenärer att få den ersättning de har rätt till
                  enligt EU261 – utan förskottskostnader, dolda avgifter eller
                  juridiskt krångel.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                  <span className="inline-flex items-center rounded-full border border-slate-700/70 px-2 py-1">
                    No win, no fee – 20&nbsp;%
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-700/70 px-2 py-1">
                    EU261 / UK261
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-700/70 px-2 py-1">
                    GDPR-anpassad hantering
                  </span>
                </div>
              </div>

              {/* Länkar – tjänster */}
              <div>
                <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-400 mb-3">
                  Tjänster
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#how"
                      className="hover:text-white transition-colors"
                    >
                      Få kompensation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/delays"
                      className="hover:text-white transition-colors"
                    >
                      Flygförseningar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cancellations"
                      className="hover:text-white transition-colors"
                    >
                      Flyginställningar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/rights"
                      className="hover:text-white transition-colors"
                    >
                      Dina rättigheter (EU261)
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Länkar – bolag & kontakt */}
              <div>
                <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-400 mb-3">
                  Om FlightClaimly
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-white transition-colors"
                    >
                      Om oss
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="hover:text-white transition-colors"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-white transition-colors"
                    >
                      Kontakt
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="hover:text-white transition-colors"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="hover:text-white transition-colors"
                    >
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-8 border-t border-slate-800 pt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} FlightClaimly. Alla rättigheter
                förbehållna.
              </p>
              <p className="text-xs text-slate-500">
                FlightClaimly är en fristående aktör och inte affilierad med
                flygbolagen. Vi arbetar på uppdrag av dig som resenär.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* ---------- Tiny UI bits ---------- */
function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-800 tracking-tight">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full px-3.5 py-2.5
          rounded-xl
          border border-slate-300/80 
          bg-white/90 backdrop-blur-sm
          text-slate-900 text-sm
          shadow-[0_1px_2px_rgba(0,0,0,0.03)]
          transition-all duration-150
          placeholder:text-slate-400

          focus:border-emerald-500
          focus:ring-2 focus:ring-emerald-500/20
          focus:bg-white
        "
      />
    </label>
  );
}

function CardStep({
  n,
  title,
  icon,
  children,
}: {
  n: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      {/* Rad 1: ikon + STEG X */}
      <div className="flex items-center gap-2">
        {icon && <span className="inline-flex">{icon}</span>}
        <span className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase">
          Steg {n}
        </span>
      </div>

      {/* Rad 2: rubriken */}
      <h3 className="text-base sm:text-lg font-semibold text-slate-900">
        {title}
      </h3>

      {/* Rad 3: brödtext */}
      <p className="mt-4 text-sm sm:text-base text-slate-700/95 leading-relaxed max-w-xl">
        {children}
      </p>
    </div>
  );
}

function IconStep1(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
      className={props.className ?? 'h-6 w-6'}
    >
      <circle
        cx="12"
        cy="12"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
      />
      <path
        d="M12 4.5v3M12 16.5v3M7.5 12h-3M19.5 12h-3"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <path
        d="M9 15.5l1.8-2 1.4 1.3 2.9-3.3"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconStep2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
      className={props.className ?? 'h-6 w-6'}
    >
      {/* Sköld */}
      <path
        d="M12 4.5l5 2v5.2c0 3.1-2.1 5.5-5 6.8-2.9-1.3-5-3.7-5-6.8v-5.2l5-2z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      {/* Penna */}
      <path
        d="M9.2 13.8l5-5 1.7 1.7-5 5-2.2.5.5-2.2z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconStep3(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
      className={props.className ?? 'h-6 w-6'}
    >
      {/* Staplar */}
      <rect
        x="4"
        y="11"
        width="3"
        height="7"
        rx="0.8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
      />
      <rect
        x="9.5"
        y="9"
        width="3"
        height="9"
        rx="0.8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
      />
      <rect
        x="15"
        y="7"
        width="3"
        height="11"
        rx="0.8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
      />
      {/* Pil uppåt */}
      <path
        d="M8.5 6.5 12 3l3.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3v5"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </svg>
  );
}
