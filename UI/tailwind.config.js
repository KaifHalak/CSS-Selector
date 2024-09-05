const { fontFamily } = require("tailwindcss/defaultTheme")

const textColor = "#f8f9f9"

// Menubar
const hoverColor = "#50505D"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        main: {
          bg: "#2B2B32",
        },

        button: {
          bg: "#B0411E",
          hover: "rgb(176, 65, 30, 75%)",
          text: {
            color: textColor,
          },
        },

        toggle: {
          selected: {
            text: {
              color: "#000",
            },
            bg: "#f8f9f9",
          },
          unselected: {
            hover: hoverColor,
            text: {
              color: textColor,
            },
          },
        },

        menubar: {
          bg: "#434343",

          menu: {
            text: {
              color: textColor,
            },
            hover: hoverColor,
          },
        },

        stylingText: {
          bg: "",
          text: {
            color: textColor,
          },
        },

        // =======================

        // background: "hsl(var(--background))",
        // foreground: {
        //   DEFAULT: "hsl(var(--foreground))",
        //   text: "hsl(var(--foreground-text))",
        //   hover: "hsl(var(--foreground-hover))",
        // },
        // selected: "hsl(var(--selected))",
        // accent: {
        //   DEFAULT: "hsl(var(--accent))",
        //   foreground: "hsl(var(--accent-foreground))",
        //   text: "hsl(var(--accent-text))",
        // },
        // border: "hsl(var(--border))",
        // input: "hsl(var(--input))",
        // ring: "hsl(var(--ring))",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        // destructive: {
        //   DEFAULT: "hsl(var(--destructive))",
        //   foreground: "hsl(var(--destructive-foreground))",
        // },
        // muted: {
        //   DEFAULT: "hsl(var(--muted))",
        //   foreground: "hsl(var(--muted-foreground))",
        // },

        // popover: {
        //   DEFAULT: "hsl(var(--popover))",
        //   foreground: "hsl(var(--popover-foreground))",
        // },
        // card: {
        //   DEFAULT: "hsl(var(--card))",
        //   foreground: "hsl(var(--card-foreground))",
        // },
      },
      fontFamily: {
        // sans: ["var(--font-sans)", ...fontFamily.sans],
        poppins: ["poppins"],
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
