import { heroui } from "@heroui/theme";

// ScopeMatter Pro — crisp, trustworthy, table-friendly
export default heroui({
  themes: {
    light: {
      colors: {
        // Cool neutrals for structure & long-form reading
        default: {
          50:  "#F9FBFD",
          100: "#F1F5FA",
          200: "#E6ECF5",
          300: "#D7DFEC",
          400: "#A9B4C8",
          500: "#7A879D",
          600: "#5D6A80",
          700: "#445166",
          800: "#2B394D",
          900: "#0E172A",
          foreground: "#0A1020",
          DEFAULT: "#7A879D",
        },

        // Primary actions — confident indigo, great on white & dark
        primary: {
          50:  "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1", // Indigo-500
          600: "#4F46E5", // WCAG-friendly focus & pressed
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
          foreground: "#FFFFFF",
          DEFAULT: "#4F46E5",
        },

        // Secondary/tertiary accents (links, subtle CTAs)
        secondary: {
          50:  "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
          800: "#155E75",
          900: "#164E63",
          foreground: "#052129",
          DEFAULT: "#06B6D4",
        },

        // Status colors map 1:1 to ScopeMatter semantics
        success: {
          50:  "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981", // "In scope / Approved"
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
          foreground: "#053423",
          DEFAULT: "#10B981",
        },
        warning: {
          50:  "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B", // "Pending / Needs review"
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          foreground: "#231600",
          DEFAULT: "#F59E0B",
        },
        danger: {
          50:  "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444", // "Out of scope / Rejected"
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
          foreground: "#FFFFFF",
          DEFAULT: "#EF4444",
        },

        // Page & text
        background: "#FAFBFD",
        foreground: "#0A1020",

        // Surface ladder (lists, cards, popovers, modals)
        content1: { DEFAULT: "#FFFFFF", foreground: "#0A1020" }, // rows / base
        content2: { DEFAULT: "#F6F8FC", foreground: "#0A1020" }, // cards / inputs
        content3: { DEFAULT: "#EDF2FA", foreground: "#0A1020" }, // popovers / menus
        content4: { DEFAULT: "#E5EBF7", foreground: "#0A1020" }, // modals / selected

        // UX affordances
        focus: "#4F46E5",
        overlay: "#000000",
      },
    },

    dark: {
      colors: {
        // Dark neutrals tuned to reduce banding & improve depth
        default: {
          50:  "#0B1120",
          100: "#0E1526",
          200: "#111A2E",
          300: "#162037",
          400: "#23314A",
          500: "#34465E",
          600: "#4E6482",
          700: "#8CA1BC",
          800: "#CBD7EA",
          900: "#F1F6FF",
          foreground: "#E7ECF7",
          DEFAULT: "#23314A",
        },

        primary: {
          50:  "#10194B",
          100: "#14215F",
          200: "#192A7A",
          300: "#2237A9",
          400: "#314AD9",
          500: "#4F46E5",
          600: "#818CF8",
          700: "#A5B4FC",
          800: "#C7D2FE",
          900: "#E0E7FF",
          foreground: "#0B1220",
          DEFAULT: "#818CF8", // slightly brighter default on dark
        },

        secondary: {
          50:  "#08232B",
          100: "#0C2F3A",
          200: "#0F3B49",
          300: "#12495B",
          400: "#15657A",
          500: "#22D3EE",
          600: "#67E8F9",
          700: "#A5F3FC",
          800: "#CFFAFE",
          900: "#ECFEFF",
          foreground: "#0B1220",
          DEFAULT: "#22D3EE",
        },

        success: {
          50:  "#07271A",
          100: "#0B3A27",
          200: "#0E4A31",
          300: "#10603F",
          400: "#118055",
          500: "#10B981",
          600: "#34D399",
          700: "#6EE7B7",
          800: "#A7F3D0",
          900: "#D1FAE5",
          foreground: "#0B1220",
          DEFAULT: "#34D399",
        },

        warning: {
          50:  "#2B1B00",
          100: "#3A2400",
          200: "#4B2E00",
          300: "#6B4200",
          400: "#8A5601",
          500: "#F59E0B",
          600: "#FBBF24",
          700: "#FCD34D",
          800: "#FDE68A",
          900: "#FEF3C7",
          foreground: "#0B1220",
          DEFAULT: "#FBBF24",
        },

        danger: {
          50:  "#2A0B0B",
          100: "#3A0F0F",
          200: "#4D1313",
          300: "#6A1919",
          400: "#8F2222",
          500: "#EF4444",
          600: "#F87171",
          700: "#FCA5A5",
          800: "#FECACA",
          900: "#FEE2E2",
          foreground: "#0B1220",
          DEFAULT: "#F87171",
        },

        background: "#0A0F1C",
        foreground: "#E7ECF7",

        content1: { DEFAULT: "#0F1629", foreground: "#E7ECF7" }, // rows / base
        content2: { DEFAULT: "#121B33", foreground: "#E7ECF7" }, // cards / inputs
        content3: { DEFAULT: "#182243", foreground: "#E7ECF7" }, // popovers / menus
        content4: { DEFAULT: "#21305C", foreground: "#E7ECF7" }, // modals / selected

        focus: "#818CF8",
        overlay: "#000000",
      },
    },
  },

  // Keep disabled slightly visible to avoid layout flicker in tables
  layout: {
    disabledOpacity: "0.5",
  },
});
