import { authorityRegistry } from "../src/data/authority/registry";
import { legalReferences } from "../src/data/authority/legalReferences";
import { legalRulesRegistry } from "../src/data/passenger-rights/rules";
import { passengerRightsRegistry } from "../src/data/passenger-rights/registry";

function duplicates(values: string[]) {
  const seen = new Set<string>();
  const duplicateSet = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicateSet.add(value);
    seen.add(value);
  }
  return [...duplicateSet];
}

const errors: string[] = [];
const authorityIds = new Set(authorityRegistry.map((source) => source.id));
const legalReferenceIds = new Set(legalReferences.map((reference) => reference.id));
const passengerRightIds = new Set(passengerRightsRegistry.map((right) => right.id));
const legalRuleIds = new Set(legalRulesRegistry.map((rule) => rule.id));

for (const id of duplicates(authorityRegistry.map((source) => source.id))) errors.push(`Duplicate authority id: ${id}`);
for (const id of duplicates(legalReferences.map((reference) => reference.id))) errors.push(`Duplicate legal reference id: ${id}`);
for (const id of duplicates(passengerRightsRegistry.map((right) => right.id))) errors.push(`Duplicate passenger right id: ${id}`);
for (const id of duplicates(legalRulesRegistry.map((rule) => rule.id))) errors.push(`Duplicate legal rule id: ${id}`);

for (const reference of legalReferences) {
  if (!authorityIds.has(reference.sourceId)) errors.push(`Legal reference ${reference.id} points to missing authority ${reference.sourceId}`);
}

for (const right of passengerRightsRegistry) {
  for (const authorityId of right.regulationIds) {
    if (!authorityIds.has(authorityId)) errors.push(`Passenger right ${right.id} points to missing authority ${authorityId}`);
  }
  for (const referenceId of right.legalReferenceIds) {
    if (!legalReferenceIds.has(referenceId)) errors.push(`Passenger right ${right.id} points to missing legal reference ${referenceId}`);
  }
}

for (const rule of legalRulesRegistry) {
  if (!authorityIds.has(rule.regulationId)) errors.push(`Legal rule ${rule.id} points to missing regulation ${rule.regulationId}`);
  for (const authorityId of rule.authorityIds) {
    if (!authorityIds.has(authorityId)) errors.push(`Legal rule ${rule.id} points to missing authority ${authorityId}`);
  }
  for (const referenceId of rule.legalReferenceIds) {
    if (!legalReferenceIds.has(referenceId)) errors.push(`Legal rule ${rule.id} points to missing legal reference ${referenceId}`);
  }
  for (const rightId of rule.passengerRightIds) {
    if (!passengerRightIds.has(rightId)) errors.push(`Legal rule ${rule.id} points to missing passenger right ${rightId}`);
  }
  for (const exceptionId of rule.exceptionRuleIds ?? []) {
    if (!legalRuleIds.has(exceptionId)) errors.push(`Legal rule ${rule.id} points to missing exception rule ${exceptionId}`);
  }
}

console.log("Passenger Rights / Legal Rules integrity audit");
console.log(`Authorities: ${authorityRegistry.length}`);
console.log(`Legal references: ${legalReferences.length}`);
console.log(`Passenger rights: ${passengerRightsRegistry.length}`);
console.log(`Legal rules: ${legalRulesRegistry.length}`);

if (errors.length) {
  console.error(`FAIL — ${errors.length} integrity issue(s)`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("PASS — authority, legal references, passenger rights and legal rules are internally aligned.");
