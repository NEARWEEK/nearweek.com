module.exports = {
  darkMode: "class",
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx}"]
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {}
  },
  plugins: [require("@tailwindcss/line-clamp")]
};
