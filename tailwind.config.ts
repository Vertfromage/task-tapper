import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Primary background color
        foreground: "var(--foreground)", // Primary foreground color
        primary: {
          DEFAULT: "#4A90E2",          // Main action color
          dark: "#357ABD",             // Darker shade for hovers
          light: "#6BB5FF",            // Lighter shade for highlights
        },
        secondary: {
          DEFAULT: "#50E3C2",          // Secondary action color
          dark: "#30B596",
          light: "#7FF5D4",
        },
        accent: {
          DEFAULT: "#F5A623",          // Accent color
          dark: "#D58A1A",
          light: "#FFD19F",
        },
        text: {
          DEFAULT: "#333333",          // Primary text color
          muted: "#6C6C6C",            // Less prominent text
          light: "#999999",            // Placeholder text
        },
        success: "#29C775",            // Success notifications
        warning: "#FFAA00",            // Warnings
        danger: "#FF4D4D",             // Errors
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Roboto Slab", "serif"], // Display fonts for headings
      },
      spacing: {
        18: "4.5rem",                   // Useful for medium padding/margins
        36: "9rem",                     // Extra-large spacing for sections
        72: "18rem",                    // Larger spacing for bigger components
      },
      borderRadius: {
        lg: "1rem",                    // Large rounded corners
        xl: "1.5rem",                  // Extra-large rounded corners
        "2xl": "2rem",                 // Smooth for big buttons
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",    // Subtle shadow for cards
        DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)", 
        lg: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.04)",  // Richer depth for modals
      },
    },
  },
  plugins: [],
};

export default config;

