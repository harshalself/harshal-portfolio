"use client";

import React, { useRef, useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface LazyImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  loadingPriority?: "high" | "medium" | "low";
  rootMargin?: string;
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
  quality = 85,
  loadingPriority = "medium",
  rootMargin = "200px",
  ...rest
}: LazyImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(loadingPriority === "high");
  const [isLoaded, setIsLoaded] = useState(false);

  // Determine loading strategy based on priority
  const loadEagerly = loadingPriority === "high";
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

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
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
          quality={quality}
          onLoad={() => setIsLoaded(true)}
          loading={loadEagerly ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJub25lIj48cGF0aCBmaWxsPSIjRTlFQkVFIiBkPSJNMCAwaDQwMHYzMDBIMHoiLz48L3N2Zz4="
          {...rest}
        />
      )}
    </div>
  );
}
