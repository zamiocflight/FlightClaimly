'use client';

import { Link } from '../../i18n/navigation';
import { useTranslations } from 'next-intl';

const cards = [
  { key: 'delays', href: '/delays', number: '01' },
  { key: 'cancellations', href: '/cancellations', number: '02' },
  { key: 'rights', href: '/rights', number: '03' },
  { key: 'explore', href: '/airlines', number: '04' },
] as const;

export default function ExploreSection() {
  const t = useTranslations('homeExplore');

  return (
    <section className="bg-[#F3F8FC]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22E3A5]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
              {t('badge')}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl md:text-[44px] md:leading-[1.08]">
            {t('title')}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:leading-8">
            {t('description')}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              className="group relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/55 p-6 transition-[background-color,border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white/90 hover:shadow-[0_14px_38px_rgba(15,23,42,0.06)] md:p-8"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-emerald-700/80">
                    {card.number}
                  </span>

                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-slate-950 md:text-2xl">
                    {t(`cards.${card.key}.title`)}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 md:text-base md:leading-7">
                    {t(`cards.${card.key}.description`)}
                  </p>
                </div>

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-lg text-slate-700 transition-[border-color,color,transform] duration-300 group-hover:translate-x-0.5 group-hover:border-emerald-300 group-hover:text-emerald-700">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
