/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: [
      'melebucket.s3.ap-northeast-2.amazonaws.com',
      'img.danawa.com',
      'upload.wikimedia.org',
    ],
  },
};

module.exports = nextConfig;
