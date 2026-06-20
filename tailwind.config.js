export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#6366f1',
          purple: '#8b5cf6',
          emerald: '#10b981',
          cyan: '#06b6d4',
          rose: '#ec4899',
        },
      },
      boxShadow: {
        glass: '0 20px 60px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(59,130,246,0.15), transparent 35%)',
      },
    },
  },
  plugins: [],
};
