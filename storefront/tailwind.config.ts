import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0C1446",
        "cs-red": "#F70B28",
        "cs-blue": "#3CC7F7",
        "cs-purple": "#AC4DFF",
        "cs-orange": "#FF8B00",
        "cs-green": "#93DB21",
        "cs-yellow": "#FFD500",
        "cs-grey": "#B3B3B3",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
