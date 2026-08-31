import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { countries } from "@/data/seo/countries";
import {
  buildLanguageAlternates,
  countrySeoLocales,
} from "@/lib/seo/alternates";

const SITE_URL = "https://www.flightclaimly.com";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!countrySeoLocales.includes(locale as (typeof countrySeoLocales)[number])) {
    return {};
  }

  const canonical = `${SITE_URL}/${locale}/countries`;

  return {
    title: "Flight compensation by country | FlightClaimly",
    description:
      "Explore country-specific flight compensation guides and passenger rights for delayed, cancelled and disrupted flights.",
    alternates: {
      canonical,
      languages: buildLanguageAlternates("countries", countrySeoLocales),
    },
  };
}

export default async function CountriesPage({ params }: PageProps) {
  const { locale } = await params;

  if (!countrySeoLocales.includes(locale as (typeof countrySeoLocales)[number])) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-bold">
        Flight Compensation by Country
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {countries.map((country) => (
          <Link
            key={country.slug}
            href={`/${locale}/countries/${country.slug}`}
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">{country.name}</h2>

            <p className="mt-2 text-sm text-slate-600">
              {country.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
