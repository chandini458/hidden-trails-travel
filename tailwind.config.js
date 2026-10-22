/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        trail: {
          canvas: '#f5f0e6',
          surface: '#fffdf8',
          green: '#35533b',
          forest: '#203b2b',
          orange: '#d96f43',
          peach: '#f4d3b9',
          ink: '#242820',
          muted: '#6c6b63',
          border: '#e8e0d3',
          tint: '#eef0e5',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      boxShadow: {
        card: '0 5px 20px rgba(40, 50, 35, 0.06)',
        lifted: '0 12px 28px rgba(40, 50, 35, 0.12)',
      },
    },
  },
  plugins: [],
};