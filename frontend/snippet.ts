import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  eslint: {
    // Ensure lint errors don't fail production builds
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Avoid bundling optional deps pulled by walletconnect/pino
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'pino-pretty': false,
      'supports-color': false,
    };
    return config;
  },
};

export default nextConfig;
