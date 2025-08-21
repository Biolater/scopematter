// tailwind.config.js
const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(accordion|autocomplete|avatar|button|card|checkbox|chip|code|drawer|dropdown|input|kbd|link|listbox|navbar|number-input|select|skeleton|snippet|toggle|toast|popover|divider|ripple|spinner|form|scroll-shadow|modal|menu).js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
