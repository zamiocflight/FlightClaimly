// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    serverActions: {},
  },

  serverExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],

  outputFileTracingIncludes: {
    '/api/authority/generate': [
      './node_modules/@sparticuz/chromium/bin/**/*',
    ],
  },
};

// Koppla next-intl till src/i18n/request.ts
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

module.exports = withNextIntl(nextConfig);