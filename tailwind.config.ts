import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        jost: ['var(--font-jost)'],
        karla: ['var(--font-karla)'],
        manrope: ['var(--font-manrope)'],
        quicksand: ['var(--font-quicksand)'],
        raleway: ['var(--font-raleway)'],
        vazirmatn: ['var(--font-vazirmatn)'],
      },
      colors: {
        primary: '#000000',
        brand: 'rgb(228,97,105)',
        'brand-gray-dark': 'rgb(69,73,87)',
        'brand-gray-medium': 'rgb(130,135,151)',
        'brand-gray-light': 'rgb(240,243,253)',
        background: '#fafafa',
        dark: '#222222',
      },
      fontSize: {
        '2xs': ['0.625rem', '0.75rem'],
      },
      screens: {
        '2xl': '1440px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.950'),
            strong: {
              color: theme('colors.gray.950'),
            },
            blockquote: {
              color: theme('colors.gray.700'),
            },
            li: {
              color: theme('colors.gray.950'),
              '&::marker': {
                color: theme('colors.gray.800'),
              },
            },
            a: {
              color: theme('colors.blue.700'),
              '&:hover': {
                color: theme('colors.blue.600'),
              },
            },
            h1: {
              fontSize: theme('fontSize.4xl'),
              fontWeight: theme('fontWeight.bold'),
            },
            h2: {
              fontSize: theme('fontSize.3xl'),
              fontWeight: theme('fontWeight.bold'),
            },
            h3: {
              fontSize: theme('fontSize.2xl'),
              fontWeight: theme('fontWeight.bold'),
            },
            h4: {
              fontSize: theme('fontSize.xl'),
              fontWeight: theme('fontWeight.bold'),
            },
            h5: {
              fontSize: theme('fontSize.lg'),
              fontWeight: theme('fontWeight.bold'),
            },
            h6: {
              fontSize: theme('fontSize.base'),
              fontWeight: theme('fontWeight.bold'),
            },
          },
        },
      }),
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        blink: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0.2' },
        },
        slowPing: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        collapseDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        collapseUp: {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
        accordionDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        accordionUp: {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '100' },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        ping: 'slowPing 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        collapseDown: 'collapseDown 200ms cubic-bezier(0.87, 0, 0.13, 1)',
        collapseUp: 'collapseUp 200ms cubic-bezier(0.87, 0, 0.13, 1)',
        accordionDown: 'accordionDown 150ms ease-in-out',
        accordionUp: 'accordionUp 150ms ease-in-out',
        fadeIn: 'fadeIn 300ms ease-in-out',
      },
    },
  },
  plugins: [nextui(), require('@tailwindcss/typography')],
} satisfies Config
