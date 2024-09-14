import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "pastel-yellow": "#FFF9C4",
        "dark-chocolate": "#3E2723",
        "bright-pink": "#FF4081",
        "sky-blue": "#64B5F6",
        "soft-green": "#81C784",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
export default config;
