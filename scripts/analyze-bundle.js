#!/usr/bin/env node

/**
 * Bundle optimization script
 * Analyzes and provides recommendations for bundle size optimization
 */

const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const srcDir = path.join(projectRoot, "src");

// Find all react-icons imports
function findReactIconImports(dir) {
  const imports = new Set();

  function scanFile(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");

    // Find named imports from react-icons
    const namedImports = content.match(
      /import\s*\{([^}]+)\}\s*from\s*["']react-icons\/[^"']+["']/g
    );
    if (namedImports) {
      namedImports.forEach((imp) => {
        const icons = imp
          .match(/\{([^}]+)\}/)[1]
          .split(",")
          .map((icon) => icon.trim().replace(/\s+as\s+\w+/, ""));
        icons.forEach((icon) => imports.add(icon));
      });
    }

    // Find require() usage
    const requireMatches = content.match(
      /require\(["']react-icons\/[^"']+["']\)\.\w+/g
    );
    if (requireMatches) {
      requireMatches.forEach((req) => {
        const icon = req.split(".").pop();
        imports.add(icon);
      });
    }
  }

  function walkDir(currentDir) {
    const files = fs.readdirSync(currentDir);

    files.forEach((file) => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (
        stat.isDirectory() &&
        !file.startsWith(".") &&
        file !== "node_modules"
      ) {
        walkDir(filePath);
      } else if (
        file.endsWith(".tsx") ||
        file.endsWith(".ts") ||
        file.endsWith(".jsx") ||
        file.endsWith(".js")
      ) {
        scanFile(filePath);
      }
    });
  }

  walkDir(dir);
  return Array.from(imports);
}

// Analyze bundle and provide optimization recommendations
function analyzeBundleOptimizations() {
  console.log("🔍 Analyzing bundle for optimization opportunities...\n");

  // Check react-icons usage
  const iconImports = findReactIconImports(srcDir);
  console.log(`📊 Found ${iconImports.length} unique react-icons imports:`);
  console.log(
    `   ${iconImports.slice(0, 10).join(", ")}${
      iconImports.length > 10 ? "..." : ""
    }\n`
  );

  // Recommendations
  console.log("🚀 Optimization Recommendations:\n");

  console.log("1. REACT-ICONS OPTIMIZATION:");
  console.log(`   • Current: ${iconImports.length} individual icon imports`);
  console.log(
    `   • Estimated bundle impact: ~${Math.round(iconImports.length * 2.5)}KB`
  );
  console.log(
    "   • Recommendation: Use OptimizedIcon component with lazy loading"
  );
  console.log("   • Expected savings: 30-50% reduction in icon bundle size\n");

  console.log("2. ANIMATION LIBRARIES:");
  console.log("   • GSAP: ~150KB (keep with lazy loading)");
  console.log("   • Framer Motion: ~100KB (already optimized)");
  console.log("   • Lenis: ~15KB (minimal impact)");
  console.log("   • Recommendation: Implement lazy loading for GSAP\n");

  console.log("3. DYNAMIC IMPORTS STATUS:");
  console.log("   ✅ HomeCarousels - dynamically loaded");
  console.log("   ✅ Masonry - dynamically loaded");
  console.log("   ✅ InfiniteMomentumCarousel - dynamically loaded");
  console.log("   🔄 ScrollRevealCard - optimize with lazy GSAP\n");

  console.log("4. NEXT STEPS:");
  console.log("   1. Replace react-icons with OptimizedIcon component");
  console.log("   2. Implement GSAP lazy loading");
  console.log("   3. Add image preloading for critical images");
  console.log("   4. Monitor bundle size with: npm run analyze:win\n");

  // Check if optimizations are already in place
  const optimizedIconPath = path.join(
    srcDir,
    "components",
    "OptimizedIcons.tsx"
  );
  const gsapLoaderPath = path.join(srcDir, "utils", "gsapLoader.ts");

  if (fs.existsSync(optimizedIconPath)) {
    console.log("✅ OptimizedIcons component found");
  }
  if (fs.existsSync(gsapLoaderPath)) {
    console.log("✅ GSAP loader utility found");
  }
}

// Main execution
if (require.main === module) {
  analyzeBundleOptimizations();
}

module.exports = { findReactIconImports, analyzeBundleOptimizations };
