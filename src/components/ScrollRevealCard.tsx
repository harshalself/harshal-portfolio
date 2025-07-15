"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollRevealCard.css";

// Register plugin
if (typeof window !== "undefined" && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealCardProps {
  children: ReactNode;
  baseOpacity?: number;
  baseBlur?: number;
  baseY?: number;
  duration?: number;
  className?: string;
}

const ScrollRevealCard: React.FC<ScrollRevealCardProps> = ({
  children,
  baseOpacity = 0,
  baseBlur = 12,
  baseY = 40,
  duration = 0.8,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        opacity: baseOpacity,
        filter: `blur(${baseBlur}px)`,
        y: baseY,
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [baseOpacity, baseBlur, baseY, duration]);

  return (
    <div ref={ref} className={`scroll-reveal-card ${className}`}>
      {children}
    </div>
  );
};

export default ScrollRevealCard;
