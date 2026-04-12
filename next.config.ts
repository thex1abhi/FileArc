import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol:"https",
        hostname: 'fleet-dinosaur-742.convex.cloud',
       
      },
    ],
  },
};

export default nextConfig; 
