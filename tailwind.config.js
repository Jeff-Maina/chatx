/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "jost": "Jost",
        "poppins": "Poppins"
      },
      colors: {
        "bordercolor": "#e6e6e6"
      }
    },
  },
  plugins: [],
};
