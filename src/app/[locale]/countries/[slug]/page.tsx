import { notFound } from "next/navigation";

import KnowledgePageTemplate from "@/components/seo/KnowledgePageTemplate";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

import { countries, getCountryBySlug } from "@/data/seo/countries";
import { buildMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return countries.flatMap((country) =>
    ["sv", "en"].map((locale) => ({
      locale,
      slug: country.slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) return {};

  return buildMetadata({
    entity: country,
    locale,
    pathPrefix: "countries",
  });
}

export default async function CountryPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) notFound();

  const checkUrl = `/${locale}/check/direct-or-layover`;

  return (
    <main className="min-h-screen bg-slate-50">
      <FAQSchema items={country.faq} />

      <BreadcrumbSchema
        items={[
          { name: "Home", url: `https://www.flightclaimly.com/${locale}` },
          {
            name: "Countries",
            url: `https://www.flightclaimly.com/${locale}/countries`,
          },
          {
            name: country.name,
            url: `https://www.flightclaimly.com/${locale}/countries/${country.slug}`,
          },
        ]}
      />

      <KnowledgePageTemplate
        entity={country}
        checkUrl={checkUrl}
        locale={locale}
        facts={[
          { label: "Country", value: country.name },
          { label: "Regulation", value: "EU261" },
          { label: "Maximum compensation", value: "€600" },
        ]}
      />
    </main>
  );
}