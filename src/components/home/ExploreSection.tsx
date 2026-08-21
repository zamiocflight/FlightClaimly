'use client';

import { Link } from '../../i18n/navigation';
import { useTranslations } from 'next-intl';

const cards = [
  {
    key: 'delays',
    href: '/delays',
    number: '01',
  },
  {
    key: 'cancellations',
    href: '/cancellations',
    number: '02',
  },
  {
    key: 'rights',
    href: '/rights',
    number: '03',
  },
  {
    key: 'explore',
    href: '/airlines',
    number: '04',
  },
] as const;

export default function ExploreSection() {
  const t = useTranslations('homeExplore');

  return (
    <section className="bg-[#F3F8FC]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              {t('badge')}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
            {t('title')}
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            {t('description')}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 md:p-8"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <span className="text-[11px] font-bold tracking-[0.18em] text-emerald-600">
                    {card.number}
                  </span>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950 md:text-2xl">
                    {t(`cards.${card.key}.title`)}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 md:text-base">
                    {t(`cards.${card.key}.description`)}
                  </p>
                </div>

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-900 transition-all duration-300 group-hover:border-emerald-300 group-hover:bg-emerald-400 group-hover:translate-x-1">
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