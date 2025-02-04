import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cmkyznelxslzvzqlncud.supabase.co",
        port: "",
        pathname: "/storage/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
