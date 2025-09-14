/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f5f3f9',
          100: '#e9e2f3',
          200: '#d3c5e7',
          300: '#b7a3d7',
          400: '#9b81c7',
          500: '#7F5FA8',
          600: '#6d4d94',
          700: '#5a3f7a',
          800: '#4a3363',
          900: '#3d2a52',
        },
        secondary: {
          50: '#f0eef9',
          100: '#e1ddf3',
          200: '#c3bae7',
          300: '#a597db',
          400: '#8774cf',
          500: '#39269B',
          600: '#2e1f7c',
          700: '#23195d',
          800: '#1c144a',
          900: '#16103d',
        },
        accent: {
          50: '#f5f3f9',
          100: '#e9e2f3',
          200: '#d3c5e7',
          300: '#b7a3d7',
          400: '#9b81c7',
          500: '#7F5FA8',
          600: '#6d4d94',
          700: '#5a3f7a',
          800: '#4a3363',
          900: '#3d2a52',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};