import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode:true
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint checks
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
