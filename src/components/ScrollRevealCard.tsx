// Optimized ScrollRevealCard with lazy GSAP loading
"use client";

import React, { useRef, ReactNode } from "react";
import { useGSAPWithScrollTrigger } from "@/utils/gsapLoader";
import "./ScrollRevealCard.css";

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

  // Use optimized GSAP loading
  useGSAPWithScrollTrigger((gsap, ScrollTrigger) => {
    const el = ref.current;
    if (!el) return;

    const animation = gsap.fromTo(
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
        duration: duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Return cleanup function
    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger: any) => {
        if (trigger.trigger === el) {
          trigger.kill();
        }
      });
    };
  });

  return (
    <div ref={ref} className={`scroll-reveal-card ${className}`}>
      {children}
    </div>
  );
};

export default ScrollRevealCard;
