import fs from "fs";
import path from "path";

const en = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "messages/en.json"), "utf8")
);

const sv = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "messages/sv.json"), "utf8")
);

function flatten(obj: any, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const next = prefix ? `${prefix}.${key}` : key;

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      return flatten(value, next);
    }

    return [next];
  });
}

const enKeys = new Set(flatten(en));
const svKeys = new Set(flatten(sv));

const missingInSv = [...enKeys].filter((k) => !svKeys.has(k));
const extraInSv = [...svKeys].filter((k) => !enKeys.has(k));

console.log("\n=== Missing in sv.json ===\n");

if (missingInSv.length === 0) {
  console.log("None 🎉");
} else {
  missingInSv.forEach((k) => console.log(k));
}

console.log("\n=== Extra in sv.json ===\n");

if (extraInSv.length === 0) {
  console.log("None 🎉");
} else {
  extraInSv.forEach((k) => console.log(k));
}

console.log("\n====================");
console.log(`Missing: ${missingInSv.length}`);
console.log(`Extra: ${extraInSv.length}`);
console.log("====================\n");