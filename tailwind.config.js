/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main': "url('/assets/images/planalto.jpg')"
      },
      colors: {
        primary: '#2c455b',
        secondary: '#15212c',
        'gray-dark': '#666666',
        'gray-main': '#808080',
        'gray-light': '#cccccc'
      },
    }
  },
  plugins: [require('tailwind-scrollbar')],
}
