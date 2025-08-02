// Dynamic import wrapper for Lenis smooth scrolling
"use client";

import React, { useState, useEffect } from "react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<any>(null);

  // Initialize Lenis on client-side only
  useEffect(() => {
    async function initLenis() {
      try {
        // Dynamically import Lenis
        const { default: Lenis } = await import("lenis");

        // Initialize Lenis with default smooth scrolling settings
        // Using any to bypass TypeScript definition issues
        const lenisInstance = new Lenis({
          duration: 1.2,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        } as any);

        // Setup RAF for Lenis
        function raf(time: number) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        setLenis(lenisInstance);

        return () => {
          lenisInstance.destroy();
        };
      } catch (err) {
        console.error("Failed to initialize smooth scrolling:", err);
      }
    }

    initLenis();
  }, []);

  return <>{children}</>;
}
