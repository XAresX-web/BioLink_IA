/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class', // Habilita modo oscuro por clase
  theme: {
    extend: {
      colors: {
        primary: '#1db954', // Verde profesional para tu branding
      },
    },
  },
  plugins: [],
};
