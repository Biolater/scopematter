import { heroui } from "@heroui/theme";

// Tailwind v4 CSS-first HeroUI plugin configuration
export default heroui({
  themes: {
    light: {
      colors: {
        background: "#F6F7FB",
        foreground: "#0B1220",
        primary: "#4F46E5",
        secondary: "#06B6D4",
        focus: "#22D3EE",
      },
      layout: { radius: { small: "0.6rem", medium: "1rem", large: "1.5rem" } },
    },
    dark: {
      colors: {
        background: "#0B1018",
        foreground: "#E6EAF2",
        primary: "#818CF8",
        secondary: "#22D3EE",
        focus: "#22D3EE",
      },
    },
  },
});


