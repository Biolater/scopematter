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
            primary: {
              DEFAULT: "#2563EB",
              50: "#EFF6FF",
              100: "#DBEAFE",
              200: "#BFDBFE",
              300: "#93C5FD",
              400: "#60A5FA",
              500: "#3B82F6",
              600: "#2563EB",
              700: "#1D4ED8",
              800: "#1E40AF",
              900: "#1E3A8A",
              foreground: "#FFFFFF",
            },
            focus: "#93C5FD",
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
              DEFAULT: "#60A5FA",
              600: "#3B82F6",
              foreground: "#0B1018",
            },
            focus: "#60A5FA",
          },
        },
      },
    }),
  ],
}

module.exports = config;