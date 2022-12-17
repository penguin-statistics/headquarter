/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionDuration: {
        DEFAULT: '150ms',
      },
    },
    screens: {
      sm: '575px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
  },
  plugins: [],
}
