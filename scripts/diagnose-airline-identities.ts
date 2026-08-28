import { airlines } from "../src/data/seo/airlines";
import { airports } from "../src/data/seo/airports";

const airlineSlugs = new Set(airlines.map((x) => x.slug));
const missing = new Map<string, string[]>();

for (const airport of airports) {
  for (const slug of airport.mainAirlines ?? []) {
    if (!airlineSlugs.has(slug)) {
      const usedBy = missing.get(slug) ?? [];
      usedBy.push(airport.slug);
      missing.set(slug, usedBy);
    }
  }
}

console.log("\nAIRLINE IDENTITY AUDIT");
console.log("======================");

for (const [slug, usedBy] of [...missing.entries()].sort()) {
  console.log(`\nMISSING REF: ${slug}`);
  console.log(`Used by: ${usedBy.join(", ")}`);

  const words = slug
    .split("-")
    .filter((word) => word.length >= 3);

  const candidates = airlines.filter((airline) => {
    const haystack = [
      airline.slug,
      airline.name,
      airline.title,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return words.some((word) =>
      haystack.includes(word.toLowerCase())
    );
  });

  if (candidates.length === 0) {
    console.log("Candidates: NONE");
  } else {
    console.log("Candidates:");

    for (const airline of candidates) {
      console.log(
        `  ${airline.slug} | ${airline.name}`
      );
    }
  }
}
