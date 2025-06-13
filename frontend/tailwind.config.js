/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores personalizada para el casino
        primary: "#DA0037", // Rojo casino
        secondary: "#171717", // Negro oscuro
        accent: "#F8BC25", // Dorado
        neutral: "#EDEDED", // Casi blanco
        "base-100": "#111111", // Fondo oscuro
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'casino-pattern': "url('/src/assets/pattern.png')",
        'hero-pattern': "url('/src/assets/hero-bg.jpg')",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        casinoTheme: {
          "primary": "#DA0037",
          "secondary": "#171717",
          "accent": "#F8BC25",
          "neutral": "#EDEDED",
          "base-100": "#111111",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
      "dark",
    ],
  },
}
