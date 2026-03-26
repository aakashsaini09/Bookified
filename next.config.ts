import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '100mb',
        }
    },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        // Optional: port and pathname can use wildcards
        port: '', 
        pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'another-domain.net',
        port: '',
        pathname: '/**', // Allows any pathname on this domain
      },
    ],
  },
};

export default nextConfig;