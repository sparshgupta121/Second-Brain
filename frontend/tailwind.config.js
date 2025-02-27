/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple: {
          200: "#f9fbfc",
          400: "#e0e7ff",
          450: "#c3c5f6",
          500: "#726dd1",
          600: "#5046e3"
        },
        customGrey: {
          500: "#dddddd"
        }
      }  
    },
  },
  plugins: [],
}
