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
  quality = 75,
}: IntersectionObserverImageProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const node = imgRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-loaded", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "200px",
        threshold: 0.01,
      }
    );
    observer.observe(node);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
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
