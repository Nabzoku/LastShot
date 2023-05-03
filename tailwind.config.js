/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/*.html'],
  theme: {
    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '800px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '414px' },
      // => @media (max-width: 414px) { ... }
      xsm: { max: '375px' },
    },
    extend: {},
  },
  plugins: [],
};
