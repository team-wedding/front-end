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
        background: '#f2ece6',
        higtlight: '#964b00',
        result: '#49413a',
      },
      fontFamily: {
        Pretendard: ['Pretendard'],
        Crimson: ['Crimson Pro', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [flowbitePlugin],
};
