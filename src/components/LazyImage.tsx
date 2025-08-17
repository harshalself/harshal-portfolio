"use client";

import React, { useRef, useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { getCostOptimizedImageProps } from "@/utils/imageOptimizationHelper";

interface LazyImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  loadingPriority?: "high" | "medium" | "low";
  rootMargin?: string;
  isAboveFold?: boolean;
  isCarousel?: boolean;
  isAvatar?: boolean;
  isIcon?: boolean;
}

/**
 * LazyImage component that uses IntersectionObserver to load images only when they enter the viewport
 */
export function LazyImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  quality = 75,
  loadingPriority = "medium",
  rootMargin = "200px",
  isAboveFold = false,
  isCarousel = false,
  isAvatar = false,
  isIcon = false,
  ...rest
}: LazyImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(
    loadingPriority === "high" || isAboveFold
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // Get cost-optimized image properties
  const optimizedProps = getCostOptimizedImageProps(src, alt, {
    width: typeof width === "number" ? width : undefined,
    height: typeof height === "number" ? height : undefined,
    isAboveFold,
    isCarousel,
    isAvatar,
    isIcon,
  });

  // Determine loading strategy based on priority
  const loadEagerly = loadingPriority === "high" || isAboveFold;
  const observerMargin =
    loadingPriority === "high"
      ? "500px"
      : loadingPriority === "medium"
      ? "200px"
      : "50px";

  useEffect(() => {
    // Skip intersection observer for high priority images
    if (loadEagerly) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: rootMargin || observerMargin,
        threshold: 0.01, // Trigger when just 1% is visible
      }
    );

    const currentImageRef = imageRef.current;
    if (currentImageRef) {
      observer.observe(currentImageRef);
    }

    return () => {
      if (currentImageRef) {
        observer.unobserve(currentImageRef);
      }
    };
  }, [loadEagerly, observerMargin, rootMargin]);

  // Generate a simple placeholder color
  const placeholderColor = "#f0f0f0"; // Light grey

  return (
    <div
      ref={imageRef}
      className={className}
      style={{
        position: fill ? "relative" : "static",
        width: fill ? "100%" : "auto",
        height: fill ? "100%" : "auto",
        background: !isLoaded ? placeholderColor : "transparent",
        transition: "background-color 0.5s ease",
        overflow: "hidden",
      }}>
      {(isVisible || loadEagerly) && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          quality={optimizedProps.quality || quality}
          onLoad={() => setIsLoaded(true)}
          className={className}
          unoptimized={optimizedProps.unoptimized}
          priority={optimizedProps.priority}
          loading={optimizedProps.loading}
          placeholder={optimizedProps.placeholder}
          blurDataURL={optimizedProps.blurDataURL}
          sizes={optimizedProps.sizes}
          {...rest}
        />
      )}
    </div>
  );
}
