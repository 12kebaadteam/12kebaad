import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix "Page with redirect" GSC issue: enforce trailing slash consistency
  trailingSlash: false,

  // Security & performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirect www to non-www (fixes "Page with redirect" if using www)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.12kebaad.in" }],
        destination: "https://12kebaad.in/:path*",
        permanent: true,
      },
    ];
  },

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  // External packages that should run on server only
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
