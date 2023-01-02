/** @type {import('next').NextConfig} */
const nextConfig = {
  output:'standalone',
  reactStrictMode: true,
  swcMinify: true,
  env: {
    PUBLIC_URL: process.env.PUBLIC_URL,

  },
}

module.exports = nextConfig
