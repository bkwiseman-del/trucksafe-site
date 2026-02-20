/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'trucksafe-navy': '#363b57',
        'trucksafe-orange': '#dd8157',
        'admin-bg': '#0f1117',
        'admin-sidebar': '#1a1d2e',
        'admin-card': '#1f2937',
        'admin-border': '#374151',
      },
    },
  },
  plugins: [],
}
