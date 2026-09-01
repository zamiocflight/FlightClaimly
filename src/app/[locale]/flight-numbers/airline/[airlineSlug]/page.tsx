import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  flightNumberAirlineGroups,
  getFlightNumberAirlineGroup,
} from "@/lib/flight-numbers/catalog";
import { flightNumberSeoLocales } from "@/lib/seo/alternates";

const SITE_URL = "https://www.flightclaimly.com";

type PageProps = {
  params: Promise<{
    locale: string;
    airlineSlug: string;
  }>;
};

export function generateStaticParams() {
  return flightNumberAirlineGroups.flatMap((group) =>
    flightNumberSeoLocales.map((locale) => ({
      locale,
      airlineSlug: group.airlineSlug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, airlineSlug } = await params;

  if (
    !flightNumberSeoLocales.includes(
      locale as (typeof flightNumberSeoLocales)[number]
    )
  ) {
    return {};
  }

  const group = getFlightNumberAirlineGroup(airlineSlug);
  if (!group) return {};

  const canonical = `${SITE_URL}/${locale}/flight-numbers/airline/${group.airlineSlug}`;

  return {
    title: `${group.airlineName} flight numbers | Compensation guides | FlightClaimly`,
    description: `Browse ${group.airlineName} flight-number compensation guides and find route-specific passenger-rights information for delayed or cancelled flights.`,
    alternates: {
      canonical,
    },
  };
}

export default async function AirlineFlightNumbersPage({ params }: PageProps) {
  const { locale, airlineSlug } = await params;

  if (
    !flightNumberSeoLocales.includes(
      locale as (typeof flightNumberSeoLocales)[number]
    )
  ) {
    notFound();
  }

  const group = getFlightNumberAirlineGroup(airlineSlug);
  if (!group) notFound();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20">
      <section className="mx-auto max-w-5xl">
        <Link
          href={`/${locale}/flight-numbers`}
          className="text-sm font-semibold text-sky-700 hover:underline"
        >
          ← All flight numbers
        </Link>

        <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-emerald-600">
          {group.airlineIata} flight numbers
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          {group.airlineName} flight-number compensation guides
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-slate-700">
          Browse {group.flightNumbers.length.toLocaleString("en")} published
          {" "}{group.airlineName} flight-number guides. Each page connects the
          flight number with its route and relevant EU261 or UK261 passenger-rights
          coverage.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {group.flightNumbers.map((flightNumber) => (
            <Link
              key={flightNumber.slug}
              href={`/${locale}/flight-numbers/${flightNumber.slug}`}
              className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-xl font-bold text-slate-950">
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
