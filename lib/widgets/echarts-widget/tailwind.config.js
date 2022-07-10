const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx}"]
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blueGray: colors.blueGray,
        teal: colors.teal,
        orange: colors.orange
      }
    }
  },
  plugins: [require("@tailwindcss/line-clamp")]
};
