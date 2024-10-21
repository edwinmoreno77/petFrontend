/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        1.5: "0.375rem",
      },
      fontSize: {
        xxs: "0.625rem",
      },
      colors: {
        primary: "#7EE43A",
      },
      screens: {
        xs: "370px",
      },
    },
  },
  plugins: [],
};
