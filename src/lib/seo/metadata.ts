import type { Metadata } from "next";

const SITE_URL = "https://www.flightclaimly.com";

type MetadataEntity = {
  slug: string;
  name: string;
  description: string;
};

type BuildMetadataInput = {
  entity: MetadataEntity;
  locale: string;
  pathPrefix: string;
  titleSuffix?: string;
};

export function buildMetadata({
  entity,
  locale,
  pathPrefix,
  titleSuffix = "flight compensation",
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}/${locale}/${pathPrefix}/${entity.slug}`;
  const title = `${entity.name} ${titleSuffix} | FlightClaimly`;

  return {
    title,
    description: entity.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: entity.description,
      url,
      siteName: "FlightClaimly",
      type: "article",
    },
  };
}