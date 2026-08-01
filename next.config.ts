import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Evita problemas de deploy si hay trailing slashes inconsistentes
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default nextConfig;
