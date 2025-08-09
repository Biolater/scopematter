import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#F6F7FB",
            foreground: "#0B1220",
            // Primary indigo
            primary: {
              DEFAULT: "#4F46E5",
              50: "#EEF2FF",
              100: "#E0E7FF",
              200: "#C7D2FE",
              300: "#A5B4FC",
              400: "#818CF8",
              500: "#6366F1",
              600: "#4F46E5",
              700: "#4338CA",
              800: "#3730A3",
              900: "#312E81",
              foreground: "#FFFFFF",
            },
            // Secondary cyan
            secondary: {
              DEFAULT: "#06B6D4",
              50: "#ECFEFF",
              100: "#CFFAFE",
              200: "#A5F3FC",
              300: "#67E8F9",
              400: "#22D3EE",
              500: "#06B6D4",
              600: "#0891B2",
              700: "#0E7490",
              800: "#155E75",
              900: "#164E63",
              foreground: "#06202A",
            },
            focus: "#22D3EE",
          },
          layout: {
            radius: {
              small: "0.6rem",
              medium: "1rem",
              large: "1.5rem",
            },
          },
        },
        dark: {
          colors: {
            background: "#0B1018",
            foreground: "#E6EAF2",
            default: {
              50: "#0E1420",
              100: "#121A2A",
              200: "#182234",
              300: "#1F2B41",
              400: "#2A3852",
              500: "#32425F",
              600: "#3E5074",
            },
            primary: {
              DEFAULT: "#818CF8",
              600: "#4F46E5",
              foreground: "#0B1018",
            },
            secondary: {
              DEFAULT: "#22D3EE",
              600: "#06B6D4",
              foreground: "#082129",
            },
            focus: "#22D3EE",
          },
        },
      },
    }),
  ],
}

module.exports = config;