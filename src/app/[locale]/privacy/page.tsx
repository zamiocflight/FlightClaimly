// src/app/[locale]/privacy/page.tsx
"use client";

import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 text-slate-900">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            {t('badge')}
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            {t('title')}
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            {t('intro')}
          </p>
        </header>

        <section className="space-y-8 text-sm md:text-base text-slate-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t('controller.title')}
            </h2>
            <p className="mt-2">
              {t('controller.body')}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t('dataCollected.title')}
            </h2>
            <p className="mt-2">
              {t('dataCollected.intro')}
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              {t.raw('dataCollected.items').map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t('purpose.title')}
            </h2>
            <p className="mt-2">
              {t('purpose.intro')}
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              {t.raw('purpose.items').map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t('legalBasis.title')}
            </h2>
            <p className="mt-2">
              {t('legalBasis.intro')}
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              {t.raw('legalBasis.items').map((item: string, i: number) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t('retention.title')}
            </h2>
            <p className="mt-2">
              {t('retention.intro')}
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              {t.raw('retention.items').map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              {t('retention.note')}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t('sharing.title')}
            </h2>
            <p className="mt-2">
              {t('sharing.intro')}
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              {t.raw('sharing.items').map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              {t('sharing.note')}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t('rights.title')}
            </h2>
            <p className="mt-2">
              {t('rights.intro')}
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              {t.raw('rights.items').map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              {t('rights.contactBefore')}
              <a
                href="mailto:info@flightclaimly.com"
                className="font-medium text-slate-900 underline-offset-2 hover:underline ml-1"
              >
                info@flightclaimly.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t('complaints.title')}
            </h2>
            <p className="mt-2">
              {t('complaints.body')}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t('changes.title')}
            </h2>
            <p className="mt-2">
              {t('changes.body')}
            </p>
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <p>
            {t('footer.before')}{' '}
            <a
              href="mailto:info@flightclaimly.com"
              className="font-medium text-slate-900 underline-offset-2 hover:underline"
            >
              info@flightclaimly.com
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}

