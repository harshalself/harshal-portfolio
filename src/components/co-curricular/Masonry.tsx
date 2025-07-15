"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import styles from "./Masonry.module.css";

const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number
): number => {
  // Only run matchMedia in the browser
  const get = () => {
    if (typeof window === "undefined") return defaultValue;
    return (
      values[queries.findIndex((q) => window.matchMedia(q).matches)] ??
      defaultValue
    );
  };

  const [value, setValue] = useState<number>(defaultValue);

  useEffect(() => {
    setValue(get()); // Set correct value on mount (client only)
    const handler = () => setValue(get());
    queries.forEach((q) =>
      window.matchMedia(q).addEventListener("change", handler)
    );
    return () =>
      queries.forEach((q) =>
        window.matchMedia(q).removeEventListener("change", handler)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries.join(","), values.join(",")]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img: string;
  url: string;
  height?: number; // Make height optional
  widthSpan?: number; // Add widthSpan for dynamic width
  title: string; // Add title to the item interface
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:600px)",
      "(min-width:400px)",
    ],
    [4, 3, 2, 1],
    1
  );

  const gap = 16; // px, adjust as needed
  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item: any) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === "random") {
      const directions = ["top", "bottom", "left", "right"];
      direction = directions[
        Math.floor(Math.random() * directions.length)
      ] as typeof animateFrom;
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];

    const gap = 10; // px
    const minColSpan = 1;
    const maxColSpan = Math.min(2, columns); // Allow items to span 1 or 2 columns
    const colHeights = new Array(columns).fill(0);
    const columnWidth = (width - gap * (columns - 1)) / columns;

    return items.map((child) => {
      // Randomly choose width span (1 or 2 columns)
      const widthSpan =
        Math.floor(Math.random() * (maxColSpan - minColSpan + 1)) + minColSpan;
      const actualSpan = Math.min(widthSpan, columns); // Don't exceed total columns
      // Find the best column to place this item (lowest max height among possible spans)
      let minY = Infinity;
      let col = 0;
      for (let i = 0; i <= columns - actualSpan; i++) {
        const maxColHeight = Math.max(...colHeights.slice(i, i + actualSpan));
        if (maxColHeight < minY) {
          minY = maxColHeight;
          col = i;
        }
      }
      const x = col * (columnWidth + gap);
      // Assign a random height between 300 and 500 if not provided
      const rawHeight =
        typeof child.height === "number"
          ? child.height
          : Math.floor(Math.random() * 200) + 300;
      const height = rawHeight / 2;
      const y = minY;
      // Update the heights for the columns this item spans
      for (let i = col; i < col + actualSpan; i++) {
        colHeights[i] = y + height + gap;
      }
      return {
        ...child,
        x,
        y,
        w: columnWidth * actualSpan + gap * (actualSpan - 1),
        h: height,
        widthSpan: actualSpan,
      };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: "blur(10px)" }),
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: "blur(0px)" }),
          duration: 0.8,
          ease: "power3.out",
          delay: index * stagger,
        });
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (e: React.MouseEvent, item: any) => {
    const element = e.currentTarget as HTMLElement;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(
        "." + styles["color-overlay"]
      ) as HTMLElement;
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3,
        });
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent, item: any) => {
    const element = e.currentTarget as HTMLElement;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(
        "." + styles["color-overlay"]
      ) as HTMLElement;
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
        });
      }
    }
  };

  const maxHeight =
    grid.length > 0 ? Math.max(...grid.map((item) => item.y + item.h)) : 0;

  return (
    <div
      ref={containerRef}
      className={styles.list}
      style={{ height: maxHeight }}>
      {grid.map((item) => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className={styles["item-wrapper"]}
            onClick={() => window.open(item.url, "_blank", "noopener")}
            onMouseEnter={(e) => handleMouseEnter(e, item)}
            onMouseLeave={(e) => handleMouseLeave(e, item)}>
            <div
              className={styles["item-img"]}
              style={{ backgroundImage: `url(${item.img})` }}>
              {colorShiftOnHover && (
                <div
                  className={styles["color-overlay"]}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))",
                    opacity: 0,
                    pointerEvents: "none",
                    borderRadius: "8px",
                  }}
                />
              )}
              <div className={styles["item-title"]}>{item.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;
