import dotenv from 'dotenv';

dotenv.config();



/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify:  true,
  experimental:{
    appDir: true,
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,
  },
};
// module.exports = nextConfig;

export default nextConfig