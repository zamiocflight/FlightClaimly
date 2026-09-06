import { notFound } from "next/navigation";
import DelayReasonKnowledgeTemplate from "@/components/seo/delay-reasons/DelayReasonKnowledgeTemplate";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { delayReasons } from "@/data/delay-reasons/delayReasons";
import { delayReasonSeoLocales } from "@/lib/seo/alternates";
import { buildDelayReasonMetadata, resolveDelayReason } from "@/lib/delay-reasons";
import { buildSwedishDelayReason } from "@/lib/localization/delay-reason-sv";
import { getLocaleDefinition } from "@/lib/localization/locales";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return delayReasonSeoLocales.flatMap((locale) => delayReasons.map((delayReason) => ({ locale, slug: delayReason.slug })));
}

function localize(delayReason: NonNullable<ReturnType<typeof resolveDelayReason>>, locale: string) {
  return locale === "sv" ? buildSwedishDelayReason(delayReason) : delayReason;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (!delayReasonSeoLocales.includes(locale as (typeof delayReasonSeoLocales)[number])) return {};
  const delayReason = resolveDelayReason({ slug });
  if (!delayReason) return {};
  return buildDelayReasonMetadata(localize(delayReason, locale), locale);
}

export default async function DelayReasonPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!delayReasonSeoLocales.includes(locale as (typeof delayReasonSeoLocales)[number])) notFound();
  const canonical = resolveDelayReason({ slug });
  if (!canonical) notFound();
  const delayReason = localize(canonical, locale);
  const labels = getLocaleDefinition(locale as (typeof delayReasonSeoLocales)[number]).labels;

  return (
    <>
      <FAQSchema items={delayReason.faq ?? []} />
      <BreadcrumbSchema items={[
        { name: labels.home, url: `https://www.flightclaimly.com/${locale}` },
        { name: locale === "sv" ? "Orsaker till flygstörningar" : "Delay reasons", url: `https://www.flightclaimly.com/${locale}/delay-reasons` },
        { name: delayReason.title, url: `https://www.flightclaimly.com/${locale}/delay-reasons/${slug}` },
      ]} />
      <main className="container py-10">
        <DelayReasonKnowledgeTemplate delayReason={delayReason} locale={locale} />
      </main>
    </>
  );
}
