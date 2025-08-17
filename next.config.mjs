import mdx from "@next/mdx";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

// Enable bundle analyzer based on environment variable and output static HTML report
const analyzeBundles = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  analyzerMode: "static",
  reportFilename: "../analyze/client.html",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
      },
      // Add more domains as needed
    ],
    // Reduced to only WebP to minimize transformations (was AVIF + WebP)
    formats: ["image/webp"],
    // Increased cache TTL to 31 days (2678400 seconds) to reduce transformations
    minimumCacheTTL: 2678400,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimized device sizes for actual usage patterns
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Optimized image sizes for actual component usage
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 440],
    // Limit quality options to reduce transformation variations
    qualities: [75, 85, 95],
  },
};

export default analyzeBundles(withMDX(nextConfig));
