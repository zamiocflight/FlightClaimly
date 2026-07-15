import fs from "fs";
import path from "path";

const locales = ["sv", "da", "de", "pl", "fi"] as const;

function readMessages(locale: string) {
  return JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), `messages/${locale}.json`),
      "utf8"
    )
  );
}

function flatten(obj: unknown, prefix = ""): string[] {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    return prefix ? [prefix] : [];
  }

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

const english = readMessages("en");
const englishKeys = new Set(flatten(english));

for (const locale of locales) {
  const messages = readMessages(locale);
  const localeKeys = new Set(flatten(messages));

  const missing = [...englishKeys].filter(
    (key) => !localeKeys.has(key)
  );

  const extra = [...localeKeys].filter(
    (key) => !englishKeys.has(key)
  );

  console.log(`\n=== ${locale.toUpperCase()} ===`);
  console.log(`Missing: ${missing.length}`);
  console.log(`Extra: ${extra.length}`);

  if (missing.length > 0) {
    console.log("\nMissing keys:");
    missing.forEach((key) => console.log(`- ${key}`));
  }

  if (extra.length > 0) {
    console.log("\nExtra keys:");
    extra.forEach((key) => console.log(`- ${key}`));
  }
}

console.log("\nTranslation audit complete.\n");