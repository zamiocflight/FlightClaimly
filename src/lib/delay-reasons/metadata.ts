import type { Metadata } from "next";

import type { DelayReason } from "@/data/delay-reasons/types";
import { buildMetadata } from "@/lib/seo/metadata";

export function buildDelayReasonMetadata(
  delayReason: DelayReason,
  locale: string,
): Metadata {
  return buildMetadata({
    entity: {
      slug: delayReason.slug,
      name: delayReason.title,
      description: delayReason.description,
    },
    locale,
    pathPrefix: "delay-reasons",
    titleSuffix: "flight compensation",
  });
}