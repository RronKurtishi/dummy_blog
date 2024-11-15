/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3C67D5',
        'primary-dark': '#2C51B0',
      }
    }
  },
  plugins: [],
}
