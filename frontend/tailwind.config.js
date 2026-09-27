/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate"

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  safelist: [
    "bg-magenta", "bg-magenta/5", "bg-magenta/10",
    "bg-navy", "bg-navy/5", "bg-navy/10", "bg-navy/20",
    "bg-amethyst", "bg-amethyst/5", "bg-amethyst/10",
    "text-magenta", "text-navy", "text-amethyst",
    "border-magenta", "border-navy", "border-amethyst",
    "hover:bg-magenta", "hover:bg-magenta/10",
    "hover:bg-navy", "hover:bg-navy/10",
    "hover:bg-amethyst", "hover:bg-amethyst/10",
    "hover:text-magenta", "hover:text-navy", "hover:text-amethyst",
    "hover:border-magenta", "hover:border-navy", "hover:border-amethyst",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        navy: {
          DEFAULT: '#0A192F',
          50: '#E8EDF5',
          100: '#C5D0E3',
          200: '#8EA3C4',
          300: '#5776A5',
          400: '#2D4D7A',
          500: '#0A192F',
          600: '#081425',
          700: '#060F1B',
          800: '#040A12',
          900: '#020509'
        },
        magenta: {
          DEFAULT: '#E91E63',
          50: '#FDE4ED',
          100: '#FBBDD3',
          200: '#F77DA8',
          300: '#F33D7D',
          400: '#E91E63',
          500: '#C2185B',
          600: '#9C1249',
          700: '#760D37',
          800: '#500925',
          900: '#2A0413'
        },
        amethyst: {
          DEFAULT: '#9C27B0',
          50: '#F3E5F5',
          100: '#E1BEE7',
          200: '#CE93D8',
          300: '#BA68C8',
          400: '#AB47BC',
          500: '#9C27B0',
          600: '#8E24AA',
          700: '#7B1FA2',
          800: '#6A1B9A',
          900: '#4A148C'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)']
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '80%, 100%': { transform: 'scale(1.6)', opacity: '0' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'scroll': 'scroll 25s linear infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'wiggle': 'wiggle 0.5s ease-in-out'
      }
    }
  },
  plugins: [tailwindcssAnimate],
}
