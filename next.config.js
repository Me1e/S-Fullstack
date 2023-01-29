/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['melebucket.s3.ap-northeast-2.amazonaws.com', 't1.daumcdn.net'],
  },
};

module.exports = nextConfig;
