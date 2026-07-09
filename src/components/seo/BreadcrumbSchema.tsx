import Script from "next/script";

type BreadcrumbItem = {
  name: string;
  url: string;
};

type BreadcrumbSchemaProps = {
  items: BreadcrumbItem[];
};

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.APP_URL ||
  "https://www.flightclaimly.com";

function toAbsoluteUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${SITE_URL.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  if (!items.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.url),
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(schema)}
    </Script>
  );
}