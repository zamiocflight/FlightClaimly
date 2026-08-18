'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const compensationBands = [
  {
    amount: '€250',
    key: 'short',
    distance: 'UP TO 1,500 KM',
  },
  {
    amount: '€400',
    key: 'medium',
    distance: 'MID & LONGER EU FLIGHTS',
  },
  {
    amount: '€600',
    key: 'long',
    distance: 'CERTAIN FLIGHTS OVER 3,500 KM',
  },
] as const;

export default function EligibilitySection() {
  const t = useTranslations('homeEligibility');

  return (
    <section
      id="eligibility"
      className="relative overflow-hidden bg-white"
    >
      {/* Soft brand atmosphere */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(700px_360px_at_50%_0%,rgba(34,227,165,0.08),transparent_70%)]
        "
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="
              mb-4 inline-flex items-center gap-2
              rounded-full
              border border-emerald-100
              bg-emerald-50/70
              px-3 py-1.5
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#22E3A5]" />

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-emerald-800
              "
            >
              {t('badge')}
            </span>
          </div>

          <h2
            className="
              text-3xl
              font-black
              tracking-tight
              text-slate-950
              sm:text-4xl
              md:text-[46px]
              md:leading-[1.08]
            "
          >
            {t('title')}
          </h2>

          <p
            className="
              mx-auto mt-5 max-w-2xl
              text-base
              leading-7
              text-slate-600
              md:text-lg
            "
          >
            {t('description')}
          </p>
        </div>

        {/* Compensation bands */}
        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3">
          {compensationBands.map((band) => (
            <article
              key={band.amount}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border border-slate-200
                bg-[#071126]
                px-7 py-8
                shadow-[0_18px_55px_rgba(15,23,42,0.10)]
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_24px_70px_rgba(15,23,42,0.16)]
                md:px-8 md:py-9
              "
            >
              {/* Small glow */}
              <div
                aria-hidden
                className="
                  pointer-events-none
                  absolute -right-16 -top-16
                  h-40 w-40
                  rounded-full
                  bg-[#22E3A5]/10
                  blur-3xl
                "
              />

              <div className="relative">
                <div
                  className="
                    text-[54px]
                    font-black
                    leading-none
                    tracking-tight
                    text-[#22E3A5]
                    md:text-[62px]
                  "
                >
                  {band.amount}
                </div>

                <div className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-white/55">
                  {band.distance}
                </div>

                <h3 className="mt-3 text-xl font-bold text-white">
                  {t(`bands.${band.key}.title`)}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  {t(`bands.${band.key}.body`)}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Qualification reasons */}
        <div
          className="
            mt-8
            grid gap-3
            rounded-2xl
            border border-slate-200
            bg-slate-50
            px-5 py-5
            sm:grid-cols-3
            sm:px-6
            md:mt-10
          "
        >
          {[
            t('reasons.delay'),
            t('reasons.cancellation'),
            t('reasons.deniedBoarding'),
          ].map((item) => (
            <div
              key={item}
              className="
                flex items-center gap-3
                text-sm font-semibold
                text-slate-800
              "
            >
              <span
                className="
                  flex h-7 w-7
                  shrink-0
                  items-center justify-center
                  rounded-full
                  bg-[#22E3A5]/15
                  text-[#069A6B]
                "
              >
                ✓
              </span>

              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Legal clarification */}
        <p
          className="
            mx-auto mt-5 max-w-3xl
            text-center
            text-xs
            leading-5
            text-slate-500
          "
        >
          {t('disclaimer')}
        </p>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/check"
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-[#22E3A5]
              px-7 py-3.5
              text-[15px]
              font-bold
              text-slate-950
              shadow-[0_8px_24px_rgba(34,227,165,0.24)]
              transition
              hover:bg-[#1FD39A]
              hover:shadow-[0_10px_30px_rgba(34,227,165,0.32)]
              active:scale-[0.98]
            "
          >
            {t('cta')}
            <span aria-hidden className="ml-2">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}