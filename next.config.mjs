const nextConfig = {
  // Enable experimental features if needed
  experimental: {
    // Add any experimental features here
  },
  
  // Image optimization settings
  images: {
    domains: ['placeholder.svg'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true,
  },
  
  // Redirect configuration
  async redirects() {
    return [
      {
        source: '/auth',
        destination: '/signin',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/signin',
        permanent: true,
      },
      {
        source: '/register',
        destination: '/signup',
        permanent: true,
      },
    ]
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // ESLint and TypeScript settings
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
