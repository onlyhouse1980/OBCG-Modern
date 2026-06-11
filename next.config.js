// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [70, 75],
  },
  // Enable URL imports if needed, otherwise keep defaults
  experimental: {
    inlineCss: true,
    serverActions: {
      allowedOrigins: ['localhost:3000', 'nuked-mongodb-main.vercel.app']
    }
  }
};

module.exports = nextConfig;
