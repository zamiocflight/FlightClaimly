import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const baseUrl = "https://www.flightclaimly.com";
  const locale = params.locale;

  return {
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        sv: `${baseUrl}/sv`,
        en: `${baseUrl}/en`,
      },
    },
  };
}
