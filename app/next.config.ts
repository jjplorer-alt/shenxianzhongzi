import type { NextConfig } from "next";
import path from "path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPrefix = basePath ? `${basePath}/` : "";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: assetPrefix || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
