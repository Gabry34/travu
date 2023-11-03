/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
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
        customBlack: "#0d0d0f",
        searchBarGray: "#3B3B3B",
      },
      fontFamily: {
        Tenor: "Tenor Sans",
        Work: "Work Sans",
        Poppins: "Poppins",
        Lato: "Lato",
        Mulish: "Mulish",
        satoshi: "Satoshi",
        Montserrat: "Montserrat",
        Playfair: "Playfair Display",
        Frank: "Frank Ruhl Libre",
      },
      backgroundImage: {
        bgImage: "url('/paesaggio')",
      },
      screens: {
        "3xs": { max: "450px" },
        "2xs": { max: "550px" },
        xs: { max: "750px" },
        sm: { max: "820px" },
        md: { max: "1000px" },
        lg: { max: "1200px" },
        xl: { max: "1500px" },
      },
    },
  },
  plugins: [require("rippleui")],
};
