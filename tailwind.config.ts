// tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Enables dark mode based on the "dark" class
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background, #f9f9f9)", // Light mode background
        foreground: "var(--foreground, #333333)", // Light mode text
        primary: {
          DEFAULT: "#4A90E2",
          dark: "#357ABD",
          light: "#6BB5FF",
        },
        secondary: {
          DEFAULT: "#50E3C2",
          dark: "#30B596",
          light: "#7FF5D4",
        },
        accent: {
          DEFAULT: "#F5A623",
          dark: "#D58A1A",
          light: "#FFD19F",
        },
        text: {
          DEFAULT: "#333333",
          muted: "#6C6C6C",
          light: "#999999",
        },
        success: "#29C775",
        warning: "#FFAA00",
        danger: "#FF4D4D",
        // Define dark mode colors for consistent styling
        lightGray: "#f3f3f3",
        darkGray: "#2D2D2D",               // Dark mode background for banners
        darkBackground: "#121212",          // Dark mode main background
        darkForeground: "#E5E5E5",          // Dark mode text color
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Roboto Slab", "serif"],
      },
      spacing: {
        18: "4.5rem",
        36: "9rem",
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
