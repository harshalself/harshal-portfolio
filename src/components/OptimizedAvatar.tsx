// Custom avatar component that uses next/image for better image optimization
import React from "react";
import Image from "next/image";
import {
  getOptimizedImageProps,
  shouldSkipOptimization,
} from "@/utils/imageUtils";

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
  const skipOptimization = shouldSkipOptimization(src);

  const imageProps = getOptimizedImageProps({
    src,
    alt,
    type: "avatar",
    priority,
    quality: 90, // Higher quality for avatars as they're small
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
        unoptimized={skipOptimization}
        loading={priority ? "eager" : "lazy"}
        placeholder={skipOptimization ? undefined : "blur"}
        blurDataURL={
          skipOptimization ? undefined : (imageProps.blurDataURL as string)
        }
      />
    </div>
  );
}
