// Optimized image component with better defaults for Next.js Image
import React from "react";
import Image, { ImageProps } from "next/image";
import { getCostOptimizedImageProps } from "@/utils/imageOptimizationHelper";

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
  // Get cost-optimized image properties
  const optimizedProps = getCostOptimizedImageProps(src, alt, {
    width: typeof width === "number" ? width : undefined,
    height: typeof height === "number" ? height : undefined,
    isAboveFold: priority,
    isCarousel: imageType === "carousel",
    isIcon: imageType === "default" && typeof width === "number" && width <= 64,
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
        sizes={sizes || optimizedProps.sizes}
        className={className}
        unoptimized={optimizedProps.unoptimized}
        loading={optimizedProps.loading}
        placeholder={optimizedProps.placeholder}
        blurDataURL={optimizedProps.blurDataURL}
        quality={quality || optimizedProps.quality}
        priority={optimizedProps.priority}
        {...rest}
      />
    </div>
  );
}
