// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 👈 Låt build gå igenom trots lint-fel
  },
};

module.exports = nextConfig;
