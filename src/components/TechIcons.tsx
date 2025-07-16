import React from "react";

export interface TechIcon {
  icon: React.ReactNode;
  title: string;
}

export function TechIcons({ stack }: { stack: TechIcon[] }) {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      {stack.map(({ icon, title }, idx) => (
        <span
          key={title + idx}
          title={title}
          aria-label={title}
          style={{ display: "inline-flex" }}>
          {icon}
        </span>
      ))}
    </div>
  );
}
