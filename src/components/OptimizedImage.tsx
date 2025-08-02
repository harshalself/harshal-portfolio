// Optimized image component with better defaults for Next.js Image
import React from "react";
import Image, { ImageProps } from "next/image";
import {
  getOptimizedImageProps,
  shouldSkipOptimization,
} from "@/utils/imageUtils";

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  imageType?: "hero" | "gallery" | "carousel" | "banner" | "default";
  aspectRatio?: number; // width/height
  className?: string;
  wrapperClassName?: string;
}

export function OptimizedImage({
  src,
  alt,
  imageType = "default",
  aspectRatio,
  fill = false,
  width,
  height,
  className = "",
  wrapperClassName = "",
  priority = false,
  quality,
  sizes,
  ...rest
}: OptimizedImageProps) {
  const skipOptimization = shouldSkipOptimization(src);

  // Get default optimized props
  const imageProps = getOptimizedImageProps({
    src,
    alt,
    type: imageType,
    priority,
    quality:
      typeof quality === "number" ? quality : imageType === "hero" ? 90 : 85,
  });

  // If aspectRatio is provided but not width/height, set default width and calculate height
  const defaultWidth = 800;
  const calculatedProps =
    !width && !height && aspectRatio
      ? {
          width: defaultWidth,
          height: Math.round(defaultWidth / aspectRatio),
        }
      : {};

  // If fill is true, wrapper needs position: relative
  const wrapperStyles = fill
    ? { position: "relative", width: "100%", height: "100%" }
    : {};

  return (
    <div
      className={wrapperClassName}
      style={wrapperStyles as React.CSSProperties}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width || calculatedProps.width : undefined}
        height={!fill ? height || calculatedProps.height : undefined}
        sizes={sizes || imageProps.sizes}
        className={className}
        unoptimized={skipOptimization}
        loading={priority ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL={
          skipOptimization ? undefined : (imageProps.blurDataURL as string)
        }
        quality={quality || imageProps.quality}
        {...rest}
      />
    </div>
  );
}
