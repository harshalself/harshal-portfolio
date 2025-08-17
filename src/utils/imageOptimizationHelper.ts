// Helper utilities for Vercel Image Optimization cost reduction
import { ImageProps } from "next/image";

/**
 * Determines optimal image settings based on usage context and size
 */
export function getOptimalImageSettings(
  src: string,
  context: {
    width?: number;
    height?: number;
    isAboveFold?: boolean;
    isCarousel?: boolean;
    isAvatar?: boolean;
    isIcon?: boolean;
  }
): {
  shouldUseUnoptimized: boolean;
  quality: number;
  priority: boolean;
  sizes?: string;
} {
  const { width, height, isAboveFold, isCarousel, isAvatar, isIcon } = context;

  // Small images (under 10KB estimate or very small dimensions) should be unoptimized
  const isSmallImage =
    (width && width <= 64) || (height && height <= 64) || isIcon;

  // GIFs and SVGs should always be unoptimized
  const isAnimatedOrVector =
    src.toLowerCase().endsWith(".gif") || src.toLowerCase().endsWith(".svg");

  // External domains not in remotePatterns should be unoptimized
  const isExternalDomain =
    !src.startsWith("/") &&
    !src.startsWith("data:") &&
    !src.match(
      /^https:\/\/(media\.licdn\.com|picsum\.photos|raw\.githubusercontent\.com|user-images\.githubusercontent\.com)/
    );

  const shouldUseUnoptimized =
    isSmallImage || isAnimatedOrVector || isExternalDomain;

  // Quality settings (use allowed qualities: 75, 85, 95)
  let quality = 75; // Default conservative quality
  if (isAboveFold && !isCarousel) {
    quality = 85; // Higher quality for hero/important images
  }
  if (isAvatar || isIcon) {
    quality = 75; // Lower quality for small images
  }

  // Priority settings
  const priority = !!isAboveFold && !isCarousel; // Only critical above-fold images

  // Sizes optimization
  let sizes: string | undefined;
  if (isAvatar) {
    sizes = width ? `${width}px` : "64px";
  } else if (isCarousel) {
    sizes = "(max-width: 600px) 280px, (max-width: 1024px) 380px, 440px";
  } else if (isIcon) {
    sizes = width ? `${width}px` : "32px";
  }

  return {
    shouldUseUnoptimized,
    quality,
    priority,
    sizes,
  };
}

/**
 * Wrapper for Next.js Image that automatically applies cost-optimized settings
 */
export function getCostOptimizedImageProps(
  src: string,
  alt: string,
  context: {
    width?: number;
    height?: number;
    isAboveFold?: boolean;
    isCarousel?: boolean;
    isAvatar?: boolean;
    isIcon?: boolean;
  }
): Partial<ImageProps> {
  const settings = getOptimalImageSettings(src, context);

  const baseProps: Partial<ImageProps> = {
    src,
    alt,
    loading: settings.priority ? "eager" : "lazy",
    quality: settings.shouldUseUnoptimized ? undefined : settings.quality,
    unoptimized: settings.shouldUseUnoptimized,
    priority: settings.priority,
  };

  if (!settings.shouldUseUnoptimized) {
    baseProps.placeholder = "blur";
    baseProps.blurDataURL =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJub25lIj48cGF0aCBmaWxsPSIjRTlFQkVFIiBkPSJNMCAwaDQwMHYzMDBIMHoiLz48L3N2Zz4=";
  }

  if (settings.sizes) {
    baseProps.sizes = settings.sizes;
  }

  return baseProps;
}

/**
 * Analyze current image usage and provide optimization recommendations
 */
export function analyzeImageUsage(
  images: Array<{
    src: string;
    width?: number;
    height?: number;
    context: string;
  }>
) {
  const analysis = {
    totalImages: images.length,
    smallImages: 0,
    externalImages: 0,
    animatedImages: 0,
    potentialSavings: 0,
  };

  images.forEach((img) => {
    const settings = getOptimalImageSettings(img.src, {
      width: img.width,
      height: img.height,
    });

    if (settings.shouldUseUnoptimized) {
      analysis.potentialSavings++;

      if ((img.width && img.width <= 64) || (img.height && img.height <= 64)) {
        analysis.smallImages++;
      }
      if (!img.src.startsWith("/")) {
        analysis.externalImages++;
      }
      if (img.src.toLowerCase().endsWith(".gif")) {
        analysis.animatedImages++;
      }
    }
  });

  return analysis;
}
