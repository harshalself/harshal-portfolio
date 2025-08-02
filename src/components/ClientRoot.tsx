"use client";
import React, { useEffect } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import { preloadGSAP } from "@/utils/gsapLoader";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  // Preload GSAP on user interaction for better performance with longer delay
  useEffect(() => {
    // Wait longer (7 seconds) before fallback loading GSAP
    preloadGSAP(7000);
  }, []);

  return <SmoothScroll>{children}</SmoothScroll>;
}
