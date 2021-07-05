module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        accent: '#0991FF',
        bgAccent: '#0991FF',
        bgDefault: '#202020',
        bgPaper: '#303030',
        bgPaperSecondary: '#3c3c3c',
        bgLight: '#424242',
        textPrimary: '#fff',
        textSecondary: 'rgba(255,255,255,0.7)',
        textDisabled: 'rgba(255,255,255,0.5)',
      },
      gridTemplateColumns: {
        teaLineLayout: '1fr repeat(3, minmax(0, 1fr))',
      },
      fontFamily: {
        display: ['Open Sans'],
      },
    },
  },
  variants: {
    extend: {
      ringColor: ['hover'],
      ringWidth: ['hover'],
      outline: ['hover'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
