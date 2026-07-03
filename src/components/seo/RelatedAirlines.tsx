import Link from "next/link";
import type { Airline } from "@/data/seo/airlines";

type RelatedAirlinesProps = {
  currentSlug: string;
  airlines: Airline[];
  locale: string;
};

export default function RelatedAirlines({
  currentSlug,
  airlines,
  locale,
}: RelatedAirlinesProps) {
  const related = airlines
    .filter((airline) => airline.slug !== currentSlug)
    .slice(0, 3);

  if (!related.length) return null;

  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        Related airline guides
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {related.map((airline) => (
          <Link
            key={airline.slug}
            href={`/${locale}/airlines/${airline.slug}`}
            className="rounded-xl border p-4 transition hover:-translate-y-1 hover:shadow-sm"
          >
            <div className="text-sm font-semibold text-emerald-700">
              {airline.iata}
            </div>
            <div className="mt-2 font-bold text-slate-950">
              {airline.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}