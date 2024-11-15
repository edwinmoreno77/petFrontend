/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        1.5: "0.375rem",
      },
      boxShadow: {
        'equal': '0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 4px 0 6px rgba(0, 0, 0, 0.1), -4px 0 6px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        "primary-green": "#8ABE39",
      },
      fontSize: {
        xxs: "0.625rem",
      },
      screens: {
        xs: "370px",
      },
    },
    plugins: [],
  },
};
