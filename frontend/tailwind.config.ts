import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        background: '#131313',
        foreground: '#e2e2e2',
        card: '#1f1f1f',
        'card-foreground': '#e2e2e2',
        primary: '#ffb3b1',
        'primary-foreground': '#680011',
        'primary-container': '#ff535b',
        secondary: '#ccc5c1',
        'secondary-foreground': '#33302d',
        'secondary-container': '#4c4845',
        accent: '#ffb3b1',
        'accent-foreground': '#680011',
        destructive: '#ffb4ab',
        'destructive-foreground': '#690005',
        muted: '#353535',
        'muted-foreground': '#b3b3b3',
        border: '#353535',
        input: '#0e0e0e',
        ring: '#ffb3b1',
        glass: 'rgba(19, 19, 19, 0.7)',
        'glass-border': 'rgba(168, 162, 158, 0.1)',
      },
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
