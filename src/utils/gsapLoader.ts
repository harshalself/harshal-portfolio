// Optimized GSAP loader that reduces initial bundle size
"use client";

import { useEffect, useRef, useState } from "react";

// Global GSAP cache
let gsapPromise: Promise<any> | null = null;
let scrollTriggerPromise: Promise<any> | null = null;

// Lazy load GSAP only when needed
export const loadGSAP = async () => {
  if (!gsapPromise) {
    gsapPromise = import("gsap").then((module) => {
      if (typeof window !== "undefined") {
        // Store GSAP globally for other components
        (window as any).gsap = module.gsap;
      }
      return module.gsap;
    });
  }
  return gsapPromise;
};

// Lazy load ScrollTrigger plugin
export const loadScrollTrigger = async () => {
  if (!scrollTriggerPromise) {
    scrollTriggerPromise = Promise.all([
      loadGSAP(),
      import("gsap/ScrollTrigger"),
    ]).then(([gsap, scrollTriggerModule]) => {
      if (typeof window !== "undefined") {
        gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);
      }
      return scrollTriggerModule.ScrollTrigger;
    });
  }
  return scrollTriggerPromise;
};

// Hook for components that need GSAP
export const useGSAP = (
  callback: (gsap: any) => void | (() => void),
  deps: any[] = []
) => {
  const cleanupRef = useRef<(() => void) | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    loadGSAP().then((gsap) => {
      if (isMounted) {
        setIsLoaded(true);
        const cleanup = callback(gsap);
        if (typeof cleanup === "function") {
          cleanupRef.current = cleanup;
        }
      }
    });

    return () => {
      isMounted = false;
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, deps);

  return isLoaded;
};

// Hook for components that need ScrollTrigger
export const useGSAPWithScrollTrigger = (
  callback: (gsap: any, ScrollTrigger: any) => void | (() => void),
  deps: any[] = []
) => {
  const cleanupRef = useRef<(() => void) | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    loadScrollTrigger().then((ScrollTrigger) => {
      if (isMounted) {
        const gsap = (window as any).gsap;
        setIsLoaded(true);
        const cleanup = callback(gsap, ScrollTrigger);
        if (typeof cleanup === "function") {
          cleanupRef.current = cleanup;
        }
      }
    });

    return () => {
      isMounted = false;
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, deps);

  return isLoaded;
};

// Preload GSAP for critical animations (call this in layout or critical components)
export const preloadGSAP = () => {
  if (typeof window !== "undefined") {
    // Preload GSAP on user interaction or after a delay
    const preload = () => {
      loadGSAP();
      document.removeEventListener("mousemove", preload);
      document.removeEventListener("scroll", preload);
      document.removeEventListener("touchstart", preload);
    };

    // Preload on first user interaction
    document.addEventListener("mousemove", preload, {
      once: true,
      passive: true,
    });
    document.addEventListener("scroll", preload, { once: true, passive: true });
    document.addEventListener("touchstart", preload, {
      once: true,
      passive: true,
    });

    // Fallback: preload after 3 seconds if no interaction
    setTimeout(preload, 3000);
  }
};
