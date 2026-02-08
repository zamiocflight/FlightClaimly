'use client';

import React, { FormEvent, useState, useRef } from 'react';
import Image from 'next/image';
import { Link } from '../../i18n/navigation';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import AirportInput from '@/components/AirportInput';




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
  const t = useTranslations();
  const locale = useLocale();


  const [form, setForm] = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // resten av din kod är oförändrad

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

  // 🔹 Ref för steg 2 – så vi kan scrolla ned dit
  const detailsRef = useRef<HTMLDivElement | null>(null);

  // ✅ NYTT: minimal flightNumber-validering (v1)
  // Accept: "SK123", "LH 400", "FR1234" etc. (2–3 bokstäver + 1–4 siffror)
  function isValidFlightNumber(input: string) {
    const s = input.trim().toUpperCase().replace(/\s+/g, '');
    return /^[A-Z]{2,3}\d{1,4}$/.test(s);
  }

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
        setTrackMessage(data?.error || t('track.messages.errorGeneric'));
        return;
      }

      setTrackStatus('success');
      setTrackMessage(t('track.messages.success'));
    } catch (e) {
      console.error(e);
      setTrackStatus('error');
      setTrackMessage(t('track.messages.errorTechnical'));
    }
  }

  // 🔹 Steg 1 – snabb koll (frontend-logik)
