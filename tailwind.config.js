module.exports = {
  content: [
    './src/pages/**/*.{js,ts,tsx,jsx}',
    './src/components/**/*.{js,ts,tsx,jsx}',
  ],
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
