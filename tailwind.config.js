module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  // jit is causing bugs for some reason
  // mode: 'jit',
  theme: {
    extend: {
      colors: {
        accent: '#0991FFff',
        bgDefault: '#202020',
        bgPaper: '#303030',
        bgPaperSecondary: '#3c3c3c',
        bgLight: '#424242',
        textPrimary: '#fff',
        textSecondary: 'rgba(255,255,255,0.7)',
        textDisabled: 'rgba(255,255,255,0.5)',
      },
    },
  },
  // hover:ring-white hover:ring-2 hover:outline-none
  variants: {
    extend: {
      ringColor: ['hover'],
      ringWidth: ['hover'],
      outline: ['hover'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
