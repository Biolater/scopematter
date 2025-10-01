// tailwind.config.js
const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(accordion|alert|autocomplete|avatar|badge|button|card|checkbox|chip|code|date-picker|drawer|dropdown|input|kbd|link|listbox|navbar|number-input|progress|select|skeleton|snippet|toggle|table|tabs|toast|popover|divider|ripple|spinner|form|scroll-shadow|calendar|date-input|modal|menu|spacer).js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
