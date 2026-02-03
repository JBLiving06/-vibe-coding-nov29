/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core palette from v4 spec
        ink: {
          900: '#1a1a1a',
          800: '#2d2d2d',
          700: '#404040',
          600: '#525252',
          500: '#6b6b6b',
          400: '#8a8a8a',
          300: '#a8a8a8',
          200: '#d4d4d4',
          100: '#e8e8e8',
          50: '#f5f5f5',
        },
        paper: {
          DEFAULT: '#faf9f7',
          warm: '#f5f3ef',
          dark: '#eceae4',
        },
        accent: {
          DEFAULT: '#0d7377',
          light: '#14919b',
          pale: '#e6f4f5',
        },
        signal: {
          rising: '#0d7377',
          'rising-bg': '#e6f4f5',
          stable: '#6b6b6b',
          'stable-bg': '#f0f0f0',
          watch: '#b45309',
          'watch-bg': '#fef3e2',
          critical: '#b91c1c',
          'critical-bg': '#fee2e2',
        },
        hyperscaler: {
          DEFAULT: '#d97706',
          bg: '#fef3c7',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['IBM Plex Sans', '-apple-system', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
