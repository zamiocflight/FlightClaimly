import Link from "next/link";

type AirportLink = {
  slug: string;
  name: string;
  iata: string;
  city: string;
  country: string;
};

type RelatedAirportsProps = {
  title: string;
  airports: AirportLink[];
  locale: string;
};

export default function RelatedAirports({
  title,
  airports,
  locale,
}: RelatedAirportsProps) {
  if (airports.length === 0) {
    return null;
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-slate-950">
          {title}
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {airports.map((airport) => (
            <Link
              key={airport.slug}
              href={`/${locale}/airports/${airport.slug}`}
              className="rounded-2xl border border-slate-200 p-5 transition hover:border-emerald-400 hover:shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-950">
                {airport.name} ({airport.iata})
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                {airport.city}, {airport.country}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}