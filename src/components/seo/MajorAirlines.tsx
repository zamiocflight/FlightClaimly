import Link from "next/link";
import { airlines } from "@/data/seo/airlines";

type MajorAirlinesProps = {
  title: string;
  airlineSlugs: string[];
  locale: string;
};

export default function MajorAirlines({
  title,
  airlineSlugs,
  locale,
}: MajorAirlinesProps) {
  const items = airlineSlugs
    .map((slug) => airlines.find((airline) => airline.slug === slug))
    .filter(Boolean);

  if (!items.length) return null;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((airline) => (
            <Link
              key={airline!.slug}
              href={`/${locale}/airlines/${airline!.slug}`}
              className="rounded-xl border p-4 transition hover:-translate-y-1 hover:shadow-sm"
            >
              <div className="text-sm font-semibold text-emerald-700">
                {airline!.iata}
              </div>

              <div className="mt-2 font-bold text-slate-950">
                {airline!.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}