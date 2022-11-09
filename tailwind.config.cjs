/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xl: "1920px",
      },
      colors: {
        white: "#ffffff",
        primary: "#023e8a",
        secondary: "#0077b6",
        tertiary: "#00b4d8",
        window: "#caf0f8",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          white: "#ffffff",
          primary: "#023e8a",
          secondary: "#0077b6",
          accent: "#00b4d8",
          neutral: "#caf0f8",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
