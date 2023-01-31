/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/api/**',
      },
    ],
  },
  output:'standalone',
  reactStrictMode: false,
  swcMinify: true,
  env: {
    PUBLIC_URL: process.env.PUBLIC_URL,
  },
}

module.exports = nextConfig
