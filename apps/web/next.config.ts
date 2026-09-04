import type { NextConfig } from 'next';

const backendUrl = process.env.JAMIN8R_BACKEND_URL ?? 'http://localhost:8080';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@jamin8r/api-client', '@jamin8r/contracts', '@jamin8r/design'],
  async rewrites() {
    return [{ source: '/api/backend/:path*', destination: `${backendUrl}/:path*` }];
  },
};

export default nextConfig;
