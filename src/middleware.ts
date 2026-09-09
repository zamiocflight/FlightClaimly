import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["sv", "en", "da", "de", "nl", "pl", "fi", "es"],
  defaultLocale: "sv",
  localePrefix: "always",
});

const SUPPORTED_LOCALES = new Set([
  "sv",
  "en",
  "da",
  "de",
  "nl",
  "pl",
  "fi",
  "es",
]);

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

  // Ta bort locale-prefixet och ersätt med "/sv"
  const rest = pathname === `/${locale}` ? "" : pathname.slice(`/${locale}`.length);

  url.pathname = `/sv${rest || ""}`;
  return NextResponse.redirect(url);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirecta disabled locales till /sv innan övrig routing.
  const DISABLED_LOCALES = new Set<string>([]);

  const matchDisabled = pathname.match(/^\/([^/]+)(\/|$)/);
  if (matchDisabled) {
    const locale = matchDisabled[1];
    if (DISABLED_LOCALES.has(locale)) {
      return redirectDisabledLocale(req, locale);
    }
  }

  // Tillåt admin-auth API
  if (pathname === "/api/admin/login" || pathname === "/api/admin/logout") {
    return NextResponse.next();
  }

  // Skippa locale-routing för ALLA API-routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Skippa locale för tracking (utan intl)
  // - "/track/..."
  // - "/{locale}/track/..." (oavsett locale-sträng)
  if (pathname.startsWith("/track") || pathname.match(/^\/[^/]+\/track(\/|$)/)) {
    return NextResponse.next();
  }

  const firstPathSegment = pathname.split("/")[1];

  // Viktigt: redan lokaliserade routes måste fortfarande gå genom
  // next-intl middleware så request-locale/header sätts korrekt.
  if (SUPPORTED_LOCALES.has(firstPathSegment)) {
    return intlMiddleware(req);
  }

  // Skippa locale för vissa publika routes (admin-skydd körs längre ner)
  if (
    PUBLIC_ROUTES_WITHOUT_LOCALE.some(
      (p) => pathname === p || pathname.startsWith(p + "/")
    )
  ) {
    // fortsätt
  } else {
    return intlMiddleware(req);
  }

  // Admin-skydd
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
