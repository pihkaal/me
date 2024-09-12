import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  content: ["index.html", "./src/**/*.tsx", "./src/**/*.ts"],
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        breathing: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.9" },
          "50%": {
            transform: "scale(1.1)",
            opacity: "1",
          },
        },
        disappear: {
          "0%": { transform: "scale(1)", opacity: "0.95" },
          "20%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(0)", opacity: "0" },
        },
      },
      animation: {
        fadeOut: "fadeOut 250ms ease-out forwards",
        breathing: "breathing 4s ease-in-out infinite",
        disappear: "disappear 750ms ease-in-out forwards",
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        lg: "1.25rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        body: ["JetBrainsMono", "mono"],
      },
      boxShadow: {
        window: "0 0 1px 1px #1a1a1a",
      },
      colors: {
        foreground: "#cdd6f4",
        background: "#1e1e2e",
        borderInactive: "#595959",
        borderActive: "#cdd6f4",
        selectionForeground: "#1e1e2e",
        selectionBackground: "#f5e0dc",
        color0: "#45475a",
        color1: "#f38ba8",
        color2: "#a6e3a1",
        color3: "#f9e2af",
        color4: "#89bafa",
        color5: "#f5c2e7",
        color6: "#94e2d5",
        color7: "#bac2de",
        color8: "#585B70",
        color9: "#f38ba8",
        color10: "#a6e3a1",
        color11: "#f9e2af",
        color12: "#89bafa",
        color13: "#f5c2e7",
        color14: "#94e2d5",
        color15: "#a6adc8",
      },
    },
  },
  plugins: [],
} as const satisfies Config;

export default config;
