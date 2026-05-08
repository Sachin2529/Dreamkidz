/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#F9A8D4',
          soft: '#FFF1F2',
          cream: '#FFFBF5',
        }
      },
    },
  },
  plugins: [],
}