import { notFound } from "next/navigation";

import DelayReasonKnowledgeTemplate from "@/components/seo/delay-reasons/DelayReasonKnowledgeTemplate";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { delayReasonSeoLocales } from "@/lib/seo/alternates";

import {
  buildDelayReasonMetadata,
  resolveDelayReason,
} from "@/lib/delay-reasons";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;

  if (
  !delayReasonSeoLocales.includes(
    locale as (typeof delayReasonSeoLocales)[number]
  )
) {
  return {};
}

  const delayReason = resolveDelayReason({
    slug,
  });

  if (!delayReason) {
    return {};
  }

  return buildDelayReasonMetadata(delayReason, locale);
}

export default async function DelayReasonPage({ params }: Props) {
  const { locale, slug } = await params;

  if (
  !delayReasonSeoLocales.includes(
    locale as (typeof delayReasonSeoLocales)[number]
  )
) {
  notFound();
}

  const delayReason = resolveDelayReason({
    slug,
  });

  if (!delayReason) {
    notFound();
  }

  return (
<>
  <FAQSchema items={delayReason.faq ?? []} />

  <BreadcrumbSchema
    items={[
      {
        name: "Home",
        url: `https://www.flightclaimly.com/${locale}`,
      },
      {
        name: "Delay reasons",
        url: `https://www.flightclaimly.com/${locale}/delay-reasons`,
      },
      {
        name: delayReason.title,
        url: `https://www.flightclaimly.com/${locale}/delay-reasons/${slug}`,
      },
    ]}
  />

  <main className="container py-10">
    <DelayReasonKnowledgeTemplate
      delayReason={delayReason}
    />
  </main>
</>
  );
}