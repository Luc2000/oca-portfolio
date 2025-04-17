import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Mantém o darkMode class, mas vamos forçá-lo sempre no layout
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        // Adicionar tons específicos para melhorar consistência no modo escuro
        dark: {
          DEFAULT: "#0a0a0a",
          50: "#171717",
          100: "#1a1a1a",
          200: "#2a2a2a",
          300: "#3a3a3a",
          400: "#4a4a4a",
          500: "#5a5a5a",
        },
      },
      screens: {
        xs: "480px", // Adicionar breakpoint para telefones pequenos
      },
      animation: {
        // Otimizar animações para serem mais suaves e menos demandantes
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true, // Melhorar desempenho em dispositivos móveis
  },
};

export default config;
