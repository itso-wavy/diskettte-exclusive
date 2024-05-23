import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '1800px',
      },
    },
    borderRadius: {
      '4xl': '30px',
    },
    // backgroundSize: {
    //   auto: 'auto',
    //   cover: 'cover',
    //   contain: 'contain',
    //   '60%': '60%',
    // },
    extend: {
      fontFamily: {
        sans: ['Inter', '"Noto Sans KR"', ...fontFamily.sans],
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
    },
  },
  safelist: [
    {
      pattern: /bg-(black|orange|purple|green|blue)-(primary|secondary)/,
      variants: ['hover', 'dark'],
    },
    {
      pattern: /text-(black|orange|purple|green|blue)-(primary|secondary)/,
      variants: ['hover', 'dark'],
    },
  ],
  plugins: [],
};

export default config;
