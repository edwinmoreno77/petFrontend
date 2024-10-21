/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        1.5: "0.375rem",
      },
<<<<<<< HEAD
      colors: {
        'primary-green': '#8ABE39',
        'primary-purple': '#4458B0',
        'yellow': '#FFDC2D',
        'green': '#70C158',
        'dark-yellow': '#FFFA5C',
        'dark-green': '#537B93',
=======
      fontSize: {
        xxs: "0.625rem",
      },
      colors: {
        primary: "#7EE43A",
      },
      screens: {
        xs: "370px",
>>>>>>> 2e06c26da2fcfaf8dc9094c71175f759a58e11d9
      },
    },
  },
  plugins: [],
};
