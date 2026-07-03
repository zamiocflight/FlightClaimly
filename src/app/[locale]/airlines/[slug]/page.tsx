import { notFound } from "next/navigation";
import { getAirlineBySlug, airlines } from "@/data/seo/airlines";
import Hero from "@/components/seo/Hero";
import ClaimProcess from "@/components/seo/ClaimProcess";
import CommonIssues from "@/components/seo/CommonIssues";
import FAQ from "@/components/seo/FAQ";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return airlines.flatMap((airline) =>
    ["sv", "en"].map((locale) => ({
      locale,
      slug: airline.slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const airline = getAirlineBySlug(slug);

  if (!airline) return {};

  return {
    title: `${airline.name} flight compensation | FlightClaimly`,
    description: airline.description,
  };
}

export default async function AirlinePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const airline = getAirlineBySlug(slug);

  if (!airline) notFound();

  const checkUrl = `/${locale}/check/direct-or-layover`;

  return (
    <main className="min-h-screen bg-slate-50">
      <Hero airline={airline} checkUrl={checkUrl} />

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <ClaimProcess steps={airline.claimProcess} />

          <CommonIssues
            airlineName={airline.name}
            issues={airline.commonIssues}
          />
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <FAQ items={airline.faq} />
        </div>
      </section>
    </main>
  );
}