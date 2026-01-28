/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
         hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
        {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    unoptimized: false,
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig