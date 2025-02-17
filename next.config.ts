import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "soshace.com",
        pathname: "/**", // Izinkan semua path dari domain ini
      },
      {
        protocol: "https",
        hostname: "www.ternaklinux.com",
        pathname: "/**", // Izinkan semua path dari domain ini
      },
    ],
  },
};

export default nextConfig;
