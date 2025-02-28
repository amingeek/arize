/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com', 'another-domain.com', 'cdn.example.org'],
  },
};

module.exports = nextConfig;