'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function FeeSection() {
  const t = useTranslations('homeFee');

  return (
    <section className="relative overflow-hidden bg-[#071126]">
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(900px_500px_at_15%_20%,rgba(34,227,165,0.12),transparent_65%)]
        "
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* Left */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22E3A5]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#22E3A5]">
                {t('badge')}
              </span>
            </div>

            <h2 className="max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl md:text-[48px] md:leading-[1.06]">
              {t('title')}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/70 md:text-lg">
              {t('description')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                t('points.noUpfront'),
                t('points.onlyIfPaid'),
                t('points.vatIncluded'),
              ].map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/85"
                >
                  <span className="text-[#22E3A5]">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/terms"
                className="text-sm font-semibold text-[#22E3A5] transition hover:text-[#44EDB5]"
              >
                {t('termsLink')} →
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.28)] sm:p-8">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                {t('exampleLabel')}
              </div>

              <div className="mt-6 space-y-5">
                <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-5">
                  <span className="text-sm font-semibold text-white/65">
                    {t('compensation')}
                  </span>
                  <span className="text-4xl font-black tracking-tight text-white">
                    €600
                  </span>
                </div>

                <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-5">
                  <span className="text-sm font-semibold text-white/65">
                    {t('fee')}
                  </span>
                  <span className="text-2xl font-black tracking-tight text-white/80">
                    − €120
                  </span>
                </div>

                <div className="flex items-end justify-between gap-6 pt-1">
                  <span className="text-base font-bold text-white">
                    {t('youKeep')}
                  </span>
                  <span className="text-[52px] font-black leading-none tracking-tight text-[#22E3A5]">
                    €480
                  </span>
                </div>
              </div>

              <div className="mt-7 rounded-2xl bg-[#22E3A5]/10 px-4 py-3 text-sm leading-6 text-white/70">
                {t('exampleNote')}
              </div>
            </div>

            <div
              aria-hidden
              className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#22E3A5]/10 blur-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}