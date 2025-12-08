import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlightClaimly – Få upp till 600 € i ersättning för försenade eller inställda flyg",
  description:
    "Kolla om ditt flyg ger rätt till ersättning på några sekunder. FlightClaimly driver ditt EU261-krav mot flygbolaget – du betalar bara vid vinst (no win, no fee). Låg avgift, tydliga statusuppdateringar och trygg hantering.",
  openGraph: {
    title: "FlightClaimly – Ersättning för försenade eller inställda flyg",
    description:
      "Vi hjälper dig få upp till 600 € i ersättning enligt EU261. Snabb koll av ditt flyg, låg avgift och no win, no fee.",
    url: "https://flightclaimly.com",
    siteName: "FlightClaimly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlightClaimly – Ersättning för försenade eller inställda flyg",
    description:
      "Kolla ditt flyg och få hjälp att kräva ersättning enligt EU261. No win, no fee.",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FlightClaimly",
  url: "https://flightclaimly.com",
  logo: "https://flightclaimly.com/logo-flightclaimly.svg",
  sameAs: [] as string[],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900 bg-white`}
      >
        {/* Schema.org Organization */}
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(orgJsonLd)}
        </Script>

        {children}

        <footer className="border-t mt-10">
          <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-600 flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} FlightClaimly</span>
            <a href="/terms" className="underline">
              Terms
            </a>
            <a href="/privacy" className="underline">
              Privacy
            </a>
            <span className="text-gray-400">
              Independent service — not affiliated with airlines
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
