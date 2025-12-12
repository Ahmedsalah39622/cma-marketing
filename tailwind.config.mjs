import { join } from 'path';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000', // Black
        secondary: '#d4af37', // Gold
        tertiary: '#1e3a8a', // Blue
        gold: '#d4af37',
        blue: '#1e3a8a',
      },
    },
  },
  plugins: [],
};
