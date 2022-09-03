/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    path: '*'
  },
  ignoreBuildErrors: true,
};

module.exports = nextConfig;
