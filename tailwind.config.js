import flowbitePlugin from 'flowbite/plugin';
import defaultTheme from 'tailwindcss/defaultTheme';
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF668B',
        secondary: '#F6F5F2',
        background: '#B78181', // 10 opacity
        information: '#E7ABAB', // 80 opacity
        highlight: '#964b00',
        button: 'rgba(253, 151, 151)',
        button20: 'rgba(253, 151, 151, 0.2)', // 20 opacity
        border: '#DDDDDD',
        footer: '#F9EDED',
        image: '#F8FAFB',
        logo: '#0C0C0C',
        result: '#49413a',

        primary: {
          DEFAULT: '#518DFF',
          dark: '#8EB5FF',
          muted: {
            DEFAULT: '#CEDFFF',
            dark: '#687BAF',
          },
        },
        secondary: {
          DEFAULT: '#FF488F',
          dark: '#FF86B5',
          muted: {
            DEFAULT: '#F8D4E2',
            dark: '#AC6083',
          },
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#000000',
          muted: {
            DEFAULT: '#F2F2F7',
            dark: '#1C1C1E',
          },
          button: {
            DEFAULT: '#ffffff',
            dark: '#000000',
          },
          overlay: {
            DEFAULT: '#000000', // 60%
            dark: '#3C3C43', // 60%
          },
        },
        label: {
          DEFAULT: '#000000',
          dark: '#FFFFFF',
          secondary: {
            DEFAULT: '#3C3C43', // 60%
            dark: '#EBEBF5', // 60%
          },
          button: {
            DEFAULT: '#000000', // 60%
            dark: '#FFFFFF', // 60%
          },
          overlay: {
            DEFAULT: '#FFFFFF',
            muted: '#FFFFFF', // 30%
          },
        },
        icon: {
          DEFAULT: '#000000',
          dark: '#FFFFFF',
          card: '#FFFFFF', // 80%
          muted: {
            DEFAULT: '#3C3C43', // 60%
            dark: '#EBEBF5', // 60%
          },
        },
        border: {
          DEFAULT: '#C6C6C8',
          dark: '#38383A',
        },
        placeholder: {
          DEFAULT: '#3C3C43', // 30%
          dark: '#EBEBF5', // 30%
        },
        status: {
          success: {
            DEFAULT: '#34C759',
            dark: '#30D158',
          },
          error: {
            DEFAULT: '#FF3B30',
            dark: '#FF453A',
          },
          warning: {
            DEFAULT: '#FFCC00',
            dark: '#FFD60A',
          },
        },
      },
      fontFamily: {
        Pretendard: ['Pretendard'],
        Crimson: ['Crimson Pro', ...defaultTheme.fontFamily.sans],
        Paperlogy: ['Paperlogy', ...defaultTheme.fontFamily.sans],
        Suit: ['SUIT'],
        NanumSquareNeo: ['NanumSquareNeo', ...defaultTheme.fontFamily.sans],
        Mapo: ['MapoFlowerIsland', ...defaultTheme.fontFamily.sans],
        NanumGothic: ['NanumGothic', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        custom: '0px 9px 20px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        bounceX: 'bounceX 1s ease-in-out infinite',
      },
      keyframes: {
        bounceX: {
          '0%, 100%': {
            transform: 'translateX(15%)',
          },
          '50%': {
            transform: 'translateX(0)',
          },
        },
      },
    },
  },
  plugins: [flowbitePlugin],
};
