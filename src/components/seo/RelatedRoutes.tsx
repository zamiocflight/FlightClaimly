import Link from "next/link";
import type { FlightRoute } from "@/data/seo/routes";
import { swedishCityName } from "@/lib/localization/knowledge-sv";
import { danishCityName } from "@/lib/localization/knowledge-da";
import { polishCityName } from "@/lib/localization/knowledge-pl";
type RelatedRoutesProps = { title: string; routes: FlightRoute[]; locale: string };
function cityName(value: string, locale: string) { if (locale === "sv") return swedishCityName(value); if (locale === "da") return danishCityName(value); if (locale === "pl") return polishCityName(value); return value; }
export default function RelatedRoutes({ title, routes, locale }: RelatedRoutesProps) {
  if (routes.length === 0) return null;
  return <section className="px-6 py-16"><div className="mx-auto max-w-5xl"><h2 className="text-3xl font-bold tracking-tight text-slate-950">{title}</h2><div className="mt-8 grid gap-4 md:grid-cols-2">{routes.map((route) => <Link key={route.slug} href={`/${locale}/routes/${route.slug}`} className="rounded-2xl border border-slate-200 p-5 transition hover:border-emerald-400 hover:shadow-sm"><h3 className="text-lg font-semibold text-slate-950">{cityName(route.origin.city, locale)} → {cityName(route.destination.city, locale)}</h3><p className="mt-2 text-sm text-slate-600">{route.origin.name} ({route.origin.iata}) {locale === "sv" ? "till" : locale === "da" ? "til" : locale === "pl" ? "do" : "to"} {route.destination.name} ({route.destination.iata})</p></Link>)}</div></div></section>;
}
