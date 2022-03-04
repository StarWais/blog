/** @type {import('next').NextConfig} */

const removeImports = require('next-remove-imports')({});

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = removeImports(nextConfig);
