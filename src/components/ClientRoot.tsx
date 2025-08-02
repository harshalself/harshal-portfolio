"use client";
import React, { useEffect } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import { preloadGSAP } from "@/utils/gsapLoader";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  // Preload GSAP on user interaction for better performance
  useEffect(() => {
    preloadGSAP();
  }, []);

  return <SmoothScroll>{children}</SmoothScroll>;
}
