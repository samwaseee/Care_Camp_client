/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'blood': '#f5333f',
      'secondary': '#ebebeb'
    }
  },
  plugins: [
    require('daisyui'),
  ],
}