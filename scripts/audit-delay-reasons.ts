import { delayReasons } from "../src/data/delay-reasons/delayReasons";
import { delayReasonRelationships } from "../src/data/delay-reasons/relationships";
import { getAllDelayReasonAssessments } from "../src/lib/delay-reasons/assessment";

const errors: string[] = [];

const reasonSlugs = delayReasons.map((reason) => reason.slug);
const relationshipSlugs = delayReasonRelationships.map((item) => item.slug);
const assessmentSlugs = getAllDelayReasonAssessments().map((item) => item.slug);

function duplicates(values: string[]) {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

for (const duplicate of new Set(duplicates(reasonSlugs))) {
  errors.push(`Duplicate delay reason slug: ${duplicate}`);
}

for (const slug of reasonSlugs) {
  if (!relationshipSlugs.includes(slug)) {
    errors.push(`Missing relationship for delay reason: ${slug}`);
  }

  if (!assessmentSlugs.includes(slug)) {
    errors.push(`Missing assessment profile for delay reason: ${slug}`);
  }
}

for (const slug of relationshipSlugs) {
  if (!reasonSlugs.includes(slug)) {
    errors.push(`Relationship points to unknown delay reason: ${slug}`);
  }
}

for (const slug of assessmentSlugs) {
  if (!reasonSlugs.includes(slug)) {
    errors.push(`Assessment points to unknown delay reason: ${slug}`);
  }
}

console.log("Delay Reason Engine audit");
console.log(`Reasons: ${reasonSlugs.length}`);
console.log(`Relationships: ${relationshipSlugs.length}`);
console.log(`Assessment profiles: ${assessmentSlugs.length}`);

if (errors.length > 0) {
  console.error(`\nFAILED — ${errors.length} integrity issue(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("PASS — registry, relationships and claim-assessment coverage are aligned.");
