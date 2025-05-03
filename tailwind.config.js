/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
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
  plugins: [daisyui],
};
