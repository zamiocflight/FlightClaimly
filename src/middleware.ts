import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["sv", "en", "da", "de", "pl", "fi"], // <-- håll dessa "live" tills da/de har copy
  defaultLocale: "sv",
  localePrefix: "always",
});



const PROTECTED_PREFIXES = ["/admin"];
const PUBLIC_ROUTES_WITHOUT_LOCALE = [
  "/login",
  "/admin",
  "/favicon.ico",
  "/track", // tracking utan intl
];

function redirectDisabledLocale(req: NextRequest, locale: string) {
  const url = req.nextUrl.clone();

  // pathname är t.ex. "/da" eller "/da/contact"
  const pathname = url.pathname;

  // Ta bort "/da" prefixet och ersätt med "/sv"
  const rest = pathname === `/${locale}` ? "" : pathname.slice(`/${locale}`.length);

  url.pathname = `/sv${rest || ""}`;
  return NextResponse.redirect(url);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ 6.3: Redirecta disabled locales till /sv (innan allt annat)
  // Matchar "/da" eller "/da/..." (samma för de)
 const DISABLED_LOCALES = new Set<string>([]); // t.ex. ["de"] om du vill stänga igen

const matchDisabled = pathname.match(/^\/([^/]+)(\/|$)/);
if (matchDisabled) {
  const locale = matchDisabled[1];
  if (DISABLED_LOCALES.has(locale)) {
    return redirectDisabledLocale(req, locale);
  }
}


  // ✅ Tillåt admin-auth API
  if (pathname === "/api/admin/login" || pathname === "/api/admin/logout") {
    return NextResponse.next();
  }

  // ✅ Skippa locale-routing för ALLA API-routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // ✅ Skippa locale-routing för tracking (utan intl)
  // - "/track/..."
  // - "/{locale}/track/..." (oavsett locale-sträng)
  if (pathname.startsWith("/track") || pathname.match(/^\/[^/]+\/track(\/|$)/)) {
    return NextResponse.next();
  }

  // ✅ Skippa locale för vissa publika routes (admin-skydd körs längre ner)
  if (
    PUBLIC_ROUTES_WITHOUT_LOCALE.some(
      (p) => pathname === p || pathname.startsWith(p + "/")
    )
  ) {
    // fortsätt
  } else {
    // 🌍 Allt annat går via next-intl (sv/en live)
    return intlMiddleware(req);
  }

  // 🔒 Admin-skydd
  if (
    PROTECTED_PREFIXES.some(
      (p) => pathname === p || pathname.startsWith(p + "/")
    )
  ) {
    const sess = req.cookies.get("admin_session")?.value;
    if (!sess) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
