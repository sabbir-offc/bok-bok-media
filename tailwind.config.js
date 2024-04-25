/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'signUpBG': "url('/public/images/logo.png')",
      }
    },
  },
  plugins: [require("daisyui")],
}

