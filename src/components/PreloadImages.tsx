"use client";

import { useEffect } from "react";

interface PreloadImagesProps {
  images: string[];
  count?: number;
}

/**
 * Component to preload critical images
 * This helps with LCP (Largest Contentful Paint) for important images
 */
export function PreloadImages({ images, count = 3 }: PreloadImagesProps) {
  useEffect(() => {
    if (!images || !images.length) return;

    // Only preload the first N images (default 3)
    const criticalImages = images.slice(0, count);

    // Create preload links for each critical image
    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });

    // Clean up function to remove preload links when component unmounts
    return () => {
      criticalImages.forEach((src) => {
        const links = document.head.querySelectorAll(
          `link[rel="preload"][href="${src}"]`
        );
        links.forEach((link) => document.head.removeChild(link));
      });
    };
  }, [images, count]);

  // This component doesn't render anything
  return null;
}
