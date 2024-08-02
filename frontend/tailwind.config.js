/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryRed: "#B9090B",
        blackLayer: "rgb(44, 42, 42, 0.8)",
        dimBlack: "rgba(0, 0, 0, 0.8)",
        dimNavbar: "rgba(0, 0, 0, 0.2)",
        whiteLayer: "rgba(255, 255, 255, 0.3)"
      }
    },
  },
  plugins: [],
}