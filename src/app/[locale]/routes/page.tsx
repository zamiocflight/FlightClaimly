import Link from "next/link";
import { routes } from "@/data/seo/routes";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata() {
  return {
    title: "Flight compensation routes | FlightClaimly",
    description:
      "Find flight compensation guides for popular European routes and check if your delayed or cancelled flight may qualify under EU261.",
  };
}

export default async function RoutesPage({ params }: Props) {
  const { locale } = await params;

  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">
          Flight compensation routes
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          Explore flight compensation guides for popular routes and find out
          whether your delayed, cancelled or disrupted flight may be covered by
          EU261.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {routes.map((route) => (
            <Link
              key={route.slug}
              href={`/${locale}/routes/${route.slug}`}
              className="rounded-2xl border border-slate-200 p-5 transition hover:border-emerald-400 hover:shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-950">
                {route.origin.city} → {route.destination.city}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {route.origin.name} ({route.origin.iata}) to{" "}
                {route.destination.name} ({route.destination.iata})
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}