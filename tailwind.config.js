/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Oswald", "sans-serif"],
        body: ["Source Sans 3", "sans"],
      },
    },
  },
  plugins: [],
};
