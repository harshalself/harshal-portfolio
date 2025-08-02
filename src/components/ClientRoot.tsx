"use client";
import React from "react";
import SmoothScroll from "@/components/SmoothScroll";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
