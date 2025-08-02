// Optimized icon system that lazy loads icons and reduces bundle size
"use client";

import React, { memo, lazy, Suspense } from "react";

// Icon placeholder component
const IconPlaceholder = ({
  size = 28,
  title,
}: {
  size?: number;
  title?: string;
}) => (
  <div
    style={{
      width: size,
      height: size,
      backgroundColor: "var(--static-neutral-200)",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "8px",
      color: "var(--static-neutral-500)",
    }}
    title={title}>
    <span>⚡</span>
  </div>
);

// Commonly used icons - these will be bundled for better performance
export const CommonIcons = {
  // Most frequently used icons from react-icons/fa
  FaPython: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaPython }))
  ),
  FaReact: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaReact }))
  ),
  FaNodeJs: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaNodeJs }))
  ),
  FaHtml5: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaHtml5 }))
  ),
  FaCss3Alt: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaCss3Alt }))
  ),
  FaJs: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaJs }))
  ),
  FaStar: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaStar }))
  ),
  FaCamera: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaCamera }))
  ),
  FaUsers: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaUsers }))
  ),
  FaMedal: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaMedal }))
  ),
  FaTheaterMasks: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaTheaterMasks }))
  ),

  // Common Si icons
  SiTypescript: lazy(() =>
    import("react-icons/si").then((mod) => ({ default: mod.SiTypescript }))
  ),
  SiFirebase: lazy(() =>
    import("react-icons/si").then((mod) => ({ default: mod.SiFirebase }))
  ),
  SiSupabase: lazy(() =>
    import("react-icons/si").then((mod) => ({ default: mod.SiSupabase }))
  ),
  SiTailwindcss: lazy(() =>
    import("react-icons/si").then((mod) => ({ default: mod.SiTailwindcss }))
  ),

  // Common Gi icons
  GiMusicalNotes: lazy(() =>
    import("react-icons/gi").then((mod) => ({ default: mod.GiMusicalNotes }))
  ),
};

// Icon component with automatic lazy loading
interface OptimizedIconProps {
  name: keyof typeof CommonIcons;
  size?: number;
  title?: string;
  className?: string;
}

export const OptimizedIcon = memo(
  ({ name, size = 28, title, className }: OptimizedIconProps) => {
    const IconComponent = CommonIcons[name];

    return (
      <Suspense fallback={<IconPlaceholder size={size} title={title} />}>
        <IconComponent size={size} title={title} className={className} />
      </Suspense>
    );
  }
);

OptimizedIcon.displayName = "OptimizedIcon";

// Hook for preloading critical icons
export const usePreloadCriticalIcons = () => {
  React.useEffect(() => {
    // Preload most commonly used icons
    const criticalIcons = [
      "FaPython",
      "FaReact",
      "FaNodeJs",
      "FaHtml5",
      "FaCss3Alt",
      "FaJs",
      "SiTypescript",
    ] as const;

    criticalIcons.forEach((iconName) => {
      // Trigger lazy loading
      CommonIcons[iconName];
    });
  }, []);
};
