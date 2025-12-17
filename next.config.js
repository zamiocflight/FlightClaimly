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
};

// Koppla next-intl till src/i18n/request.ts (viktigt!)
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

module.exports = withNextIntl(nextConfig);

