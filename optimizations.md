# Next.js Portfolio Performance Optimizations

This document lists atomic, actionable tasks to optimize performance, Core Web Vitals, and user experience for your Next.js project, based on common issues seen in Vercel Speed Insights and best practices for modern web apps.

---

## 1. **Image Optimization**

- [x] Create optimized image components (`OptimizedImage` and `OptimizedAvatar`)
- [x] Serve images in modern formats (WebP/AVIF) and use responsive `sizes`/`srcSet`
- [x] Configure Next.js Image settings in next.config.mjs for optimal performance
- [x] Add blur placeholders to prevent layout shift during image loading
- [ ] Convert all remaining image instances to use the new optimized components
- [ ] Compress and resize static images in `/public`
- [ ] Add preloading hints for critical path images

## 2. **Font Optimization**

- [ ] Use `next/font` for all custom fonts (already partially done).
- [ ] Limit font weights/styles to only those used.
- [ ] Preload critical fonts if needed.

## 3. **JavaScript & Bundle Size**

- [x] Remove unused dependencies and code (tree-shake imports, check for dead code). (Removed: keen-slider, ogl, react-fast-marquee, react-masonry-css)
- [x] Use dynamic imports (`next/dynamic`) for non-critical or below-the-fold components (e.g., carousels, heavy animations, charts).
- [ ] Avoid large third-party libraries if possible (e.g., consider alternatives to GSAP if only simple animations are needed).
- [x] Analyze bundle with `next build && npx next analyze`.

## 4. **CSS & Styling**

- [ ] Remove unused CSS (purge unused classes, especially from global styles).
- [ ] Use CSS modules or CSS-in-JS for component-level styles.
- [ ] Minimize use of `!important` and global selectors.

## 5. **Rendering & Hydration**

- [ ] Use `"use client"` only where necessary (minimize client components).
- [ ] Move as much logic as possible to server components.
- [ ] Avoid heavy computation in render methods; use `useMemo`/`useCallback` appropriately.
- [ ] Use Suspense and streaming for slow data or components.

## 6. **Data Fetching & API**

- [ ] Use static generation (SSG) or incremental static regeneration (ISR) for all pages that don't require per-request data.
- [ ] Cache API responses where possible.
- [ ] Avoid fetching unnecessary data on the client.

## 7. **Accessibility & UX**

- [ ] Ensure all interactive elements are keyboard accessible.
- [ ] Use semantic HTML and ARIA attributes where needed.
- [ ] Avoid layout shifts (CLS) by setting explicit width/height for images and containers.

## 8. **Other Best Practices**

- [ ] Set proper cache headers for static assets.
- [ ] Use a CDN for all static files (handled by Vercel by default).
- [ ] Monitor and fix any console warnings/errors in production.
- [ ] Regularly check Lighthouse and Vercel Speed Insights for regressions.

---

## How to Use This List

- Tackle one task at a time and check it off.
- After each batch of changes, redeploy and check Vercel Speed Insights and Lighthouse.
- Prioritize tasks with the biggest impact (images, JS, and rendering).

---

**Ready to start? Let me know which area you'd like to tackle first!**
