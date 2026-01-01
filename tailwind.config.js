/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        // Moroccan theme colors - direct access
        'warm-green': '#2D5F3F',
        'terracotta': '#E07A5F',
        'sand': '#F5EFE6',
        'cream': '#FAF7F2',
        'charcoal': {
          DEFAULT: '#2D2D2D',
          light: '#6B6B6B',
        },
        'gold': {
          DEFAULT: '#D4AF37',
          light: '#E5C158',
        },
        // Legacy morocco namespace for backwards compatibility
        morocco: {
          green: '#2D5F3F',
          terracotta: '#E07A5F',
          sand: '#F5EFE6',
          charcoal: '#2D2D2D',
          gold: '#D4AF37',
          cream: '#FAF7F2',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}