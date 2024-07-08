/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-down": "slide-down 300ms ease-in-out",
      },
      keyframes: {
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-3rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
