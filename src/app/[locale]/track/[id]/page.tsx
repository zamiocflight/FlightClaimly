// src/app/track/[id]/page.tsx
'use client';

import React, { useEffect, useState, use } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type PublicClaim = {
  id: string;
  status: string;
  flightNumber: string;
  from: string;
  to: string;
  date: string | null;
  bookingNumber: string;
  receivedAt: string;
  attachmentsSummary?: { filename: string; uploadedAt: string }[];
  sentToAirlineAt?: string | null; // 👈 NYTT
};

type Lang = 'sv' | 'en';

const texts = {
  sv: {
    brand: 'FLIGHTCLAIMLY',
    title: 'Följ ditt ärende',
    subtitle: 'Se status, tidslinje och viktig information om ditt ärende.',
    caseId: 'ÄRENDE-ID',
    receivedAt: 'Mottaget',
    status: 'Status',
    statusHelp:
      'Vi uppdaterar statusen här när ditt ärende går vidare i processen.',
    statusRejectedNote:
      'Detta ärende har avslagits av flygbolaget eller efter granskning.',
    flightDetails: 'Flygdetaljer',
    flightLabel: 'Flyg',
    routeLabel: 'Rutt',
    dateLabel: 'Datum',
    bookingLabel: 'Bokningsnummer',
    timeline: 'Tidslinje',
    tlCreatedTitle: 'Ärende skapat',
    tlCreatedText: 'Vi har mottagit ditt ärende och påbörjat hanteringen.',
    tlReviewTitle: 'Under behandling',
    tlReviewText:
      'Vi går igenom ditt underlag och säkerställer att all information stämmer.',
    tlSentTitle: 'Skickat till flygbolaget',
    tlSentText: 'Vi har kontaktat flygbolaget med ditt ersättningskrav.',
    tlPaidTitle: 'Ersättning utbetald',
    tlPaidText: 'Ärendet är klart och ersättning har betalats ut.',
    loading: 'Laddar ditt ärende…',
    errorTitle: 'Kunde inte visa ärendet',
    errorGeneric: 'Okänt fel.',
    errorMissingLink: 'Ogiltig eller ofullständig länk.',
    errorNotFound:
      'Ärendet kunde inte hittas. Kontrollera att länken är korrekt.',
    errorBadRequest: 'Länken saknar nödvändig information.',
    errorTech: 'Tekniskt fel – försök igen senare.',
    errorHelpText:
      'Om problemet kvarstår, svara på mailet du fick när du skapade ärendet så hjälper vi dig vidare.',
    langLabel: 'Språk',
    langSv: 'Svenska',
    langEn: 'Engelska',
    docsTitle: 'Dokument',
    docsReceivedPrefix: 'Vi har mottagit',
    docsAttachmentsSingular: 'bilaga',
    docsAttachmentsPlural: 'bilagor',
    docsSecurityNote:
      'Av säkerhetsskäl kan dokumenten bara nås internt av FlightClaimly.',
    docsNone: 'Vi har ännu inte mottagit några dokument.',
    backHome: 'Till startsidan',
    supportHint:
      'Behöver du hjälp? Svara på något av våra mail så hjälper vi dig vidare.',
  },
  en: {
    brand: 'FLIGHTCLAIMLY',
    title: 'Track your claim',
    subtitle: 'See status, timeline and key information about your claim.',
    caseId: 'CASE ID',
    receivedAt: 'Received',
    status: 'Status',
    statusHelp: 'We will update the status here as your case progresses.',
    statusRejectedNote:
      'This claim has been rejected by the airline or after review.',
    flightDetails: 'Flight details',
    flightLabel: 'Flight',
    routeLabel: 'Route',
    dateLabel: 'Date',
    bookingLabel: 'Booking reference',
    timeline: 'Timeline',
    tlCreatedTitle: 'Case created',
    tlCreatedText:
      'We have received your case and started the handling process.',
    tlReviewTitle: 'In review',
    tlReviewText:
      'We are reviewing your documents and verifying the information.',
    tlSentTitle: 'Sent to airline',
    tlSentText: 'We have submitted your claim to the airline.',
    tlPaidTitle: 'Compensation paid',
    tlPaidText: 'The case is complete and compensation has been paid out.',
    loading: 'Loading your case…',
    errorTitle: 'Unable to show your case',
    errorGeneric: 'Unknown error.',
    errorMissingLink: 'Invalid or incomplete link.',
    errorNotFound:
      'The case could not be found. Please check that the link is correct.',
    errorBadRequest: 'The link is missing required information.',
    errorTech: 'Technical error – please try again later.',
    errorHelpText:
      'If the problem persists, reply to the email you received when you created the case and we will help you.',
    langLabel: 'Language',
    langSv: 'Swedish',
    langEn: 'English',
    docsTitle: 'Documents',
    docsReceivedPrefix: 'We have received',
    docsAttachmentsSingular: 'attachment',
    docsAttachmentsPlural: 'attachments',
    docsSecurityNote:
      'For security reasons, downloads are only available internally.',
    docsNone: 'We have not received any documents yet.',
    backHome: 'Back to home',
    supportHint:
      'Need help? Reply to any of our emails and we will assist you.',
  },
} satisfies Record<Lang, any>;

