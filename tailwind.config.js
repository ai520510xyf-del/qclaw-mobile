/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#667EEA',
          dark: '#764BA2',
          light: '#8B9FEE',
        },
        background: {
          dark: '#0F0F1A',
          card: '#1A1A2E',
          elevated: '#252540',
        },
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0A0B0',
        'text-muted': '#6B6B7B',
        success: '#4ADE80',
        warning: '#FBBF24',
        error: '#EF4444',
        info: '#60A5FA',
      },
      fontFamily: {
        sans: ['PingFang SC', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
      },
      borderRadius: {
        'card': '16px',
        'btn-sm': '12px',
        'btn-lg': '24px',
        'bubble': '18px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      animation: {
        'bounce-dot': 'bounce-dot 1.4s infinite ease-in-out',
        'fade-in': 'fade-in 250ms ease-out',
        'slide-up': 'slide-up 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'bounce-dot': {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: '0.4' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
