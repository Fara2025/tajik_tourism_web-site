/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3FA877", // зелёный чай
        secondary: "#8FD6E1", // голубое небо
        accent: "#FFD700", // золотой
        background: "#EAF8F1", // нежно-мятный
        textcolor: "#1F2937", // тёмно-серый
      },
    },
  },
  plugins: [],
};
