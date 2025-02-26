/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    // domains: ["lh3.googleusercontent.com", "drive.google.com", "*"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ✅ Allows all domains
      },
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
