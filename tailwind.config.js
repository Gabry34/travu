/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customGray: "#888DA7",
        customBlack: "#161616",
        searchBarGray: "#3B3B3B",
      },
      fontFamily: {
        Tenor: ["Tenor Sans"],
        Work: ["Work Sans"],
        Poppins: ["Poppins"],
        Lato: ["Lato"],
        Mulish: ["Mulish"],
        satoshi: ["Satoshi"],
      },
      backgroundImage: {
        bgImage: "url('/paesaggio')",
      },
    },
  },
  plugins: [require("rippleui")],
};
