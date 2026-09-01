import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { flightNumberAirlineGroups } from "@/lib/flight-numbers/catalog";
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
      "Find flight-specific compensation guides by flight number and learn when delays, cancellations or disruptions may qualify under EU261 or UK261.",
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

  const totalFlightNumbers = flightNumberAirlineGroups.reduce(
    (total, group) => total + group.flightNumbers.length,
    0
  );

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
          Browse {totalFlightNumbers.toLocaleString("en")} published flight-number
          guides by airline. Each guide connects a flight number with its route,
          airline and applicable passenger-rights framework.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {flightNumberAirlineGroups.map((group) => (
            <Link
              key={group.airlineSlug}
              href={`/${locale}/flight-numbers/airline/${group.airlineSlug}`}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-sm font-semibold text-emerald-700">
                {group.airlineIata}
              </div>

              <h2 className="mt-3 text-2xl font-bold text-slate-950">
                {group.airlineName}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {group.flightNumbers.length.toLocaleString("en")} flight-number
                {group.flightNumbers.length === 1 ? " guide" : " guides"}
              </p>

              <p className="mt-4 text-sm font-semibold text-sky-700">
                Browse flight numbers →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
