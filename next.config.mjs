/** @type {import('next').NextConfig} */

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    config.resolve.alias["handlebars"] = path.resolve(
      __dirname,
      "node_modules",
      "handlebars",
      "dist",
      "handlebars.js"
    );
    return config;
  },

  reactStrictMode: false,
  images: {
    domains: [
      "utfs.io",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "www.francisdemange.net",
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["my-proxy.com", "*.my-proxy.com"],
    },
  },
};

export default nextConfig;
