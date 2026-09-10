'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const compensationBands = [
  { amount: '€250', key: 'short' },
  { amount: '€400', key: 'medium' },
  { amount: '€600', key: 'long' },
] as const;

export default function EligibilitySection() {
  const t = useTranslations('homeEligibility');

  return (
    <section id="eligibility" className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100/80 bg-emerald-50/60 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22E3A5]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-800">
              {t('badge')}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl md:text-[46px] md:leading-[1.08]">
            {t('title')}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            {t('description')}
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-3">
          {compensationBands.map((band) => (
            <article
              key={band.amount}
              className="group relative overflow-hidden rounded-[24px] border border-white/5 bg-[#071126] px-7 py-8 shadow-[0_14px_40px_rgba(15,23,42,0.09)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[#22E3A5]/20 hover:shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:px-8 md:py-9"
            >
              <div aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#22E3A5]/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <div className="text-[54px] font-extrabold leading-none tracking-[-0.045em] text-[#22E3A5] md:text-[62px]">
                  {band.amount}
                </div>

                <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  {t(`bands.${band.key}.distance`)}
                </div>

                <h3 className="mt-3 text-xl font-semibold tracking-[-0.015em] text-white">
                  {t(`bands.${band.key}.title`)}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  {t(`bands.${band.key}.body`)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-3 rounded-[20px] border border-slate-200/80 bg-slate-50/70 px-5 py-5 sm:grid-cols-3 sm:px-6 md:mt-10">
          {[t('reasons.delay'), t('reasons.cancellation'), t('reasons.deniedBoarding')].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm font-medium text-slate-800">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-white text-[#069A6B] shadow-sm">
                ✓
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-5 text-slate-500">
          {t('disclaimer')}
        </p>

        <div className="mt-9 flex justify-center">
          <Link
            href="/check"
            className="inline-flex items-center justify-center rounded-xl bg-[#22E3A5] px-7 py-3.5 text-[15px] font-semibold text-slate-950 shadow-[0_8px_22px_rgba(34,227,165,0.20)] transition-[background-color,box-shadow,transform] hover:bg-[#1FD39A] hover:shadow-[0_10px_26px_rgba(34,227,165,0.25)] active:scale-[0.99]"
          >
            {t('cta')}
            <span aria-hidden className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
