import flowbitePlugin from 'flowbite/plugin';

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
      },
      fontFamily: {
        Pretendard: ['Pretendard'],
      },
    },
  },
  plugins: [flowbitePlugin],
};
