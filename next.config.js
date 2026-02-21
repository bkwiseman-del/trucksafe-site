/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Wix drug/alcohol-testing category has a literal slash in the slug
      // MUST come before any general :cat wildcard rule
      {
        source: '/blog/categories/drug/alcohol-testing',
        destination: '/blog/categories/drug-alcohol-testing',
        permanent: true,
      },
      // Old internal /articles route → new /blog
      {
        source: '/articles',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/articles/:path*',
        destination: '/blog',
        permanent: true,
      },
      // Wix duplicate homepage
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      // Wix pricing page → Compliance+
      {
        source: '/pricing-plans/list',
        destination: '/complianceplus',
        permanent: true,
      },
      // Wix apparel → shop
      {
        source: '/trucksafe-apparel',
        destination: '/shop',
        permanent: true,
      },
      // Wix member area → dashboard
      {
        source: '/members',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
