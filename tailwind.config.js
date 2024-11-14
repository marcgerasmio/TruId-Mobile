/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        buttonColor: "#004581",
        bgColor: "#97CBDC",
      },
    },
  },
  plugins: [require("daisyui")],
};
