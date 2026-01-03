import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["sv", "en"],
  defaultLocale: "sv",
  localePrefix: "always", // gäller ALLA vanliga sidor
});

const PROTECTED_PREFIXES = ["/admin"];
const PUBLIC_ROUTES_WITHOUT_LOCALE = [
  "/login",
  "/admin",
  "/favicon.ico",
  "/track", // 👈 VIKTIGT: tillåt tracking utan intl
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Tillåt admin-auth API
  if (
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout"
  ) {
    return NextResponse.next();
  }

  // ✅ Skippa locale-routing för ALLA API-routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // ✅ Skippa locale-routing för tracking (VIKTIG FIX)
  if (pathname.startsWith("/track") || pathname.match(/^\/(sv|en)\/track/)) {
    return NextResponse.next();
  }

  // ✅ Skippa locale för vissa publika routes
  if (
    PUBLIC_ROUTES_WITHOUT_LOCALE.some(
      (p) => pathname === p || pathname.startsWith(p + "/")
    )
  ) {
    // fortsätt – admin-skydd körs längre ner
  } else {
    // 🌍 Allt annat går via next-intl
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
