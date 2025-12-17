// /middleware.ts
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import createMiddleware from 'next-intl/middleware';

const PROTECTED_PREFIXES = ['/admin', '/api/admin'];

// next-intl middleware (SV/EN)
const intlMiddleware = createMiddleware({
  locales: ['sv', 'en'],
  defaultLocale: 'sv'
});

export function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl;

  // 1) Admin-skydd (behåll exakt som innan)
  if (PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    const sess = req.cookies.get('admin_session')?.value;
    if (!sess) {
      if (pathname.startsWith('/api/')) {
        return new NextResponse(JSON.stringify({error: 'Unauthorized'}), {
          status: 401,
          headers: {'content-type': 'application/json'}
        });
      }
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // 2) i18n routing (lägger /en, /sv, cookies osv)
  return intlMiddleware(req);
}

// Viktigt: matcha både sidor + API som ska skyddas
export const config = {
  matcher: [
    '/',
    '/(sv|en)/:path*',
    '/admin/:path*',
    '/api/admin/:path*'
  ]
};
