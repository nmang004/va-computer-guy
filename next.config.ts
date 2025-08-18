import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SEO and Performance optimizations
  trailingSlash: false,
  poweredByHeader: false,
  
  // Image optimization for better Core Web Vitals
  images: {
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compression and caching
  compress: true,
  
  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ],
      },
    ];
  },
  
  // Redirects for SEO (examples - can be expanded)
  async redirects() {
    return [
      // Add any legacy URL redirects here
      // Example:
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ];
  },
  
  // Experimental features for better SEO and performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Compiler optimizations for modern browsers
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
