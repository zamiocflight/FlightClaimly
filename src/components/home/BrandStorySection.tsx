'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function BrandStorySection() {
  const t = useTranslations('homeBrandStory');

  return (
    <section className="bg-white px-4 py-6 sm:px-6 md:py-10">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[30px]">
        {/* Background image */}
        <div className="relative min-h-[520px] md:min-h-[610px]">
          <Image
            src="/images/flightclaimly-sunset-wing.png"
            alt={t('imageAlt')}
            fill
            priority={false}
            sizes="(max-width: 768px) 100vw, 1152px"
            className="object-cover object-center"
          />

          {/* Dark FlightClaimly overlay */}
         <div className="absolute inset-0 bg-gradient-to-r from-[#050D20]/92 via-[#071126]/58 to-transparent" />

          {/* Extra bottom depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050D20]/45 via-transparent to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex min-h-[520px] items-center px-7 py-14 sm:px-10 md:min-h-[610px] md:px-16">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22E3A5]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#22E3A5]">
                  {t('badge')}
                </span>
              </div>

              <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[58px]">
                {t('title')}
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/80 md:text-lg md:leading-8">
                {t('description')}
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/90">
                <span className="flex items-center gap-2">
                  <span className="text-[#22E3A5]">✓</span>
                  {t('points.airline')}
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-[#22E3A5]">✓</span>
                  {t('points.updates')}
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-[#22E3A5]">✓</span>
                  {t('points.payout')}
                </span>
              </div>

              <div className="mt-9">
                <Link
                  href="/about"
                  className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  {t('cta')}
                  <span className="ml-2" aria-hidden>
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}