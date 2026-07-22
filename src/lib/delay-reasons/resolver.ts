import "@/data/delay-reasons/delayReasons";
import type { DelayReason } from "@/data/delay-reasons/types";
import { delayReasonRelationships, } from "@/data/delay-reasons/relationships";
import { getDelayReason } from "@/data/delay-reasons/registry";

export interface DelayReasonResolverInput {
  slug: string;
}

export function resolveDelayReason({
  slug,
}: DelayReasonResolverInput): DelayReason | undefined {
  const relationship = delayReasonRelationships.find(
    (entity) => entity.slug === slug
  );

  if (relationship) {
    return getDelayReason(slug);
  }

  return getDelayReason(slug);
}