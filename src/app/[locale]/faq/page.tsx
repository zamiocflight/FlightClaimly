import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { buildI18nMetadata } from "@/lib/seo";
import { assertLocale } from "@/i18n/routing";
import FaqClient from "./FaqClient";

export async function generateMetadata(): Promise<Metadata> {
  const localeStr = await getLocale();
  const locale = assertLocale(localeStr);

  const t = await getTranslations({
    locale,
    namespace: "faq",
  });

  return buildI18nMetadata({
    locale,
    path: "/faq",
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default async function FaqPage() {
  const localeStr = await getLocale();
  const locale = assertLocale(localeStr);

  const t = await getTranslations({
    locale,
    namespace: "faq",
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t("items.eu261.q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("items.eu261.a"),
        },
      },
      {
        "@type": "Question",
        name: t("items.eligibility.q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("jsonld.eligibilityAnswer"),
        },
      },
      {
        "@type": "Question",
        name: t("items.amount.q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("items.amount.a"),
        },
      },
      {
        "@type": "Question",
        name: t("items.businessModel.q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("items.businessModel.a"),
        },
      },
      {
        "@type": "Question",
        name: t("items.security.q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("jsonld.securityAnswer"),
        },
      },
    ],
  };

  return (
    <>
      <script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <FaqClient />
    </>
  );
}