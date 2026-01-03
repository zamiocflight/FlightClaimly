// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["sv", "en"],
  defaultLocale: "sv",
  localePrefix: "always", // tvingar /sv/... och /en/...
});

const PROTECTED_PREFIXES = ["/admin"];
const PUBLIC_ROUTES_WITHOUT_LOCALE = ["/login", "/admin", "/favicon.ico"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Tillåt alltid login/logout API (annars blir det en omöjlig loop)
  if (pathname === "/api/admin/login" || pathname === "/api/admin/logout") {
    return NextResponse.next();
  }

  // ✅ Skippa locale-routing för API
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // ✅ Skippa locale för vissa routes (t.ex. /admin och /login ska inte bli /en/...)
  if (
    PUBLIC_ROUTES_WITHOUT_LOCALE.some(
      (p) => pathname === p || pathname.startsWith(p + "/")
    )
  ) {
    // Men kör fortfarande auth-skydd för /admin nedan
    // (dvs returnera inte här om det är /admin – vi vill skydda den)
  } else {
    // Allt annat: next-intl
    return intlMiddleware(req);
  }

  // 1) Admin-skydd (gäller /admin och /admin/...)
  if (
    PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"))
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
