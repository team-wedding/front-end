import flowbitePlugin from 'flowbite/plugin';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
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
        button: '#FD9797', // 20 opacity
        border: '#DDDDDD',
        footer: '#F9EDED',
        image: '#F8FAFB',
        logo: '#0C0C0C',
        result: '#49413a',
      },
      fontFamily: {
        Pretendard: ['Pretendard'],
        Crimson: ['Crimson Pro', ...defaultTheme.fontFamily.sans],
        Paperlogy: ['Paperlogy', ...defaultTheme.fontFamily.sans],
        Suit: ['SUIT-Regular'],
        NanumSquareNeo: ['NanumSquareNeo', 'NanumSquareNeoVariable'],
        Mapo: ['MapoFlowerIsland'],
        NanumGothic: ['NanumGothic'],
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
