import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { delayReasons } from "@/data/delay-reasons/delayReasons";
import {
  buildLanguageAlternates,
  delayReasonSeoLocales,
} from "@/lib/seo/alternates";

const SITE_URL = "https://www.flightclaimly.com";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (
    !delayReasonSeoLocales.includes(
      locale as (typeof delayReasonSeoLocales)[number]
    )
  ) {
    return {};
  }

  const canonical = `${SITE_URL}/${locale}/delay-reasons`;

  return {
    title: "Flight delay reasons and compensation | FlightClaimly",
    description:
      "Explore common reasons for flight delays and cancellations and learn when EU261 compensation may apply.",
    alternates: {
      canonical,
      languages: buildLanguageAlternates("delay-reasons", delayReasonSeoLocales),
    },
    openGraph: {
      title: "Flight delay reasons and compensation | FlightClaimly",
      description:
        "Explore common reasons for flight delays and cancellations and learn when EU261 compensation may apply.",
      url: canonical,
      siteName: "FlightClaimly",
      locale,
      type: "website",
    },
  };
}

export default async function DelayReasonsIndexPage({ params }: PageProps) {
  const { locale } = await params;

  if (
    !delayReasonSeoLocales.includes(
      locale as (typeof delayReasonSeoLocales)[number]
    )
  ) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Flight disruption knowledge
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          Flight delay reasons and compensation
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-slate-700">
          Explore common causes of flight delays and cancellations, how EU261
          treats them, and when passengers may be entitled to compensation.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {delayReasons.map((reason) => (
            <Link
              key={reason.slug}
              href={`/${locale}/delay-reasons/${reason.slug}`}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-xl font-bold text-slate-950">
                {reason.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {reason.description}
              </p>

              <p className="mt-5 text-sm font-semibold text-sky-700">
                View compensation guide →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
