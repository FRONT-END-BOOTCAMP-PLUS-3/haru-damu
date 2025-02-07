import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cmkyznelxslzvzqlncud.supabase.co", "lh3.googleusercontent.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "cmkyznelxslzvzqlncud.supabase.co",
    //     port: "",
    //     pathname: "/storage/**",
    //     search: "",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "lh3.googleusercontent.com",
    //     pathname: "/a/**",
    //   },
    // ],
  },
};

export default nextConfig;
