import Link from "next/link";
import type { FlightRoute } from "@/data/seo/routes";

type RelatedRoutesProps = {
  title: string;
  routes: FlightRoute[];
  locale: string;
};

export default function RelatedRoutes({
  title,
  routes,
  locale,
}: RelatedRoutesProps) {
  if (routes.length === 0) {
    return null;
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-slate-950">
          {title}
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {routes.map((route) => (
            <Link
              key={route.slug}
              href={`/${locale}/routes/${route.slug}`}
              className="rounded-2xl border border-slate-200 p-5 transition hover:border-emerald-400 hover:shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-950">
                {route.origin.city} → {route.destination.city}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                {route.origin.name} ({route.origin.iata}) to{" "}
                {route.destination.name} ({route.destination.iata})
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}