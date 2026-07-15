import fs from "fs";
import path from "path";

const targetLocales = ["de", "pl", "fi"] as const;
const shouldWrite = process.argv.includes("--write");

type JsonObject = Record<string, unknown>;

function readJson(locale: string): JsonObject {
  const filePath = path.join(
    process.cwd(),
    "messages",
    `${locale}.json`
  );

  return JSON.parse(fs.readFileSync(filePath, "utf8")) as JsonObject;
}

function isPlainObject(value: unknown): value is JsonObject {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

function mergeMissingKeys(
  master: JsonObject,
  target: JsonObject,
  prefix = ""
): {
  merged: JsonObject;
  addedKeys: string[];
} {
  const merged: JsonObject = { ...target };
  const addedKeys: string[] = [];

  for (const [key, masterValue] of Object.entries(master)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const targetValue = target[key];

    if (!(key in target)) {
      merged[key] = masterValue;
      addedKeys.push(fullKey);
      continue;
    }

    if (
      isPlainObject(masterValue) &&
      isPlainObject(targetValue)
    ) {
      const nested = mergeMissingKeys(
        masterValue,
        targetValue,
        fullKey
      );

      merged[key] = nested.merged;
      addedKeys.push(...nested.addedKeys);
    }
  }

  return {
    merged,
    addedKeys,
  };
}

const english = readJson("en");

for (const locale of targetLocales) {
  const target = readJson(locale);

  const { merged, addedKeys } = mergeMissingKeys(
    english,
    target
  );

  console.log(`\n=== ${locale.toUpperCase()} ===`);
  console.log(`Missing keys found: ${addedKeys.length}`);

  if (addedKeys.length > 0) {
    addedKeys.forEach((key) => console.log(`+ ${key}`));
  }

  if (!shouldWrite) {
    console.log(
      "Dry run only — no file changes were made."
    );
    continue;
  }

  const filePath = path.join(
    process.cwd(),
    "messages",
    `${locale}.json`
  );

  fs.writeFileSync(
    filePath,
    `${JSON.stringify(merged, null, 2)}\n`,
    "utf8"
  );

  console.log(`Updated messages/${locale}.json`);
}

console.log(
  shouldWrite
    ? "\nTranslation structure sync complete.\n"
    : "\nDry run complete. Run again with --write to apply changes.\n"
);