// tailwind.config.js
const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(accordion|alert|autocomplete|avatar|badge|button|card|checkbox|chip|code|drawer|dropdown|input|kbd|link|listbox|navbar|number-input|progress|select|skeleton|snippet|toggle|table|tabs|toast|popover|divider|ripple|spinner|form|scroll-shadow|modal|menu|spacer).js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
