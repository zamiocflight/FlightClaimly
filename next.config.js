/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // slå PÅ lint i build
  },
  typescript: {
    ignoreBuildErrors: false,  // slå PÅ TS-check i build
  },
};

module.exports = nextConfig;
