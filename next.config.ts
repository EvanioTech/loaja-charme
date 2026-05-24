import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.6"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lgcmaigxgpxfzudnueey.supabase.co',
      },
    ],
  },
};

export default nextConfig;
