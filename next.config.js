/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.theresanaiforthat.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'f55ed2adb1bb673919f5f8189e32d3a1.cdn.bubble.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig 