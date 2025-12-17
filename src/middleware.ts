import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['sv', 'en'],
  defaultLocale: 'sv'
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
