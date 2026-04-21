/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          primary: '#FF6B00',
          light: '#FF8C38',
          glow: '#FF6B0020',
        },
        dark: {
          bg: '#0D0D0D',
          bgSecondary: '#141414',
          card: '#1A1A1A',
          border: '#2A2A2A',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0A0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(to right, #FF6B00, #FF8C38)',
      }
    },
  },
  plugins: [],
}
