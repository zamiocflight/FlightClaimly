import { assessClaimRights } from "../src/lib/claim-rights";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const euLongDelay = assessClaimRights({
  departureAirport: { iata: "CPH", eu261Territory: true },
  arrivalAirport: { iata: "LIS", eu261Territory: true },
  operatingCarrier: { code: "TP", communityCarrier: true },
  disruption: {
    type: "delay",
    arrivalDelayMinutes: 240,
    delayReasonSlug: "technical-problems",
  },
  airline: { extraordinaryCircumstancesClaimed: false },
});

assert(euLongDelay.legalRegime.eu261 === "applies", "EU departure should establish EU261 applicability");
assert(
  euLongDelay.rules.matched.some(({ rule }) => rule.id === "eu261-long-delay-compensation"),
  "Four-hour arrival delay should match the long-delay compensation rule",
);
assert(
  euLongDelay.compensation.status === "potentially-entitled",
  "Long delay without asserted extraordinary defence should remain potentially entitled",
);
assert(
  euLongDelay.delayReason?.slug === "technical-problems",
  "Delay Reason assessment should be composed into the claim assessment",
);

const birdStrikeDefence = assessClaimRights({
  departureAirport: { eu261Territory: true },
  arrivalAirport: { eu261Territory: true },
  operatingCarrier: { communityCarrier: true },
  disruption: {
    type: "delay",
    arrivalDelayMinutes: 220,
    delayReasonSlug: "bird-strike",
  },
  airline: { extraordinaryCircumstancesClaimed: true },
});

assert(
  birdStrikeDefence.compensation.status === "defence-under-review",
  "Asserted extraordinary circumstances must trigger defence review rather than automatic rejection",
);
assert(
  birdStrikeDefence.extraordinaryCircumstances.requiresReview,
  "Bird-strike defence must require causation/reasonable-measures review",
);
assert(
  birdStrikeDefence.rules.matched.some(({ rule }) => rule.id === "eu261-bird-strike"),
  "Bird strike should activate the verified bird-strike doctrine rule",
);

const cancellation = assessClaimRights({
  departureAirport: { eu261Territory: true },
  arrivalAirport: { eu261Territory: true },
  disruption: { type: "cancellation" },
});

assert(cancellation.care.potentiallyEngaged, "Cancellation must preserve potential care rights");
assert(
  cancellation.reroutingOrRefund.potentiallyEngaged,
  "Cancellation must preserve potential rerouting/refund rights",
);

const missingGeography = assessClaimRights({
  departureAirport: {},
  arrivalAirport: {},
  disruption: { type: "delay", arrivalDelayMinutes: 200 },
});

assert(
  missingGeography.status === "investigation-required" || missingGeography.status === "insufficient-facts",
  "Missing geography must never become a confident legal conclusion",
);
assert(
  missingGeography.legalRegime.eu261 !== "applies",
  "Missing geography must not establish EU261 applicability",
);

console.log("Claim Rights Assessment Engine audit");
console.log("Scenarios: 4");
console.log("PASS — composition, unresolved-state and defence boundaries behave as expected.");
