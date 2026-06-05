import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/002",
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
