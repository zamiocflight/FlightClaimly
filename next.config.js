/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Gör att Next.js inte failar på ESLint-fel under build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Gör att Next.js inte failar på TS-fel under build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
