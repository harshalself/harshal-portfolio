"use client";

import React, { useEffect, useRef } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";

interface IntersectionObserverImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
}

/**
 * Component that uses Intersection Observer API to optimize image loading
 * Similar to LazyImage but specifically tailored for carousel items
 */
export function IntersectionObserverImage({
  src,
  alt,
  width,
  height,
  className,
  fill = false,
  priority = false,
  quality = 85,
}: IntersectionObserverImageProps) {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip for priority images (load immediately)
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add data-loaded attribute when image enters viewport
            if (imgRef.current) {
              imgRef.current.setAttribute("data-loaded", "true");
            }
            // Stop observing
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "200px", // Start loading when image is within 200px of viewport
        threshold: 0.01, // Trigger when just 1% is visible
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  return (
    <div
      ref={imgRef}
      data-loaded={priority ? "true" : "false"}
      className={`intersection-observer-image ${className || ""}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        quality={quality}
        imageType="carousel"
      />

      <style jsx>{`
        .intersection-observer-image {
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          width: 100%;
          height: 100%;
        }

        .intersection-observer-image[data-loaded="true"] {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
