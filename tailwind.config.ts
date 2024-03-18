import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        jost: ['var(--font-jost)', ...defaultTheme.fontFamily.sans],
        karla: ['var(--font-karla)', ...defaultTheme.fontFamily.sans],
        manrope: ['var(--font-manrope)', ...defaultTheme.fontFamily.sans],
        quicksand: ['var(--font-quicksand)', ...defaultTheme.fontFamily.sans],
        raleway: ['var(--font-raleway)', ...defaultTheme.fontFamily.sans],
        vazirmatn: ['var(--font-vazirmatn)', ...defaultTheme.fontFamily.sans],
        prata: ['var(--font-prata)', ...defaultTheme.fontFamily.serif],
        bellota: ['var(--font-bellota)', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        brand: '#E46169',
        'brand-light': '#FEEAEB',
        'brand-dark': '#CD565E',
        'brand-green': '#e0edcb',
        'brand-blue': '#659cd7',
        'brand-blue-dark': '#36597f',
        'brand-gray-dark': '#454957',
        'brand-gray-medium': '#828797',
        'brand-gray-light': '#F0F3FD',
        background: '#FAFBFF',
        'almost-black': '#1F2023',
        'almost-white': '#FDFDFF',
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
        enterFromRight: {
          from: { opacity: '0', transform: 'translateX(200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        enterFromLeft: {
          from: { opacity: '0', transform: 'translateX(-200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        exitToRight: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(200px)' },
        },
        exitToLeft: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(-200px)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
        },
        scaleOut: {
          from: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: '0', transform: 'rotateX(-10deg) scale(0.95)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        fadeInOut: {
          '0%': {
            opacity: '0',
            animationTimingFunction: 'ease-in',
          },
          '7%': { opacity: '1', animationTimingFunction: 'ease-out' },
          '40%': { opacity: '1' },
          '47%': { opacity: '0' },
          '100%': { opacity: '0' },
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
        scaleIn: 'scaleIn 200ms ease',
        scaleOut: 'scaleOut 200ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 200ms ease',
        enterFromLeft: 'enterFromLeft 250ms ease',
        enterFromRight: 'enterFromRight 250ms ease',
        exitToLeft: 'exitToLeft 250ms ease',
        exitToRight: 'exitToRight 250ms ease',
        slideshow: 'fadeInOut ease-in-out infinite',
      },
    },
  },
  plugins: [
    nextui(),
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({
          perspective: value,
        }),
      })
    }),
  ],
} satisfies Config
