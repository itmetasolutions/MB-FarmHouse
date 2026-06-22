import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        farmhouse: {
          dark:    '#122B1C',   // deep forest green — header/footer/sidebar bg
          brown:   '#1C5E36',   // medium forest green — buttons, active states
          medium:  '#3A8A5E',   // mid green — hover states
          tan:     '#D4A800',   // logo gold — accent text & highlights
          beige:   '#E6F2EB',   // light green-tinted — section backgrounds
          cream:   '#F2FAF5',   // very light green — cards, inputs
          white:   '#FAFFFE',   // near white — page base
          green:   '#5A8C3F',   // palm green — icon accents
          gold:    '#F5920C',   // sun orange — CTA highlights
          muted:   '#6B8A75',   // sage gray — placeholder / secondary text
          teal:    '#45B8CC',   // water teal — badges, links
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'wood-texture': "url('/images/wood-texture.jpg')",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
