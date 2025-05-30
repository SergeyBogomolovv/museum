import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
        search: '',
      },
      {
        protocol: 'http',
        hostname: 'server',
        port: '1337',
        pathname: '/uploads/**',
        search: '',
      },
    ],
  },
}

export default nextConfig
