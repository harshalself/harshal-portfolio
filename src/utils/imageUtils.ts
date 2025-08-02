// Image optimization utilities
import { ImageProps } from "next/image";

// Function to generate appropriate sizes attribute based on image use case
export function getSizes(
  type: "avatar" | "hero" | "gallery" | "carousel" | "banner" | "default"
): string {
  switch (type) {
    case "avatar":
      return "(max-width: 600px) 50px, (max-width: 1024px) 80px, 100px";
    case "hero":
      return "(max-width: 600px) 100vw, (max-width: 1024px) 80vw, 700px";
    case "gallery":
      return "(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw";
    case "carousel":
      return "(max-width: 600px) 300px, (max-width: 1024px) 400px, 440px";
    case "banner":
      return "100vw";
    default:
      return "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
  }
}

// Default placeholder blur data URL (light grey)
export const defaultBlurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJub25lIj48cGF0aCBmaWxsPSIjRTlFQkVFIiBkPSJNMCAwaDQwMHYzMDBIMHoiLz48L3N2Zz4=";

// Helper to generate image props for Next.js Image component
export function getOptimizedImageProps(props: {
  src: string;
  alt: string;
  type?: "avatar" | "hero" | "gallery" | "carousel" | "banner" | "default";
  priority?: boolean;
  quality?: number;
}): Partial<ImageProps> {
  const { src, alt, type = "default", priority = false, quality = 85 } = props;

  return {
    src,
    alt,
    quality,
    priority,
    sizes: getSizes(type),
    loading: priority ? "eager" : "lazy",
    placeholder: "blur",
    blurDataURL: defaultBlurDataURL,
  };
}

// Function to determine if an image should be unoptimized (like animated GIFs)
export function shouldSkipOptimization(src: string): boolean {
  // Check if image is a GIF
  if (src.toLowerCase().endsWith(".gif")) {
    return true;
  }

  // Check if image is from an external domain that might not be in next.config.js domains list
  const isExternalDomain =
    !src.startsWith("/") &&
    !src.startsWith("data:") &&
    !src.match(/^https?:\/\/(localhost|127\.0\.0\.1)/);

  return isExternalDomain;
}
