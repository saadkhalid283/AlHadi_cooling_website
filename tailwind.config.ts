import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        // "Heat → Cool" brand system. CSS vars live in globals.css.
        sky: {
          DEFAULT: "hsl(var(--brand-sky))",
          soft: "hsl(var(--brand-sky-soft))",
          line: "hsl(var(--ice-line))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
          deep: "hsl(var(--brand-deep))",
          ink: "hsl(var(--brand-ink))",
          muted: "hsl(var(--brand-muted))",
        },
        ink: "hsl(var(--ink-strong))",
        steel: "hsl(var(--steel))",
        paper: {
          DEFAULT: "hsl(var(--paper))",
          alt: "hsl(var(--paper-2))",
        },
        cyan: "hsl(var(--cyan))",
        warm: "hsl(var(--accent-warm))",
        ember: {
          DEFAULT: "hsl(var(--accent-warm))",
          cta: "hsl(var(--ember-cta))",
          soft: "hsl(var(--ember-soft))",
          ink: "hsl(var(--ember-ink))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        accent: "hsl(var(--accent))",
        whatsapp: "hsl(var(--whatsapp))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        // Crisp hairline-based depth instead of soft AI-template clouds.
        card: "0 1px 0 hsl(var(--border))",
        lift: "0 2px 4px -1px rgba(13,34,49,0.08), 0 12px 28px -8px rgba(13,34,49,0.14)",
        cta: "0 2px 0 hsl(var(--brand-deep))",
        ember: "0 2px 0 hsl(var(--ember-ink))",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
