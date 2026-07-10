import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import RightsClient from "./RightsClient";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildI18nMetadata } from "@/lib/seo";
import { assertLocale } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const localeStr = await getLocale();
  const locale = assertLocale(localeStr);

  const t = await getTranslations({
    locale,
    namespace: "rights",
  });

  return buildI18nMetadata({
    locale,
    path: "/rights",
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default async function RightsPage() {
  const localeStr = await getLocale();
  const locale = assertLocale(localeStr);

  const t = await getTranslations({
    locale,
    namespace: "rights",
  });

  const breadcrumbItems = [
    {
      name: "FlightClaimly",
      url: `/${locale}`,
    },
    {
      name: t("title"),
      url: `/${locale}/rights`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <RightsClient />
    </>
  );
}