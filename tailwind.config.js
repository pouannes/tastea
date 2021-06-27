module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bgDefault: '#303030',
        bgPaper: '#424242',
        txtPrimary: '#fff',
        txtSecondary: 'rgba(255,255,255,0.7)',
        textDisabled: 'rgba(255,255,255,0.5)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
