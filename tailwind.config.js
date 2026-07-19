/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0c10',
        foreground: '#ffffff',
        panel: '#1f2833',
        border: '#2c3540',
        'neon-magenta': '#ff0055',
        'neon-cyan': '#00f0ff',
        'neon-purple': '#9d00ff',
        'fifa-gold': '#d4af37',
      }
    },
  },
  plugins: [],
}
