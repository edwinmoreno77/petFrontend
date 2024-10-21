/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        1.5: "0.375rem",
      },
      colors: {
        'primary-green': '#8ABE39',
        'primary-purple': '#4458B0',
        'yellow': '#FFDC2D',
        'green': '#70C158',
        'dark-yellow': '#FFFA5C',
        'dark-green': '#537B93',
      },
    },
  },
  plugins: [],
};
