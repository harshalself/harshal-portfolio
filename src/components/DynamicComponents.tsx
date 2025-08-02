"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the components that are below the fold
const DynamicHomeCarousels = dynamic(
  () => import("@/components/HomeCarousels"),
  {
    loading: () => (
      <div
        style={{
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.03)",
          borderRadius: "16px",
        }}>
        Loading carousels...
      </div>
    ),
    ssr: false, // Disable server-side rendering for this component
  }
);

const DynamicInfiniteMomentumCarousel = dynamic(
  () =>
    import("@/components/InfiniteMomentumCarousel").then((mod) => ({
      default: mod.InfiniteMomentumCarousel,
    })),
  {
    loading: () => (
      <div
        style={{
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.03)",
          borderRadius: "16px",
        }}>
        Loading carousel...
      </div>
    ),
    ssr: false, // Disable server-side rendering for this component
  }
);

const DynamicMasonry = dynamic(
  () => import("@/components/co-curricular/Masonry"),
  {
    loading: () => (
      <div
        style={{
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.03)",
          borderRadius: "16px",
        }}>
        Loading gallery...
      </div>
    ),
    ssr: false, // Disable server-side rendering for this component
  }
);

export {
  DynamicHomeCarousels,
  DynamicInfiniteMomentumCarousel,
  DynamicMasonry,
};
