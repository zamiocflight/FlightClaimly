import type { RelationshipType } from "@/data/knowledge/relationships";
import {
  getRelatedKnowledge,
  type RelatedKnowledgeItem,
} from "@/lib/seo/relationships";

export type InternalLinkSection = {
  title: string;
  items: RelatedKnowledgeItem[];
};

type SectionConfig = {
  title: string;
  allowedTypes: RelationshipType[];
  limit: number;
};

const internalLinkConfigs = {
  route: [
    {
      title: "Airports on this route",
      allowedTypes: ["airport"],
      limit: 2,
    },
    {
      title: "Airlines operating this route",
      allowedTypes: ["airline"],
      limit: 6,
    },
    {
      title: "Countries connected by this route",
      allowedTypes: ["country"],
      limit: 2,
    },
  ],

  airport: [
    {
      title: "Airlines at this airport",
      allowedTypes: ["airline"],
      limit: 6,
    },
    {
      title: "Popular routes from this airport",
      allowedTypes: ["route"],
      limit: 9,
    },
    {
      title: "Country guide",
      allowedTypes: ["country"],
      limit: 1,
    },
  ],

  airline: [
    {
      title: "Airports served by this airline",
      allowedTypes: ["airport"],
      limit: 6,
    },
    {
      title: "Routes operated by this airline",
      allowedTypes: ["route"],
      limit: 9,
    },
    {
      title: "Airline country guide",
      allowedTypes: ["country"],
      limit: 3,
    },
  ],

  country: [
    {
      title: "Airports in this country",
      allowedTypes: ["airport"],
      limit: 9,
    },
    {
      title: "Airlines from this country",
      allowedTypes: ["airline"],
      limit: 6,
    },
    {
      title: "Routes connected to this country",
      allowedTypes: ["route"],
      limit: 9,
    },
  ],
} satisfies Record<
  "route" | "airport" | "airline" | "country",
  SectionConfig[]
>;

export function getInternalLinkSections(
  entityType: keyof typeof internalLinkConfigs,
  slug: string,
  locale: string
): InternalLinkSection[] {
  return internalLinkConfigs[entityType]
    .map((section) => ({
      title: section.title,
      items: getRelatedKnowledge(slug, locale, {
        allowedTypes: section.allowedTypes,
        limit: section.limit,
      }),
    }))
    .filter((section) => section.items.length > 0);
}