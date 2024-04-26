/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "megb-blue-primary": "#0C356A",
        "megb-blue-secundary": "#0174BE",
        "megb-yellow-primary": "#FFC436",
        "megb-yellow-secundary": "#FFF0CE",
      },
    },
  },
  plugins: [],
}