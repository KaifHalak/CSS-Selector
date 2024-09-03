const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        border: "hsl(var(--border)   / <alpha-value>)",
        input: "hsl(var(--input)  / <alpha-value>)",
        ring: "hsl(var(--ring)  / <alpha-value>)",
        background: "hsl(var(--background)  / <alpha-value>)",
        foreground: {
          DEFAULT: "hsl(var(--foreground)  / <alpha-value>)",
          text: "hsl(var(--foreground-text  / <alpha-value>)"
        },
        primary: {
          DEFAULT: "hsl(var(--primary)  / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground)  / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary)  / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground)  / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive)  / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground)  / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted)  / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground)  / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent)  / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground)  / <alpha-value>)",
          text: "hsl(var(--accent-text)  / <alpha-value>)"
        },
        popover: {
          DEFAULT: "hsl(var(--popover)  / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground)  / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card)  / <alpha-value>)",
          foreground: "hsl(var(--card-foreground)  / <alpha-value>)",
        },
        font: {
          DEFAULT: "",
          color: ""
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
