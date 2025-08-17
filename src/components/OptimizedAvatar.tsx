// Custom avatar component that uses next/image for better image optimization
import React from "react";
import Image from "next/image";
import { getCostOptimizedImageProps } from "@/utils/imageOptimizationHelper";

interface OptimizedAvatarProps {
  src: string;
  size?: number;
  alt?: string;
  className?: string;
  priority?: boolean;
}

export function OptimizedAvatar({
  src,
  size = 48,
  alt = "Avatar",
  className = "",
  priority = false,
}: OptimizedAvatarProps) {
  // Get cost-optimized image properties
  const optimizedProps = getCostOptimizedImageProps(src, alt, {
    width: size,
    height: size,
    isAvatar: true,
    isAboveFold: priority,
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
      }}
      className={className}>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{
          objectFit: "cover",
          borderRadius: "50%",
        }}
        sizes={`${size}px`}
        unoptimized={optimizedProps.unoptimized}
        loading={optimizedProps.loading}
        priority={optimizedProps.priority}
        placeholder={optimizedProps.placeholder}
        blurDataURL={optimizedProps.blurDataURL}
        quality={optimizedProps.quality}
      />
    </div>
  );
}
