/** @type {import('next').NextConfig} */
const nextConfig = {
  output:'standalone',
  reactStrictMode: false,
  swcMinify: true,
  env: {
    PUBLIC_URL: process.env.PUBLIC_URL,

  },
}

module.exports = nextConfig
