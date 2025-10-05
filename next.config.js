/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Don’t fail CI on ESLint or TypeScript issues
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // remove or adjust if you don't need remote images
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
