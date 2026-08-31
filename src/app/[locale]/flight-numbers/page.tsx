import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { flightNumbers } from "@/data/master/flightNumbers";
import {
  buildLanguageAlternates,
  flightNumberSeoLocales,
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
    !flightNumberSeoLocales.includes(
      locale as (typeof flightNumberSeoLocales)[number]
    )
  ) {
    return {};
  }

  const canonical = `${SITE_URL}/${locale}/flight-numbers`;

  return {
    title: "Flight number compensation guides | FlightClaimly",
    description:
      "Find flight-specific compensation guides by flight number and learn when delays, cancellations or disruptions may qualify under EU261.",
    alternates: {
      canonical,
      languages: buildLanguageAlternates(
        "flight-numbers",
        flightNumberSeoLocales
      ),
    },
  };
}

export default async function FlightNumbersIndexPage({ params }: PageProps) {
  const { locale } = await params;

  if (
    !flightNumberSeoLocales.includes(
      locale as (typeof flightNumberSeoLocales)[number]
    )
  ) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Flight number guides
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          Flight compensation by flight number
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-slate-700">
          Find your flight number to explore route-specific passenger rights and
          learn when a delay, cancellation or other disruption may qualify for
          compensation under EU261.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {flightNumbers.map((flightNumber) => (
            <Link
              key={flightNumber.slug}
              href={`/${locale}/flight-numbers/${flightNumber.slug}`}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-sm font-semibold text-emerald-700">
                {flightNumber.airlineName}
              </div>

              <h2 className="mt-3 text-2xl font-bold text-slate-950">
                {flightNumber.flightNumber}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {flightNumber.originCountry} → {flightNumber.destinationCountry}
              </p>

              <p className="mt-4 text-sm font-semibold text-sky-700">
                View compensation guide →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
