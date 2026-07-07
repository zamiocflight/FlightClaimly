import Link from "next/link";
import { countries } from "@/data/seo/countries";

export default function CountriesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-bold">
        Flight Compensation by Country
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {countries.map((country) => (
          <Link
            key={country.slug}
            href={`/en/countries/${country.slug}`}
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