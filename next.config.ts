import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mre-dev.s3.ap-south-1.amazonaws.com",
        pathname: "/frontend_assets/**",
      },
    ],
  },
};

export default nextConfig;
