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
      xs: "480px",
      sm: "768px",
      md: "1060px"
    }
  },
  plugins: [],
}