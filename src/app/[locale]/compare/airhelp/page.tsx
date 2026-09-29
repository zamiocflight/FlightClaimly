import type { Metadata } from "next";
import { ComparisonPage } from "@/components/competitor-comparison-page";
import { buildI18nMetadata } from "@/lib/seo";
import { assertLocale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
 const { locale: raw } = await params; const locale = assertLocale(raw);
 return buildI18nMetadata({ locale, path:"/compare/airhelp", title:`FlightClaimly vs AirHelp: fees compared (2026)`, description:"Compare FlightClaimly and AirHelp flight compensation fees. FlightClaimly charges 20% incl. VAT; AirHelp publishes 35% incl. VAT." });
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
 const { locale: raw }=await params; return <ComparisonPage locale={assertLocale(raw)} competitor="airhelp"/>;
}