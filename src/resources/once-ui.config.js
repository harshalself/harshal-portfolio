import { home } from "./content";

/**
 * Portfolio Configuration
 * This file contains all the configuration for the portfolio site
 */

// Base URL for SEO meta tags and schema
const baseURL = "https://harshal-portfolio-website.vercel.app";

// Available routes in the application
const routes = {
  "/": true,
  "/about": true,
  "/work": true,
  "/co-curricular": true,
  "/extra-curricular": true,
};

// Display options for UI elements
const display = {
  location: true,
  time: true,
  themeSwitcher: true,
};

// Import and set font for each variant
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

/**
 * Theme and styling configuration
 * Applied to the HTML in the main layout.tsx
 */
const style = {
  // Theme settings
  theme: "system", // Options: dark | light | system

  // Color scheme
  neutral: "gray", // Options: sand | gray | slate | custom
  brand: "cyan", // Options: blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  accent: "red", // Options: blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom

  // UI appearance
  solid: "contrast", // Options: color | contrast
  solidStyle: "flat", // Options: flat | plastic
  border: "playful", // Options: rounded | playful | conservative
  surface: "translucent", // Options: filled | translucent
  transition: "all", // Options: all | micro | macro
  scaling: "100", // Options: 90 | 95 | 100 | 105 | 110
};

/**
 * Data visualization styling
 * Used for charts and data displays
 */
const dataStyle = {
  variant: "gradient", // Options: flat | gradient | outline
  mode: "categorical", // Options: categorical | divergent | sequential
  height: 24, // Default chart height

  // Axis configuration
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },

  // Tick marks configuration
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

/**
 * Visual effects configuration
 * Controls various visual effects throughout the site
 */
const effects = {
  // Cursor mask effect
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },

  // Background gradient effect
  gradient: {
    display: false,
    opacity: 100,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "accent-background-strong",
    colorEnd: "page-background",
  },

  // Decorative dots effect
  dots: {
    display: true,
    opacity: 40,
    size: "2",
    color: "brand-background-strong",
  },

  // Background grid effect
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },

  // Decorative lines effect
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

/**
 * Mailchimp newsletter configuration
 * Controls the newsletter signup form styling and submission endpoint
 */
const mailchimp = {
  // Mailchimp form action URL (replace with your own)
  action: "https://url/subscribe/post?parameters",

  // Visual effects for the newsletter section
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: true,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  },
};

/**
 * SEO Schema data
 * Used for structured data in meta tags
 */
const schema = {
  logo: "",
  type: "Person",
  name: "Harshal Patil",
  description: home.description,
  email: "harshalpatilself@gmail.com",
};

/**
 * Social media links
 * Used in schema.org markup and social icons
 */
const sameAs = {
  github: "https://github.com/harshalself",
  linkedin: "https://www.linkedin.com/in/harshal-patil-534502259/",
  instagram:
    "https://www.instagram.com/harshal_patil.mp4?igsh=MTRtZXk1NGRhdDNqMQ%3D%3D&utm_source=qr",
};

export {
  display,
  mailchimp,
  routes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  effects,
  dataStyle,
};
