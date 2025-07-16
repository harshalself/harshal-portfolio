"use client";
import { useIsMobile } from "./useIsMobile";
import dynamic from "next/dynamic";

const HomeHeroMobile = dynamic(() => import("./HomeHeroMobile"), {
  ssr: false,
});

export default function HomeHeroMobileWrapper() {
  const isMobile = useIsMobile();
  if (!isMobile) return null;
  return <HomeHeroMobile />;
}
