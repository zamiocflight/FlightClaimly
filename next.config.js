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

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        '@sparticuz/chromium': 'commonjs @sparticuz/chromium',
        'puppeteer-core': 'commonjs puppeteer-core',
      });
    }

    return config;
  },
};

// Koppla next-intl till src/i18n/request.ts
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

module.exports = withNextIntl(nextConfig);