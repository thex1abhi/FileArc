import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol:"https",
        hostname: 'youthful-armadillo-394.convex.cloud',
       
      },
    ],
  },
};

export default nextConfig; 