export default function TrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Next 15: params är en Promise → unwrap med use()
  const { id } = use(params);

  const searchParams = useSearchParams();
  const token = searchParams.get('t');

  // Läs ev. ?lang=en som initialt värde, men byt språk via state
  const initialLangParam = searchParams.get('lang');
  const [lang, setLang] = useState<Lang>(
    initialLangParam === 'en' ? 'en' : 'sv',
  );
  const t = texts[lang];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claim, setClaim] = useState<PublicClaim | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = token ? `?t=${encodeURIComponent(token)}` : '';
        const res = await fetch(
          `/api/claims/${encodeURIComponent(id)}/public${query}`,
          { cache: 'no-store' },
        );

        if (!res.ok) {
          if (res.status === 404) {
            setError(texts.sv.errorNotFound); // defaulta på svenska
          } else if (res.status === 400) {
            setError(texts.sv.errorBadRequest);
          } else {
            setError(texts.sv.errorTech);
          }
          setLoading(false);
          return;
        }

        const data = (await res.json()) as PublicClaim;
        setClaim(data);
        setLoading(false);
      } catch (e) {
        console.error('Error fetching claim:', e);
        setError(texts.sv.errorTech);
        setLoading(false);
      }
    };

    if (!id) {
      setError(texts.sv.errorMissingLink);
      setLoading(false);
      return;
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-700 text-sm">{t.loading}</p>
      </main>
    );
  }

  if (error || !claim) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6 border border-slate-200">
          <h1 className="text-xl font-semibold text-slate-900 mb-2">
            {t.errorTitle}
          </h1>
          <p className="text-sm text-slate-700 mb-4">
            {error ?? t.errorGeneric}
          </p>
          <p className="text-xs text-slate-500 mb-4">{t.errorHelpText}</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            {t.backHome}
          </Link>
        </div>
      </main>
    );
  }

  const normalizedStatus = normalizeStatus(claim.status);
  const currentStepIndex = getStepIndex(normalizedStatus);
  const steps = getTimelineSteps(lang, t);
  const isRejected = normalizedStatus === 'rejected';

  const attachmentsCount = claim.attachmentsSummary?.length ?? 0;
  const docsLabelPlural =
    lang === 'en'
      ? attachmentsCount === 1
        ? t.docsAttachmentsSingular
        : t.docsAttachmentsPlural
      : attachmentsCount === 1
      ? t.docsAttachmentsSingular
      : t.docsAttachmentsPlural;

  const sentToAirlineDate = formatDateForLang(claim.sentToAirlineAt, lang);

  return (
  <main className="min-h-screen bg-slate-50 text-slate-900">
    {/* Global top bar / brand header */}
    <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5">
            <span className="text-[10px] font-semibold tracking-[0.16em] text-slate-700">
              FLIGHTCLAIMLY
            </span>
          </span>
        </Link>
        <p className="text-[11px] text-slate-500 hidden sm:block">
          {lang === 'sv'
            ? 'Trygg uppföljning av ditt ersättningsärende'
            : 'Secure tracking of your compensation claim'}
        </p>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      {/* Page header */}
      <header className="mb-6 flex items-center justify-between gap-4">
        

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-700">
              {t.brand}
            </p>
            <h1 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">
              {t.title}
            </h1>
            <p className="mt-1 text-xs text-slate-500">{t.subtitle}</p>
          </div>

          {/* Language switch – nu med knappar, ingen URL-navigering */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] uppercase tracking-wide text-slate-400">
              {t.langLabel}
            </span>
            <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-1.5 py-1">
              <button
                type="button"
                onClick={() => setLang('sv')}
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  lang === 'sv'
                    ? 'bg-white shadow text-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {texts.sv.langSv}
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  lang === 'en'
                    ? 'bg-white shadow text-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {texts.en.langEn}
              </button>
            </div>
          </div>
        </header>

        {/* Premium card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Gradient top bar */}
          <div className="bg-gradient-to-r from-emerald-50 via-sky-50 to-white px-6 py-4 md:px-8 md:py-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400">
                {t.caseId}
              </p>
              <p className="font-mono text-xs text-slate-800">
                {claim.id || claim.receivedAt}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-700">
                  {t.status}:
                </span>
                <StatusBadge status={normalizedStatus} lang={lang} />
                <span className="text-[11px] text-slate-500">
                  {t.statusHelp}
                </span>
              </div>

              {isRejected && (
                <p className="text-[11px] text-red-600 mt-1">
                  {t.statusRejectedNote}
                </p>
              )}

              {sentToAirlineDate && (
  <p className="text-[11px] text-slate-600 mt-1">
    {lang === 'sv'
      ? `Skickat till flygbolaget: ${sentToAirlineDate}`
      : `Sent to the airline: ${sentToAirlineDate}`}
  </p>
)}

            </div>

            <div className="text-right text-[11px] text-slate-500">
              <p className="uppercase tracking-wide text-slate-400">
                {t.receivedAt}
              </p>
              <p className="font-mono text-xs text-slate-800">
                {claim.receivedAt}
              </p>
            </div>
          </div>

          {/* Card body */}
          <div className="px-6 py-6 md:px-8 md:py-7 space-y-6">
            {/* Flight + documents */}
            <section className="grid gap-5 md:grid-cols-2">
              {/* Flight details */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                  {t.flightDetails}
                </h3>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3 text-xs space-y-1.5">
                  <p>
                    <span className="font-medium">{t.flightLabel}:</span>{' '}
                    <span className="font-mono">{claim.flightNumber}</span>
                  </p>
                  <p>
                    <span className="font-medium">{t.routeLabel}:</span>{' '}
                    <span>
                      {claim.from} → {claim.to}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">{t.dateLabel}:</span>{' '}
                    <span>{claim.date || '-'}</span>
                  </p>
                  <p>
                    <span className="font-medium">{t.bookingLabel}:</span>{' '}
                    <span className="font-mono">
                      {claim.bookingNumber || '—'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                  {t.docsTitle}
                </h3>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3 text-xs space-y-1.5">
                  {attachmentsCount > 0 ? (
                    <>
                      <p>
                        {t.docsReceivedPrefix}{' '}
                        <span className="font-semibold">
                          {attachmentsCount} {docsLabelPlural}
                        </span>
                        .
                      </p>
                      <ul className="list-disc pl-4 text-[11px] text-slate-600 space-y-0.5">
                        {claim.attachmentsSummary!.map((a, idx) => (
                          <li key={`${a.filename}-${idx}`}>{a.filename}</li>
                        ))}
                      </ul>
                      <p className="mt-1 text-[10px] text-slate-400">
                        {t.docsSecurityNote}
                      </p>
                    </>
                  ) : (
                    <p className="text-slate-600">{t.docsNone}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Timeline */}
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                {t.timeline}
              </h3>
              <ol className="relative border-l border-slate-200 pl-4 text-xs text-slate-700 space-y-4">
                {steps.map((step, index) => {
                  const state = indexState(index, currentStepIndex);

                  const circleClass =
                    state === 'done'
                      ? 'bg-emerald-500 border-emerald-500'
                      : state === 'current'
                      ? 'bg-sky-500 border-sky-500 ring-2 ring-sky-200'
                      : 'bg-slate-300 border-slate-300';

                  const titleClass =
                    state === 'future'
                      ? 'font-medium text-slate-500'
                      : 'font-semibold text-slate-900';

                  const textClass =
                    state === 'future'
                      ? 'text-slate-400'
                      : 'text-slate-600';

                  return (
                    <li key={step.key} className="relative pl-2">
                      <div
                        className={`absolute -left-[9px] top-1.5 h-3 w-3 rounded-full border-2 ${circleClass}`}
                      />
                      <p className={titleClass}>{step.title}</p>
                      <p className={textClass}>{step.text}</p>

                      {step.key === 'sent_to_airline' &&
                        sentToAirlineDate && (
                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {lang === 'sv'
                              ? `Skickat: ${sentToAirlineDate}`
                              : `Sent: ${sentToAirlineDate}`}
                          </p>
                        )}
                    </li>
                  );
                })}
              </ol>
            </section>

            {/* Footer */}
            <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <p className="text-[11px] text-slate-500 max-w-md">
                {t.supportHint}
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-slate-800"
              >
                {t.backHome}
              </Link>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ===== Helpers ===== */

function normalizeStatus(status: string): string {
  if (status === 'approved') return 'paid_out';
  return status;
}

function formatDateForLang(
  value: string | null | undefined,
  lang: Lang
): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value; // redan typ "2025-11-04"
  const locale = lang === 'en' ? 'en-GB' : 'sv-SE';
  return d.toLocaleDateString(locale);
}

function getStepIndex(status: string): number {
  const order = ['new', 'processing', 'sent_to_airline', 'paid_out'] as const;

  if (status === 'rejected') {
    return 2;
  }

  const idx = order.indexOf(status as (typeof order)[number]);
  return idx === -1 ? 0 : idx;
}

function getTimelineSteps(lang: Lang, t: (typeof texts)[Lang]) {
  return [
    { key: 'new', title: t.tlCreatedTitle, text: t.tlCreatedText },
    { key: 'processing', title: t.tlReviewTitle, text: t.tlReviewText },
    { key: 'sent_to_airline', title: t.tlSentTitle, text: t.tlSentText },
    { key: 'paid_out', title: t.tlPaidTitle, text: t.tlPaidText },
  ];
}

function indexState(
  index: number,
  currentIndex: number,
): 'done' | 'current' | 'future' {
  if (index < currentIndex) return 'done';
  if (index === currentIndex) return 'current';
  return 'future';
}

function statusLabel(status: string, lang: Lang) {
  const svLabels: Record<string, string> = {
    new: 'Mottaget',
    processing: 'Under behandling',
    sent_to_airline: 'Skickat till flygbolaget',
    paid_out: 'Ersättning utbetald',
    rejected: 'Avslaget',
  };
  const enLabels: Record<string, string> = {
    new: 'Received',
    processing: 'In progress',
    sent_to_airline: 'Sent to airline',
    paid_out: 'Compensation paid',
    rejected: 'Rejected',
  };

  const map = lang === 'en' ? enLabels : svLabels;
  return map[status] ?? status;
}

function StatusBadge({ status, lang }: { status: string; lang: Lang }) {
  const label = statusLabel(status, lang);

  let colorClasses =
    'bg-slate-100 text-slate-700 border border-slate-200';

  if (status === 'new') {
    colorClasses = 'bg-sky-50 text-sky-700 border-sky-100';
  } else if (status === 'processing' || status === 'sent_to_airline') {
    colorClasses = 'bg-amber-50 text-amber-800 border-amber-100';
  } else if (status === 'paid_out') {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-100';
  } else if (status === 'rejected') {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-100';
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium ${colorClasses}`}
    >
      {label}
    </span>
  );
}
