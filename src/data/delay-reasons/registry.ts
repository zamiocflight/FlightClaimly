import type { DelayReason } from "./types";

const delayReasonRegistry = new Map<string, DelayReason>();

export function registerDelayReasons(reasons: DelayReason[]) {
  for (const reason of reasons) {
    delayReasonRegistry.set(reason.slug, reason);
  }
}

export function getDelayReason(slug: string) {
  return delayReasonRegistry.get(slug);
}

export function getAllDelayReasons() {
  return [...delayReasonRegistry.values()];
}