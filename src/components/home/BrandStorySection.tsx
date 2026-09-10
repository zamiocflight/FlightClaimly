'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function BrandStorySection() {
  const t = useTranslations('homeBrandStory');

  return (
    <section className="bg-white px-4 py-8 sm:px-6 md:py-12">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[24px] border border-slate-200/40 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
        <div className="relative min-h-[520px] md:min-h-[610px]">
          <Image
            src="/images/flightclaimly-sunset-wing.png"
            alt={t('imageAlt')}
            fill
            priority={false}
            sizes="(max-width: 768px) 100vw, 1152px"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#050D20]/95 via-[#071126]/68 to-[#071126]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050D20]/35 via-transparent to-[#050D20]/10" />

          <div className="relative z-10 flex min-h-[520px] items-center px-7 py-14 sm:px-10 md:min-h-[610px] md:px-16">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/10 px-3 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22E3A5]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#22E3A5]">
                  {t('badge')}
                </span>
              </div>

              <h2 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl md:text-[58px]">
                {t('title')}
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/78 md:text-lg md:leading-8">
                {t('description')}
              </p>

              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-white/85">
                {[t('points.airline'), t('points.updates'), t('points.payout')].map((item) => (
                  <span key={item} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#22E3A5]/35 text-[11px] text-[#22E3A5]">✓</span>
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/about"
                  className="group inline-flex items-center rounded-xl border border-white/25 bg-white/[0.08] px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-[background-color,border-color] hover:border-white/35 hover:bg-white/[0.13]"
                >
                  {t('cta')}
                  <span className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
