import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { flightNumberAirlineGroups } from "@/lib/flight-numbers/catalog";
import {
  buildLanguageAlternates,
  flightNumberSeoLocales,
} from "@/lib/seo/alternates";

const SITE_URL = "https://www.flightclaimly.com";

type FlightNumberSeoLocale = (typeof flightNumberSeoLocales)[number];

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const copy = {
  en: {
    metadataTitle: "Flight number compensation guides | FlightClaimly",
    metadataDescription:
      "Find flight-specific compensation guides by flight number and learn when delays, cancellations or disruptions may qualify under EU261 or UK261.",
    eyebrow: "Flight number guides",
    title: "Flight compensation by flight number",
    intro: (count: string) =>
      `Browse ${count} published flight-number guides by airline. Each guide connects a flight number with its route, airline and applicable passenger-rights framework.`,
    guideCount: (count: string, singular: boolean) =>
      `${count} flight-number${singular ? " guide" : " guides"}`,
    cta: "Browse flight numbers →",
    numberLocale: "en",
  },
  sv: {
    metadataTitle: "Flygersättning efter flygnummer | FlightClaimly",
    metadataDescription:
      "Hitta guider om flygersättning för specifika flygnummer och se när förseningar, inställda flyg eller andra störningar kan omfattas av EU261 eller UK261.",
    eyebrow: "Guider för flygnummer",
    title: "Flygersättning efter flygnummer",
    intro: (count: string) =>
      `Utforska ${count} publicerade guider för flygnummer, sorterade efter flygbolag. Varje guide kopplar flygnumret till flygsträckan, flygbolaget och relevanta passagerarrättigheter.`,
    guideCount: (count: string, singular: boolean) =>
      `${count} ${singular ? "guide" : "guider"} för flygnummer`,
    cta: "Visa flygnummer →",
    numberLocale: "sv-SE",
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!flightNumberSeoLocales.includes(locale as FlightNumberSeoLocale)) {
    return {};
  }

  const seoLocale = locale as FlightNumberSeoLocale;
  const localeCopy = copy[seoLocale];
  const canonical = `${SITE_URL}/${seoLocale}/flight-numbers`;

  return {
    title: localeCopy.metadataTitle,
    description: localeCopy.metadataDescription,
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

  if (!flightNumberSeoLocales.includes(locale as FlightNumberSeoLocale)) {
    notFound();
  }

  const seoLocale = locale as FlightNumberSeoLocale;
  const localeCopy = copy[seoLocale];
  const totalFlightNumbers = flightNumberAirlineGroups.reduce(
    (total, group) => total + group.flightNumbers.length,
    0
  );
  const totalFormatted = totalFlightNumbers.toLocaleString(localeCopy.numberLocale);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          {localeCopy.eyebrow}
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          {localeCopy.title}
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-slate-700">
          {localeCopy.intro(totalFormatted)}
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {flightNumberAirlineGroups.map((group) => {
            const groupCount = group.flightNumbers.length.toLocaleString(
              localeCopy.numberLocale
            );

            return (
              <Link
                key={group.airlineSlug}
                href={`/${seoLocale}/flight-numbers/airline/${group.airlineSlug}`}
                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-sm font-semibold text-emerald-700">
                  {group.airlineIata}
                </div>

                <h2 className="mt-3 text-2xl font-bold text-slate-950">
                  {group.airlineName}
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  {localeCopy.guideCount(
                    groupCount,
                    group.flightNumbers.length === 1
                  )}
                </p>

                <p className="mt-4 text-sm font-semibold text-sky-700">
                  {localeCopy.cta}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
