import Link from "next/link";
import { airports } from "@/data/seo/airports";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata() {
  return {
    title: "Airport flight compensation | FlightClaimly",
    description:
      "Find airport-specific flight compensation guides for delayed, cancelled and disrupted flights under EU261.",
  };
}

export default async function AirportsIndexPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Airport compensation guides
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          Flight compensation by airport
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-slate-700">
          Choose your airport to learn when you may be entitled to compensation
          for a delayed, cancelled or disrupted flight.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {airports.map((airport) => (
            <Link
              key={airport.slug}
              href={`/${locale}/airports/${airport.slug}`}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-sm font-semibold text-emerald-700">
                {airport.iata}
              </div>

              <h2 className="mt-3 text-xl font-bold text-slate-950">
                {airport.name}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {airport.city}, {airport.country}
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