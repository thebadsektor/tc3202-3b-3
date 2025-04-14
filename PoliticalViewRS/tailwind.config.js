/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollBehavior: ['responsive'],
      colors: {
        primary: "#4A90E2",
        secondary: "#50E3C2",
        accent: "#F5A623",
        neutral: "#3D4451",
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
        gray1: "#303030",
        "base-100": "#FFFFFF",
      },
    },
  },
  plugins: [daisyui],
};
