// src/app/sitemap.ts 
import { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";

function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    "http://localhost:3000";

  // normalize: remove trailing slash
  return raw.replace(/\/+$/, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  // OBS: alla routes här är "under [locale]" och ska INTE innehålla locale
  const routes: Array<{
    path: string; // "" => home
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "daily", priority: 1.0 },
    { path: "delays", changeFrequency: "weekly", priority: 0.9 },
    { path: "cancellations", changeFrequency: "weekly", priority: 0.9 },
    { path: "rights", changeFrequency: "weekly", priority: 0.9 },
    { path: "faq", changeFrequency: "monthly", priority: 0.7 },
    { path: "about", changeFrequency: "monthly", priority: 0.6 },
    { path: "contact", changeFrequency: "monthly", priority: 0.6 },
    { path: "privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "terms", changeFrequency: "yearly", priority: 0.3 },

    // compensation/conpensation lägger vi in när du bekräftat exakt path
  ];

  const now = new Date();

  return locales.flatMap((locale) =>
    routes.map((r) => {
      const url =
        r.path === ""
          ? `${siteUrl}/${locale}`
          : `${siteUrl}/${locale}/${r.path}`;

      return {
        url,
        lastModified: now,
        changeFrequency: r.changeFrequency,
        priority: r.priority,
      };
    })
  );
}

