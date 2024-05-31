const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  theme: {
    extend: {},
    colors: {
      'blood': '#f5333f',
      'second': '#ebebeb'
    },
    fontFamily: {
        'taj': ['Tajawal', 'sans-serif'],
        'mon': ['Montserrat', 'sans-serif']
    }
  },
  plugins: [require("daisyui"),nextui()],
}