async function handleQuickCheck(e: FormEvent) {
  e.preventDefault();
  setQuickMessage(null);
  setQuickStatus('checking');

  const { flightNumber, date, from, to } = form;

  if (!flightNumber || !date || !from || !to) {
    setQuickStatus('ineligible');
    setQuickMessage(t('precheck.quick.frontend.missingFields'));
    return;
  }

  // ✅ Flight number format check (v1)
  if (!isValidFlightNumber(flightNumber)) {
    setQuickStatus('ineligible');
    setQuickMessage(t('errors.invalidFlightNumber'));
    return;
  }

  try {
    const res = await fetch('/api/flight/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        flightNumber,
        date,
        from,
        to,
      }),
    });

    const data = await res.json();

    if (data?.matched && data.arrivalDelayMinutes >= 180) {
      // ✅ Eligible → visa grön info + gå vidare till steg 2
      setQuickStatus('eligible');
      setQuickMessage(t('precheck.quick.result.eligible'));

      setStep('details');

      if (detailsRef.current) {
        const rect = detailsRef.current.getBoundingClientRect();
        const offset = 140;
        const targetY = rect.top + window.scrollY - offset;

        window.scrollTo({
          top: targetY,
          behavior: 'smooth',
        });
      }
    } else {
      // ⚠️ Ej bekräftad 3h+ → neutral/ineligible copy
      setQuickStatus('ineligible');
      setQuickMessage(t('precheck.quick.result.notConfirmed'));
    }
  } catch (err) {
    setQuickStatus('ineligible');
    setQuickMessage(t('errors.generic'));
  }
}


  // 🔹 Steg 2 – skicka in ärendet
  async function submit() {
    setErr(null);
    setLoading(true);
    try {
      const r = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
  ...form,
  locale,
}),

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
        throw new Error(serverMsg || t('errors.sendFailed'));
      }

      const data = await r.json();

      const id =
        data?.id ||
        data?.claim?.receivedAt ||
        data?.claim?.id ||
        data?.claim?.received_at ||
        data?.receivedAt;

      if (!id) throw new Error(t('errors.noClaimId'));
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
      setErr(e?.message ?? t('errors.network'));
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
    <>
      <div
    aria-hidden
    className="
      pointer-events-none
      fixed inset-0
      z-0
      bg-[radial-gradient(1200px_600px_at_50%_-200px,rgba(255,245,230,0.35),transparent_60%)]
    "
  />

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
<header
  className="
    relative overflow-hidden
    w-full
    px-4 sm:px-6
    py-[6px] md:py-[10px]
    flex items-center justify-between
    bg-gradient-to-b
    from-[#050B1A]
    to-[#040813]
    border-b border-white/5
    animate-[headerGlow_14s_ease-in-out_infinite]
  "
>
  {/* Night filter (milt) */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[#FFF6E8]/6" />


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
<div className="hidden md:flex items-center gap-6 fc-desktop-navwrap">
  {/* ✅ fc-desktop-nav = hook för DE-only CSS (påverkar inte andra språk) */}
<nav className="flex items-center gap-8 text-[14px] font-semibold text-white/75 fc-desktop-nav whitespace-nowrap">
    <a href="#how" className="hover:text-white transition-colors">
      {t('nav.compensation')}
    </a>

    <Link href="/delays" className="hover:text-white transition-colors">
      {t('nav.delays')}
    </Link>

    <Link href="/cancellations" className="hover:text-white transition-colors">
      {t('nav.cancellations')}
    </Link>

    <Link href="/rights" className="hover:text-white transition-colors">
      {t('nav.rights')}
    </Link>

    <Link href="/faq" className="hover:text-white transition-colors">
      {t('nav.faq')}
    </Link>

    <Link href="/about" className="hover:text-white transition-colors">
      {t('nav.about')}
    </Link>

    <Link href="/contact" className="hover:text-white transition-colors">
      {t('nav.contact')}
    </Link>
  </nav>

 <LanguageSwitcher />


  {/* Följ ärende */}
  {/* ✅ fc-track-btn = hook för DE-only CSS för att minska knappen */}
<button
  type="button"
  onClick={openTrackModal}
  className="
  inline-flex items-center gap-2
  rounded-lg
  border border-white/90
  bg-transparent
  px-4 py-2
  text-[14px] font-semibold
  text-white
  transition
  hover:bg-white/10
  fc-track-btn
  whitespace-nowrap
"

>

    <UserCircleIcon className="h-5 w-5 text-white" />
    {t('track.button')}
  </button>
</div>


{/* Mobil: header actions (språk + hamburger) */}
<div className="md:hidden flex items-center gap-2">
  <LanguageSwitcher compact />


  <button
    type="button"
    className="inline-flex items-center justify-center px-2.5 py-2 text-white"
    onClick={() => setIsMobileNavOpen(true)}
    aria-label={t('mobileNav.openAria')}
  >
    <span className="sr-only">{t('mobileNav.openSr')}</span>
    <span className="flex flex-col gap-1.5">
<span className="block h-[2px] w-5 rounded-full bg-white/90" />
<span className="block h-[2px] w-5 rounded-full bg-white/90" />
<span className="block h-[2px] w-5 rounded-full bg-white/90" />
    </span>
  </button>
</div>
{/* Subtil highlight under header */}
<div className="pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
</header>

{/* Mobil: slide-over-meny */}
{isMobileNavOpen && (
  <div className="fixed inset-0 z-40 flex md:hidden">
    <div
      className="flex-1 bg-black/40"
      onClick={() => setIsMobileNavOpen(false)}
    />

    <div className="w-72 max-w-full h-full bg-white shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200">
        <span className="text-sm font-semibold text-slate-900">
          {t('mobileNav.title')}
        </span>
        <button
          type="button"
          onClick={() => setIsMobileNavOpen(false)}
          className="text-slate-400 hover:text-slate-700"
          aria-label={t('mobileNav.closeAria')}
        >
          ✕
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2 text-[15px] font-medium text-slate-900">
        <a href="#how" className="block py-1.5" onClick={() => setIsMobileNavOpen(false)}>
          {t('nav.compensation')}
        </a>
        <a href="/delays" className="block py-1.5" onClick={() => setIsMobileNavOpen(false)}>
          {t('nav.delays')}
        </a>
        <a href="/cancellations" className="block py-1.5" onClick={() => setIsMobileNavOpen(false)}>
          {t('nav.cancellations')}
        </a>
        <a href="/rights" className="block py-1.5" onClick={() => setIsMobileNavOpen(false)}>
          {t('nav.rights')}
        </a>
        <a href="/faq" className="block py-1.5" onClick={() => setIsMobileNavOpen(false)}>
          {t('nav.faq')}
        </a>
        <a href="/about" className="block py-1.5" onClick={() => setIsMobileNavOpen(false)}>
          {t('nav.about')}
        </a>
        <a href="/contact" className="block py-1.5" onClick={() => setIsMobileNavOpen(false)}>
          {t('nav.contact')}
        </a>
      </nav>

      {/* Track claim */}
      <div className="px-4 pb-6 pt-2 border-t border-slate-200">
        <button
          type="button"
          onClick={openTrackModal}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
        >
          <UserCircleIcon className="h-5 w-5" />
          {t('track.button')}
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
                    {t('track.title')}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {t('track.description')}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsTrackModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-lg leading-none"
                  aria-label={t('track.closeAria')}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleTrackSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    {t('track.emailLabel')}
                  </label>
                  <input
                    type="email"
                    required
                    value={trackEmail}
                    onChange={(e) => setTrackEmail(e.target.value)}
                    placeholder={t('track.emailPlaceholder')}
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
                    {t('track.cancel')}
                  </button>
                  <div className="flex items-center gap-2">
                    {trackStatus === 'success' && (
                      <button
                        type="submit"
                        className="text-xs text-slate-500 hover:text-slate-800 underline"
                      >
                        {t('track.resend')}
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={trackStatus === 'loading'}
                      className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {trackStatus === 'loading'
                        ? t('track.sending')
                        : t('track.send')}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Hero */}
<section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-14 md:pt-18 pb-16 md:pb-24 space-y-10">
{/* Hero Card – Step A */}
<div className="relative">
<div
  className="
    relative
    mx-auto max-w-5xl
    rounded-3xl
    bg-gradient-to-br
  bg-gradient-to-b
from-[#0A1120]   /* matchar header */
via-[#0C1830]
to-[#061028]     /* djupare botten */
    shadow-[0_30px_110px_rgba(15,60,120,0.28)]
    px-6 py-16
    sm:px-12 sm:py-24
    overflow-hidden
  "
>

<div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(60%_40%_at_0%_0%,rgba(10,17,32,0.6)_0%,transparent_60%)]" />
<div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/2 via-transparent to-black/40" />
<div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
<div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(80%_60%_at_50%_30%,rgba(255,255,255,0.05)_0%,transparent_60%)]" />



    {/* Trust badges */}
<div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-[#2DFF9C]/90">
      <span>EU261/UK261</span>
      <span>•</span>
      <span>NO WIN, NO FEE</span>
      <span>•</span>
      <span>1 MINUTE FREE CHECK</span>
    </div>

    {/* Headline */}
<h1 className="max-w-4xl font-black tracking-tight text-white/85">
      <span className="block text-[30px] sm:text-[36px] md:text-[44px] leading-tight">
        Get up to €600 in compensation
      </span>
<span className="mt-1 block text-[28px] sm:text-[34px] md:text-[42px] leading-tight text-white/80">
        for delayed or cancelled flights!
      </span>
    </h1>
<p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
  {t('hero.subtitle.beforeDelayed')}{' '}
  <span className="font-medium">
    {t('hero.subtitle.delayedLink')}
  </span>{' '}
  {t('hero.subtitle.between')}{' '}
  <span className="font-medium">
    {t('hero.subtitle.cancelledLink')}
  </span>{' '}
  {t('hero.subtitle.afterCancelled')}{' '}
  <span className="font-medium">
    {t('hero.subtitle.eu261Link')}
  </span>
  {t('hero.subtitle.afterEu261')}
</p>

    {/* Unified Inputs + CTA (AirHelp-style) */}
<form
  onSubmit={(e) => {
    e.preventDefault();
    
console.log("FROM:", form.from, "TO:", form.to);

    if (!form.from || !form.to) {
      return;
    }

    const params = new URLSearchParams({
      from: form.from,
      to: form.to,
    });

    window.location.href = `/${locale}/check?${params.toString()}`;
  }}
  className="mt-10"
>

  <div className="
    flex items-stretch
    rounded-2xl
    bg-white/90 backdrop-blur-sm
    shadow-[0_20px_60px_rgba(15,23,42,0.18)]
    overflow-visable
  ">
    {/* FROM */}
    <div className="flex-1 px-5 py-4">
      <AirportInput
        label="Departure airport"
        placeholder="Departure airport"
        value={form.from}
        onSelect={(iata) => setForm({ ...form, from: iata })}
        variant="unstyled"
      />
    </div>

   {/* Divider */}
<div className="w-px bg-gradient-to-b from-white/90 via-white/60 to-white/90 my-3" />

    {/* TO */}
    <div className="flex-1 px-5 py-4">
      <AirportInput
        label="Final destination airport"
        placeholder="Final destination airport"
        value={form.to}
        onSelect={(iata) => setForm({ ...form, to: iata })}
        variant="unstyled"
      />
    </div>

    {/* CTA */}
 <button
  type="submit"
  className="
    m-2
    px-8
    rounded-xl
    bg-[#22E3A5]
    text-slate-900
    text-base
    font-semibold
    shadow-[0_6px_18px_rgba(16,185,129,0.28)]
    transition
    hover:shadow-[0_0_0_6px_rgba(34,227,165,0.14)]
    hover:bg-[#1FD39A]
    active:scale-[0.98]
    whitespace-nowrap
  "
>
  Check compensation
</button>

  </div>
</form>


  </div>
</div>


        </section>

        {/* Läs mer – precis vid kanten innan man scrollar till stegen */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-2 mb-4 flex justify-center">
          <a
            href="#how"
            className="inline-flex items-center gap-1 text-[15px] font-semibold text-slate-800 hover:text-slate-900 transition-colors"
          >
            {t('sections.readMore')}
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
                  {t('how.badge')}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
                {t('how.title')}
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                {t('how.desc.before')}{' '}
                <a href="/rights" className="hover:text-slate-900 transition-colors">
                  {t('how.desc.link')}
                </a>
                {t('how.desc.after')}
              </p>
            </div>

            {/* Steg-lista */}
            <div className="grid gap-8 md:grid-cols-3 md:gap-10">
              <div className="relative">
                <div className="absolute -left-3 top-1 hidden h-10 w-px bg-gradient-to-b from-emerald-500/60 via-emerald-400/40 to-transparent md:block" />
                <CardStep
                  n="1"
                  title={t('how.steps.1.title')}
                  icon={<IconStep1 className="h-4 w-4 text-emerald-600" />}
                >
                  {t('how.steps.1.body')}
                </CardStep>
              </div>

              <div className="relative">
                <div className="absolute -left-3 top-1 hidden h-10 w-px bg-gradient-to-b from-emerald-500/60 via-emerald-400/40 to-transparent md:block" />
                <CardStep
                  n="2"
                  title={t('how.steps.2.title')}
                  icon={<IconStep2 className="h-4 w-4 text-emerald-600" />}
                >
                  {t('how.steps.2.body')}
                </CardStep>
              </div>

              <div className="relative">
                <div className="absolute -left-3 top-1 hidden h-10 w-px bg-gradient-to-b from-emerald-500/60 via-emerald-400/40 to-transparent md:block" />
                <CardStep
                  n="3"
                  title={t('how.steps.3.title')}
                  icon={<IconStep3 className="h-4 w-4 text-emerald-600" />}
                >
                  {t('how.steps.3.body')}
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
              <a href="/rights" className="hover:text-slate-950 transition-colors">
                {t('trustRow.eu261')}
              </a>
            </div>

            <div className="flex justify-center items-center gap-2 mt-3 sm:mt-0">
              <span className="text-emerald-600 text-lg">✓</span>
              <a href="/terms" className="hover:text-slate-950 transition-colors">
                {t('trustRow.lowFee')}
              </a>
            </div>

            <div className="flex justify-end items-center gap-2 mt-3 sm:mt-0">
              <span className="text-emerald-600 text-lg">✓</span>
              <span>{t('trustRow.gdpr')}</span>
            </div>
          </div>
        </div>

        {/* Varför välja FlightClaimly – vit sektion */}
        <section id="why" className="bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-18 pb-16 md:pt-20 md:pb-20">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
                {t('why.title')}
              </h2>
            </div>

            <div className="grid gap-10 md:grid-cols-3 md:gap-12">
              {/* Peace of mind */}
              <div className="max-w-sm">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 mb-2">
                  {t('why.cards.peace.badge')}
                </div>
                <h3 className="text-[16px] font-semibold text-slate-900 mb-2">
                  {t('why.cards.peace.title')}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {t('why.cards.peace.body')}
                </p>
              </div>

              {/* Lägst avgift */}
              <div className="max-w-sm">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 mb-2">
                  {t('why.cards.fee.badge')}
                </div>
                <h3 className="text-[16px] font-semibold text-slate-900 mb-2">
                  {t('why.cards.fee.title')}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {t('why.cards.fee.body')}
                </p>
              </div>

              {/* Smart & rättvist */}
              <div className="max-w-sm">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 mb-2">
                  {t('why.cards.smart.badge')}
                </div>
                <h3 className="text-[16px] font-semibold text-slate-900 mb-2">
                  {t('why.cards.smart.title')}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {t('why.cards.smart.body')}
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
                  {t('footer.pitch')}
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                  <span className="inline-flex items-center rounded-full border border-slate-700/70 px-2 py-1">
                    {t('footer.badges.lowFee')}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-700/70 px-2 py-1">
                    {t('footer.badges.eu')}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-700/70 px-2 py-1">
                    {t('footer.badges.gdpr')}
                  </span>
                </div>
              </div>

              {/* Länkar – tjänster */}
              <div>
                <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-400 mb-3">
                  {t('footer.columns.services')}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#how" className="hover:text-white transition-colors">
                      {t('nav.compensation')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/delays" className="hover:text-white transition-colors">
                      {t('nav.delays')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cancellations"
                      className="hover:text-white transition-colors"
                    >
                      {t('nav.cancellations')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/rights" className="hover:text-white transition-colors">
                      {t('footer.links.rightsLabel')}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Länkar – bolag & kontakt */}
              <div>
                <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-400 mb-3">
                  {t('footer.columns.company')}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/about" className="hover:text-white transition-colors">
                      {t('nav.about')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-white transition-colors">
                      {t('nav.faq')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white transition-colors">
                      {t('nav.contact')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-white transition-colors">
                      {t('footer.links.terms')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-white transition-colors">
                      {t('footer.links.privacy')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-8 border-t border-slate-800 pt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p className="text-xs text-slate-500">
                {t('footer.bottom.copyright', { year: new Date().getFullYear() })}
              </p>
              <p className="text-xs text-slate-500">{t('footer.bottom.disclaimer')}</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
      </>
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
<span className="mb-1 block text-sm font-semibold tracking-tight text-slate-900">
        {label}
      </span>
      <input
  type={type}
  value={value}
  onChange={(e) => onChange(e.target.value)}
  placeholder={placeholder}
  className={`
    w-full h-11
    rounded-lg
    border border-slate-300
    bg-white
    px-3
    text-base
    ${type === 'date' ? 'text-slate-400' : 'text-slate-900'}
    placeholder:text-slate-400
    focus:outline-none
    focus:ring-0
    focus:border-slate-900
  `}
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
  const t = useTranslations();

  return (
    <div className="space-y-2">
      {/* Rad 1: ikon + STEG X */}
      <div className="flex items-center gap-2">
        {icon && <span className="inline-flex">{icon}</span>}
        <span className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase">
          {t('how.stepLabel', { n })}
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
  