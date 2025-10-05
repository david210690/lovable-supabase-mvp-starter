/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,   // keep strict mode enabled for dev
  swcMinify: true,         // ensures faster builds with SWC

  eslint: {
    // Don’t fail the build on ESLint errors during CI
    ignoreDuringBuilds: true,
  },

  typescript: {
    // Don’t fail the build on TS errors during CI
    ignoreBuildErrors: true,
  },

  images: {
    // allow loading images from remote domains if needed
    domains: ['localhost', 'your-domain.com'],
  },
};

module.exports = nextConfig;
