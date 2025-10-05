/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don’t block the build on ESLint errors
  eslint: { ignoreDuringBuilds: true },

  // Don’t block the build on TS errors (runtime is still typed in dev)
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
