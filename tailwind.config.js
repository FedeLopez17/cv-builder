/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "cv-layout": "60mm 1fr",
      },
      gridTemplateRows: {
        "cv-layout": "50mm minmax(247mm, auto)",
      },
      width: {
        a4: "210mm",
      },
      height: {
        a4: "297mm",
      },
      fontFamily: {
        inter: ["Inter", "sans"],
        lato: ["Lato", "sans"],
        lora: ["Lora", "serif"],
        merriweather: ["Merriweather", "serif"],
        montserrat: ["Montserrat", "sans"],
        "open-sans": ["Open Sans", "sans"],
        "playfair-display": ["Playfair Display", "serif"],
        poppins: ["Poppins", "sans"],
        roboto: ["Roboto", "sans"],
      },
      boxShadow: {
        "main-header": "0px 4px 8px rgba(211, 211, 211, 1)",
      },
      colors: {
        darkseagreen: "#8fbc8f",
        lightseagreen: "#b6d9b6",
      },
    },
  },
  plugins: [],
};
