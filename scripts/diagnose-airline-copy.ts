import { airlines } from "../src/data/seo/airlines";

const fields = [
  "title",
  "metadataTitle",
  "description",
  "intro",
  "overview",
  "passengerRights",
  "compensationIntro",
  "compensationRules",
  "statisticsIntro",
  "timelineIntro",
] as const;

/**
 * Known legitimate cross-airline references.
 *
 * These relationships are intentionally explicit. If a new airline name
 * appears in another airline's copy, the audit should flag it until reviewed.
 */
const allowedRelations = new Set([
  "austrian-airlines:lufthansa",
  "swiss:lufthansa",
  "brussels-airlines:lufthansa",
  "ita-airways:lufthansa",
  "eurowings:lufthansa",

  "sunexpress:lufthansa",
  "sunexpress:turkish-airlines",

  "edelweiss-air:lufthansa",
  "edelweiss-air:swiss",
  "discover-airlines:lufthansa",

  "transavia:air-france",
  "transavia:klm",

  "ryanair-uk:ryanair",

  "easyjet-europe:easyjet",
  "easyjet-switzerland:easyjet",

  "air-dolomiti:lufthansa",
  "freebird-europe:freebird-airlines",
]);

/**
 * These are lexical false positives rather than airline relationships.
 *
 * "Norwegian" can describe nationality.
 * "Emirates" occurs inside "United Arab Emirates".
 * "SWISS" can collide with the adjective "Swiss".
 */
const ignoredLexicalMatches = new Set([
  "wideroe:norwegian",
  "etihad-airways:emirates",
  "easyjet-switzerland:swiss",
  "helvetic-airways:swiss",
]);

function containsName(text: string, name: string) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return new RegExp(
    `(^|[^A-Za-z0-9])${escaped}([^A-Za-z0-9]|$)`,
    "i"
  ).test(text);
}

type Finding = {
  airline: string;
  otherAirline: string;
  otherSlug: string;
  field: string;
  text: string;
};

const unexpected: Finding[] = [];
let allowedCount = 0;
let ignoredCount = 0;

for (const airline of airlines) {
  for (const other of airlines) {
    if (airline.slug === other.slug) continue;

    const relation = `${airline.slug}:${other.slug}`;

    for (const field of fields) {
      const value = airline[field];

      if (
        typeof value !== "string" ||
        !containsName(value, other.name)
      ) {
        continue;
      }

      if (allowedRelations.has(relation)) {
        allowedCount++;
        continue;
      }

      if (ignoredLexicalMatches.has(relation)) {
        ignoredCount++;
        continue;
      }

      unexpected.push({
        airline: airline.slug,
        otherAirline: other.name,
        otherSlug: other.slug,
        field,
        text: value,
      });
    }
  }
}

console.log("\nAIRLINE COPY QUALITY GATE");
console.log("=========================");

console.log(`Allowed relationship matches: ${allowedCount}`);
console.log(`Ignored lexical matches:      ${ignoredCount}`);
console.log(`Unexpected findings:          ${unexpected.length}`);

if (unexpected.length > 0) {
  console.log("\nUNEXPECTED CROSS-AIRLINE COPY");
  console.log("=============================");

  for (const finding of unexpected) {
    console.log(
      `\n[ERROR] ${finding.airline} -> ${finding.otherAirline} (${finding.otherSlug})`
    );
    console.log(`FIELD: ${finding.field}`);
    console.log(`TEXT: ${finding.text}`);
  }

  console.error(
    `\n❌ Airline copy quality gate failed with ${unexpected.length} unexpected finding(s).`
  );

  process.exit(1);
}

console.log("\n✅ Airline copy quality gate passed.");
