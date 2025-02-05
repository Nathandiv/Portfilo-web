/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // The "typecycle" animation types out and then erases the text.
        typecycle: {
          "0%": { width: "0ch", opacity: "0" },
          "5%": { opacity: "1" },
          "25%": { width: "14ch", opacity: "1" },  // Adjusted to fit 'System Developer'
          "45%": { width: "14ch", opacity: "1" },
          "55%": { width: "0ch", opacity: "1" },
          "100%": { width: "0ch", opacity: "0" },
        },
        blinkCaret: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "white" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out forwards",
        fadeUp: "fadeUp 0.8s ease-out forwards",
        // The typecycle uses steps(10) so that it “types” one character at a time.
        typecycle: "typecycle 10s steps(20) infinite",
        // Optional: A separate blinking caret animation (if you prefer to separate it)
        blink: "blinkCaret 0.75s step-end infinite",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
