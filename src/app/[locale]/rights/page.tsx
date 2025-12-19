import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import RightsClient from "./RightsClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "rights" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default function RightsPage() {
  return <RightsClient />;
}
