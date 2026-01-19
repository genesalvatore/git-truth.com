/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // For Netlify Functions (API routes will be handled by Netlify Functions)
  // Static export still works, API routes will be in netlify/functions/
}

module.exports = nextConfig
