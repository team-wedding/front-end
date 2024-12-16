/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}',"./node_modules/flowbite/**/*.js"],
   theme: {
      extend: {
         colors: {
            pinkCustom: "#FF668B",
          },
      },
   },
   plugins: [
      require('flowbite/plugin')
   ],
};
