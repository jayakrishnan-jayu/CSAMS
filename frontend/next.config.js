/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    contextPath: process.env.NODE_ENV === 'production' ? '/public' : '',
  }
}

module.exports = nextConfig
