module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,tsx,jsx}',
    './src/components/**/*.{js,ts,tsx,jsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      brand: ['"Pacifico"'],
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'],
    },
  },
  plugins: [],
};
