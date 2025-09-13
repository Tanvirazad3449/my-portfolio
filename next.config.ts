import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com', 
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;