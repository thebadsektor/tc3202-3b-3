/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scrollBehavior: ["smooth"],
      colors: {
        primary: "#4A90E2", //blue
        secondary: "#50E3C2", //green
        accent: "#F5A623", //orange
        neutral: "#3D4451", //gray
        info: "#3ABFF8", //light-blue
        success: "#36D399", //l-green
        warning: "#FBBD23", //orange-yellow
        error: "#F87272", //light-red
        gray1: "#303030", //background
        "base-100": "#FFFFFF",
      },
    },
  },
  plugins: [daisyui],
};
