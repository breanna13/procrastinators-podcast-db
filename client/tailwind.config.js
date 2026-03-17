/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "pcp-orange": "#E87945",
        "pcp-coral": "#F4A688",
        "pcp-purple": "#8B7AB8",
        "pcp-blue": "#6B9BD1",
        "pcp-dark": "#2D2D2D",
        "pcp-gray": "#B8B8B8",
      },
    },
  },
  plugins: [],
};
