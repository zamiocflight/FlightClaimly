import fs from "fs";
import path from "path";

const locales = ["de", "pl", "fi"] as const;

type JsonObject = Record<string, unknown>;

function readJson(locale: string): JsonObject {
  return JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "messages", `${locale}.json`),
      "utf8"
    )
  );
}

function isPlainObject(value: unknown): value is JsonObject {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

function findUntranslated(
  english: JsonObject,
  locale: JsonObject,
  prefix = ""
): string[] {
  const untranslated: string[] = [];

  for (const [key, englishValue] of Object.entries(english)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const localeValue = locale[key];

    if (
      isPlainObject(englishValue) &&
      isPlainObject(localeValue)
    ) {
      untranslated.push(
        ...findUntranslated(
          englishValue,
          localeValue,
          fullKey
        )
      );
      continue;
    }

    if (
      typeof englishValue === "string" &&
      typeof localeValue === "string" &&
      englishValue === localeValue
    ) {
      untranslated.push(fullKey);
    }
  }

  return untranslated;
}

const english = readJson("en");

for (const locale of locales) {
  const translated = readJson(locale);

  const untranslated = findUntranslated(
    english,
    translated
  );

  console.log(`\n=== ${locale.toUpperCase()} ===`);
  console.log(
    `Untranslated: ${untranslated.length}`
  );

  untranslated.forEach((key) =>
    console.log(`- ${key}`)
  );
}

console.log("\nTranslation audit complete.\n");