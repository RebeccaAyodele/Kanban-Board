/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:  {
        "primary-color": "#F2F9FF" 
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      }
      
    },
    screens: {
      sm: "960px",
      md: "1200px"
    }
  },
  plugins: [],
}