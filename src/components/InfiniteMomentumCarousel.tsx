"use client";

import React, { useRef, useEffect, useState, ReactNode } from "react";

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
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const momentum = useRef(0);
  const isMomentumScrolling = useRef(false);
  const isAutoScrolling = useRef(true);
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
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      setAnimationFrame(null);
    }
    isAutoScrolling.current = false;
    isMomentumScrolling.current = false;
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
      momentum.current = velocity * 1000; // px/sec
      isMomentumScrolling.current = true;
      // Do NOT change autoScrollDirection.current; always use initial direction
      animateMomentum();
    } else {
      isAutoScrolling.current = true;
    }
  };

  // --- Momentum & Blending Animation ---
  const animateMomentum = () => {
    if (!containerRef.current) return;
    let frame: number;
    let lastTimestamp = performance.now();
    const step = (timestamp: number) => {
      const dt = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      // Apply friction
      momentum.current *= 0.95;
      const targetSpeed = autoScrollSpeed * autoScrollDirection.current;
      // If momentum is in the opposite direction, immediately resume auto-scroll
      if (
        momentum.current !== 0 &&
        Math.sign(momentum.current) !== Math.sign(targetSpeed)
      ) {
        isMomentumScrolling.current = false;
        isAutoScrolling.current = true;
        setAnimationFrame(null);
        return;
      }
      // If momentum is close to auto-scroll speed, blend smoothly
      if (Math.abs(momentum.current - targetSpeed) < transitionThreshold) {
        const blendFactor =
          Math.abs(momentum.current - targetSpeed) / transitionThreshold;
        let blendedVelocity =
          momentum.current * blendFactor + targetSpeed * (1 - blendFactor);
        // Clamp: never let blendedVelocity drop below targetSpeed in the correct direction
        if (Math.abs(blendedVelocity) < Math.abs(targetSpeed)) {
          blendedVelocity = targetSpeed;
        }
        // If very close, switch to auto-scroll
        if (Math.abs(blendedVelocity - targetSpeed) < 0.2) {
          isMomentumScrolling.current = false;
          isAutoScrolling.current = true;
          setAnimationFrame(null);
          return;
        }
        containerRef.current!.scrollLeft += blendedVelocity * (dt / 1000);
        handleInfiniteScroll();
        frame = requestAnimationFrame(step);
        setAnimationFrame(frame);
        return;
      }
      // Regular momentum
      containerRef.current!.scrollLeft += momentum.current * (dt / 1000);
      handleInfiniteScroll();
      frame = requestAnimationFrame(step);
      setAnimationFrame(frame);
    };
    frame = requestAnimationFrame(step);
    setAnimationFrame(frame);
  };

  // --- Infinite Scroll Logic ---
  const handleInfiniteScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    if (scrollLeft < totalWidth * 0.5) {
      containerRef.current.scrollLeft += totalWidth;
    } else if (scrollLeft > totalWidth * 1.5) {
      containerRef.current.scrollLeft -= totalWidth;
    }
  };

  // --- On Mount: Center to Middle Set ---
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = totalWidth;
    }
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
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

  // --- Auto-scroll Effect ---
  useEffect(() => {
    let frame: number;
    const autoScroll = () => {
      if (
        !isDragging &&
        !isMomentumScrolling.current &&
        isAutoScrolling.current &&
        containerRef.current
      ) {
        containerRef.current.scrollLeft +=
          autoScrollSpeed * autoScrollDirection.current;
        handleInfiniteScroll();
      }
      frame = requestAnimationFrame(autoScroll);
    };
    frame = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(frame);
  }, [autoScrollSpeed]);

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
      className="infinite-momentum-carousel"
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
