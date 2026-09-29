import type { Metadata } from "next";
import { ComparisonPage } from "@/components/competitor-comparison-page";
import { buildI18nMetadata } from "@/lib/seo";
import { assertLocale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
 const { locale: raw } = await params; const locale = assertLocale(raw);
 return buildI18nMetadata({ locale, path:"/compare/refly", title:`FlightClaimly vs ReFly: fees compared (2026)`, description:"Compare FlightClaimly and ReFly flight compensation fees. FlightClaimly charges 20% incl. VAT; ReFly publishes 33% incl. VAT." });
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
 const { locale: raw }=await params; return <ComparisonPage locale={assertLocale(raw)} competitor="refly"/>;
}