const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: "#E7DCC1",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FEFDFC",
          400: "#F2EDDE",
          500: "#E7DCC1",
          600: "#D7C599",
          700: "#C8AE70",
          800: "#B89848",
          900: "#907638",
        },
      },
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
        title: ["Oswald"],
      },
    },
  },
  plugins: [],
};
