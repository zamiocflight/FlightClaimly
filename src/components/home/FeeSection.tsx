'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function FeeSection() {
  const t = useTranslations('homeFee');

  return (
    <section className="relative overflow-hidden bg-[#071126]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute left-[8%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#22E3A5]/[0.055] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22E3A5]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#22E3A5]">
                {t('badge')}
              </span>
            </div>

            <h2 className="max-w-2xl text-3xl font-extrabold tracking-[-0.035em] text-white sm:text-4xl md:text-[48px] md:leading-[1.06]">
              {t('title')}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/68 md:text-lg md:leading-8">
              {t('description')}
            </p>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {[t('points.noUpfront'), t('points.onlyIfPaid'), t('points.vatIncluded')].map((item) => (
                <div key={item} className="inline-flex items-center gap-2 text-sm font-medium text-white/80">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#22E3A5]/30 text-[11px] text-[#22E3A5]">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-9">
              <Link href="/terms" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#22E3A5] transition-colors hover:text-[#44EDB5]">
                {t('termsLink')}
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[24px] border border-white/[0.12] bg-white/[0.045] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.20)] backdrop-blur-[2px] sm:p-8">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                {t('exampleLabel')}
              </div>

              <div className="mt-7 space-y-5">
                <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-5">
                  <span className="text-sm font-medium text-white/60">{t('compensation')}</span>
                  <span className="text-4xl font-extrabold tracking-[-0.035em] text-white">€600</span>
                </div>

                <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-5">
                  <span className="text-sm font-medium text-white/60">{t('fee')}</span>
                  <span className="text-2xl font-semibold tracking-[-0.02em] text-white/75">− €120</span>
                </div>

                <div className="flex items-end justify-between gap-6 pt-2">
                  <span className="text-base font-semibold text-white">{t('youKeep')}</span>
                  <span className="text-[52px] font-extrabold leading-none tracking-[-0.045em] text-[#22E3A5]">€480</span>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5 text-sm leading-6 text-white/60">
                {t('exampleNote')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
