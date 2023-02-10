/** @type {import('next').NextConfig}  */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
      },
    ],
    minimumCacheTTL: 1500000,
  },
}


// module.exports =  {
//   reactStrictMode: true,
//   images: {
//       domains: ['www.shutterstock.com'],
//   },
// }
