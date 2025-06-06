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
        protocol: 'https',
        hostname: 'admin.demidov-museum.ru',
        port: '1337',
        pathname: '/uploads/**',
        search: '',
      },
    ],
  },
}

export default nextConfig
