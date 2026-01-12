---
description: Used this to create frontend
---

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Sobria y Pastel (US1)
        primary: {
          50: '#f4f7f6', // Fondo muy claro
          100: '#e3e8e6',
          500: '#8da399', // Verde Salvia (Pastel sobrio)
          700: '#4a5d56', // Texto oscuro / Botones
          900: '#2a3632', // Títulos serios
        },
        secondary: '#d4cbb8', // Beige arena (Pastel cálido)
        'surface': '#faf9f6', // Blanco roto para fondos
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'], // Legibilidad
        serif: ['var(--font-playfair)', 'serif'], // Elegancia (Títulos)
      },
    },
  },
  plugins: [],
};
export default config;