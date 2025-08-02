"use client";

import React from "react";
import Image from "next/image";

export function GifModel() {
  return (
    <div
      className="gif-desktop"
      style={{
        width: 443,
        height: 225,
        minWidth: 0,
        overflow: "hidden",
        display: "flex",
        justifyContent: "flex-end",
      }}>
      <Image
        src="https://user-images.githubusercontent.com/10498744/210012254-234538ff-d198-48aa-8964-37e6fd45d227.gif"
        alt="Animated GIF"
        width={443}
        height={225}
        style={{
          objectFit: "cover",
          borderRadius: "8px",
        }}
        unoptimized // This is needed for GIFs to maintain animation
      />
    </div>
  );
}
