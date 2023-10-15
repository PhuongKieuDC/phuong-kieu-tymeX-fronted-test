/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'pink-p': '#f7f2e9',
        'orange-p': 'rgb(249, 148, 68)'
      },
      screens: {
        xs: '320px'
      },
      boxShadow: {
        ps: 'rgb(0 0 0 / 26%) 0px 25px 20px -20px'
      }
    }
  },
  plugins: []
};
