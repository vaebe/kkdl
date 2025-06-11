/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f4ff',
          100: '#a3d3ff',
          200: '#7abaff',
          300: '#52a0ff',
          400: '#2982ff',
          500: '#0062ff',
          600: '#004cd9',
          700: '#0039b3',
          DEFAULT: '#0062FF',
        },
      },
    },
  },
}
