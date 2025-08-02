"use client";

import React, {
  useRef,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import styles from "./InfiniteMomentumCarousel.module.scss";

interface InfiniteMomentumCarouselProps {
  children: ReactNode;
  cardWidth?: number; // px
  cardSpacing?: number; // px
  height?: number | string;
  autoScrollSpeed?: number; // px per frame
}

export const InfiniteMomentumCarousel: React.FC<
  InfiniteMomentumCarouselProps
> = ({
  children,
  cardWidth = 360,
  cardSpacing = 32,
  height = "auto",
  autoScrollSpeed = 2,
}) => {
  // --- Refs and State ---
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const animationFrame = useRef<number | null>(null);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const momentum = useRef(0);
  const isMomentumScrolling = useRef(false);
  const autoScrollDirection = useRef(1); // 1 for right, -1 for left
  const transitionThreshold = 2.0; // px/frame

  // --- Prepare Items for Infinite Effect ---
  const items = React.Children.toArray(children);
  const allItems = [...items, ...items, ...items];
  const totalWidth = items.length * (cardWidth + cardSpacing);

  // --- Drag Handlers ---
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(containerRef.current?.scrollLeft || 0);
    lastX.current = e.clientX;
    lastTime.current = performance.now();
    isMomentumScrolling.current = false;
    momentum.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - dx;
    }
    // Calculate velocity
    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      setVelocity((lastX.current - e.clientX) / dt);
    }
    lastX.current = e.clientX;
    lastTime.current = now;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    // If there was a significant drag, apply momentum; otherwise, resume auto-scroll
    if (Math.abs(velocity) > 0.01) {
      // Convert px/ms to px/frame (assuming ~16.67ms per frame at 60fps)
      momentum.current = velocity * 16.67;
      isMomentumScrolling.current = true;
    } else {
      isMomentumScrolling.current = false;
      momentum.current = 0;
    }
  };

  // --- Infinite Scroll Logic ---
  const handleInfiniteScroll = useCallback(() => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    if (scrollLeft < totalWidth * 0.5) {
      containerRef.current.scrollLeft += totalWidth;
    } else if (scrollLeft > totalWidth * 1.5) {
      containerRef.current.scrollLeft -= totalWidth;
    }
  }, [totalWidth]);

  // --- Unified Animation Loop ---
  useEffect(() => {
    let lastTimestamp = performance.now();
    const animate = (timestamp: number) => {
      const dt = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      if (containerRef.current) {
        let speed = 0;
        if (isDragging) {
          // Dragging: do nothing, user controls scroll
        } else if (
          isMomentumScrolling.current &&
          Math.abs(momentum.current) > 0.01
        ) {
          // Apply friction
          momentum.current *= 0.95;
          const targetSpeed = autoScrollSpeed * autoScrollDirection.current;
          // If momentum is in the opposite direction, switch to auto-scroll
          if (
            momentum.current !== 0 &&
            Math.sign(momentum.current) !== Math.sign(targetSpeed)
          ) {
            isMomentumScrolling.current = false;
            momentum.current = 0;
            speed = targetSpeed;
          } else if (
            Math.abs(momentum.current - targetSpeed) < transitionThreshold
          ) {
            // Blend momentum into auto-scroll speed
            const blendFactor =
              Math.abs(momentum.current - targetSpeed) / transitionThreshold;
            let blendedVelocity =
              momentum.current * blendFactor + targetSpeed * (1 - blendFactor);
            if (Math.abs(blendedVelocity) < Math.abs(targetSpeed)) {
              blendedVelocity = targetSpeed;
            }
            speed = blendedVelocity;
            // If very close, switch to auto-scroll
            if (Math.abs(blendedVelocity - targetSpeed) < 0.2) {
              isMomentumScrolling.current = false;
              momentum.current = 0;
              speed = targetSpeed;
            }
          } else {
            speed = momentum.current;
            // If momentum is very low, switch to auto-scroll
            if (Math.abs(momentum.current) < 0.2) {
              isMomentumScrolling.current = false;
              momentum.current = 0;
              speed = targetSpeed;
            }
          }
        } else {
          // Always auto-scroll when not dragging or in momentum
          speed = autoScrollSpeed * autoScrollDirection.current;
        }
        if (!isDragging && speed !== 0) {
          containerRef.current.scrollLeft += speed;
          handleInfiniteScroll();
        }
      }
      animationFrame.current = requestAnimationFrame(animate);
    };
    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrame.current !== null)
        cancelAnimationFrame(animationFrame.current);
    };
    // eslint-disable-next-line
  }, [autoScrollSpeed, isDragging, handleInfiniteScroll]);

  // --- On Mount: Center to Middle Set ---
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = totalWidth;
    }
    return () => {
      if (animationFrame.current !== null)
        cancelAnimationFrame(animationFrame.current);
    };
    // eslint-disable-next-line
  }, []);

  // --- Prevent Default Image Drag ---
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const prevent = (e: Event) => e.preventDefault();
    node.addEventListener("dragstart", prevent);
    return () => node.removeEventListener("dragstart", prevent);
  }, []);

  // --- Render ---
  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        overflowX: "auto",
        display: "flex",
        gap: cardSpacing,
        height,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        scrollBehavior: "auto",
        WebkitOverflowScrolling: "touch",
        boxSizing: "border-box",
        padding: "24px 0",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE 10+
      }}
      className={styles.infiniteMomentumCarousel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={isDragging ? handlePointerUp : undefined}
      onPointerCancel={isDragging ? handlePointerUp : undefined}>
      {allItems.map((child, idx) => (
        <div
          key={idx}
          style={{
            flex: `0 0 ${cardWidth}px`,
            minWidth: cardWidth,
            maxWidth: cardWidth,
            pointerEvents: isDragging ? "none" : "auto",
            transition: "box-shadow 0.2s",
          }}>
          {child}
        </div>
      ))}
    </div>
  );
};
