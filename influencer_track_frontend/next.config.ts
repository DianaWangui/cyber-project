// next.config.ts (TypeScript version of next.config.js)
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // Disable ESLint during the build process
  },
  typescript: {
    ignoreBuildErrors: true,  // Skip TypeScript checking during the build process
  },
};

export default nextConfig;
