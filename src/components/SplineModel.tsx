"use client";

import React from "react";
// ✅ Import directly (avoid `/next`)
import Spline from "@splinetool/react-spline";

export function SplineModel() {
  return (
    <div
      className="spline-desktop"
      style={{
        width: 443,
        height: 225,
        minWidth: 0,
        overflow: "hidden",
        display: "flex",
        justifyContent: "flex-end",
      }}>
      <Spline scene="https://prod.spline.design/myYhCDjhFfQBeklA/scene.splinecode" />
    </div>
  );
}
