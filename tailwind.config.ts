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
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        // Brand palette — refined in Phase 2. CSS vars live in globals.css.
        sky: {
          DEFAULT: "hsl(var(--brand-sky))",
          soft: "hsl(var(--brand-sky-soft))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
          deep: "hsl(var(--brand-deep))",
          ink: "hsl(var(--brand-ink))",
          muted: "hsl(var(--brand-muted))",
        },
        cyan: "hsl(var(--cyan))",
        warm: "hsl(var(--accent-warm))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        accent: "hsl(var(--accent))",
        whatsapp: "hsl(var(--whatsapp))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(12,42,74,0.04), 0 8px 24px rgba(12,42,74,0.06)",
        cta: "0 8px 24px rgba(12,74,110,0.24)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
